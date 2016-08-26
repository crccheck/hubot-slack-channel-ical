// Description:
//   Export pinned messages as ical

// https://github.com/github/hubot/blob/master/docs/scripting.md#http-listener
const chrono = require('chrono-node')
const ical = require('ical-generator')

function userToOrganizer (dataStore, message) {
  if (message.subtype === 'bot_message') {
    // console.log('bot', dataStore.getBotById(message.bot_id))
    return {
      name: message.username,
      email: 'bot@example.com'
    }
  }

  const user = dataStore.getUserById(message.user)
  return {
    name: user.real_name,
    email: user.profile.email
  }
}

module.exports = (robot) => {
  robot.router.get('/hubot/calendar/:room.ical', (req, res) => {
    const client = robot.adapter.client
    const dataStore = client.rtm.dataStore
    const room = req.params.room
    const channel = dataStore.getChannelByName(room)
    // console.log('channel', channel)
    const team = dataStore.getTeamById(client.rtm.activeTeamId)
    const teamDomain = `${team.domain}.slack.com`

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
        const cal = ical({
          name: `${team.domain} ${room}`,
          domain: teamDomain
          // TODO timezone from ?
        })
        // console.log('items', data.items)

        data.items
        .map((x) => ({
          url: x.message.permalink,
          text: x.message.text,
          start: chrono.parseDate(x.message.text, +x.message.ts * 1000),
          organizer: userToOrganizer(dataStore, x.message)
        }))
        .filter((x) => !!x.start)
        .map((x) => cal.createEvent({
          start: x.start,
          end: x.start + 3600 * 1000,
          organizer: x.organizer,
          summary: x.text,
          url: x.url
        }))
        res.send(cal.toString())
      }
    })
  })
}
