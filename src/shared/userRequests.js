import axios from 'axios'
import { logInSuccess, logout } from './localStorage'
import { useTokens, checkAuth, getAxiosError, headers, unknownError } from './utility'
import { handleDropZoneError, handleDropZoneSuccess } from '../components/utility/DropZone/DropZoneUtility'
import { populateUser } from './requestPopulation'
import { redundantFilesCheck } from './bucketRequests'
import { initUser } from './initRequestResult'

export const createUser = async (form, user, setUser, setLoading, setBackendError) => {
  setLoading(true)

  try {
    await axios.post('', {
      variables: {
        name: form.name,
        email: form.email,
        password: form.password,
        passConfirm: form.passConfirm,
      },
      query: `
        mutation CreateUser($name: String!, $email: String!, $password: String!, $passConfirm: String!) {
          createUser(userInput: {name: $name, email: $email, password: $password, pass_confirm: $passConfirm}) {
            ${populateUser}
          }
        }
      `
    }).then(async (res) => {
      if (res.data.errors) {
        process.env.NODE_ENV === 'development' && console.log(res.data.errors[0].message)
      } else {
        await setUser(initUser(logInSuccess({
          ...res.data.data.createUser,
          token: useTokens(user, res.data.data.createUser.tokens),
        })))
  
        process.env.NODE_ENV === 'development' && console.log(res)
      }
  
      setLoading(false)
    }).catch(err => {
      process.env.NODE_ENV === 'development' && console.log(getAxiosError(err))
      setBackendError(JSON.parse(err.response.data.errors[0].message))
      setLoading(false)
    })
  } catch {
    unknownError(setBackendError, setLoading)
  }
}

export const login = async (form, user, setUser, setLoading, setBackendError, history) => {
  setLoading(true)

  try {
    await axios.post('', {
      variables: {
        email: form.email,
        password: form.password,
      },
      query: `
        query Login($email: String!, $password: String) {
          login(email: $email, password: $password) {
            ${populateUser}
          }
        }
      `
    }).then(async res => {
      if (res.data.errors) {
        process.env.NODE_ENV === 'development' && console.log(res.data.errors[0].message)
      } else {
        await setUser(initUser(logInSuccess({
          ...res.data.data.login,
          token: useTokens(user, res.data.data.login.tokens),
        })))
  
        history.push("/")
        process.env.NODE_ENV === 'development' && console.log(res)
      }
  
      setLoading(false)
    }).catch(err => {
      process.env.NODE_ENV === 'development' && console.log(getAxiosError(err))
      setBackendError(JSON.parse(err.response.data.errors[0].message))
      setLoading(false)
    })
  } catch {
    unknownError(setBackendError, setLoading)
  }
}

export const forgot = async (email, setLoading, setBackendError, histroy) => {
  setLoading(true)

  try {
    await axios.post('', {
      variables: {
        email: email,
      },
      query: `
        mutation Forgot($email: String!) {
          forgot(email: $email) {
            _id
          }
        }
      `
    }).then(res => {
      if (res.data.errors) {
        process.env.NODE_ENV === 'development' && console.log(res.data.errors[0].message)
      } else {
        process.env.NODE_ENV === 'development' && console.log(res)
      }
  
      setLoading(false)
      histroy.push("/forgot-success")
    }).catch(err => {
      process.env.NODE_ENV === 'development' && console.log(getAxiosError(err))
      setBackendError(JSON.parse(err.response.data.errors[0].message))
      setLoading(false)
    })
  } catch {
    unknownError(setBackendError, setLoading)
  }
}

export const deleteUser = async (user, setUser, setLoading, history) => {
  setLoading(true)

  try {
    await axios.post('', {
      variables: {
        _id: user._id,
      },
      query: `
        mutation DeleteUser($_id: String!) {
          deleteUser(_id: $_id) {
            _id
          }
        }
      `
    }, {headers: headers(user.token)}).then(res => {
      if (res.data.errors) {
        checkAuth(res.data.errors, setUser, history)
        process.env.NODE_ENV === 'development' && console.log(res.data.errors[0].message)
      } else {
        setUser(logout(history))
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

export const updateProfilePicture = async (user, setUser, profile_picture, icon, history, setLocalLoading, setErr, setThumb) => {
  const calledInDropZone = setErr && setThumb && setLocalLoading
  
  try {
    await axios.post('', {
      variables: {
        _id: user._id,
        icon,
        profile_picture,
      },
      query: `
        mutation UpdateProfilePicture($_id: ID!, $profile_picture: String!, $icon: String!) {
          updateProfilePicture(_id: $_id, profile_picture: $profile_picture, icon: $icon) {
            _id
            icon
            profile_picture
            tokens
          }
        }
      `
    }, {headers: headers(user.token)}).then(res => {
      if (res.data.errors) {
        checkAuth(res.data.errors, setUser, history)
        calledInDropZone && console.log(handleDropZoneError(setErr, setThumb, setLocalLoading, "Failed to update Profile Picture."))
        process.env.NODE_ENV === 'development' && console.log(res.data.errors[0].message)
      } else {
        const newIcon = res.data.data.updateProfilePicture.icon
        const newPP = res.data.data.updateProfilePicture.profile_picture

        const sameUserCheck = post => {
          if (post.user._id === user._id) {
            return {
              ...post,
              user: {
                ...post.user,
                icon: newIcon,
              }
            }
          } else {
            return post
          }
        }
        
        setUser({
          ...user, 
          icon: newIcon,
          profile_picture: newPP,
          posts: user.posts.map(post => sameUserCheck(post)),
        })

        localStorage.setItem('icon', newIcon)
        localStorage.setItem('profile_picture', newPP)
        localStorage.removeItem('feed')

        useTokens(user, res.data.data.updateProfilePicture.tokens, setUser)
        redundantFilesCheck(user, setUser, history)

        calledInDropZone && handleDropZoneSuccess(setErr, setLocalLoading)
        process.env.NODE_ENV === 'development' && console.log(res)
      }
    }).catch(err => {
      checkAuth(err.response.data.errors, setUser, history)
      calledInDropZone && console.log(handleDropZoneError(setErr, setThumb, setLocalLoading, "Failed to update Profile Picture."))
      process.env.NODE_ENV === 'development' && console.log(getAxiosError(err))
    })
  } catch (err) {
    calledInDropZone && console.log(handleDropZoneError(setErr, setThumb, setLocalLoading, "Failed to update Profile Picture."))
    process.env.NODE_ENV === 'development' && console.log(err)
  }
}