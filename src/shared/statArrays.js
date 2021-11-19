import { separateNegPos, getPostGeojson } from '../shared/utility'

const stat = (name, stat) => {
  return {
    name,
    stat,
  }
}

export const postStatArr = post => {
  const geojson = getPostGeojson(post)
  let statArr = geojson ? [stat("Distance", `${geojson.stats.distance.totalKm}km`)] : []

  post.lap_time && statArr.push(stat("Best Lap", post.lap_time))

  const getGeoStats = stats => {
    const slopes = separateNegPos(stats.slopes)

    statArr.push(...[
      stat("MaxElev", `${stats.elevation.max}m`),
      stat("MinElev", `${stats.elevation.min}m`),
      stat("ElevChange", `${stats.elevation.dif}m`),
      stat("MaxIncline", `${Math.max(...slopes.pos)}%`),
      stat("MaxDecline", `${Math.min(...slopes.neg)}%`),
    ])
  }

  if (post.track) {
    statArr.push(...[
      stat("Track", post.track.name),
      stat("Country", post.track.country),
      stat("Location", post.track.location),
    ])
  }

  if (geojson) {
    getGeoStats(geojson.stats)
  }

  return statArr
}