jest.dontMock('../lib/twitter-status');

import TwitterStatus from '../lib/twitter-status';
var Twit = require('twit');
var client = new Twit({});

describe('TwitterStatus', function() {

  describe('#showStatusFor', function() {
    it('calls with correct params', function() {
      var twitterStatus = new TwitterStatus(client);
      twitterStatus.showStatusFor('videodrome_pod' );
      expect(client.get.mock.calls.length).toEqual(1);
      expect(client.get.mock.calls[0][0]).toEqual('statuses/user_timeline');
      expect(client.get.mock.calls[0][1]).toEqual({screen_name: 'videodrome_pod'});
    });
  });

  describe('#displayFollowers', function() {
    it('returns this', function() {
      var tweet = { text: 'Hello Twitter' } ;
      var tweets = [tweet];
      var twitterStatus = new TwitterStatus(client);
      expect(twitterStatus.displayTweets(tweets)).toEqual(twitterStatus);
    });
  });

});
