export default function drawText(
  canvas: HTMLCanvasElement,
  fontStyle: string,
  fontWeight: string,
  fontSize: string,
  fontFamily: string,
  text: string,
  iconDisabled: boolean
) {
  const ctx = canvas.getContext("2d");
  if (ctx) {
    // Сlean the canvas before the new cycle
    ctx.clearRect(iconDisabled ? 0 : 80, 0, canvas.width - 80, canvas.height);
    // Set the canvas backround color and fill it
    ctx.fillStyle = "#101220";
    ctx.fillRect(80, 0, canvas.width, canvas.height);
    // Set the color for the text and differnt font properties
    ctx.fillStyle = "white";
    ctx.font = `${fontStyle} ${fontWeight} ${fontSize} ${fontFamily}`;
    // Calculate the positions needed to place the text on the canvas
    const canvasCenter = canvas.height / 2;
    const textMeasurement = ctx.measureText(text);
    const textHeightCenter =
      (textMeasurement.actualBoundingBoxAscent -
        textMeasurement.actualBoundingBoxDescent) /
      2;
    const posY = canvasCenter + textHeightCenter;
    const posX = iconDisabled ? 10 : 90;
    console.log("posX", posX);
    // Put finaly text on the canvas
    ctx.fillText(text, posX, posY, 200);
  }
}
