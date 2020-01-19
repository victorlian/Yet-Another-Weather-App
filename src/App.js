import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import WeatherTable from './Components/WeatherTable';
import AutoSuggestName from './Components/AutosuggestName';
import API from './api';

import fullCityList from "./Data/city.list.json";


const styles = theme => ({
  grid: {
    background: 'black'
  },
  button: {
    margin: theme.spacing.unit * 2,
    '&:hover': {
      backgroundColor: '#F64C72',
    }
  },
  errorMsg: {
    margin: theme.spacing.unit * 2,
    color: 'red',
  },
  pStyle: {
    fontSize: '45px',
    textAlign: 'center',
    color: '#4155B0'
  },
  toolbar: theme.mixins.toolbar,
  tableContainer: {
    margin: '0% 10%',
  },
});

const defaultCityId = 2193733; //Auckland

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",

      weatherList: [
        {
          day: "Today",
          date: "xxx",
          temp: "yyy",
          description: "zzz"
        },
        {
          day: "Today2",
          date: "xxx",
          temp: "yyy",
          description: "zzz"
        },
        {
          day: "Today3",
          date: "xxx",
          temp: "yyy",
          description: "zzz"
        },
      ],
      cityNamesForSuggestion: [],
      cityNameEntered: "",
      invalid: false,   
      detailIndex: 0, //Which day was selected to show more details
    }
  }


  updateDetailedList = (index) => {
    console.log(index);
    this.setState({
      detailIndex: index
    });
  }

  loadCityNames() {
    let currentComponent = this;

    var cityNameList = fullCityList.map(city => {
      var newObj = {
        label: city.name + ", " + city.country
      }

      return newObj;
    });


    currentComponent.setState({
      cityNamesForSuggestion: cityNameList,
    });


  }

  componentDidMount() {
    this.loadCityNames();
    this.setFiveDayWeatherListWithId(defaultCityId);
  }

  handleNameEntry = (name) => {
    this.setState({ cityNameEntered: name });

  }

  handleGetWeather = () => {
    var id = this.getCityIdByName(this.state.cityNameEntered);
    if (id === -1) {
      this.setState({ invalid: true });
      return;
    }
    //Now call the API with city ID

    this.setFiveDayWeatherListWithId(id);
  }

  setFiveDayWeatherListWithId = (id) => {
    let currentComponent = this;

    API.getWeatherForId(id).then(function (weatherResponse) {
      let timezone = weatherResponse.city.timezone;

      const fiveDayIndex = [0, 8, 16, 24, 32];  //Three hour intervals, 8 => 24 hours i.e. one day
      var fiveDayWeatherList = fiveDayIndex.map(index => {
        const detailedWeatherForDay = weatherResponse.list[index];
        
        const minMax = currentComponent.getMinMaxTemp(index, weatherResponse.list);
        const minTemp = minMax.min;
        const maxTemp = minMax.max;

        return currentComponent.simplifyWeatherData(detailedWeatherForDay, timezone, minTemp, maxTemp);
      })

      currentComponent.setState({
        invalid: false,
        name: weatherResponse.city.name + ", " + weatherResponse.city.country,
        weatherList: fiveDayWeatherList,
        detailIndex: 0,
      })
    });
  }

  getMinMaxTemp = (startingIndex, fullWeatherList) => {
    const indexFor24Hrs = [0, 1, 2, 3, 4, 5, 6, 7];
    const indexToFind = indexFor24Hrs.map(index => index + startingIndex);
    const temps = indexToFind.map(index => {
      return fullWeatherList[index].main.temp;
    });

    const minMax = {
      min: Math.min(...temps),
      max: Math.max(...temps)
    }
    return minMax;
  }

  simplifyWeatherData = (weatherData, timezone, minTemp, maxTemp) => {
    var dateObj = new Date((weatherData.dt + timezone) * 1000);
    const monthText = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const weekText = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let simplifiedData = {
      date: dateObj.getUTCDate(),
      month: monthText[dateObj.getUTCMonth()],
      day: weekText[dateObj.getUTCDay()],
      temp: Math.round(weatherData.main.temp),
      main: weatherData.weather[0].main,
      description: weatherData.weather[0].description,
      min: Math.round(minTemp),
      max: Math.round(maxTemp),
      icon: weatherData.weather[0].icon,
    }

    return simplifiedData;
  }

  getCityIdByName = (name) => {
    var nameSplitted = name.split(',');
    if (nameSplitted.length !== 2) { //Invalid style
      return -1;
    }

    var cityName = nameSplitted[0].trim();
    var countryCode = nameSplitted[1].trim();

    var cityId = -1;
    fullCityList.forEach(city => {
      if (city.name === cityName && city.country === countryCode) {
        cityId = city.id;
      }
    });

    return cityId;
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <AppBar position="absolute">
          <Toolbar>
            <Typography variant="title" color="inherit" noWrap>
              Yet Another Weather App
           </Typography>
          </Toolbar>
        </AppBar>


        <div className={classes.toolbar} />
        <h1 className={classes.pStyle}>Five Day Weather Forecast</h1>
        <div className={classes.tableContainer}>
          <Paper style={{ margin: "5%" }} >
            <Grid container spacing={0}>
              <Grid item xs={4} >
                < AutoSuggestName
                  name={this.state.cityNameEntered}
                  handleNameEntry={this.handleNameEntry}
                  cityNamesForSuggestion={this.state.cityNamesForSuggestion}
                />
              </Grid>
              <Grid item xs={3}>
                <Button variant="contained" color="primary" className={classes.button} onClick={() => this.handleGetWeather()}>
                  Get Weather!
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h6" className={classes.errorMsg}>
                  {this.state.invalid ? 'Invalid city name' : ''}
                </Typography>
              </Grid>
            </Grid>


            <WeatherTable 
              weatherList={this.state.weatherList} 
              cityName={this.state.name} 
              updateDetailedList={this.updateDetailedList} 
              detailIndex={this.state.detailIndex}
            />
          </Paper >
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(App);