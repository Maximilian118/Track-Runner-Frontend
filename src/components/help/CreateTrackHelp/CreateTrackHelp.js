import React from 'react'
import Required from '../../UX/Required'

const CreateTrackHelp = () => {
  const middleHeight = document.getElementsByClassName("middle")[0].clientHeight

  const CreateTrackData = [
    {
      title: "Name",
      desc: "The Name of the track.",
      req: true,
    },
    {
      title: "Add a GPX File",
      desc: "Upload a GPX file of the Track.",
      req: true,
    },
    {
      title: "Add a Logo",
      desc: "Upload a logo of the track.",
      req: false,
    },
  ]

  return (
    <div className="middle" style={{ height: middleHeight ? middleHeight : 'auto', overflowY: 'scroll' }}>
      {CreateTrackData.map((row, i) => (
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

export default CreateTrackHelp