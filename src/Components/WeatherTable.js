import React from 'react';
import Table from '@material-ui/core/Table';
import { withStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import Typography from '@material-ui/core/Typography';



import DayList from './DayList';
import DetailedList from './DetailedList';

const styles = theme => ({
  bg: {
    background: 'black'
  },
  title: {
    padding: '0 1%'
  },
});


class WeatherTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    const { classes } = this.props;
    var cellIndex = 0;

    return (
      <div>
        <Typography className={classes.title} variant="h6">
          Weather forecast for {this.props.cityName}
        </Typography>
        <Table >
          <TableBody>
            <TableRow>
              {this.props.weatherList.map(dayWeather => {
                return (
                  <TableCell>
                    <DayList index={cellIndex++} weather={dayWeather} updateDetailedList={this.props.updateDetailedList}/>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableBody>
        </Table>
        <DetailedList weather={this.props.weatherList[this.props.detailIndex]} />
      </div>
    );
  }
}

export default withStyles(styles)(WeatherTable);


