import {errorHandler} from "./errorHandler";

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

const expectedResult = {
  code: "400",
  message: "Only valid bearer authentication supported"
}

test('Should return correct error object format', () => {
  expect(errorHandler(spotifyErrorObj, spotifyToN8nPathTransfomer)).toStrictEqual(expectedResult);
});