export async function scroll({
  tabId,
  direction = "down",
  pixels = 500,
  x = 300,
  y = 300,
}) {
  const target = { tabId };

  const directions = {
    up: { deltaX: 0, deltaY: -pixels },
    down: { deltaX: 0, deltaY: pixels },
    left: { deltaX: -pixels, deltaY: 0 },
    right: { deltaX: pixels, deltaY: 0 },
  };

  const delta = directions[direction];

  if (!delta) {
    throw new Error(`Invalid scroll direction: ${direction}`);
  }

  await chrome.debugger.sendCommand(
    target,
    "Input.dispatchMouseEvent",
    {
      type: "mouseWheel",
      x,
      y,
      ...delta,
    }
  );
}