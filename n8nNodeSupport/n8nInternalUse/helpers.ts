interface IOperations {
    [key: string]: {
        overideRequestMethod: string,
    },
}

interface IResources {
    [key: string]: {
        defaultRequestMethod: string
        operations: IOperations[]
    }
}

interface IAPI_ACTIONS { 
    resources: IResources[]
}

const getResourcesForAPI = (apiActions: IAPI_ACTIONS): string[] => {
    const resourceList = apiActions.resources.map(resource => Object.keys(resource));
    let flattenedResourceList: string[] = [];
    flattenedResourceList = flattenedResourceList.concat(...resourceList);
    return flattenedResourceList;
}


const getOperationsForAPI = (apiActions: IAPI_ACTIONS): string[] => {
    let operationList: any = [];
    const resourceKeys = getResourcesForAPI(apiActions);
    resourceKeys.map(resource => {
        const operationsList = apiActions.resources[0][resource].operations.map(operation => Object.keys(operation));
        let flattenedResourceList: string[] = [];
        flattenedResourceList = flattenedResourceList.concat(...operationsList);
        operationList = [...operationList, ...flattenedResourceList];
    });
    return operationList;
}
