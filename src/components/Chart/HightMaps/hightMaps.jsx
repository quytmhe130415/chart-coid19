import react, { useState, useEffect, useRef, useCallback, useContext } from 'react'
import PropTypes from 'prop-types';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import highchartsMap from 'highcharts/modules/map';
import { Grid, Card, CardContent, Typography, makeStyles } from '@material-ui/core';
import cloneDeep from 'lodash/cloneDeep';


highchartsMap(Highcharts);

HighMaps.propTypes = {
  className: PropTypes.string
};

HighMaps.defaultProps = {
  className: ''
};

// const useStyles = makeStyles((theme) => ({

// }))

const initOptions = {
  chart: {
    height: 500,
  },
  title: {
    text: 'Total number of covid cases '
  },
  mapNavigation: {
    enabled: true
  },
  colorAxis: {
    min: 0,
    stops: [
      [0.2, "#FFC4AA"],
      [0.4, "#FF8A66"],
      [0.6, "#FF392B"],
      [0.8, "#B71525"],
      [1, "#7A0826"],
    ]
  },
  legend: {
    layout: "vertical",
    align: "center",
    verticalAlign: "bottom",
  },
  series: [
    {
      mapData: {},
      name: "Number people",
      joinBy: ["hc-key", "key"]
    }
  ]
}

export function HighMaps(props) {
  const { mapData } = props;
  const [options, setOptions] = useState({})
  const chartRef = useRef(null)
  const [configLoaded, setConfigLoaded] = useState(false)
  console.log("map Data ne", mapData)
  useEffect(() => {
    if (mapData && Object.keys(mapData).length) {
      const fakeData = mapData.features.map((feature, index) =>
      (
        {
          key: feature.properties["hc-key"],
          value: index,
        }
      ))
      console.log('fakeData', fakeData);
      // setOptions(
      //   {
      //     ...initOptions,
      //     series: [
      //       {
      //         ...initOptions.series[0],
      //         mapData: mapData,
      //         data: fakeData
      //       }
      //     ]
      //   }
      // )
      if (!configLoaded) setConfigLoaded(true)
    }
  }, [mapData, configLoaded]);


  useEffect(() => {
    if (chartRef && chartRef.current) {
      chartRef.current.chart.series[0].update(
        mapData
      )
    }
  }, [mapData]);

  if (!configLoaded) return null;

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={cloneDeep(options)}
        constructorType="mapChart"
        ref={chartRef}
      >
      </HighchartsReact>
    </div>
  );
}
