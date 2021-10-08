import axios from "axios"
import imageCompression from 'browser-image-compression'
import { useTokens, checkAuth, headers, formatFilename, isDuplicateFile } from './utility'
import { handleDropZoneError } from '../components/Utility/DropZone/DropZoneUtility'
import { updateProfilePicture } from './userRequests'
import { getTracks, updateTrackLogo } from './trackRequests'

export const uploadToS3 = async (fileArr, user, setUser, form, setForm, calendar, setCalendar, setLocalLoading, setErr, thumb, setThumb, history) => {
  // Loop through all of the files in fileArr, prepare each filename for s3, conduct checks and retrieve s3 signed URLs.
  // Return fileArr with populated url keys.
  const withSigned = await Promise.all(fileArr.map(async file => {
    // Depending on the purpose of the file, assign a filename with categorisation for s3.
    let filename = formatFilename(user, file.blob, `${file.name}/`)
    // If no filename, throw an error.
    if (!filename) {
      return handleDropZoneError(setErr, setThumb, setLocalLoading, "This file name cannot be used. Please change it and try again.", file)
    }
    // Depending on the given filename, conduct duplicate file and file size checks.
    if (filename.includes("post")) { // Error checks if post is in the url.
      if (file.blob.size > 350000) { // No bigger than 0.2Mb. Allow for slightly over.
        return handleDropZoneError(setErr, setThumb, setLocalLoading, "Post Image Compression failed. Please try again.", file)
      }

    } else if (filename.includes("profile-picture")) { // Error checks if profile-picture is in the url.
      if (isDuplicateFile(user.profile_picture, filename)) {
        return handleDropZoneError(setErr, setThumb, setLocalLoading, "This Image is already your Profile Picture.", file)
      } else if (file.blob.size > 600000) { // No bigger than 0.5Mb. Allow for slightly over.
        return handleDropZoneError(setErr, setThumb, setLocalLoading, "Profile Picture Compression failed. Please try again.", file)
      }

    } else if (filename.includes("icon")) { // Error checks if icon is in the url.
      if (isDuplicateFile(user.icon, filename)) {
        return handleDropZoneError(setErr, setThumb, setLocalLoading, "This Image is already your Icon.", file)
      } else if (file.blob.size > 250000) { // No bigger than 0.15Mb. NOTE: Rarely do the images compress to sub 0.05mb.
        return handleDropZoneError(setErr, setThumb, setLocalLoading, "Icon Compression failed. Please try again.", file)
      }

    } else if (filename.includes("track-logo")) { // Error checks if track-logo is in the url.
      let isDuplicate = false
      const tracks = await getTracks(user, setUser, history)

      await Promise.all(tracks.map(track => {
        if (isDuplicateFile(track.logo, filename)) {
          isDuplicate = true
        }
        return track
      }))
      
      if (isDuplicate) {
        return handleDropZoneError(setErr, setThumb, setLocalLoading, "Duplicate track logo file name. Please change it and try again.", file)
      }
      
      if (file.blob.size > 300000) { // No bigger than 0.2Mb. Allow for slightly over.
        return handleDropZoneError(setErr, setThumb, setLocalLoading, "Track Logo compression failed. Please try again.", file)
      }
    }

    // Retrieve a signed URL ready for s3 upload. *REMEMBER file is in file.blob! Not file.*
    try {
      return await axios.post('', {
        variables: {
          filename: filename,
          filetype: file.blob.type,
        },
        query: `
          query SignS3($filename: String!, $filetype: String!) {
            signS3(filename: $filename, filetype: $filetype) {
              url
              signedRequest
              tokens
            }
          }
        `
      }, {headers: headers(user.token)}).then(res => {
        if (res.data.errors) {
          checkAuth(res.data.errors, setUser, history)
          process.env.NODE_ENV === 'development' && console.log(res.data.errors[0].message)
          return handleDropZoneError(setErr, setThumb, setLocalLoading, "Could not retrieve request signature. Curious...", file)
        } else {
          process.env.NODE_ENV === 'development' && console.log(res)
          useTokens(user, res.data.data.signS3.tokens, setUser)  

          return {
            ...file,
            url: res.data.data.signS3.url,
            signedRequest: res.data.data.signS3.signedRequest,
            uploaded: false,
          }
        }
      }).catch(err => {
        checkAuth(err.response.data.errors, setUser, history)
        process.env.NODE_ENV === 'development' && console.log(err.response.data.errors[0].message)
        return handleDropZoneError(setErr, setThumb, setLocalLoading, "Could not retrieve request signature. Curious...", file)
      })
    } catch (err) {
      process.env.NODE_ENV === 'development' && console.log(err)
      return handleDropZoneError(setErr, setThumb, setLocalLoading, "Could not retrieve request signature. Curious...", file)
    }
  }))

  // Check that every file in withSigned array now has a signedRequest string.
  if (withSigned.every(file => file.signedRequest)) {
    const withUploaded = await putS3(withSigned)
    // Check that every file in withUploaded array is now uploaded === true.
    if (withUploaded.every(file => file.uploaded)) {
      // Depending on file.name, Update database, user context and localStorage with new file urls.
      // NOTE: Do not mistake file.name for file.blob.name!
      if (withUploaded.every(file => file.name === "post")) {
        const sorted = withUploaded.sort((a, b) => a.i - b.i)
        const imgs = await Promise.all(sorted.map(file => file.url))
        form.imgs.forEach(imgUrl => imgs.unshift(imgUrl))

        setThumb([
          ...thumb,
          ...sorted,
        ])

        setForm({ 
          ...form, 
          imgs,
        })

        setLocalLoading(false)
      } else if (withUploaded.every(file => file.name === "profile-picture" || file.name === "icon")) {
        const profile_picture = await withUploaded.find(file => file.name === "profile-picture")
        const icon = await withUploaded.find(file => file.name === "icon")
        updateProfilePicture(user, setUser, profile_picture.url, icon.url, history, setLocalLoading, setErr, setThumb)
        return withUploaded

      } else if (withUploaded.length < 2 && withUploaded[0].name === "track-logo") {
        updateTrackLogo(user, setUser, calendar, setCalendar, withUploaded[0].trackID, withUploaded[0].trackName, withUploaded[0].url, history, setLocalLoading, setErr, setThumb)
        return withUploaded

      } else {
        return handleDropZoneError(setErr, setThumb, setLocalLoading, "Could not find a purpose for these files. Hmm...", withUploaded)
      }
    } else {
      return handleDropZoneError(setErr, setThumb, setLocalLoading, "Not all files could be uploaded. Please try again.", withUploaded)
    }
  }
}

const putS3 = async fileArr => {
  return await Promise.all(fileArr.map(async file => {
    return await axios.put(file.signedRequest, file.blob, {headers: {"Content-Type": file.blob.type}}).then(res => {
      process.env.NODE_ENV === 'development' && console.log(res)
      return {
        ...file,
        uploaded: true,
      }
    }).catch(err => {
      process.env.NODE_ENV === 'development' && console.log(err)
      return file
    })
  }))
}

export const redundantFilesCheck = async (user, setUser, history) => {
  try {
    await axios.post('', {
      query: `
        query {
          redundantFilesCheck {
            tokens
          }
        }
      `
    }, {headers: headers(user.token)}).then(res => {
      if (res.data.errors) {
        checkAuth(res.data.errors, setUser, history)
        process.env.NODE_ENV === 'development' && console.log(res.data.errors[0].message)
      } else {
        useTokens(user, res.data.data.redundantFilesCheck.tokens, setUser)
        process.env.NODE_ENV === 'development' && console.log(res)
      }
    }).catch(err => {
      checkAuth(err.response.data.errors, setUser, history)
      process.env.NODE_ENV === 'development' && console.log(err.response.data.errors[0].message)
    })
  } catch (err) {
    process.env.NODE_ENV === 'development' && console.log(err)
  }
}

export const compressImage = async (file, fileSize, setThumb) => {
  const options = {
    maxSizeMB: fileSize,
    maxWidthOrHeight: 1920,
    useWebWorker: true
  }

  try {
    var compressedFile = await imageCompression(file, options)
    
    setThumb && setThumb([{
      url: URL.createObjectURL(compressedFile),
      uploaded: false,
    }])
  } catch (err) {
    process.env.NODE_ENV === 'development' && console.log(err)
  }

  return compressedFile
}