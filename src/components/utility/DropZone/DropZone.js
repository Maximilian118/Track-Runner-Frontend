import React, { useState, useEffect } from 'react'
import './_DropZone.scss'
import { useDropzone } from 'react-dropzone'
import { uploadToS3 } from '../../../shared/bucketRequests'
import { withRouter } from 'react-router-dom'
import { initThumbArr, initFileArr, dropZoneContent, dropZoneInteract, handleDropZonePreReqChecks } from './DropZoneUtility'
import { createGeojson } from '../../../shared/geojsonRequests'
import Spinner from '../Spinner'
import { Close } from '@mui/icons-material'

const DropZone = ({ user, setUser, calendar, setCalendar, form, setForm, height, usage, history, style, arrData, multiple, icon, required }) => {
  const [ localLoading, setLocalLoading ] = useState(false)
  const [ thumb, setThumb ] = useState(initThumbArr(user, usage))
  const [ files, setFiles ] = useState([])
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

  // If acceptedFiles has at least one file and there are no fileRejections, set context and thumbnail.
  // Else, nullify user.file context and revert thumbnail state.
  useEffect(() => {
    if (acceptedFiles.length > 0 && fileRejections.length === 0 && navigator.onLine) {
      setLocalLoading(true)

      const handleUpload = async () => {
        const fileArr = await initFileArr(usage, acceptedFiles, arrData, thumb, setThumb)
        uploadToS3(fileArr, user, setUser, form, setForm, calendar, setCalendar, setLocalLoading, setErr, thumb, setThumb, history)
      }

      if (!handleDropZonePreReqChecks(acceptedFiles, setErr, form, thumb, setThumb, multiple, setLocalLoading)) { // If checks pass.
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

  // If multiple, ensure thumb is populated on error msg close.
  useEffect(() => {
    if (multiple && !err) {
      if (thumb.length !== 0 && thumb !== files) {
        setFiles(thumb)
      } else if (thumb.length === 0 && files.length > 0) {
        setThumb(files)
      }
    }
  }, [multiple, thumb, files, err])

  return (
    <div {...getRootProps({className: `
      drop-zone 
      ${usage} 
      ${isDragActive && `drag-active`} 
      ${thumb !== "" && `thumb`}
      ${!navigator.onLine && `drop-zone-offline`}
      ${err && `drop-zone-error`}
      `})}
      style={{ 
        ...style,
        height: height ? height : "100%", 
        width: !form ? height : 'auto', 
      }}
    >
      {dropZoneInteract(getInputProps, multiple, err, setErr)}
      {dropZoneContent(user, usage, form, setForm, thumb, setThumb, setFiles, multiple, acceptedFiles, fileRejections, err, canDragDrop, localLoading, required)}
      {localLoading ? <Spinner size={form && 20} position={form && "icon"}/> : form && err ? <Close/> : icon}
    </div>
  )
}

export default withRouter(DropZone)