interface N8nErrorAPI {
    code: string[];
    message: string[];
}

interface N8nErrorAPIResponse {
  code: string;
  message: string;
}

const recursivelyFindAction = (accumulator, currentValue) => accumulator[currentValue];

/**
* Takes in any API's error response object and uses the provided API to n8n Error Transformer to generate an n8n standard formatted error object.
* @param errorObj {any} - The API's Error Response Object
* @param pathTransformer {N8nErrorAPI} - The paths to parse in the errorObj to fetch the correct values.
* @return {N8nErrorAPIResponse} - The n8n standard API error object
*/
export const errorHandler = (errorObj: object, pathTransformer: N8nErrorAPI): N8nErrorAPIResponse => {
  const apiStandard: N8nErrorAPIResponse = {code: '', message: ''};

  for (const [key, value] of Object.entries(pathTransformer)) {
    apiStandard[key] = value.reduce(recursivelyFindAction, errorObj).toString();
  }

  return apiStandard;
};

const userDisplayNodeError = (nodeName: string, statusCode: string, errorMessage: string): string => {
	throw new Error(`${nodeName} error response [${statusCode}]: ${errorMessage}`);
};