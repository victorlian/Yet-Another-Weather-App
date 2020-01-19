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

const styles = theme => ({
  button: {
    margin: theme.spacing.unit * 2,
    '&:hover': {
      backgroundColor: '#F64C72',
    }
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
    }
  }


  // componentDidMount() {
  //   var searchID = this.getUrlParams("searchID");

  //   console.log(searchID);

  //   if (searchID == null) {
  //     searchID = 5;
  //   }

  //   let currentComponent = this, data;
  //   API.getGroupsInSearch(searchID).then((response) => {
  //     data = response;
  //     data.forEach((element, index) => {
  //       API.getPeopleInGroup(element.id).then((response) => {
  //         data[index].people = response;
  //         currentComponent.setState({
  //           groups: data,
  //         });
  //       });
  //     });
  //   });
  // }

  handleNameEntry = (name) => {
    this.setState({ name: name });
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
        <h1 className={classes.pStyle}>Five Day Weather Forecast For Any City</h1>
        <div className={classes.tableContainer}>
          <Paper style={{ margin: "5%" }} >

            <Grid container spacing={0}>
              <Grid item xs={2}>
                <AutoSuggestName
                  name={this.state.name}
                  handleNameEntry={this.handleNameEntry}
                  personsForSuggestion={this.state.personsForSuggestion}
                />
              </Grid>
              <Grid item xs={2}>
                <Button variant="contained" color="primary" className={classes.button}>
                  Start a new search
                </Button>
              </Grid>
            </Grid>

            <WeatherTable weatherList={this.state.weatherList} />
          </Paper >
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(App);