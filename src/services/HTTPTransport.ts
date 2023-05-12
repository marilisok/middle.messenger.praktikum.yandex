export enum METHODS{
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
  }

type HTTPMethod = (
    url: string,
    options?:{
        data?: any,
        headers?: Record<string, string>,
        timeout?: number
    }
 ) => Promise<any>;

 type RequestMethod = (
    url: string,
    options:{
        data?: any,
        headers?: Record<string, string>,
        method?: METHODS
    },
    timeout?: number
 ) => Promise<unknown>;

function queryStringify<T>(data: Record<string, T>): string {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
  }, '?');
}
export class HTTPTransport {
  protected endpoint: string;

  constructor( endpoint: string ) {
    this.endpoint = endpoint;
  }

  get: HTTPMethod = (url, options = {}) => {
    return this.request(this.endpoint+url, {...options, method: METHODS.GET}, options.timeout);
  };

  post: HTTPMethod = (url, options = {}) => {
    return this.request(this.endpoint+url, {...options, method: METHODS.POST}, options.timeout);
  };

  put: HTTPMethod = (url, options = {}) => {
    return this.request(this.endpoint+url, {...options, method: METHODS.PUT}, options.timeout);
  };

  delete: HTTPMethod = (url, options = {}) => {
    return this.request(this.endpoint+url, {...options, method: METHODS.DELETE}, options.timeout);
  };

  request: RequestMethod = (url, options = {}, timeout = 5000) => {
    const {headers = {'Content-Type': 'application/json'}, method, data} = options;

    return new Promise(function(resolve, reject) {
      if (!method) {
        reject(new Error('No method'));
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(method, isGet && !!data ? `${url}${queryStringify(data)}` : url);

      if (!(data instanceof FormData)) {
        Object.keys(headers).forEach((key) => {
          xhr.setRequestHeader(key, headers[key]);
        });
      }

      xhr.withCredentials = true;
      xhr.responseType = 'json';

      xhr.onload = function() {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(data instanceof FormData ? data : JSON.stringify(data));
      }
    });
  };
}
