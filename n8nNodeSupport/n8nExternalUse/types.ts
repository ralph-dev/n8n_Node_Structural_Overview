/**
 * HTTP request methods.
 *
 * HTTP defines a set of request methods to indicate the desired action to be
 * performed for a given resource. Although they can also be nouns, these
 * request methods are sometimes referred as HTTP verbs. Each of them implements
 * a different semantic, but some common features are shared by a group of them:
 * e.g. a request method can be safe, idempotent, or cacheable.
 *
 * @public
 */
export enum HTTPMethod {
  /**
   * The `CONNECT` method establishes a tunnel to the server identified by the
   * target resource.
   */
  CONNECT = 'CONNECT',

  /**
   * The `DELETE` method deletes the specified resource.
   */
  DELETE = 'DELETE',

  /**
   * The `GET` method requests a representation of the specified resource.
   * Requests using GET should only retrieve data.
   */
  GET = 'GET',

  /**
   * The `HEAD` method asks for a response identical to that of a GET request,
   * but without the response body.
   */
  HEAD = 'HEAD',

  /**
   * The `OPTIONS` method is used to describe the communication options for the
   * target resource.
   */
  OPTIONS = 'OPTIONS',

  /**
   * The PATCH method is used to apply partial modifications to a resource.
   */
  PATCH = 'PATCH',

  /**
   * The `POST` method is used to submit an entity to the specified resource,
   * often causing a change in state or side effects on the server.
   */
  POST = 'POST',

  /**
   * The `PUT` method replaces all current representations of the target
   * resource with the request payload.
   */
  PUT = 'PUT',

  /**
   * The `TRACE` method performs a message loop-back test along the path to the
   * target resource.
   */
  TRACE = 'TRACE'
}


export const statusCodes = {};

statusCodes[exports.ACCEPTED = 202] = "Accepted";
statusCodes[exports.BAD_GATEWAY = 502] = "Bad Gateway";
statusCodes[exports.BAD_REQUEST = 400] = "Bad Request";
statusCodes[exports.CONFLICT = 409] = "Conflict";
statusCodes[exports.CONTINUE = 100] = "Continue";
statusCodes[exports.CREATED = 201] = "Created";
statusCodes[exports.EXPECTATION_FAILED = 417] = "Expectation Failed";
statusCodes[exports.FAILED_DEPENDENCY  = 424] = "Failed Dependency";
statusCodes[exports.FORBIDDEN = 403] = "Forbidden";
statusCodes[exports.GATEWAY_TIMEOUT = 504] = "Gateway Timeout";
statusCodes[exports.GONE = 410] = "Gone";
statusCodes[exports.HTTP_VERSION_NOT_SUPPORTED = 505] = "HTTP Version Not Supported";
statusCodes[exports.IM_A_TEAPOT = 418] = "I'm a teapot";
statusCodes[exports.INSUFFICIENT_SPACE_ON_RESOURCE = 419] = "Insufficient Space on Resource";
statusCodes[exports.INSUFFICIENT_STORAGE = 507] = "Insufficient Storage";
statusCodes[exports.INTERNAL_SERVER_ERROR = 500] = "Server Error";
statusCodes[exports.LENGTH_REQUIRED = 411] = "Length Required";
statusCodes[exports.LOCKED = 423] = "Locked";
statusCodes[exports.METHOD_FAILURE = 420] = "Method Failure";
statusCodes[exports.METHOD_NOT_ALLOWED = 405] = "Method Not Allowed";
statusCodes[exports.MOVED_PERMANENTLY = 301] = "Moved Permanently";
statusCodes[exports.MOVED_TEMPORARILY = 302] = "Moved Temporarily";
statusCodes[exports.MULTI_STATUS = 207] = "Multi-Status";
statusCodes[exports.MULTIPLE_CHOICES = 300] = "Multiple Choices";
statusCodes[exports.NETWORK_AUTHENTICATION_REQUIRED = 511] = "Network Authentication Required";
statusCodes[exports.NO_CONTENT = 204] = "No Content";
statusCodes[exports.NON_AUTHORITATIVE_INFORMATION = 203] = "Non Authoritative Information";
statusCodes[exports.NOT_ACCEPTABLE = 406] = "Not Acceptable";
statusCodes[exports.NOT_FOUND = 404] = "Not Found";
statusCodes[exports.NOT_IMPLEMENTED = 501] = "Not Implemented";
statusCodes[exports.NOT_MODIFIED = 304] = "Not Modified";
statusCodes[exports.OK = 200] = "OK";
statusCodes[exports.PARTIAL_CONTENT = 206] = "Partial Content";
statusCodes[exports.PAYMENT_REQUIRED = 402] = "Payment Required";
statusCodes[exports.PERMANENT_REDIRECT = 308] = "Permanent Redirect";
statusCodes[exports.PRECONDITION_FAILED = 412] = "Precondition Failed";
statusCodes[exports.PRECONDITION_REQUIRED = 428] = "Precondition Required";
statusCodes[exports.PROCESSING = 102] = "Processing";
statusCodes[exports.PROXY_AUTHENTICATION_REQUIRED = 407] = "Proxy Authentication Required";
statusCodes[exports.REQUEST_HEADER_FIELDS_TOO_LARGE = 431] = "Request Header Fields Too Large";
statusCodes[exports.REQUEST_TIMEOUT = 408] = "Request Timeout";
statusCodes[exports.REQUEST_TOO_LONG = 413] = "Request Entity Too Large";
statusCodes[exports.REQUEST_URI_TOO_LONG = 414] = "Request-URI Too Long";
statusCodes[exports.REQUESTED_RANGE_NOT_SATISFIABLE = 416] = "Requested Range Not Satisfiable";
statusCodes[exports.RESET_CONTENT = 205] = "Reset Content";
statusCodes[exports.SEE_OTHER = 303] = "See Other";
statusCodes[exports.SERVICE_UNAVAILABLE = 503] = "Service Unavailable";
statusCodes[exports.SWITCHING_PROTOCOLS = 101] = "Switching Protocols";
statusCodes[exports.TEMPORARY_REDIRECT = 307] = "Temporary Redirect";
statusCodes[exports.TOO_MANY_REQUESTS = 429] = "Too Many Requests";
statusCodes[exports.UNAUTHORIZED = 401] = "Unauthorized";
statusCodes[exports.UNPROCESSABLE_ENTITY = 422] = "Unprocessable Entity";
statusCodes[exports.UNSUPPORTED_MEDIA_TYPE = 415] = "Unsupported Media Type";
statusCodes[exports.USE_PROXY = 305] = "Use Proxy";

exports.getStatusText = function(statusCode) {
  if (statusCodes.hasOwnProperty(statusCode)) {
    return statusCodes[statusCode];
  } else {
    throw new Error("Status code does not exist: " + statusCode);
  }
};

exports.getStatusCode = function(reasonPhrase) {
  for (let key in statusCodes) {
    if (statusCodes[key] === reasonPhrase) {
      return parseInt(key, 10);
    }
  }
  throw new Error("Reason phrase does not exist: " + reasonPhrase);
};