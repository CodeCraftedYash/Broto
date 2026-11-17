
export async function lClick({ tabId, x, y }) {
  const target = { tabId };
  const coordinates = { x, y };

  await chrome.debugger.sendCommand(
    target,
    "Input.dispatchMouseEvent",
    {
      type: "mouseMoved",
      ...coordinates,
    }
  );

  await chrome.debugger.sendCommand(
    target,
    "Input.dispatchMouseEvent",
    {
      type: "mousePressed",
      ...coordinates,
      button: "left",
      clickCount: 1,
    }
  );

  await chrome.debugger.sendCommand(
    target,
    "Input.dispatchMouseEvent",
    {
      type: "mouseReleased",
      ...coordinates,
      button: "left",
      clickCount: 1,
    }
  );
}
export async function rClick({ tabId, x, y }) {
  const target = { tabId };
  const coordinates = { x, y };

  await chrome.debugger.sendCommand(
    target,
    "Input.dispatchMouseEvent",
    {
      type: "mouseMoved",
      ...coordinates,
    }
  );

  await chrome.debugger.sendCommand(
    target,
    "Input.dispatchMouseEvent",
    {
      type: "mousePressed",
      ...coordinates,
      button: "right",
      clickCount: 1,
    }
  );

  await chrome.debugger.sendCommand(
    target,
    "Input.dispatchMouseEvent",
    {
      type: "mouseReleased",
      ...coordinates,
      button: "right",
      clickCount: 1,
    }
  );
}
