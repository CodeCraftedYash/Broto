
import { executeWorkflow } from "../engine/executer.js";
import { getWorkflows } from "../storage/workflow-storage.js";

chrome.sidePanel.setPanelBehavior({
  openPanelOnActionClick: true,
}).catch((error) => {
  console.error("Failed to configure side panel behavior:", error);
});

async function startWorkflow(workflowId) {
    // 1. Retrieve the saved workflow
  const workflows = await getWorkflows();

  const workflow = workflows.find(
    (item) => item.id === workflowId
  );

  if (!workflow) {
    throw new Error("Workflow not found");
  }

  // 2. Find the currently active tab
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });

  if (!tab?.id) {
    throw new Error("No active tab found");
  }

if (
  !tab.url ||
  !["http:", "https:"].some((protocol) =>
    tab.url.startsWith(protocol)
  )
) {
  throw new Error("Open a normal website before starting the workflow.");
}

  const target = { tabId: tab.id };
  let attached = false;

  try {
    // 3. Attach Chrome Debugger
    await chrome.debugger.attach(target, "1.3");
    attached = true;

    // 4. Execute workflow actions sequentially
    await executeWorkflow(workflow, tab.id);

    return {
      success: true,
      message: "Workflow completed successfully",
    };
  } finally {
    // 5. Always attempt to detach
    if (attached) {
      await chrome.debugger.detach(target).catch((error) => {
        console.error("Debugger detach failed:", error);
      });
    }
  }
}

// Listen for messages from the side panel
chrome.runtime.onMessage.addListener(
  (message, sender, sendResponse) => {
    if (message.type !== "START_WORKFLOW") {
      return;
    }

    startWorkflow(message.workflowId)
      .then((result) => {
        sendResponse(result);
      })
      .catch((error) => {
        console.error("Workflow execution failed:", error);

        sendResponse({
          success: false,
          error: error.message,
        });
      });

    return true;
  }
);
