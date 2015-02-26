// https://www.npmjs.com/package/read-yaml
// Very thin wrapper around js-yaml for directly reading in YAML files.
var ReadYaml = require('read-yaml');
// https://www.npmjs.com/package/twitter
var Twitter = require('twitter');

var config = ReadYaml.sync('twitter.yml');
var client = new Twitter(config);

var params = {screen_name: 'videodrome_pod'};
client.get('statuses/user_timeline', params, function(error, tweets, response){
  if (!error) {
    tweets.forEach(function(tweet, _i) {
      console.log("TWEET " + _i);
      console.log(tweet.text);
    });
  }
});
