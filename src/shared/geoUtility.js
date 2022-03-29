import { updateCoords } from './geoRequests'
import { toFixedX } from './utility'

// Check current geolocation, if no geo data or user has moved, update user coordinates.
export const checkGeo = (user, setUser, history, precision) => {
  const x = precision ? precision : 3

  navigator.geolocation.getCurrentPosition(pos => {
    const lngMoved = user.coords[0] && toFixedX(user.coords[0], x) !== toFixedX(pos.coords.longitude, x)
    const latMoved = user.coords[1] && toFixedX(user.coords[1], x) !== toFixedX(pos.coords.latitude, x)

    if (!user.coords[0] || lngMoved || latMoved) {
      updateCoords(user, setUser, pos.coords.longitude, pos.coords.latitude, history)
    }
  })
}