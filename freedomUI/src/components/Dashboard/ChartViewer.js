import React, { Component } from 'react'
import BarChart from './BarChart';
import LineChart from './LineChart';
import ScatterChart from './ScatterChart';

export default class ChartViewer extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    };

  render() {
    switch(this.props.chartType) {
        case 1:
            return <BarChart year={this.props.year} isTopSubset={this.props.isTopSubset} selectedCategories={this.props.selectedCategories}/>;
        case 2:
            return <LineChart selectedCountry={this.props.selectedCountry} selectedCategories={this.props.selectedCategories} />;
        case 3:
            return <ScatterChart selectedCategories={this.props.selectedCategories} year={this.props.year} />;
        default:
            return <div>nothing to see here</div>;
    }  
  }
}