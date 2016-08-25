// Description:
//   Export pinned messages as ical

// https://github.com/github/hubot/blob/master/docs/scripting.md#http-listener

module.exports = (robot) => {
  robot.hear(/./, (msg) => {
    const client = robot.adapter.client
    client.web.pins
    const channel = msg.message.room
    client.web.pins.list(channel, (err, hmm) => {
      if (err) {
        // TODO handler error
      }
      hmm.items.forEach((x) => {
        console.log(x)
      })
    })
  })
}
