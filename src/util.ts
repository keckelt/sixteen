// export function setupCounter(element: HTMLButtonElement) {
//   let counter = 0
//   const setCounter = (count: number) => {
//     counter = count
//     element.innerHTML = `count is ${counter}`
//   }
//   element.addEventListener('click', () => setCounter(counter + 1))
//   setCounter(0)
// }

export function displaySupportsP3Color() {
  return matchMedia("(color-gamut: p3)").matches;
}

export function canvasSupportsDisplayP3() {
  let canvas = document.createElement("canvas");
  try {
    // Safari throws a TypeError if the colorSpace option is supported, but
    // the system requirements (minimum macOS or iOS version) for Display P3
    // support are not met.
    let context = canvas.getContext("2d", { colorSpace: "display-p3" });
    return context!.getContextAttributes().colorSpace == "display-p3";
  } catch {}
  return false;
}
