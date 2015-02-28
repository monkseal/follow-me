class TwitterStatus {

  constructor(client) {
    this.client = client;
  }

  showStatusFor(screen_name) {
    var params = {screen_name: screen_name };
    this.client.get('statuses/user_timeline', params, (error, tweets, response) => {
      if (!error) {
        this.displayTweets(tweets);
      }
    });
  }

  displayTweets(tweets) {
     tweets.forEach(function(tweet, _i) {
      console.log(tweet.text);
    });
    return this;
  }

}

export default TwitterStatus
