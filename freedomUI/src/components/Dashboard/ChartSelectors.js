import React, { Component } from 'react'
import { Radio, Slider } from 'antd';
import '../../App.css';
import YearPicker from './StyledYearPicker';
import CountrySelector from './CountrySelector';
import CategorySelector from './CategorySelector';
import ChartSelectorsContainer from './StyledChartSelectorsContainer';
import ChartSelector from './StyledChartSelector';
import SelectorLabel from './StyledSelectorLabel';

export default class ChartSelectors extends Component {
  constructor(props) {
    super(props);
    this.onCountryChange = this.onCountryChange.bind(this);
    this.onSwitchRanking = this.onSwitchRanking.bind(this);
    this.onSliderUpdate = this.onSliderUpdate.bind(this);
    this.onReloadChart = this.onReloadChart.bind(this);
    this.onCategoryChange = this.onCategoryChange.bind(this);
  }

  onCountryChange(value) {
    this.props.onCountryChange(value);
  }

  onSwitchRanking({ target }) {
    this.props.onSwitchRanking(target.value);
  }

  onSliderUpdate(year) {
    this.props.onSliderUpdate(year);
  }

  onReloadChart() {
    this.props.onReloadChart();
  }

  onCategoryChange(category, index) {
    this.props.onCategoryChange(category, index);
  }

  categorySelector(index=0) {
    return (
      <ChartSelector>
        <CategorySelector onCategoryChange={cat => this.onCategoryChange(cat, index)} categories={this.props.categories} />
      </ChartSelector>
    );
  }

  render() {
    const selectorHeader = <h1>Explore The Data</h1>;

    const radioButton = (
      <ChartSelector>
        <Radio.Group defaultValue="top" buttonStyle="solid" onChange={this.onSwitchRanking}>
            <Radio.Button value="top" >Top</Radio.Button>
            <Radio.Button value="bottom">Bottom</Radio.Button>
        </Radio.Group>
      </ChartSelector>
    );

    const yearSlider = (
      <ChartSelector>
        <YearPicker >
          <SelectorLabel>Year</SelectorLabel>
          <Slider 
            className="slider" 
            min={2008} 
            max={2016} 
            defaultValue={2016}
            onAfterChange={this.onSliderUpdate} 
          />
        </YearPicker>
    </ChartSelector>
    );

    // const categorySelector = (
    //   <ChartSelector>
    //     <CategorySelector onCategoryChange={this.onCategoryChange} categories={this.props.categories} />
    //   </ChartSelector>
    // );

    const countrySelector = (
      <ChartSelector>
        <CountrySelector onCountryChange={this.onCountryChange} countries={this.props.countries} />
      </ChartSelector>
    );

    switch(this.props.chartType) {
      case 1:
        return (
          <ChartSelectorsContainer>
            {selectorHeader}
            {radioButton}
            {yearSlider}
            {this.categorySelector()}
          </ChartSelectorsContainer>
        );
      case 2:
        return (
          <ChartSelectorsContainer>
            {selectorHeader}
            {countrySelector}
            {this.categorySelector()}
          </ChartSelectorsContainer>
        );
      case 3:
        return (
          <ChartSelectorsContainer>
            {selectorHeader}
            {yearSlider}
            {this.categorySelector()}
            {this.categorySelector(1)}
          </ChartSelectorsContainer>
        );
      default:
        return (
          <ChartSelectorsContainer>
            {selectorHeader}
            {radioButton}
            {yearSlider}
            {this.categorySelector()}
          </ChartSelectorsContainer>
        );
    }
  }
}