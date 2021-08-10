import react, { useState, useEffect, useRef, useCallback, useContext } from 'react'
import PropTypes from 'prop-types';
import HighlightCart from './cardHighlight';
import { Grid, Card, CardContent, Typography, makeStyles } from '@material-ui/core';
import styled from 'styled-components'


Highlight.propTypes = {
  className: PropTypes.string
};

Highlight.defaultProps = {
  className: '',
};

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    width: '90%',
    margin: '0 5%'
  }
}))

function Highlight(props) {
  const { className, report } = props;
  const classes = useStyles();
  const data = report && report.length ? report[report.length - 1] : [];
  const summary = [
    {
      title: 'Number cases ',
      count: data.Confirmed,
      type: 'confirmed'
    },
    {
      title: 'Number recovered',
      count: data.Active,
      type: 'recovered'
    },
    {
      title: 'Number Deadth',
      count: data.Deaths,
      type: 'deadth'
    }
  ]
  return (
    <div className={classes.container}>
      <Grid container spacing={3}>
        {
          summary.map((item) => (
            <Grid item sm={4} xs={12}>
              <HighlightCart title={item.title} count={item.count} type={item.type} />
            </Grid>
         ))}
      </Grid>
    </div>
  );
}

const StyledHighlight = styled(Highlight)`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
`
export default StyledHighlight