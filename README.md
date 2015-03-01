# follow-me
Script to increase your twitter followers. Uses es6 (with [babel](https://www.npmjs.com/package/babel)), [Jest](https://facebook.github.io/jest) and [Twit](https://www.npmjs.com/package/twit).

## Installation

Clone repo and run `npm install`

## Configuration

You must have an active Twitter API key. Make a copy of the ` twitter.yml.example` and put in your information:
```
cp twitter.yml.example twitter.yml
```
## mytweets.js

A simple script that returns tweets for a list of users:

```
babel-node mytweets.js ken_glish videodrome_pod sandiegojs
```

## follow.js
Follow a list of people on twitter. Will only attempt to follow if you are not already following. Currently does not handle rate limitting so run at your own risk:

```
babel-node follow.js ken_glish videodrome_pod sandiegojs
```
