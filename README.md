Hubot Slack Channel iCal
========================

This is a script that exposes pinned items in a channel as an iCal calendar
that you can then subscribe to.


Usage
-----

```
npm install --save hubot-slack-channel-ical
```

Add to your `external-scripts.json`:
```
[
  "hubot-slack-channel-ical"
]
```


Commands
--------

`hubot calendar`: Get the url for iCal feed. You must ask this in the channel.


How it determines the date
--------------------------

To get more accurate dates, it may help to know how they're determined. The
text for each message is run through [chrono]. See it's homepage for more
information. To give more context, the timestamp of the message is used as the
reference date. Times are presented in what's known as "floating time", which
means time zones are ignored.

  [chrono]: https://github.com/wanasit/chrono


Privacy
-------

*IMPORTANT!* using this script _will_ leak pinned messages to the public by
default.
