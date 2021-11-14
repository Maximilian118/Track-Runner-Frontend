import React from 'react'
import './_LineGraph.scss'
import { ResponsiveLine } from '@nivo/line'
import { lineGraphData, noNegs } from '../../../shared/utility'
import Tooltip from './Tooltip'

const LineGraph = ({track, height, paddingTop}) =>
  <div className="line-graph" style={{height: height, paddingTop: paddingTop}}>
    <ResponsiveLine
      data={lineGraphData(track.name, noNegs(track.geojson.stats.elevation.min, track.geojson.stats.elevation.elevArr))}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      xScale={{ type: 'point' }}
      yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
      axisTop={null}
      axisRight={null}
      axisBottom={null}
      axisLeft={null}
      enableGridX={false}
      colors={"#ff0000"}
      lineWidth={0}
      enablePoints={false}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabelYOffset={-12}
      enableArea={true}
      areaOpacity={1}
      enableCrosshair={false}
      useMesh={true}
      tooltip={value => <Tooltip point={value.point}/>}
    />
  </div>

export default LineGraph