import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Card, CardContent, Typography, makeStyles } from '@material-ui/core';
import LineChart from '../Chart/LineChart/lineChart';
import { HighMaps } from '../Chart/HightMaps/hightMaps';


Summary.propTypes = {
  className: PropTypes.string
};

Summary.defaultProps = {
  className: '',
};

function Summary(props) {
  const { report, selectedCountryId } = props;
  const [mapData, setMapData] = useState({});
  // console.log('selectedCountryId', selectedCountryId)

  useEffect(() => {
    if (selectedCountryId) {
      import(
        `@highcharts/map-collection/countries/${selectedCountryId}/${selectedCountryId}-all.geo.json`
      ).then(res => setMapData(res));
    }
  }, [selectedCountryId])

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item sm={8} xs={12}>
          <LineChart data={report} />
        </Grid>
        <Grid item sm={4} xs={12}>
          <HighMaps mapData={mapData} />
        </Grid>
      </Grid>
    </div>
  );
}

export default Summary