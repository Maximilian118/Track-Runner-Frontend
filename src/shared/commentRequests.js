import axios from 'axios'
import { useTokens, checkAuth, getAxiosError, headers } from './utility'
import { populateComment } from './requestPopulation'

export const createComment = async (user, setUser, post_id, comment, feed, setFeed, history) => {
  try {
    await axios.post('', {
      variables: {
        post_id,
        comment,
      },
      query: `
      mutation createComment($post_id: ID!, $comment: String!) {
        createComment(post_id: $post_id, comment: $comment) {
          ${populateComment}
        }
      }
      `
    }, {headers: headers(user.token)}).then(res => {
      if (res.data.errors) {
        checkAuth(res.data.errors, setUser, history)
        process.env.NODE_ENV === 'development' && console.log(res.data)
      } else {
        const addCommentToPost = post => {
          if (post._id === post_id) {
            return {
              ...post,
              comments: [
                res.data.data.createComment,
                ...post.comments,
              ],
            }
          } else {
            return post
          }
        }

        const newFeed = feed.map(post => addCommentToPost(post))
        const newPosts = user.posts.map(post => addCommentToPost(post))

        setFeed(newFeed)
        setUser({ ...user, posts: newPosts })
        
        localStorage.setItem('feed', JSON.stringify(newFeed))
        localStorage.setItem('posts', JSON.stringify(newPosts))

        useTokens(user, res.data.data.createComment.tokens, setUser)
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