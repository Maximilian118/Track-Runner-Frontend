import React from 'react'

const PostHelp = () => {
  const middleHeight = document.getElementsByClassName("middle")[0].clientHeight

  return (
    <div className="middle" style={{ height: middleHeight ? middleHeight : 'auto', overflowY: 'scroll' }}>
      <div className="middle-col">
        <div className="middle-col-top">
          <h4>Title</h4>
          <p>Required!</p>
        </div>
        <p>The Title of your Post.</p>
      </div>
      <div className="middle-col">
        <h4>Description</h4>
        <p>A description of your run. How did it go? Anything eventful? What was the weather like?</p>
      </div>
      <div className="middle-col">
        <h4>Select A Track</h4>
        <p>Did you run on a specific motorsport race track? If so, add it to your Post.</p>
      </div>
      <div className="middle-col">
        <h4>Time of run</h4>
        <p>The time of day that you ran. This field is automatically filled with the current time.</p>
      </div>
      <div className="middle-col">
        <h4>Date of run</h4>
        <p>The date that you ran. This field is automatically filled with the current date.</p>
      </div>
      <div className="middle-col">
        <div className="middle-col-top">
          <h4>Best Lap</h4>
          <p>Required!</p>
        </div>
        <p>Your fastest lap. Required even if you only ran one lap.</p>
      </div>
      <div className="middle-col">
        <div className="middle-col-top">
          <h4>Total Dist</h4>
          <p>Required!</p>
        </div>
        <p>The total distance of your run from start to end regardless of laps.</p>
      </div>
      <div className="middle-col">
        <h4>Add a GPX File</h4>
        <p>Upload a GPX file of your run. This is recommended for the best Track-Runner experience.</p>
      </div>
      <div className="middle-col">
        <h4>Add Images</h4>
        <p>Upload photos of your run. Your followers will appreciate them!</p>
      </div>
    </div>
  )
}

export default PostHelp