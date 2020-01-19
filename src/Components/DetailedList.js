import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    title: {
        margin: theme.spacing(4, 2, 2),
        fontSize: 18,
    },
});

class DetailedList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;


        const dateString = this.props.weather.date + " " + this.props.weather.month;
        const tempString = this.props.weather.min + " - " + this.props.weather.max + " °C";

        return (
            <div>
                <Typography varient="h3" className={classes.title}>
                    More detailed Weather:
                </Typography>
                <List className={classes.root}>
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
                        <ListItemText primary={this.props.weather.description} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={this.props.weather.icon} />
                    </ListItem>
                </List>
            </div>
        );
    }
}

export default withStyles(styles)(DetailedList);


