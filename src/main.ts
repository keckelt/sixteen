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
      <span style="width: 90px; display: inline-block;">display-p3</span> <canvas id="canvas1" width=320 height=40></canvas> 
    </div>
    <div>
      <span style="width: 90px; display: inline-block;">srgb</span> <canvas id="canvas2" width=320 height=40></canvas> 
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
    : "❌ Canvas does not support Display P3<br>Refresh the page if you change displays.";

drawCanvas(
  document.querySelector<HTMLCanvasElement>("#canvas1")!,
  "display-p3"
);
drawCanvas(document.querySelector<HTMLCanvasElement>("#canvas2")!, "srgb");

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

    const p3ImageData = context.getImageData(0, 0, 1, 1);
    console.log(p3ImageData.colorSpace, p3ImageData.data.constructor.name);
  } else {
    console.error("Could not get context");
  }
}
