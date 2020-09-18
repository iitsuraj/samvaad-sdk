import HelloWorld from './index';

test('should return hello', () => {
  expect(HelloWorld.get()).toBe('Hello World');
});
