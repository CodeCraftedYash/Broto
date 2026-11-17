export async function doubleClick({ tabId, x, y }) {
    const target = { tabId };

    await chrome.debugger.sendCommand(
        target,
        "Input.dispatchMouseEvent",
        {
            type:"mouseMoved",
            x,
            y,
        }
    )
    await chrome.debugger.sendCommand(
        target,
        "Input.dispatchMouseEvent",
        {
            type:"mousePressed",
            x,
            y,
            button:"left",
            clickCount:1,
        }
    )

     await chrome.debugger.sendCommand(
    target,
    "Input.dispatchMouseEvent",
    {
      type: "mouseReleased",
      x,
      y,
      button: "left",
      clickCount: 1,
    }
  );

  await chrome.debugger.sendCommand(
    target,
    "Input.dispatchMouseEvent",
    {
      type: "mousePressed",
      x,
      y,
      button: "left",
      clickCount: 2,
    }
  );

  await chrome.debugger.sendCommand(
    target,
    "Input.dispatchMouseEvent",
    {
      type: "mouseReleased",
      x,
      y,
      button: "left",
      clickCount: 2,
    }
  );
}