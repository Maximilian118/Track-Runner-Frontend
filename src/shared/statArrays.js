import { metersToKm } from '../shared/utility'

const stat = (name, stat) => {
  return {
    name,
    stat,
  }
}

export const postStatArr = post => {
  let statArr = []

  post.lap_time && statArr.push(stat("Best Lap", post.lap_time))

  const getGeoStats = stats => {
    console.log(Math.max(...stats.slopes))
    statArr.push(...[
      stat("Distance", `${metersToKm(stats.distance.total)}km`),
      stat("MaxElev", `${stats.elevation.max}m`),
      stat("MinElev", `${stats.elevation.min}m`),
      stat("ElevChange", `${stats.elevation.dif}m`),
    ])
  }

  post.geojson && getGeoStats(post.geojson.stats)

  if (post.track) {
    statArr.push(...[
      stat("Country", post.track.country),
      stat("Location", post.track.location),
    ])
    
    if (post.track.geojson && !post.geojson) {
      getGeoStats(post.track.geojson.stats)
    }
  } 

  return statArr
}