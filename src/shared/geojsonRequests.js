import axios from "axios"
import { formatFilename, XMLFileToString, headers, checkAuth, getAxiosError } from './utility'
import { populateGeojson } from './requestPopulation'
import { getMapBoxStatic } from './miscRequests'

export const createGeojson = async (user, setUser, form, setForm, file, setLocalLoading, history, setThumb, width, height) => {
  try {
    await axios.post('', {
      variables: {
        gpx: await XMLFileToString(file),
        filename: formatFilename(user, file, `${file.name}/`),
      },
      query: `
        mutation CreateGeojson($gpx: String!, $filename: String!) {
          createGeojson(gpx: $gpx, filename: $filename) {
            ${populateGeojson}
          }
        }
      `
    }, {headers: headers(user.token)}).then(res => {
      if (res.data.errors) {
        checkAuth(res.data.errors, setUser, history)
        process.env.NODE_ENV === 'development' && console.log(res.data.errors[0].message)
      } else {
        const geoURL = getMapBoxStatic(JSON.parse(res.data.data.createGeojson.geojson), width, height, true)
        const geoStats = res.data.data.createGeojson.stats ? JSON.parse(res.data.data.createGeojson.stats) : null

        setForm && setForm({
          ...form,
          geoID: res.data.data.createGeojson._id,
          geoURL,
          geoStats,
        })

        setThumb && setThumb([{
          url: geoURL,
          uploaded: true,
        }])

        process.env.NODE_ENV === 'development' && console.log(res)
      }
  
      setLocalLoading(false)
    }).catch(err => {
      checkAuth(err.response.data.errors, setUser, history)
      process.env.NODE_ENV === 'development' && console.log(getAxiosError(err))
      setLocalLoading(false)
    })
  } catch (err) {
    process.env.NODE_ENV === 'development' && console.log(err)
    setLocalLoading(false)
  }
}