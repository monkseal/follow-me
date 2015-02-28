"use strict"
import FollowService from './lib/follow-service';

// Very thin wrapper around js-yaml for directly reading in YAML files.
// www.npmjs.com/package/read-yaml
var ReadYaml = require('read-yaml');

// Twitter API client for node (REST & Streaming)
// www.npmjs.com/package/twitter
var Twit = require('twit');
var config = ReadYaml.sync('twitter.yml');
var client = new Twit(config);

var userId =  3035238012;
var followService = new FollowService(client, userId)
// followService.follow({screen_name: 'corpseheads'})

followService.onNotFollowing({screen_name: 'TrashbagGhost'}, (options) => { followService.follow(options) });
