import React, { Component } from 'react'
import Slider from '@material-ui/lab/Slider';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    root: {
        width: 300,
    },
    slider: {
        padding: '20px',
    },
};


export class StepSlider extends Component {
    state = {
        value: 2015,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    }

    render() {
        const { classes } = this.props;
        const { value } = this.state;


    return (
        <Slider 
            classes={{ container: classes.slider }}
            value={value}
            min={1980}
            max={2016}
            step={1}
            onChange={this.handleChange}
        />
    )
  }
}

export default withStyles(styles)(StepSlider);
