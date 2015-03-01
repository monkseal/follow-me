jest.dontMock('../lib/follow-service');
jest.dontMock('lodash');

import FollowService from '../lib/follow-service';
jest.mock('Twit');
var Twit = require('twit');

describe('FollowService', function() {

  var userId =  3035238012;
  var client ;

  describe('#showFollowersOf', function() {
    beforeEach(function() {
      client = new Twit({});
    });

    it('calls with correct params', function() {
      var followService = new FollowService(client, userId);
      followService.showFollowers();
      expect(client.get.mock.calls.length).toEqual(1);
      expect(client.get.mock.calls[0][0]).toEqual('followers/ids')
      expect(client.get.mock.calls[0][1]).toEqual({user_id: userId, count: 10})
    });
  });

  describe('#onNotFollowing', function() {
    var client, spy;
    var toFollowId = 9999;

    beforeEach(function() {
      client = new Twit({});
      spy = jasmine.createSpy('callback');

    });

    describe('when valid args', function(){

      it('with user_id returns this and calls twitter', function() {
        var followService = new FollowService(client, userId);
        expect(followService.onNotFollowing({user_id: toFollowId})).toEqual(followService);

        expect(client.get.mock.calls.length).toEqual(1);
        expect(client.get.mock.calls[0][0]).toEqual('friendships/show');
        expect(client.get.mock.calls[0][1]).toEqual( { source_id: userId, target_id: toFollowId });

      });

      it('with screen_name, returns this and calls twitter', function() {
        var followService = new FollowService(client, userId);
        expect(followService.onNotFollowing({screen_name: 'justinbieber'})).toEqual(followService);

        expect(client.get.mock.calls.length).toEqual(1);
        expect(client.get.mock.calls[0][0]).toEqual('friendships/show');
        expect(client.get.mock.calls[0][1]).toEqual( { source_id: userId, target_screen_name:  'justinbieber' });

      });

    });

    describe('when invalid args', function(){

      it('raises expeciton and does not calls twitter', function() {
        var followService = new FollowService(client, userId);
        expect(function() { followService.onNotFollowing() }).toThrow();
        expect(client.get.mock.calls.length).toEqual(0);
      });

    });

    describe('invocation of callback', function(){
      var data;
      var spy;

      describe('when not following', function() {
        beforeEach(function() {
          spy = jasmine.createSpy();
          data = {
            relationship: {
              "target": {
                "id_str": "12148",
                "id": 12148,
                "screen_name": "ernie",
                "following": false,
                "followed_by": false
              }
            }
          };
        });

        it('invokes callback', function() {
          var followService = new FollowService(client, userId);
          var options = { user_id: toFollowId };
          expect(followService.onNotFollowing(options, spy)).toEqual(followService);

          expect(client.get.mock.calls.length).toEqual(1);
          expect(client.get.mock.calls[0][0]).toEqual('friendships/show');
          expect(client.get.mock.calls[0][1]).toEqual( { source_id: userId, target_id: toFollowId });
          client.get.mock.calls[0][2].call(followService, null, data, {header:{}})
          expect(spy).toHaveBeenCalledWith(options)

        });

      });

      describe('when following', function() {
        beforeEach(function() {
          spy = jasmine.createSpy();
          data = {
            relationship: {
              "target": {
                "id_str": "12148",
                "id": 12148,
                "screen_name": "ernie",
                "following": false,
                "followed_by": true
              }
            }
          };
        });

        it('does not invokes callback', function() {
          var followService = new FollowService(client, userId);
          var options = { user_id: toFollowId };
          expect(followService.onNotFollowing(options, spy)).toEqual(followService);

          expect(client.get.mock.calls.length).toEqual(1);
          expect(client.get.mock.calls[0][0]).toEqual('friendships/show');
          expect(client.get.mock.calls[0][1]).toEqual( { source_id: userId, target_id: toFollowId });
          client.get.mock.calls[0][2].call(followService, null, data, {header:{}})
          expect(spy).not.toHaveBeenCalledWith(options)

        });
      });

    });

  });

  describe('#follow', function() {
    var toFollowId = 9999;

    beforeEach(function() {
      client = new Twit({});
    });

    it('returns this and calls twitter when user_id', function() {
      var followService = new FollowService(client, userId);
      expect(followService.follow({user_id: toFollowId})).toEqual(followService);
      expect(client.post.mock.calls.length).toEqual(1);
      expect(client.post.mock.calls[0][0]).toEqual('friendships/create')
      expect(client.post.mock.calls[0][1]).toEqual( { user_id: toFollowId, follow: true })
    });

    describe('when invalid args', function() {
      it('throws error and  does not call twitter', function() {
        var followService = new FollowService(client, userId);
        expect(function(){  followService.follow() }).toThrow()
        expect(client.post.mock.calls.length).toEqual(0);
      });
    });

    describe('when called with screen_name', function() {
      it('returns this but does not call twitter', function() {
        var followService = new FollowService(client, userId);
        var options = {screen_name: 'justinbieber'};
        expect(followService.follow(options)).toEqual(followService);
        // does not modify args
        expect(options.follow).not.toBeDefined();
        // calls twitter
        expect(client.post.mock.calls.length).toEqual(1);
        expect(client.post.mock.calls[0][0]).toEqual('friendships/create')
        expect(client.post.mock.calls[0][1]).toEqual( { screen_name: 'justinbieber', follow: true })
      });
    });

  });



});
