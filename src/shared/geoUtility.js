import { updateLocation } from './geoRequests'
import { toFixedX } from './utility'
import { getGeoLocation } from './miscRequests'

// Check current geolocation, if no geo data or user has moved, update user coordinates.
export const checkGeo = (user, setUser, history, precision) => {
  const x = precision ? precision : 3

  navigator.geolocation.getCurrentPosition(async pos => {
    const lngMoved = user.location.longitude && toFixedX(user.location.longitude, x) !== toFixedX(pos.coords.longitude, x)
    const latMoved = user.location.latitude && toFixedX(user.location.latitude, x) !== toFixedX(pos.coords.latitude, x)

    if (!user.location.longitude || lngMoved || latMoved) {
      const location = await getGeoLocation(pos.coords.latitude, pos.coords.longitude)
      updateLocation(user, setUser, location, history)
    }
  })
}