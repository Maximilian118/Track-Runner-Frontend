import React from "react"

// Initialise backendError.
export const initBackendError = {
  type: "", // Identifies the specific input with the backend error.
  message: "", // Message for that input.
}

// Cleanup forms on component unmount.
export const formCleanup = (form, setForm, formError, setFormError, backendError, setBackendError) => {
  form && setForm(form)
  formError && setFormError(formError)
  backendError && setBackendError(backendError)
}

// setFormError with an error for tName if err passed.
const handleInput = (tName, tVal, formError, setFormError, err) => {
  setFormError({
    ...formError,
    [tName]: err ? err : typeof tVal === 'string' && tVal.trim() === "" ? " " : "",
  })
}

// setBackendError to default if backendError.message === truthy or === 'string'.
const handleBackendError = (backendError, setBackendError) => {
  if (backendError) {
    if (backendError.message || typeof backendError === 'string') {
      setBackendError({
        type: "",
        message: "",
      })
    }
  }
}

// Update general formErrors on each keystroke.
export const updateForm = (e, form, setForm, formError, setFormError, backendError, setBackendError) => {
  setForm({...form, [e.target.name]: e.target.value})
  handleBackendError(backendError, setBackendError)

  switch (e.target.name) {
    case "name": if (/^[a-zA-Z\s-']{1,30}$/.test(e.target.value) || e.target.value.trim() === "") {
      handleInput(e.target.name, e.target.value, formError, setFormError)
    } else {
      handleInput(e.target.name, e.target.value, formError, setFormError, "Your name cannot contain numbers or special characters.")
    }; break
    case "email": if (/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(e.target.value) || e.target.value.trim() === "") { // eslint-disable-line
      handleInput(e.target.name, e.target.value, formError, setFormError)
    } else {
      handleInput(e.target.name, e.target.value, formError, setFormError, "Please enter a valid email address.")
    }; break
    case "password": if (/^([a-zA-Z0-9!?_<>"'$£%^&(){};:+=*#]{8,20})$/.test(e.target.value) || e.target.value.trim() === "") {
      handleInput(e.target.name, e.target.value, formError, setFormError)
    } else {
      handleInput(e.target.name, e.target.value, formError, setFormError, "At least one letter and one number. Minimum 8 characters.")
    }; break
    case "passConfirm": if (e.target.value === form.password || e.target.value.trim() === "") {
      handleInput(e.target.name, e.target.value, formError, setFormError)
    } else {
      handleInput(e.target.name, e.target.value, formError, setFormError, "passwords do not match.")
    }; break
    default: setFormError(formError)
  }
}

// Update formErrors for a Post on each keystroke.
export const updatePostForm = (e, form, setForm, formError, setFormError, backendError, setBackendError) => {
  setForm({...form, [e.target.name]: e.target.value})
  handleBackendError(backendError, setBackendError)

  const muiCheck = e => {
    if (e.target.value) {
      if (e.target.value._d) {
        return e.target.value._d.toString() !== "Invalid Date"
      } else if (e.target.value._i) {
        return !e.target.value._i || /^\d{2}\:\d{2}\:\d{2}$/.test(e.target.value._i) // eslint-disable-line no-useless-escape
      } else {
        return false
      }
    } else {
      return false
    }
  }

  switch (e.target.name) {
    case "title": if (e.target.value !== "") {
      handleInput(e.target.name, e.target.value, formError, setFormError)
    } else {
      handleInput(e.target.name, e.target.value, formError, setFormError, "Add a title")
    }; break
    case "trackID": if (e.target.value !== "") {
      handleInput(e.target.name, e.target.value, formError, setFormError)
    } else {
      handleInput(e.target.name, e.target.value, formError, setFormError, "Select a Track")
    }; break
    case "lapTime": if (muiCheck(e)) {
      handleInput(e.target.name, e.target.value, formError, setFormError)
    } else {
      handleInput(e.target.name, e.target.value, formError, setFormError, "Invalid Lap Time")
    }; break
    case "distance": if (/^[0-9]{1,2}(?:\.[0-9]{1,3})?$/.test(e.target.value) || e.target.value.trim() === "") {
      handleInput(e.target.name, e.target.value, formError, setFormError)
    } else {
      handleInput(e.target.name, e.target.value, formError, setFormError, "Invalid Distance")
    }; break
    case "timeOfRun": if (muiCheck(e)) {
      handleInput(e.target.name, e.target.value, formError, setFormError)
    } else {
      handleInput(e.target.name, e.target.value, formError, setFormError, "Invalid Time of Run")
    }; break
    case "dateOfRun": if (muiCheck(e)) {
      handleInput(e.target.name, e.target.value, formError, setFormError)
    } else {
      handleInput(e.target.name, e.target.value, formError, setFormError, "Invalid Date of Run")
    }; break
    default: setFormError(formError)
  }
}

// Update formErrors for CreateTrack on each keystroke.
export const updateCreateTrackForm = (e, form, setForm, formError, setFormError, backendError, setBackendError) => {
  setForm({...form, [e.target.name]: e.target.value})
  handleBackendError(backendError, setBackendError)

  switch (e.target.name) {
    case "name": if (e.target.value !== "") {
      handleInput(e.target.name, e.target.value, formError, setFormError)
    } else {
      handleInput(e.target.name, e.target.value, formError, setFormError, "Name the track")
    }; break
    default: setFormError(formError)
  }
}

// Check for formErrors and backendErrors.
export const errorCheck = (formError, backendError, type) => {
  if (typeof backendError === "string") {
    return <h6 className="form-error">{backendError}</h6>
  } else if (backendError.type === type) {
    return <h6 className="form-error">{backendError.message}</h6>
  } else {
    return formError[type] ? <h6 className="form-error">{formError[type]}</h6> : ""
  }
}

// Determine whether a form is valid for submission.
export const formValid = (form, formError) => {
  for (const keys in form) {
    if (form[keys] === "") {
      return false
    } else if (!form[keys]) {
      return false
    }
  }

  let withErr = false
  for (const keys in formError) {
    if (formError[keys]) {
      withErr = true
    } 
  }

  return withErr ? false : true
}