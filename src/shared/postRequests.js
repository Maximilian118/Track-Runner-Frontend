import axios from "axios"
import moment from 'moment'
import { headers, checkAuth, getAxiosError } from './utility'
import { populatePost } from './requestPopulation'
import { redundantFilesCheck } from './bucketRequests'

export const createPost = async (form, user, setUser, setLoading, history) => {
  setLoading(true)

  const tor = moment(form.timeOfRun).format("HH:mm:ss")
  const dor = moment(form.dateOfRun).format("YYYY-MM-DD")
  const runDT = moment(dor + ' ' + tor).format()
  const lapTime = moment(form.lapTime._d).format("HH:mm:ss")

  try {
    await axios.post('', {
      variables: {
        title: form.title,
        description: form.description,
        track: form.trackID,
        geojson: form.geoID,
        lapTime,
        distance: form.distance,
        runDT,
        imgs: JSON.stringify(form.imgs),
      },
      query: `
        mutation CreatePost($title: String!, $description: String, $track: ID, $geojson: ID, $lapTime: String!, $distance: String!, $runDT: String!, $imgs: String) {
          createPost(postInput: {title: $title, description: $description, track: $track, geojson: $geojson, lapTime: $lapTime, distance: $distance, runDT: $runDT, imgs: $imgs}) {
            ${populatePost}
          }
        }
      `
    }, {headers: headers(user.token)}).then(res => {
      if (res.data.errors) {
        checkAuth(res.data.errors, setUser, history)
        process.env.NODE_ENV === 'development' && console.log(res.data.errors[0].message)
      } else {
        history.push("/")
        redundantFilesCheck(user, setUser, history)
        process.env.NODE_ENV === 'development' && console.log(res)
      }
  
      setLoading(false)
    }).catch(err => {
      checkAuth(err.response.data.errors, setUser, history)
      process.env.NODE_ENV === 'development' && console.log(getAxiosError(err))
      setLoading(false)
    })
  } catch (err) {
    process.env.NODE_ENV === 'development' && console.log(err)
    setLoading(false)
  }
}