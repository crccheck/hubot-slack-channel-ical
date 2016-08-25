// Description:
//   Export pinned messages as ical

// https://github.com/github/hubot/blob/master/docs/scripting.md#http-listener


module.exports = (robot) => {
  robot.router.get('/hubot/calendar/:room.ical', (req, res) => {
    const client = robot.adapter.client
    const room = req.params.room
    const channel = client.rtm.dataStore.getChannelByName(room)
    // console.log('channel', channel)

    if (!channel) {
      res.status(404).send('No channel by that name')
      return
    }

    if (!channel.has_pins) {
      res.status(400).send('Channel must have pinned items')
      return
    }

    client.web.pins.list(channel.id, (err, data) => {
      if (err) {
        // TODO handler error
      } else {
        data.items.forEach((x) => {
          console.log(x)
        })
      }
      res.send('TODO')
    })
  })
}
