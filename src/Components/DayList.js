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
    },
});

class DayList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;

        return (
            <List className={classes.root}>
                <ListItem>
                    <ListItemText primary={this.props.weather.day} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Tomorrow" />
                </ListItem>
            </List>
        );
    }
}

export default withStyles(styles)(DayList);


