import React, { useState, useEffect } from 'react'
import './_DropZone.scss'
import { useDropzone } from 'react-dropzone'
import { uploadToS3 } from '../../../shared/bucketRequests'
import { withRouter } from 'react-router-dom'
import { initThumbArr, initFileArr, dropZoneContent, handleDropZonePreReqChecks } from './DropZoneUtility'
import { createGeojson } from '../../../shared/geojsonRequests'
import Spinner from '../Spinner'

const DropZone = ({ user, setUser, calendar, setCalendar, form, setForm, height, usage, history, style, arrData, multiple, icon }) => {
  const [ localLoading, setLocalLoading ] = useState(false)
  const [ thumb, setThumb ] = useState(initThumbArr(user, usage))
  const [ err, setErr ] = useState(null)

  // Determine if the window has drag and drop capabilities.
  const canDragDrop = () => {
    const testDiv = document.createElement('div')
    return (('draggable' in testDiv) || ('ondragstart' in testDiv && 'ondrop' in testDiv)) && 'FormData' in window && 'FileReader' in window
  }

  // Init DropZone with the necessary arguments.
  const { acceptedFiles, fileRejections, getRootProps, getInputProps, isDragActive } = useDropzone({ 
    accept: usage === "gpx" ? ".gpx" : 'image/jpeg, image/png',
    multiple: multiple ? multiple : false,
    maxSize: 10000000,
  })

  // Check if app has internet connection.
  const online = navigator.onLine

  // If acceptedFiles has at least one file and there are no fileRejections, set context and thumbnail.
  // Else, nullify user.file context and revert thumbnail state.
  useEffect(() => {
    if (acceptedFiles.length > 0 && fileRejections.length === 0 && online) {
      setLocalLoading(true)

      const handleUpload = async () => {
        const fileArr = await initFileArr(usage, acceptedFiles, arrData, thumb, setThumb)
        uploadToS3(fileArr, user, setUser, form, setForm, calendar, setCalendar, setLocalLoading, setErr, setThumb, history)
      }

      if (!handleDropZonePreReqChecks(acceptedFiles, form, multiple, setErr, setThumb, setLocalLoading)) { // If checks pass.
        if (acceptedFiles.every(file => file.type === "image/jpeg" || file.type === "image/png")) { // Do something with the files in acceptedFiles depending on file type.
          handleUpload()
        } else if (acceptedFiles[0].name.split(".")[1] === "gpx") {
          createGeojson(user, setUser, form, setForm, acceptedFiles[0], setLocalLoading, history, setThumb, 310, 56)
        }
      }
    } else if (fileRejections.length > 0) {
      setThumb([])
    }
  }, [acceptedFiles]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div {...getRootProps({className: `
      drop-zone 
      ${usage} 
      ${isDragActive && `drag-active`} 
      ${thumb !== "" && `thumb`}
      ${!online && `offline`}
      `})}
      style={{ 
        ...style,
        height: height ? height : "100%", 
        width: usage === "profile-picture" ? height : 'auto', 
      }}
    >
      {localLoading ? <Spinner/> :
        <>
          {online && <input {...getInputProps()}/>}
          {dropZoneContent(usage, thumb, multiple, acceptedFiles, fileRejections, err, canDragDrop)}
          {icon}
        </>
      }
    </div>
  )
}

export default withRouter(DropZone)