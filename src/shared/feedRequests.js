import axios from 'axios'
import { useTokens, checkAuth, getAxiosError, headers } from './utility'
import { initPosts } from './initRequestResult'

export const getFeed = async (user, setUser, feed, setFeed, fromDate, toDate, amount, history) => {
  try {
    await axios.post('', {
      variables: {
        fromDate,
        toDate,
        amount,
      },
      query: `
        query Feed($fromDate: String!, $toDate: String, $amount: Int!) {
          feed(fromDate: $fromDate, toDate: $toDate, amount: $amount) {
            feed
            tokens
          }
        }
      `
    }, {headers: headers(user.token)}).then(async (res) => {
      if (res.data.errors) {
        checkAuth(res.data.errors, setUser, history)
        process.env.NODE_ENV === 'development' && console.log(res.data)
      } else {
        const parsedFeed = initPosts(JSON.parse(res.data.data.feed.feed))
        const newFeed = toDate ? [ ...parsedFeed, ...feed ] : parsedFeed
        toDate ? parsedFeed.length > 0 && setFeed(newFeed) : setFeed(newFeed)
        localStorage.setItem('feed', JSON.stringify(newFeed))
        useTokens(user, res.data.data.feed.tokens, setUser)
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