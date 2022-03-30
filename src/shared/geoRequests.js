import axios from 'axios'
import { useTokens, headers, checkAuth, getAxiosError } from './utility'

export const updateLocation = async (user, setUser, location, history) => {
  try {
    await axios.post('', {
      variables: {
        location: JSON.stringify(location),
      },
      query: `
        mutation UpdateLocation($location: String!) {
          updateLocation(location: $location) {
            _id
            name
            location
            tokens
          }
        }
      `
    }, {headers: headers(user.token)}).then(async res => {
      if (res.data.errors) {
        process.env.NODE_ENV === 'development' && console.log(res.data.errors[0].message)
      } else {
        const Parsedlocation = JSON.parse(res.data.data.updateLocation.location)

        await setUser({
          ...user,
          location: Parsedlocation,
          token: useTokens(user, res.data.data.updateLocation.tokens),
        })
        
        localStorage.setItem('location', JSON.stringify(Parsedlocation))
        process.env.NODE_ENV === 'development' && console.log(res)
      }
    }).catch(err => {
      checkAuth(err.response.data.errors, setUser, history)
      process.env.NODE_ENV === 'development' && console.log(getAxiosError(err))
    })
  } catch (err) {
    console.log(err)
  }
}