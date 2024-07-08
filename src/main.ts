import "./style.css";
import { canvasSupportsDisplayP3, displaySupportsP3Color } from "./util";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h1>Sixteen Bit Images</h1>
    <p class="read-the-docs">
      Creating a canvas with display-3 colorspace image data.
    </p>
    <p id="displaySupport"></p>
    <p id="canvasSupport"></p>
    <p class="read-the-docs">
    Refresh the page if you change displays.
    </p>
    <div>
      <span style="width: 90px; display: inline-block;">display-p3</span> <canvas id="canvas1" width=320 height=80></canvas> 
    </div>
    <div>
      <span style="width: 90px; display: inline-block;">srgb</span> <canvas id="canvas2" width=320 height=80></canvas> 
    </div>
    <div>
      <span style="width: 90px; display: inline-block;">diff</span> <canvas id="diff" width=320 height=80></canvas> 
    </div>
    <p class="read-the-docs">
    Also see <a href="https://webkit.org/blog/12058/wide-gamut-2d-graphics-using-html-canvas/">intro</a> and <a href="https://webkit.org/blog-files/color-gamut/">examples</a> from the webkit blog.
    </p>
  </div>
`;

document.querySelector<HTMLParagraphElement>("#displaySupport")!.textContent =
  displaySupportsP3Color()
    ? "✅ Display P3 is supported"
    : "❌ Display P3 is not supported";

document.querySelector<HTMLParagraphElement>("#canvasSupport")!.textContent =
  canvasSupportsDisplayP3()
    ? "✅ Canvas supports Display P3"
    : "❌ Canvas does not support Display P3";

drawCanvas(
  document.querySelector<HTMLCanvasElement>("#canvas1")!,
  "display-p3"
);
drawCanvas(document.querySelector<HTMLCanvasElement>("#canvas2")!, "srgb");

// adapted from https://webkit.org/blog/12058/wide-gamut-2d-graphics-using-html-canvas/
function drawCanvas(
  canvas: HTMLCanvasElement,
  colorSpace: "display-p3" | "srgb" = "display-p3"
) {
  const context = canvas.getContext("2d", { colorSpace });
  if (context) {
    let position = 0;
    for (let green of [1, 0]) {
      for (let blue of [1, 0]) {
        for (let red of [1, 0]) {
          context.fillStyle = `color(${colorSpace} ${red} ${green} ${blue})`;
          context.fillRect(position, 0, 40, 40);
          position += 40;
        }
      }
    }
    const COLORS = ["#0f0", "color(display-p3 0 1 0)"];
    for (let y = 0; y <= 300; y += 30) {
      context.fillStyle = COLORS[(y / 30) % 2];
      context.fillRect(y, 40, 30, 40);
    }

    const p3ImageData = context.getImageData(0, 0, 320, 40);
    console.log(p3ImageData.colorSpace, p3ImageData.data.constructor.name);
    console.log(p3ImageData);
  } else {
    console.error("Could not get context");
  }
}

// identify pixels that are different betwen the two canvases
const canvas1 = document.querySelector<HTMLCanvasElement>("#canvas1")!;
const canvas2 = document.querySelector<HTMLCanvasElement>("#canvas2")!;
const context1 = canvas1.getContext("2d", { colorSpace: "display-p3" })!;
const context2 = canvas2.getContext("2d", { colorSpace: "srgb" })!;
const imageData1 = context1.getImageData(0, 0, 320, 80);
const imageData2 = context2.getImageData(0, 0, 320, 80);
console.log(imageData1.colorSpace, imageData2.colorSpace);

const diffCanvas = document.querySelector<HTMLCanvasElement>("#diff")!;
diffCanvas.toDataURL("image/png", 1);
const diffContext = diffCanvas.getContext("2d", { colorSpace: "display-p3" })!;

for (let i = 0; i < imageData1.data.length; i += 4) {
  const rgba1 = imageData1.data.slice(i, i + 4);
  const rgba2 = imageData2.data.slice(i, i + 4);
  const diff = rgba1.reduce(
    (acc, val, idx) => acc + Math.abs(val - rgba2[idx]),
    0
  );
  if (diff !== 0) {
    diffContext.fillStyle = "#fff";
    diffContext.fillRect((i / 4) % 320, Math.floor(i / 4 / 320), 1, 1);
  } else {
    diffContext.fillStyle = "#000";
    diffContext.fillRect((i / 4) % 320, Math.floor(i / 4 / 320), 1, 1);
  }
}
