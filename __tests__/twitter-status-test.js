jest.dontMock('../lib/twitter-status');

import TwitterStatus from '../lib/twitter-status';
jest.mock('Twit');

var ReadYaml = require('read-yaml');
var Twit = require('twit');
var config = ReadYaml.sync('twitter.yml');
var client = new Twit({});

describe('TwitterStatus', function() {

  describe('#showStatusFor', function() {
    it('calls with correct params', function() {
      var twitterStatus = new TwitterStatus(client);
      twitterStatus.showStatusFor('videodrom_pod' );
      expect(client.get.mock.calls.length).toEqual(1);
      expect(client.get.mock.calls[0][0]).toEqual('statuses/user_timeline')
      expect(client.get.mock.calls[0][1]).toEqual({screen_name: 'videodrom_pod'})
    });
  });

  describe('#displayTweets', function() {
    it('calls with correct params', function() {
      var tweet = { text: 'Hello Twitter' } ;
      var tweets = [tweet];
      var twitterStatus = new TwitterStatus(client);
      expect(twitterStatus.displayTweets(tweets)).toEqual(twitterStatus);
    });
  });


});
