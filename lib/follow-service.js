
var _ = require('lodash');

class FollowService {

  constructor(client, userId) {
    this.client = client;
    this.userId = userId;
  }

  showFollowers() {
    var params = { user_id: this.userId, count: 10};
    this.client.get('followers/ids', params, (error, data, response) => {
      this.parseResponse(error, data, response, this.displayFollowers);
    });
  }

  parseResponse(error, data, response, callback) {
    // console.log(response.headers) ;
    if (!error) {
      callback(data);
    }
  }

  displayFollowers(data) {
    console.log(data);
    data.ids.forEach(function(follower, _i) {
      console.log(follower);
    });
    return this;
  }

  validateOptions(options) {
    if (!options || !(options.user_id || options.screen_name)) {
      throw new Error("ArgumentError");
    }
  }

  follow(options) {
    this.validateOptions(options);

    this.client.post('friendships/create', _.extend( {follow: true}, options), function(err, data, response) {
      // console.log(err) ;
    });
    return this;
  }

  onNotFollowing(options, callback) {
    this.validateOptions(options);

    var params = _.extend(
      { source_id: this.userId },
      _.transform(options, function(result, val, key) {
        if (key == 'user_id') result['target_id'] = val;
        if (key == 'screen_name') result['target_screen_name'] = val;
      })
    );

    this.client.get('friendships/show', params, function (err, data, response) {
      // console.log(response.headers) ;

      if (!data.relationship.target.followed_by) {
        callback(options);
      } else {
        console.log("Already following " + data.relationship.target.screen_name)
      }
    });

    return this;
  }

}

export default FollowService ;
