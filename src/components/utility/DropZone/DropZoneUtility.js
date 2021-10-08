import { compressImage } from '../../../shared/bucketRequests'
import { isDuplicateArrFile } from '../../../shared/utility'
import { Delete } from '@mui/icons-material'

// Return an initial Array of URL Strings to be presented.
export const initThumbArr = (user, usage) => {
  if (usage === "profile-picture" && user.profile_picture) {
    return [{
      url: user.profile_picture,
      uploaded: true,
    }]
  } else {
    return []
  }
}

// Return an initial Array with compressed files for uploadToS3.
export const initFileArr = async (usage, acceptedFiles, arrData, thumb, setThumb) => {
  let fileArr = []
  let thumbArr = []

  const multiple = async () => {
    fileArr = await Promise.all(acceptedFiles.map(async (file, i) => {
      const compressedImage = await compressImage(file, 0.2)

      thumbArr.push({
        i,
        url: URL.createObjectURL(compressedImage),
        uploaded: false,
      })

      return {
        i,
        name: usage,
        blob: compressedImage,
      }
    }))

    setThumb([
      ...thumb,
      ...thumbArr.sort((a, b) => a.i - b.i),
    ])
  }

  switch(usage) {
    case "post": await multiple(); break
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

// Perform error checks before submitting requests.
export const handleDropZonePreReqChecks = (acceptedFiles, form, multiple, setErr, setThumb, setLocalLoading) => {
  if (multiple) {
    if (isDuplicateArrFile(acceptedFiles, form.imgs)) { // Check for duplicate files between acceptedFiles & form.imgs.
      return handleDropZoneError(setErr, setThumb, setLocalLoading, "Duplicate File", true)
    } 
  }

  // If there is a file in acceptedFiles that doesn't meet the mime type requirements.
  if (!acceptedFiles.every(file => file.type === "image/jpeg" || file.type === "image/png" || file.name.split(".")[1] === "gpx")) {
    return handleDropZoneError(setErr, setThumb, setLocalLoading, "Unsupported File Type", true)
  }

  return false
}

// Return JSX <h2/> element for DropZone depending on given component params.
const dropZoneText = (usage, canDragDrop, multiple, acceptedFiles, fileRejections, err) => {
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
const dropZoneThumb = (thumb, usage) => {
  let text = <h2 className="thumb-text">Change<br/>Profile Picture</h2>

  switch (usage) {
    case "gpx": text = <h2 className="thumb-text">Change</h2>; break
    default: text = <h2 className="thumb-text">Change<br/>Profile Picture</h2>
  }

  return (
    <>
      <img alt="Thumbnail" src={thumb[0].url}/>
      {text}
    </>
  )
}

// Image onClick = Remove Image from thumb, files and form.imgs Arrays.
const removeImage = (e, img, form, setForm, thumb, setThumb, setFiles) => {
  e.stopPropagation()
  
  const newThumb = thumb.filter(item => item.url !== img.url)
  setThumb(newThumb)
  setFiles(newThumb)

  setForm({ 
    ...form,
    imgs: form.imgs.filter(url => url !== img.url),
  })
}

// Return all items in thumbArr as a Thumbnail for DropZone.
const dropZoneMultiple = (form, setForm, thumb, setThumb, setFiles) => thumb.map((img, i) => (
  <div key={i} className="thumb-img-container" onClick={e => removeImage(e, img, form, setForm, thumb, setThumb, setFiles)}>
    <img alt="Run" src={img.url} style={{ opacity: img.uploaded ? 1 : 0.2 }}/>
    <Delete/>
  </div>
))

// Return JSX depending on DropZone Component params.
export const dropZoneContent = (usage, form, setForm, thumb, setThumb, setFiles, multiple, acceptedFiles, fileRejections, err, canDragDrop, localLoading) => {
  if (thumb.length > 0) {
    if (multiple) {
      return dropZoneMultiple(form, setForm, thumb, setThumb, setFiles)
    } else {
      return !localLoading && dropZoneThumb(thumb, usage)
    }
  } else {
    return !localLoading && dropZoneText(usage, canDragDrop, multiple, acceptedFiles, fileRejections, err)
  }
}

// Return JSX for DropZone interactivity.
export const dropZoneInteract = (getInputProps, multiple, err, setErr) => {
  if (navigator.onLine) {
    if (multiple && err) {
      return (
        <div className="drop-zone-err" onClick={() => setErr(null)}>
          <h2>Close</h2>
        </div>
      )
    } else {
      return <input {...getInputProps()}/>
    }
  }
}