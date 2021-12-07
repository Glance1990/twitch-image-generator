export default function saveCanvasImage(
  canvas: HTMLCanvasElement,
  setImageSrc: React.Dispatch<React.SetStateAction<string>>
) {
  const image = canvas
    .toDataURL("image/png")
    .replace("image/png", "image/octet-stream");
  setImageSrc(image);
}
