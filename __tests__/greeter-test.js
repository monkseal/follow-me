jest.dontMock('../lib/greeter');

import Greeter from '../lib/greeter';

// __tests__/sum-test.js

describe('text', function() {
  describe('when no arg', function () {
    it('returns hello string with world', function() {
      var greeter = new Greeter();
      expect(greeter.text()).toBe('Hello World!');
    });
  });

  describe('when arg', function () {
    it('returns hello string with name provide', function() {
      var greeter = new Greeter();
      expect(greeter.text('Leonard')).toBe('Hello Leonard!');
    });
  });
});
