import axios from "axios"
import moment from 'moment'
import { headers, checkAuth, getAxiosError } from './utility'
import { populatePost } from './requestPopulation'
import { redundantFilesCheck } from './bucketRequests'
import { initPost } from './initRequestResult'

export const createPost = async (form, user, setUser, setLoading, history) => {
  setLoading(true)

  const notATrack = form.trackID === "Not a Track"
  const tor = moment(form.timeOfRun).format("HH:mm:ss")
  const dor = moment(form.dateOfRun).format("YYYY-MM-DD")
  const runDT = moment(dor + ' ' + tor).format()
  let lapTime = null
  let distance = form.distance

  if (notATrack) {
    distance = JSON.stringify(form.geoStats.distance.total)
  } else {
    lapTime = moment(form.lapTime._d).format("HH:mm:ss")
  }

  try {
    await axios.post('', {
      variables: {
        title: form.title,
        description: form.description,
        track: notATrack ? null : form.trackID,
        geojson: form.geoID,
        lapTime,
        distance,
        runDT,
        imgs: JSON.stringify(form.imgs),
      },
      query: `
        mutation CreatePost($title: String!, $description: String, $track: ID, $geojson: ID, $lapTime: String, $distance: String!, $runDT: String!, $imgs: String) {
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
        const newPosts = [
          initPost(res.data.data.createPost),
          ...user.posts,
        ]

        setUser({
          ...user,
          posts: newPosts,
        })

        history.push("/")
        localStorage.setItem('posts', JSON.stringify(newPosts))
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