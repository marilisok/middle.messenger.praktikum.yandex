import {HTTPTransport} from '../services/HTTPTransport';

export class BaseAPI {
  static BASE_URL = 'https://ya-praktikum.tech/api/v2';
  protected http: HTTPTransport;

  constructor(endpoint: string) {
    this.http = new HTTPTransport(`${BaseAPI.BASE_URL}${endpoint}`);
  }
}
