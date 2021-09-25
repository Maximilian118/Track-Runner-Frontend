import React from "react"
import CalendarGraph from "../../Graphs/CalendarGraph"
import { ActivityData } from '../../../shared/utility'

const GraphsCard = ({ user }) =>
  <div className="card-model">
    <div className="top border-bottom">
      <h5>Activity</h5>
    </div>
    <CalendarGraph data={ActivityData(user)}/>
  </div>

export default GraphsCard