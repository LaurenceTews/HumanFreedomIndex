import React, { Component } from 'react'
import { lightGreen } from '@material-ui/core/colors';
import StepSlider from './StepSlider';
import { withStyles } from '@material-ui/core';

const styles = {
    Toolbar: {
        display: 'flex',
        width: 300,
        backgroundColor: lightGreen
    },
    slider: {
        padding: '20px',
    },
    toolbar: {
        width: 300,
    }
};


export class Toolbar extends Component {

    render() {
    return (
      <div className="Toolbar">
        {/* <StepSlider /> */}
      </div>
    )
  }
}

export default withStyles(styles)(Toolbar);
