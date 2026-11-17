export function createWorkflow( name = "untitiled workflow"){
    return{
        id: crypto.randomUUID(),
        name,
        actions: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
}