/* This file is maintained by n8n */

enum OperationKeys {
    overideRequestMethod= 'overideRequestMethod',
    executeRequest = 'executeRequest',
}

/* Owned by n8n */
export interface IOperations {
    [key: string]: {
        [OperationKeys.overideRequestMethod]: string,
        [OperationKeys.executeRequest]: Function
    },
}

/* Owned by n8n */
interface IResources {
    [key: string]: {
        defaultRequestMethod: string
        operations: IOperations
    }
}

/* Owned by n8n */
export interface IAPI_ACTIONS {
    resources: IResources
}

/* Owned by n8n */
const getResourcesForAPI = (apiActions: IAPI_ACTIONS): string[] => {
    const resourceList = Object.keys(apiActions.resources)
    return resourceList;
}


/* Owned by n8n */
const getOperationsForAPI = (apiActions: IAPI_ACTIONS): string[] => {
    let operationList: any = [];
    const resourceKeys = getResourcesForAPI(apiActions);
    resourceKeys.map(resource => {
        operationList.push(...Object.keys(apiActions.resources[resource].operations));
    });
    return operationList;
}

// Executing API Actions are now handled by n8n

const recursivelyFindAction = (accumulator, currentValue) => accumulator[currentValue];

/**
 * Will return the function reference for a specific API's executeRequest
 * @param apiActions
 * @param selectedAction
 */
const getAPIAction = (apiActions: IAPI_ACTIONS, selectedAction: string[] = []): Function => {
    return [...selectedAction, OperationKeys.executeRequest].reduce(recursivelyFindAction, apiActions);
}

/**
 * Will execute the function for a specific API's executeRequest
 * @param apiActions
 * @param selectedAction - Ex: ["ResourceName", "OperationName", "executeRequetst"]
 */
const executeAPIAction = (apiActions: IAPI_ACTIONS, selectedAction: string[] = []): void => {
    return [...selectedAction, OperationKeys.executeRequest].reduce(recursivelyFindAction, apiActions)();
}