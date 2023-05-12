import {expect} from 'chai';
import sinon from 'sinon';
import Block from './Block';
import {router} from './Router';

describe('Router class', () => {
  const originalForward = window.history.forward;
  const originalBack = window.history.back;
  const getContentFake = sinon.fake.returns(document.createElement('div'));

  const BlockMock = class {
    static getContent = getContentFake;
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    static dispatchComponentDidMount = () => {};
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    static dispatchComponentDidUnmount = () => {};
  } as unknown as Block<any>;

  beforeEach(() => {
    window.history.forward = sinon.fake();
    window.history.back = sinon.fake();
  });

  after(() => {
    window.history.forward = originalForward;
    window.history.back = originalBack;
  });

  it('use', () => {
    const result = router.use('/', BlockMock);

    expect(result).to.eq(router);
  });

  it('start', () => {
    router.use('/', BlockMock).start();

    expect(getContentFake.callCount).to.eq(1);
  });


  it('go', () => {
    router.use('/test', BlockMock).go('/test');

    expect(window.history.length).to.eq(2);
  });

  it('forward', () => {
    router.forward();

    expect((window.history.forward as any).callCount).to.eq(1);
  });

  it('back', () => {
    router.back();

    expect((window.history.back as any).callCount).to.eq(1);
  });
});
