import moment from 'moment'

// Return an array of user activity for calendars.
export const activityData = (user, amount) => {
  const data = []

  // Initialise array with x amount of days.
  for (let i = 0; i < amount; i++) {
    data.push({
      value: 0,
      day: moment().subtract(i, 'days').format("YYYY-MM-DD"),
      colour: '#DDDDDD',
    })
  }

  // Add data to each array item.
  data.forEach(item => {
    user.posts.forEach(post => {
      if (moment(post.created_at).format("YYYY-MM-DD") === item.day) {
        return { ...item, value: item.value++ }
      } else {
        return item
      }
    })
    
    user.tracks.forEach(track => {
      if (moment(track.created_at).format("YYYY-MM-DD") === item.day) {
        return { ...item, value: item.value++ }
      } else {
        return item
      }
    })
  })

  // Assign a colour to each array item.
  return data.map(item => {
    if (item.value === 1) {
      return { ...item, colour: '#A7E0A7' } // Light shade of green.
    } else if (item.value === 2) {
      return { ...item, colour: '#7DCD7D' }
    } else if (item.value === 3) {
      return { ...item, colour: '#3FC13F' }
    } else if (item.value >= 4) {
      return { ...item, colour: '#00B200' } // Dark shade if green.
    } else {
      return item
    }
  })
}