import React from 'react'
import './_LineGraph.scss'
import { ResponsiveLine } from '@nivo/line'
import { lineGraphData, noNegs } from '../../../shared/utility'
import Tooltip from '../Tooltip'

const LineGraph = ({geojson, height, paddingTop, gradient}) => (
  <div className="line-graph" style={{height: height, paddingTop: paddingTop}}>
    <ResponsiveLine
      data={lineGraphData(geojson.name, noNegs(geojson.stats.elevation.min, geojson.stats.elevation.elevArr))}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      xScale={{ type: 'point' }}
      yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
      curve="basis"
      axisTop={null}
      axisRight={null}
      axisBottom={null}
      axisLeft={null}
      enableGridX={false}
      colors={"#ff0000"}
      lineWidth={0}
      enablePoints={false}
      enableArea={true}
      areaOpacity={1}
      enableCrosshair={false}
      useMesh={true}
      tooltip={value => <Tooltip point={value.point}/>}
    />
    {gradient && <div className="line-graph-custom-layer" style={{height: height}}>
      <ResponsiveLine
        data={lineGraphData(geojson.name, geojson.stats.slopes)}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
        curve="basis"
        axisTop={null}
        axisRight={null}
        axisBottom={null}
        axisLeft={null}
        enableGridX={false}
        enableGridY={false}
        colors={"#525252"}
        lineWidth={1}
        enablePoints={false}
        enableArea={false}
        areaOpacity={1}
        enableCrosshair={false}
        useMesh={false}
      />
    </div>}
  </div>
)

export default LineGraph