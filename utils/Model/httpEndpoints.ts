export enum HttpEndpointType {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  TRACE = 'TRACE',
  DELETE = 'DELETE',
  OPTIONS = 'OPTIONS',
  WebSocket = 'WebSocket',
}

interface HttpEndpoint {
  endpointType: HttpEndpointType;
  namespace: string;
  path: string;
  isUploadRequest: boolean;
  unixSocket: string;
}

export default HttpEndpoint;
