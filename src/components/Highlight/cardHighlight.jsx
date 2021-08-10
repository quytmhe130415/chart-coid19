import React from 'react';
import { Grid, Card, CardContent, Typography, makeStyles } from '@material-ui/core';


const useStyles = makeStyles({
  wrapper: (props) => {
    if (props.type === 'confirmed') return { borderLeft: '5px solid #c9302c', borderBottom: '2px solid #dfdfdf' }
    if (props.type === 'recovered') return { borderLeft: '5px solid #28a745', borderBottom: '2px solid #dfdfdf' }
    else return { borderLeft: '5px solid #cecfcf', borderBottom: '2px solid #dfdfdf' }
  },
  title: {
    fontSize: 18,
    marginBottom: 5
  },
  count: {
    fontSize: 18,
    fontWeight: 'bold',
  }
})

function HighlightCart(props) {
  const { title, count, type } = props;
  const classes = useStyles({ type });

  return (
    <div>
      <Card className={classes.wrapper}>
        <CardContent>
          <Typography className={classes.title} component="p" variant="body2">
            {title}
          </Typography>
          <Typography className={classes.count} component="span" variant="body2">
            {count}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default HighlightCart;