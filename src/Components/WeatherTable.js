import React from 'react';
import Table from '@material-ui/core/Table';
import { withStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';


import DayList from './DayList';
import DetailedList from './DetailedList';

const styles = theme => ({

});


class WeatherTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Table >
          <TableBody>
            <TableRow>
              {this.props.weatherList.map(dayWeather => {
                return (
                  <TableCell>
                    <DayList weather={dayWeather} />
                  </TableCell>
                );
              })}
            </TableRow>

            <TableRow>
              <DetailedList weather={this.props.weatherList[0]} />
            </TableRow>

          </TableBody>
        </Table>
        
      </div>
    );
  }
}

export default withStyles(styles)(WeatherTable);


