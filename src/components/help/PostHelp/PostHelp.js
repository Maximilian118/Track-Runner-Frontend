import React from 'react'
import Required from '../../UX/Required'

const PostHelp = () => {
  const middleHeight = document.getElementsByClassName("middle")[0].clientHeight

  const PostHelpData = [
    {
      title: "Title",
      desc: "The Title of your Post.",
      req: true,
    },
    {
      title: "Description",
      desc: "A description of your run. How did it go? Anything eventful? What was the weather like?",
      req: false,
    },
    {
      title: "Select A Track",
      desc: "Did you run on a specific motorsport race track? If so, add it to your Post.",
      req: false,
    },
    {
      title: "Time of run",
      desc: "The time of day that you ran. This field is automatically filled with the current time.",
      req: false,
    },
    {
      title: "Date of run",
      desc: "The date that you ran. This field is automatically filled with the current date.",
      req: false,
    },
    {
      title: "Best Lap",
      desc: "Your fastest lap. Required even if you only ran one lap.",
      req: true,
    },
    {
      title: "Total Dist",
      desc: "The total distance of your run from start to end regardless of laps.",
      req: true,
    },
    {
      title: "Add a GPX File",
      desc: "Upload a GPX file of your run. This is recommended for the best Track-Runner experience.",
      req: false,
    },
    {
      title: "Add Images",
      desc: "Upload photos of your run. Your followers will appreciate them!",
      req: false,
    },
  ]

  return (
    <div className="middle" style={{ height: middleHeight ? middleHeight : 'auto', overflowY: 'scroll' }}>
      {PostHelpData.map((row, i) => (
        <div key={i} className="middle-col">
          <div className="middle-col-top">
            <h4>{row.title}</h4>
            {row.req && <Required/>}
          </div>
          <p>{row.desc}</p>
        </div>
      ))}
    </div>
  )
}

export default PostHelp