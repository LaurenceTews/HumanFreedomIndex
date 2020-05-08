import React, { Component } from 'react'
import StyledDashboardNavbar from './StyledDashboardNavbar';

export default class DashboardNavbar extends Component {
  render() {
    return (
        <StyledDashboardNavbar>
        <ul>
            <li onClick={() => this.props.updateChartType(1)}>Category</li>
            <li onClick={() => this.props.updateChartType(2)}>Country</li>
            <li onClick={() => this.props.updateChartType(3)}>Compare</li>
        </ul>    
      </StyledDashboardNavbar>
    )
  }
}
