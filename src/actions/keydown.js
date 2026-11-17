export async function keydown({ tabId, key}) {
  const target = { tabId };

  await chrome.debugger.sendCommand(target, "Input.dispatchKeyEvent", {
    type: "keyDown",
    key,

  });

  await chrome.debugger.sendCommand(target, "Input.dispatchKeyEvent", {
    type: "keyUp",
    key,
  
  });
}
