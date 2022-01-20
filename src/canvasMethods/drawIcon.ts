function translateToCenter(ctx: CanvasRenderingContext2D) {
  ctx.translate(ctx.canvas.width / 2.0, ctx.canvas.height / 2.0);
}

function colorizeImage(
  image: HTMLImageElement,
  color: string = "000000"
): HTMLCanvasElement {
  var tempCanvas = document.createElement("canvas");
  var tempCtx = tempCanvas.getContext("2d");
  tempCanvas.width = image.width;
  tempCanvas.height = image.height;
  if (tempCtx) {
    tempCtx.fillStyle = color;
    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
    tempCtx.globalCompositeOperation = "destination-atop";
    if (image.src.includes("svg")) {
      var tempTempCanvas = document.createElement("canvas");
      var tempTempCtx = tempTempCanvas.getContext("2d");
      tempTempCanvas.width = tempCanvas.width;
      tempTempCanvas.height = tempCanvas.height;
      if (tempTempCtx !== null) {
        tempTempCtx.drawImage(image, 0, 0);
        tempCtx.drawImage(tempTempCanvas, 0, 0);
      }
    } else {
      tempCtx.drawImage(image, 0, 0);
    }
  }
  return tempCanvas;
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
    containerSize * 2,
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
  iconShadowAngle: number,
  backgroundColor: string = "#23b85e",
  shadowColor: string,
  horizontalPositionIcon: number,
  verticalPositionIcon: number,
  iconColor?: string
) {
  const ctx = canvas.getContext("2d");
  const iconBgcWidth = canvas.height;
  const canvasHeight = canvas.height;
  if (ctx && !iconDisabled) {
    ctx.clearRect(0, 0, iconBgcWidth, ctx.canvas.height);
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.height, canvas.height);
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
      let imgSrc = "./icons/ExtraLife.png";
      let image = await loadImage(imgSrc, true);
      if (shadowState) {
        drawShadow(
          image,
          containerSize,
          iconSize,
          tempCtx,
          iconShadowAngle,
          shadowColor,
          horizontalPositionIcon,
          verticalPositionIcon
        );
      }

      //tempCtx.drawImage(image, (h / 2) * superSample - iconSize / 2 + settings.iconOffsetX, (h / 2) * superSample - iconSize / 2 - settings.iconOffsetY, iconSize, iconSize);
      let colorImage;
      if (iconColor) {
        colorImage = colorizeImage(image, iconColor);
      }

      tempCtx.drawImage(
        colorImage ? colorImage : image,
        (canvasHeight / 2) * superSample -
          iconSize / 2 +
          horizontalPositionIcon,
        (canvasHeight / 2) * superSample - iconSize / 2 + verticalPositionIcon,
        iconSize,
        iconSize
      );
      ctx.globalCompositeOperation = "source-atop";
      ctx.drawImage(tempCanvas, 0, 0, canvasHeight, canvasHeight);

      ctx.restore();
      //ctx.drawImage(tempCanvas, settings.alignment == "right" ? w - h : 0, 0, h, h);
    }
  }
}
