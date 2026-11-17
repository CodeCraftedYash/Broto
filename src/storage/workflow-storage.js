export async function saveWorkflow(workflow){
    const { workflows = [] } = await chrome.storage.local.get("workflows");

    const updatedWorkflows = [
        ...workflows.filter((item) => item.id !== workflow.id),
        workflow
    ];

    await chrome.storage.local.set({
        workflows: updatedWorkflows
    });
}

export async function getWorkflows(){
    const { workflows = [] } = await chrome.storage.local.get("workflows");
    return workflows;
}