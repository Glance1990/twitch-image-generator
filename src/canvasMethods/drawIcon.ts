function translateToCenter(ctx: CanvasRenderingContext2D) {
  ctx.translate(ctx.canvas.width / 2.0, ctx.canvas.height / 2.0);
}

function memoize(func: Function) {
  var cache = new Map();
  return function (...args: number[]) {
    var stringifiedArgs = JSON.stringify(args);
    if (cache.has(stringifiedArgs)) {
      return cache.get(stringifiedArgs);
    } else {
      var ret = func(...args);
      cache.set(stringifiedArgs, ret);
      return ret;
    }
  };
}

var calculateStrokeCountDivisor = memoize((angleRads: number) =>
  Math.cos(
    Math.abs((angleRads - Math.PI / 4.0) % (Math.PI / 2.0)) - Math.PI / 4.0
  )
);
for (var i = 0; i < 360; i += 1) {
  calculateStrokeCountDivisor((i * 180) / Math.PI);
}

function calculateShadowStrokes(
  image: HTMLImageElement,
  containerSize: number,
  iconSize: number,
  angleDegrees: number,
  xOffset: number,
  yOffset: number
) {
  var angleRads = (angleDegrees * Math.PI) / 180.0;
  var measureCanvas = document.createElement("canvas");
  measureCanvas.width = containerSize;
  measureCanvas.height = containerSize;
  var measureCtx = measureCanvas.getContext("2d");
  if (measureCtx) {
    measureCtx.imageSmoothingEnabled = true;
    measureCtx.imageSmoothingQuality = "high";
    var strokeCount = Math.round(
      iconSize / calculateStrokeCountDivisor(angleRads)
    );
    measureCtx.drawImage(
      image,
      containerSize / 2 - iconSize / 2,
      containerSize / 2 - iconSize / 2,
      iconSize,
      iconSize
    );
    var xStep = Math.sin(angleRads + Math.PI / 2);
    var yStep = Math.cos(angleRads + Math.PI / 2);
    var sina = Math.sin(angleRads);
    var cosa = Math.cos(angleRads);
    var maxLengthFromCenter = (containerSize / 2.0) * Math.sqrt(2);
    var strokes = [];
    var imageData = measureCtx.getImageData(0, 0, containerSize, containerSize);
    for (var strokeIndex = 0; strokeIndex < strokeCount; strokeIndex += 0.25) {
      var offsetFromMiddle = strokeIndex - strokeCount / 2;
      var centerLineX = sina * offsetFromMiddle;
      var centerLineY = cosa * offsetFromMiddle;
      var endX = centerLineX + xStep * maxLengthFromCenter;
      var endY = centerLineY + yStep * maxLengthFromCenter;
      var scanStartX = centerLineX - (iconSize / 2) * xStep;
      var scanStartY = centerLineY - (iconSize / 2) * yStep;
      var startX = null;
      var startY = null;
      for (var scanIndex = 0; scanIndex < iconSize * 1.42; scanIndex++) {
        var scanX = scanStartX + scanIndex * xStep + containerSize / 2;
        var scanY = scanStartY + scanIndex * yStep + containerSize / 2;
        var pixelAlpha =
          imageData.data[
            Math.round(scanY) * (imageData.width * 4) +
              Math.round(scanX) * 4 +
              3
          ];
        if (pixelAlpha > 200) {
          startX = scanX + xStep - containerSize / 2 + xOffset;
          startY = scanY + yStep - containerSize / 2 + yOffset;
          break;
        }
      }
      if (startX !== null && startY !== null) {
        strokes.push({
          startX,
          startY,
          endX: endX + xOffset,
          endY: endY + yOffset,
        });
      }
    }
    return strokes;
  }
}

function drawShadow(
  image: HTMLImageElement,
  containerSize: number,
  iconSize: number,
  outCtx: CanvasRenderingContext2D,
  angleDegrees: number,
  color: string,
  xOffset: number,
  yOffset: number
) {
  outCtx.save();
  var strokes = calculateShadowStrokes(
    image,
    containerSize,
    iconSize,
    angleDegrees,
    xOffset,
    yOffset
  );
  translateToCenter(outCtx);
  outCtx.strokeStyle = color;
  strokes &&
    strokes.forEach(({ startX, startY, endX, endY }) => {
      outCtx.beginPath();
      outCtx.moveTo(startX, startY);
      outCtx.lineTo(endX, endY);
      outCtx.stroke();
    });
  outCtx.restore();
}

var imageCache = new Map();

function loadImage(src: string, cache = true): Promise<HTMLImageElement> {
  return new Promise(function (resolve, reject) {
    if (cache && imageCache.has(src)) {
      resolve(imageCache.get(src));
      return;
    }
    var img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      if (cache) imageCache.set(src, img);
      resolve(img);
    };
    img.onerror = (e) => reject(e);
    img.src = src;
  });
}

export default async function drawIcon(
  canvas: HTMLCanvasElement,
  iconDisabled: boolean,
  iconScale: number,
  shadowState: boolean,
  iconShadowAngle: number
) {
  const ctx = canvas.getContext("2d");
  const iconBgcWidth = 80;
  const canvasHeight = canvas.height;
  const iconBgcHeight = canvas.height;
  if (ctx) {
    ctx.clearRect(0, 0, iconBgcWidth, ctx.canvas.height);
    ctx.save();
    var superSample = 2;
    var iconRatio = (iconScale / 100.0) * 0.75;
    var iconSize =
      canvasHeight * superSample * iconRatio + canvasHeight * 0.125;
    var containerSize = canvasHeight * superSample;
    var tempCanvas = document.createElement("canvas");
    tempCanvas.width = containerSize;
    tempCanvas.height = containerSize;
    var tempCtx = tempCanvas.getContext("2d");
    if (tempCtx) {
      tempCtx.imageSmoothingEnabled = true;
      tempCtx.imageSmoothingQuality = "high";
      var extraShadowRoom = Math.abs(0) + Math.abs(0);
      containerSize = containerSize + extraShadowRoom;
      // let angleDegrees = 130;
      var imgSrc = "./icons/ExtraLife.png";
      var image = await loadImage(imgSrc, true);
      if (shadowState) {
        drawShadow(
          image,
          containerSize,
          iconSize,
          tempCtx,
          iconShadowAngle,
          "red",
          0,
          0
        );
      }

      //tempCtx.drawImage(image, (h / 2) * superSample - iconSize / 2 + settings.iconOffsetX, (h / 2) * superSample - iconSize / 2 - settings.iconOffsetY, iconSize, iconSize);

      tempCtx.drawImage(
        image,
        (canvasHeight / 2) * superSample - iconSize / 2,
        (canvasHeight / 2) * superSample - iconSize / 2,
        iconSize,
        iconSize
      );
      //ctx.globalCompositeOperation = "source-atop";
      ctx.drawImage(tempCanvas, 0, 0, canvasHeight, canvasHeight);

      ctx.restore();
      //ctx.drawImage(tempCanvas, settings.alignment == "right" ? w - h : 0, 0, h, h);
    }

    // if (settings.colorizeIcon) {
    //     image = colorizeImage(image, settings.iconColor);
    // }

    // Set the backround color for the icon image on the left

    // if (!iconDisabled) {
    //   ctx.imageSmoothingEnabled = true;
    //   ctx.imageSmoothingQuality = "high";
    //   ctx.fillStyle = "#23b85e";
    //   ctx.rect(0, 0, iconBgcWidth, iconBgcHeight);
    //   ctx.fill();
    //   // Draw a certain icon on canvas
    //   const scaleFactor = iconScale / 100;
    //   const iconWidth = 65 * scaleFactor;
    //   const iconHeight = 65 * scaleFactor;
    //   const iconPositionX = iconBgcWidth / 2 - iconWidth / 2;
    //   const iconPositionY = iconBgcHeight / 2 - iconHeight / 2;
    //   const img = new Image();

    //   // Draw the image
    //   img.src = "./icons/ExtraLife.png";
    //   console.log(img);
    //   img.addEventListener("load", function () {
    //     if (shadowState) {
    //       // Adding a loop to draw a shadow
    //       for (var x = 5; x < 60; x++) {
    //         // Add shadow
    //         ctx.shadowColor = "grey";
    //         ctx.shadowBlur = 1;
    //         ctx.shadowOffsetX = -x;
    //         ctx.shadowOffsetY = x;

    //         // Draw icon (with the shadow that was set above)
    //         ctx.drawImage(
    //           img,
    //           iconPositionX,
    //           iconPositionY,
    //           iconWidth,
    //           iconHeight
    //         );
    //       }

    //       // Remove shadow
    //       ctx.shadowColor = "transparent";
    //       ctx.shadowBlur = 0;
    //       ctx.shadowOffsetX = 0;
    //       ctx.shadowOffsetY = 0;
    //     } else {
    //       // Draw icon (with the shadow that was set above)
    //       ctx.drawImage(
    //         img,
    //         iconPositionX,
    //         iconPositionY,
    //         iconWidth,
    //         iconHeight
    //       );
    //     }

    //     // ctx.drawImage(img, iconPositionX, iconPositionY, iconWidth, iconHeight);
    //   });
    // }
  }
}
