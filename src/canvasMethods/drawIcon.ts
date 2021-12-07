export default function drawIcon(
  canvas: HTMLCanvasElement,
  iconDisabled: boolean
) {
  const ctx = canvas.getContext("2d");
  const iconBgcWidth = 80;
  const iconBgcHeight = canvas.height;
  if (ctx) {
    // Set the backround color for the icon image on the left
    if (!iconDisabled) {
      ctx.fillStyle = "#23b85e";
      ctx.rect(0, 0, iconBgcWidth, iconBgcHeight);
      ctx.fill();
      // Draw a certain icon on canvas
      const iconWidth = 50;
      const iconHeight = 50;
      const iconPositionX = iconBgcWidth / 2 - iconWidth / 2;
      const iconPositionY = iconBgcHeight / 2 - iconHeight / 2;
      const img = new Image();

      // Draw the image
      img.src = "./icons/ExtraLife.png";
      console.log(img);
      img.addEventListener("load", function () {
        // Adding a loop to draw a shadow
        for (var x = 5; x < 40; x++) {
          // Add shadow
          ctx.shadowColor = "grey";
          // ctx.shadowBlur = 5;
          ctx.shadowOffsetX = -x;
          ctx.shadowOffsetY = x;

          // Draw icon (with the shadow that was set above)
          ctx.drawImage(
            img,
            iconPositionX,
            iconPositionY,
            iconWidth,
            iconHeight
          );
        }

        // Remove shadow
        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
      });
    }
  }
}
