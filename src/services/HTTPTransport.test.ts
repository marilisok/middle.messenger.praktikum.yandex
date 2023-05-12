import {expect} from 'chai';
import sinon, {SinonFakeXMLHttpRequest} from 'sinon';
import {HTTPTransport, METHODS} from './HTTPTransport';

describe('HTTPTransport class', () => {
  let requests: SinonFakeXMLHttpRequest[] = [];
  let transport: HTTPTransport;
  beforeEach(() => {
    const XHR = sinon.useFakeXMLHttpRequest();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    global.XMLHttpRequest = XHR;
    XHR.onCreate = ((request: SinonFakeXMLHttpRequest) => {
      requests.push(request);
    });
    transport = new HTTPTransport('/test');
  });

  afterEach(() => {
    requests = [];
  });

  it('should make get request', () => {
    transport.get('/test');

    const request = requests[0];
    expect(request.method).to.be.equal(METHODS.GET);
  });
  it('should make get request with query paparameters', () => {
    const params = {id: 1};
    transport.get('/test', {data: params});

    const request = requests[0];
    expect(request.url).to.be.equal(`/test/test?id=1`);
  });
  it('should make put request', () => {
    transport.put('/test');

    const request = requests[0];
    expect(request.method).to.be.equal(METHODS.PUT);
  });
  it('should make put request with parameters', () => {
    const params = {id: 1, user: {name: 'test'}};
    transport.put('/test', {data: params});

    const request = requests[0];
    expect(request.requestBody).to.be.equal(JSON.stringify(params));
  });
  it('should make delete request', () => {
    transport.delete('/test');

    const request = requests[0];
    expect(request.method).to.be.equal(METHODS.DELETE);
  });
  it('should make delete request with parameters', () => {
    const params = {id: 1};
    transport.delete('/test', {data: params});

    const request = requests[0];
    expect(request.requestBody).to.be.equal(JSON.stringify(params));
  });
  it('should make post request', () => {
    transport.post('/test');

    const request = requests[0];
    expect(request.method).to.be.equal(METHODS.POST);
  });
  it('should make post request with parameters', () => {
    const params = {title: 'test'};
    transport.post('/test', {data: params});

    const request = requests[0];
    expect(request.requestBody).to.be.equal(JSON.stringify(params));
  });
});
