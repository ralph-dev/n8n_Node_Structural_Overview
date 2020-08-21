import {errorHandler} from "./errorHandler";

/* Spotify API */
const spotifyErrorObj = {
  "error": {
    "status": 400,
    "message": "Only valid bearer authentication supported"
  }
}

const spotifyToN8nPathTransfomer = {
  code: ["error", "status"],
  message: ["error", "message"],
}

const spotifyExpectedResult = {
  code: "400",
  message: "Only valid bearer authentication supported",
  code_heuristics: "Bad Request",
  additional_messaging: "",
}

test('Should return correct error object format', () => {
  expect(errorHandler(spotifyErrorObj, spotifyToN8nPathTransfomer)).toStrictEqual(spotifyExpectedResult);
});

/* Google Calendar API */
// if (error.response && error.response.body && error.response.body.error) {
//
//   let errors = error.response.body.error.errors;
//
//   errors = errors.map((e: IDataObject) => e.message);
//   // Try to return the error prettier
//   throw new Error(
//       `Google Calendar error response [${error.statusCode}]: ${errors.join('|')}`
//   );
// }
// throw error;

const googleCalendarErrorObj = {
  "error": {
    "errors": [
      {
        "domain": "calendar",
        "reason": "timeRangeEmpty",
        "message": "The specified time range is empty.",
        "locationType": "parameter",
        "location": "timeMax",
      }
    ],
    "code": 400,
    "message": "The specified time range is empty."
  }
}

const googleCalendarToN8nPathTransfomer = {
  code: ["error", "code"],
  message: ["error", "message"],
}

const googleCalendarExpectedResult = {
  code: "400",
  message: "The specified time range is empty.",
  code_heuristics: "Bad Request",
  additional_messaging: "",
}

test('Should return correct error object format for Google', () => {
  expect(errorHandler(googleCalendarErrorObj, googleCalendarToN8nPathTransfomer)).toStrictEqual(googleCalendarExpectedResult);
});

/* FRESHDESK API */
// if (error.response) {
//   let errorMessage = error.response.body.message || error.response.body.description || error.message;
//   if (error.response.body && error.response.body.errors) {
//     errorMessage = error.response.body.errors.map((err: IDataObject) => `"${err.field}" => ${err.message}`).join(', ');
//   }
//   throw new Error(`Freshdesk error response [${error.statusCode}]: ${errorMessage}`);
// }
//
// throw error;

const freshDeskErrorObj = {
  "description":"Validation failed",
  "errors":[
    {
      "field":"name",
      "message":"Mandatory attribute missing",
      "code":"missing_field"
    }
  ]
}

const freshDeskToN8nPathTransfomer = {
  code: ["errors", "0", "code"],
  message: ["errors", "0", "message"],
}

const freshDeskExpectedResult = {
  code: "missing_field",
  message: "Mandatory attribute missing",
  code_heuristics: undefined,
  additional_messaging: "\"name\" => Mandatory attribute missing",
}

test('Should return correct error object format for Fresh Desk', () => {
  expect(errorHandler(freshDeskErrorObj, freshDeskToN8nPathTransfomer, freshDeskErrorObj.errors.map((err) => `"${err.field}" => ${err.message}`).join(', '))).toStrictEqual(freshDeskExpectedResult);
});


const freshDesk2ErrorObj = {
  "status": 401,
  "headers": {
    "Content-Type": "text/plain"
  },
  "response": "Session expired or invalid",
  "errorSource": "APP/PLATFORM"
}

const freshDesk2ToN8nPathTransfomer = {
  code: ["status"],
  message: ["response"],
}

const freshDesk2ExpectedResult = {
  code: "401",
  message: "Session expired or invalid",
  code_heuristics: "Unauthorized",
  additional_messaging: "",
}

test('Should return correct error object format for FreshDesk 2', () => {
  expect(errorHandler(freshDesk2ErrorObj, freshDesk2ToN8nPathTransfomer)).toStrictEqual(freshDesk2ExpectedResult);
});


/* XERO API */
// let errorMessage;
//
// if (error.response && error.response.body && error.response.body.Message) {
//
//   errorMessage = error.response.body.Message;
//
//   if (error.response.body.Elements) {
//     const elementErrors = [];
//     for (const element of error.response.body.Elements) {
//       elementErrors.push(element.ValidationErrors.map((error: IDataObject) =>  error.Message).join('|'));
//     }
//     errorMessage = elementErrors.join('-');
//   }
//   // Try to return the error prettier
//   throw new Error(`Xero error response [${error.statusCode}]: ${errorMessage}`);
// }
// throw error;

const xeroErrorObj = {
  "statusCode": 400,
  "response": {
    "body": {
      "ErrorNumber": 10,
      "Type": "ValidationException",
      "Message": "A validation exception occurred",
      "Elements": [{
        "ValidationErrors": [{
          "Message": "Email address must be valid"
        }]
      }]
    },
  }
}

const xeroToN8nPathTransfomer = {
  code: ["statusCode"],
  message: ["response", "body", "Message"],
}

const xeroExpectedResult = {
  code: "400",
  message: "A validation exception occurred",
  code_heuristics: "Bad Request",
  additional_messaging: "",
}

test('Should return correct error object format for Xero', () => {
  expect(errorHandler(xeroErrorObj, xeroToN8nPathTransfomer)).toStrictEqual(xeroExpectedResult);
});

/* HubSpot API */
// let errorMessages;
//
// if (error.response && error.response.body) {
//
//   if (error.response.body.message) {
//
//     errorMessages = [error.response.body.message];
//
//   } else if (error.response.body.errors) {
//     // Try to return the error prettier
//     errorMessages = error.response.body.errors;
//
//     if (errorMessages[0].message) {
//       // @ts-ignore
//       errorMessages = errorMessages.map(errorItem => errorItem.message);
//     }
//   }
//   throw new Error(`Hubspot error response [${error.statusCode}]: ${errorMessages.join('|')}`);
// }
//
// throw error;

const hubSpotErrorObj = {
  "statusCode": 400,
  "status": "error",
  "message": "This will be a human readable message with details about the error.",
  "errors": [
    {
      "message": "This will be a message with additional details about the error",
      "in": "name"
    }
  ],
  "category": "VALIDATION_ERROR",
  "correlationId": "a43683b0-5717-4ceb-80b4-104d02915d8c"
}

const hubSpotToN8nPathTransfomer = {
  code: ["statusCode"],
  message: ["message"],
}

const hubSpotExpectedResult = {
  code: "400",
  message: "This will be a human readable message with details about the error.",
  code_heuristics: "Bad Request",
  additional_messaging: "",
}

test('Should return correct error object format for Hubspot', () => {
  expect(errorHandler(hubSpotErrorObj, hubSpotToN8nPathTransfomer)).toStrictEqual(hubSpotExpectedResult);
});