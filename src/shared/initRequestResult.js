const redundantLapTimeHours = lap_time => {
  const hms = lap_time.split(":")
  
  if (hms[0] === "00") {
    return `${hms[1]}:${hms[2]}`
  } else {
    return lap_time
  }
}

// Parse a single post.
export const initPost = post => {
  return {
    ...post,
    lap_time: post.lap_time ? redundantLapTimeHours(post.lap_time) : null,
    distance: Number(post.distance),
    geojson: post.geojson ? initGeojson(post.geojson) : null,
    track: post.track ? initTrack(post.track) : null,
  }
}

// Parse an array of posts.
export const initPosts = posts => {
  return posts.map(post => {
    return initPost(post)
  })
}

// Parse a single track.
export const initTrack = track => {
  return {
    ...track,
    stats: track.stats ? JSON.parse(track.stats) : null,
    geojson: track.geojson ? initGeojson(track.geojson) : null
  }
}

// Parse an array of tracks.
export const initTracks = tracks => {
  return tracks.map(track => {
    return initTrack(track)
  })
}

// Parse a single geojson.
export const initGeojson = geojson => {
  return {
    ...geojson,
    geojson: JSON.parse(geojson.geojson),
    stats: geojson.stats ? JSON.parse(geojson.stats) : null,
  }
}

// Parse an array of geojsons.
export const initGeojsons = geojsons => {
  return geojsons.map(geojson => {
    return initGeojson(geojson)
  })
}

// Parse a user.
export const initUser = user => {
  return {
    ...user,
    geojsons: initGeojsons(user.geojsons),
    posts: initPosts(user.posts),
  }
}

// Parse a stringified array of rounds.
export const initRoundsString = string => {
  const parsed = JSON.parse(string)

  let roundArr = []

  parsed.forEach(async item => {
    if (item.round) {
      roundArr.push({
        ...item,
        sessions: JSON.parse(item.sessions),
        track: item.track ? {
          ...item.track,
          stats: JSON.parse(item.track.stats),
          geojson: item.track.geojson ? {
            ...item.track.geojson,
            geojson: JSON.parse(item.track.geojson.geojson),
            stats: JSON.parse(item.track.geojson.stats),
          } : null
        } : null
      })
    } else {
      roundArr.push(item)
    }
  })

  return roundArr
}