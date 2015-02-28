"use strict"
import TwitterStatus from './lib/twitter-status';

// Very thin wrapper around js-yaml for directly reading in YAML files.
// www.npmjs.com/package/read-yaml
var ReadYaml = require('read-yaml');

// Twitter API client for node (REST & Streaming)
// www.npmjs.com/package/twitter
var Twit = require('twit');
var config = ReadYaml.sync('twitter.yml');
var client = new Twit(config);

var twitterStatus = new TwitterStatus(client);
twitterStatus.showStatusFor('videodrome_pod');
