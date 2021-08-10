import react, { useState, useEffect, useRef, useCallback, useContext } from 'react'
import PropTypes from 'prop-types';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { Grid, Card, CardContent, Typography, makeStyles, ButtonGroup, Button } from '@material-ui/core';
import moment from 'moment';

LineChart.propTypes = {
  className: PropTypes.string

};

LineChart.defaultProps = {
  className: '',
};

// const useStyles = makeStyles((theme) => ({
//   container: {
//   }
// }))

const generateOptions = (data) => {
  const categories = data.map((item) => moment(item.Date).format('DD/MM/YYYY'))
  return {
    chart: {
      height: 500,
    },
    title: {
      text: 'Total number of covid cases '
    },
    xAxis: {
      categories: categories,
      crosshair: true,
    },
    colors: ['#F3585B'],
    yAxis: {
      min: 0,
      title: {
        text: null
      },
      labels: {
        align: 'right',
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color}; padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y} cases</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      columns: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series: [
      {
        name: 'Total number of covid cases',
        data: data.map((item) => item.Confirmed)
      }
    ]
  }
}


function LineChart(props) {
  const { classes, data } = props;
  const [options, setOptions] = useState({});
  const [reportType, setReportType] = useState('all');



  useEffect(() => {
    let handleData = [];
    //change reportType
    switch (reportType) {
      case 'all':
        handleData = data;
        break;
      case '30':
        handleData = data.slice(data.length - 30);
        break;
      case '7':
        handleData = data.slice(data.length - 7);
        break;
      default:
        handleData = data;
        break;
    }

    setOptions(generateOptions(handleData));
  }, [data, reportType])

  const handleOnClick = (typeReport) => {
    setReportType(typeReport)
  }
  // classes = useStyles();
  return (
    <div>
      <div>
        <ButtonGroup size="small" style={{ marginTop: '5px', display: 'flex', justifyContent: 'flex-end' }}>
          <Button color={reportType === 'all' ? 'secondary' : ''} onClick={() => handleOnClick('all')} >Show All</Button>
          <Button color={reportType === '30' ? 'secondary' : ''} onClick={() => handleOnClick('30')}>30 days</Button>
          <Button color={reportType === '7' ? 'secondary' : ''} onClick={() => handleOnClick('7')}>7 days</Button>
        </ButtonGroup>
      </div>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      >
      </HighchartsReact>
    </div>
  );
}

// const StyledLineChart = styled(LineChart)`
//   * {
//     padding: 0;
//     margin: 0;
//     box-sizing: border-box;
//   }
// `
export default LineChart