import {statusCodes} from "./types";

interface N8nErrorAPI {
    code: string[];
    message: string[];
    additional_messaging: string[];
}

interface N8nErrorAPIResponse {
  code: string;
  code_heuristics: string;
  message: string;
  additional_messaging: string;
}

const recursivelyFindAction = (accumulator, currentValue) => accumulator?.[currentValue];

/**
* Takes in any API's error response object and uses the provided API to n8n Error Transformer to generate an n8n standard formatted error object.
* @param errorObj {any} - The API's Error Response Object
* @param pathTransformer {N8nErrorAPI} - The paths to parse in the errorObj to fetch the correct values.
* @param additionalMessaging {string} - Custom Error Strings appended to the Error Object for Human Consumption
* @return {N8nErrorAPIResponse} - The n8n standard API error object
*/
export const errorHandler = (errorObj: object, pathTransformer: N8nErrorAPI, additionalMessaging: string): N8nErrorAPIResponse => {
  const apiStandard: N8nErrorAPIResponse = {code: '', message: '', code_heuristics: '', additional_messaging: ''};

  for (const [key, value] of Object.entries(pathTransformer)) {
    console.log(value)
    const result = value.reduce(recursivelyFindAction, errorObj)
    apiStandard[key] = result && result.toString();
  }

  apiStandard["code_heuristics"] = statusCodes[apiStandard["code"]];
  apiStandard["additional_messaging"] = additionalMessaging;
  return apiStandard;
};

const userDisplayNodeError = (nodeName: string, statusCode: string, errorMessage: string): string => {
	throw new Error(`${nodeName} error response [${statusCode}]: ${errorMessage}`);
};