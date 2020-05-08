import React, { Component } from 'react'
import { Select } from 'antd';
import DropdownLabel from './StyledSelectorLabel';

const Option = Select.Option;

export class CountrySelector extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(value) {
    this.props.onCountryChange(value);
  }

  render() {
    let data = []
    if(this.props.countries) {
      data = this.props.countries;
    } 
    return (
      <React.Fragment>
        <DropdownLabel>Country</DropdownLabel>
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Select a country"
          optionFilterProp="children"
          onChange={this.handleChange}
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
        {data.map(d => <Option key={d.country}>{d.country}</Option>)}
        </Select>
      </React.Fragment>
    ) 
  }
}

export default CountrySelector
