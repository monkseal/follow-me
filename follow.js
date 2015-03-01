"use strict"
import FollowService from './lib/follow-service';

var cliArgs = require("command-line-args");

/* define the command-line options */
var cli = cliArgs([
    { name: "verbose", type: Boolean, alias: "v", description: "Write plenty output" },
    { name: "help", type: Boolean, description: "Print usage instructions" },
    { name: "screen_names", type: Array, defaultOption: true, description: "Screen names to follow" }
]);

/* parse the supplied command-line values */
var options = cli.parse();

/* generate a usage guide */
var usage = cli.getUsage({
    header: "A synopsis application.",
    footer: "For more information, visit http://example.com"
});

if (options.help || !options.screen_names) {
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

var userId =  3035238012;
var followService = new FollowService(client, userId)
// followService.follow({screen_name: 'corpseheads'})
options.screen_names.forEach(function(screenName, _i) {
  followService.onNotFollowing({screen_name: screenName}, (options) => { followService.follow(options) });
});
