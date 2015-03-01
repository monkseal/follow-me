"use strict"
import FollowService from './lib/follow-service';

var cliArgs = require("command-line-args");

/* define the command-line options */
var cli = cliArgs([
    { name: "verbose", type: Boolean, alias: "v", description: "Write plenty output" },
    { name: "help", type: Boolean, description: "Print usage instructions" },
    { name: "userId", type: String, alias: "u",  description: "User id of your account." },
    { name: "screen_names", type: Array, defaultOption: true, description: "Screen names to follow" }
]);

/* parse the supplied command-line values */
var options = cli.parse();

/* generate a usage guide */
var usage = cli.getUsage({
    header: "Follow a list of users on twitter.\n\nExample:\n\n  follow.js -u 111111 justinbieber taylorswift13",
    footer: "For more information, visit https://github.com/monkseal/follow-me"
});

if (options.help || !options.userId || !options.screen_names || options.screen_names.length < 1 ) {
  console.log("Missing Argument");
  console.log(usage);
  return
}

// Very thin wrapper around js-yaml for directly reading in YAML files.
// www.npmjs.com/package/read-yaml
var ReadYaml = require('read-yaml');

// Twitter API client for node (REST & Streaming)
// www.npmjs.com/package/twitter
var Twit = require('twit');
var config = ReadYaml.sync('twitter.yml');
var client = new Twit(config);

var userId =  options.userId;
var followService = new FollowService(client, userId)

options.screen_names.forEach(function(screenName, _i) {
    followService.onNotFollowing(
      {screen_name: screenName},
      (options) => { followService.follow(options) }
    );
});
