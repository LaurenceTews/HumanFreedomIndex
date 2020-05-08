import React, { Component } from 'react'
import { Select } from 'antd';
import DropdownLabel from './StyledSelectorLabel';

const Option = Select.Option;
// should merge this with the country selector class as they are similar

export class CategorySelector extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(value) {
    this.props.onCategoryChange(value);
  }

  render() {
    let data = []
    if(this.props.categories) {
      data = this.props.categories;
    }

    return (
      <React.Fragment>
        <DropdownLabel>Category</DropdownLabel>
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Select a category"
          optionFilterProp="children"
          onChange={this.handleChange}
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
        {data.map(d => <Option key={d.categoryid}>{d.shortdescription}</Option>)}
        </Select>
      </React.Fragment>
    ) 
  }
}

export default CategorySelector
