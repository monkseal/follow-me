class TwitterStatus {

  constructor(client) {
    this.client = client;
  }

  showStatusFor(screen_name) {
    var params = {screen_name: screen_name };
    this.client.get('statuses/user_timeline', params, function(error, tweets, response){
      if (!error) {
        tweets.forEach(function(tweet, _i) {
          console.log(tweet.text);
          console.log(_i);
        });
      }
    });

  }

}

export default TwitterStatus
