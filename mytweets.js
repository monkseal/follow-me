"use strict"
import TwitterStatus from './lib/twitter-status';


//www.npmjs.com/package/read-yaml
// // Very thin wrapper around js-yaml for directly reading in YAML files.
var ReadYaml = require('read-yaml');
// // https://www.npmjs.com/package/twitter
var Twit = require('twit');

console.log(TwitterStatus)

var config = ReadYaml.sync('twitter.yml');
var client = new Twit(config);
var twitterStatus = new TwitterStatus(client);
twitterStatus.showStatusFor('videodrome_pod')
