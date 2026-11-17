import { useState } from "react";
import ToolsLayout from "./ui/layout/ToolsLayout";
import WorkFlowLayout from "./ui/layout/WorkFlowLayout";
import { createWorkflow } from "./workflows/create-workflow";
import { saveWorkflow } from "./storage/workflow-storage";

function App() {
  const [workflow, setWorkflow] = useState(null);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("It follows a queue of actions to be executed in the browser. You can create a workflow, add actions, and save it. Once saved, you can start the workflow to execute the actions in sequence.");

function handleCreate(){
  setWorkflow(createWorkflow());
  setMessage("New workflow created. You can now add actions and save it.");
}

 async function handleSave() {
    await saveWorkflow(workflow);
    setStatus("saved");
    setMessage("Workflow saved successfully.");
  }

 function addTestAction() {
   if (!workflow) {
    setMessage("Create a workflow first.");
    return;
  }
    setWorkflow((previous) => ({
      ...previous,
      actions: [
        ...previous.actions,
        {
          id: crypto.randomUUID(),
          type: "lClick",
          x: 300,
          y: 330,
        },
      ],
      updatedAt: new Date().toISOString(),
    }));
    setMessage("Test click action added to the workflow. You can now save the workflow.");
  }

     async function handleStart() {
    setStatus("running");

    try {
      const response = await chrome.runtime.sendMessage({
        type: "START_WORKFLOW",
        workflowId: workflow.id,
      });

      if (!response?.success) {
        setMessage(response?.error || "Execution failed");
        throw new Error(response?.error || "Execution failed");
      }

      setStatus("completed");
      setMessage("Workflow executed successfully.");
    } catch (error) {
      console.error(error);
      setStatus("failed");
      setMessage("Failed to execute workflow.");
    }
  }

  return (
    <main className="popup">
      <h1 className="title">Broto</h1>
      <p className="subtitle">Automate anything!</p>
      <div className="topSection">
        <button className="btn btn-primary" onClick={handleCreate}>Create</button>
        <button className="btn btn-primary" onClick={()=>alert("working on this feature")}>Select</button>
        <button className="btn btn-primary" onClick={addTestAction}>Add test click</button>
        <button className="btn btn-primary" onClick={handleSave}>Save</button>
        <button className="btn btn-primary" onClick={handleStart}>Start</button>
        <button className="btn btn-primary" onClick={()=>alert("implementing")}>Pause</button>
        <button className="btn btn-primary" onClick={()=>alert("implementing")}>Resume</button>
        <button className="btn btn-primary" onClick={()=>alert("implementing")}>loop</button>
      </div>
      <section className="content">
        <ToolsLayout />
        <WorkFlowLayout />
      </section>

      <section className="msg">
        <p>{message}</p>
      </section>

      <div className="status">Status: {status}</div>
    </main>
  );
}

export default App;