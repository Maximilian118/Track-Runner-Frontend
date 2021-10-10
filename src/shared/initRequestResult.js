// Parse an array of posts.
export const initPosts = posts => {
  return posts.map(post => {
    return {
      ...post,
      distance: Number(post.distance),
      geojson: {
        ...post.geojson,
        geojson: JSON.parse(post.geojson.geojson),
        stats: JSON.parse(post.geojson.stats),
      },
      track: {
        ...post.track,
        stats: JSON.parse(post.track.stats),
      }
    }
  })
}

// Parse an array of geojsons.
export const initGeojsons = geojsons => {
  return geojsons.map(geojson => {
    return {
      ...geojson,
      geojson: JSON.parse(geojson.geojson),
      stats: geojson.stats ? JSON.parse(geojson.stats) : null,
    }
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

// Parse a track.
export const initTrack = track => {
  return {
    ...track,
    stats: JSON.parse(track.stats),
    geojson: {
      ...track.geojson,
      geojson: JSON.parse(track.geojson.geojson),
      stats: JSON.parse(track.geojson.stats),
    }
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