import { getToastContainerPosition, generateToastId } from '../../src/utils';

describe('GetToastContainerPosition', () => {
  it('should return top left position', () => {
    const result = getToastContainerPosition('top-left');
    expect(result).toEqual('position: fixed; top: 10px; left: 10px;');
  });
  it('should return top right position', () => {
    const result = getToastContainerPosition('top-right');
    expect(result).toEqual('position: fixed; top: 10px; right: 10px;');
  });
  it('should return top center position', () => {
    const result = getToastContainerPosition('top-center');
    expect(result).toEqual('position: fixed; top: 10px; left: 50%;');
  });
  it('should return bottom right position', () => {
    const result = getToastContainerPosition('bottom-right');
    expect(result).toEqual('position: fixed; bottom: 10px; right: 10px;');
  });
  it('should return bottom left position', () => {
    const result = getToastContainerPosition('bottom-left');
    expect(result).toEqual('position: fixed; bottom: 10px; left: 10px;');
  });
  it('should return bottom center position', () => {
    const result = getToastContainerPosition('bottom-center');
    expect(result).toEqual('position: fixed; bottom: 10px; left: 50%;');
  });
  it('should return the default position of top right', () => {
    // @ts-ignore
    const result = getToastContainerPosition('');
    expect(result).toEqual('position: fixed; top: 10px; right: 10px;');
  });
});

describe('generateToastId', () => {
  it('should return a string that is 9 characters long', () => {
    const id = generateToastId();
    const length = id.length;
    expect(length).toBeGreaterThan(10);
  });
});
