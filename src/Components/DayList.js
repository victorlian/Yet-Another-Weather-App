import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        '&:hover': {
            backgroundColor: '#d3d3d3', //Light grey
            cursor: 'pointer',
        }
    },
});

class DayList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;

        const dateString = this.props.weather.date + " " + this.props.weather.month;
        const tempString = this.props.weather.temp + " °C"

        return (
            <List className={classes.root} onClick={() => this.props.updateDetailedList(this.props.index)}>
                <ListItem>
                    <ListItemText primary={this.props.weather.day} />
                </ListItem>
                <ListItem>
                    <ListItemText primary={dateString} />
                </ListItem>
                <ListItem>
                    <ListItemText primary={tempString} />
                </ListItem>
                <ListItem>
                    <ListItemText primary={this.props.weather.main} />
                </ListItem>
            </List>
        );
    }
}

export default withStyles(styles)(DayList);


