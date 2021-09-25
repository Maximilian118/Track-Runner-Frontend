import axios from "axios"
import { formatFilename, XMLFileToString, headers, checkAuth } from './utility'
import { populateGeojson } from './requestPopulation'
import MapBoxStatic from '../components/utility/MapBoxStatic'

export const createGeojson = async (user, setUser, file, setLocalLoading, history, setThumb, width, height) => {
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
        setThumb && setThumb(
          <MapBoxStatic 
            geojson={JSON.parse(res.data.data.createGeojson.geojson)} 
            width={width} 
            height={height}
            style={{ borderRadius: 5 }}
            highRes
          />
        )
        process.env.NODE_ENV === 'development' && console.log(res)
      }
  
      setLocalLoading(false)
    }).catch(err => {
      checkAuth(err.response.data.errors, setUser, history)
      process.env.NODE_ENV === 'development' && console.log(err)
      setLocalLoading(false)
    })
  } catch (err) {
    process.env.NODE_ENV === 'development' && console.log(err)
    setLocalLoading(false)
  }
}