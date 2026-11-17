import { actionRegistry } from "../actions/actions";

export async function executeWorkflow(workflow,tabId){
    for(const action of workflow.actions){
        const handler = actionRegistry[action.type];
        
    if(!handler){
        throw new Error(`Unkown Actions : ${action.type}`)
    }
    
    await handler({
        ...action,
        tabId
    })
    }
}