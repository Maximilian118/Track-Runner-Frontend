import { compressImage } from '../../../shared/bucketRequests'

// Return an initial Array of URL Strings to be presented.
export const initThumbArr = (user, usage) => {
  if (usage === "profile-picture") {
    return [user.profile_picture]
  } else {
    return []
  }
}

// Return an initial Array with compressed files for uploadToS3.
export const initFileArr = async (usage, acceptedFiles, arrData, setThumb) => {
  let fileArr = []

  switch(usage) {
    case "post": fileArr = await Promise.all(acceptedFiles.map(async file => {
      return {
        name: "post",
        blob: await compressImage(file, 0.2),
      }
    })); break
    case "profile-picture": fileArr = [
      {
        name: "profile-picture",
        blob: await compressImage(acceptedFiles[0], 0.5, setThumb),
      },
      {
        name: "icon",
        blob: await compressImage(acceptedFiles[0], 0.05),
      },
    ]; break
    case "track-logo": fileArr = [
      {
        name: "track-logo",
        blob: await compressImage(acceptedFiles[0], 0.1, setThumb),
      },
    ]; break
    default: fileArr = [
      {
        name: "track-logo",
        blob: await compressImage(acceptedFiles[0], 0.1, setThumb),
      },
    ]
  }

  if (fileArr.length > 0) {
    return fileArr.map(file => {
      if (arrData) {
        return {
          ...file,
          ...arrData,
        }
      } else {
        return file
      }
    })
  } else {
    console.log("fileArr empty")
  }
}

// Set all states for DropZone Error state. Optionally return a given value.
export const handleDropZoneError = (setErr, setThumb, setLocalLoading, message, returnValue) => {
  setErr(<h2>{message}</h2>)
  setThumb([])
  setLocalLoading(false)
  return returnValue ? returnValue : message
}

// Set all states for DropZone Success state. Optionally return a given value.
export const handleDropZoneSuccess = (setErr, setLocalLoading, returnValue) => {
  setErr(null)
  setLocalLoading(false)
  return returnValue ? returnValue : "File uploaded!"
}

// Return JSX <h2/> element for DropZone depending on given component params.
export const dropZoneText = (usage, canDragDrop, multiple, acceptedFiles, fileRejections, err) => {
  const suffix = canDragDrop ? multiple ? "or drag them here" : "or drag it here" : ""
  let text = <h2>Choose an image<br/>{suffix}</h2>

  const fileType = usage === "gpx" ? "Please select a GPX file" : "Please use JPEG or PNG"

  if (!navigator.onLine) {
    text = <h2>Offline!</h2>
  } else {
    // Defaults
    switch (usage) {
      case "gpx": text = <h2>Add a GPX File</h2>; break
      case "post": text = <h2>Add Images</h2>; break
      default: text = <h2>Choose an image<br/>{suffix}</h2>
    }

    // Check for errors/rejections.
    if (acceptedFiles.length > 0 && fileRejections.length > 0) {
      text = <h2>Multiple files!<br/>Please select one image</h2>
    } else if (fileRejections.length > 0) {
      switch (fileRejections[0].errors[0].code) {
        case "too-many-files": text = <h2>Multiple files!<br/>Please select one image</h2>; break
        case "file-invalid-type": text = <h2>Unsupported file type!<br/>{fileType}</h2>; break
        case "file-too-large": text = <h2>Woah there!<br/>10MB Maximum</h2>; break
        default: text = <h2>Choose an image<br/>{suffix}</h2>
        }
    } else if (err) {
      text = err
    }
  }
  
  return text
}

// Return the first item in thumbArr as a Thumbnail for DropZone.
export const dropZoneThumb = (thumb, usage) => {
  let text = <h2 className="thumb-text">Change<br/>Profile Picture</h2>

  switch (usage) {
    case "gpx": text = <h2 className="thumb-text">Change</h2>; break
    default: text = <h2 className="thumb-text">Change<br/>Profile Picture</h2>
  }

  return (
    <>
      <img alt="Thumbnail" src={thumb[0]}/>
      {text}
    </>
  )
}