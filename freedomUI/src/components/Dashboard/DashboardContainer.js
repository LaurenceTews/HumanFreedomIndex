import React, { Component } from 'react'
import VisualizationContainer from './StyledVisualizationContainer';
import ChartViewer from './ChartViewer';
import ChartContainer from './StyledChartContainer';
import ChartTitle from './StyledChartTitle';
import ChartSelectors from './ChartSelectors';
import Descriptor from './StyledDescriptor';
import DashboardNavbar from './DashboardNavbar';
import smoothscroll from 'smoothscroll-polyfill';
import { 
  getAllCountries, 
  getCategoryDescription, 
  getAllCategories
} from './DashboardApi';
smoothscroll.polyfill();

export default class DashboardContainer extends Component {
  constructor(props){
    super(props);
    this.handleCountryUpdate = this.handleCountryUpdate.bind(this);
    this.handleRankingSwitch = this.handleRankingSwitch.bind(this);
    this.handleSliderUpdate = this.handleSliderUpdate.bind(this);
    this.handleChartReload = this.handleChartReload.bind(this);
    this.handleCategoryUpdate = this.handleCategoryUpdate.bind(this);

    this.state = {
      loading: true,
      isError: false,
      triggerVisualization: false,
      selectedYear: 2016,
      selectedCountry: 'New Zealand',
      isTopSubset: true,
      chartType: 1,
      selectedCategories: [
        null,
        null
      ]
    }
  }

  async componentDidMount() {
    getAllCountries().then(res => {
      this.setState({
        countries: res.data
      });
    });

    getAllCategories().then(res => {
      this.setState({
        categories: res.data
      });
    });

    await this.handleCategoryUpdate("hf_score");
    this.handleCategoryUpdate("ef_score", 1)
  }

  handleCategoryUpdate(cat, index=0) {
    getCategoryDescription(cat).then(res => {
      this.setState(prevState => {
        const cats = prevState.selectedCategories.map((item, i) => {
          if(i === index) {
            return { 
              categoryId: cat,
              categoryName: res.data[0].shortdescription,
              categoryDescription: res.data[0].longdescription,
            }
           } else {
              return item;
            }
          });
          return {
              selectedCategories: cats,
              loading: false 
          }
        })
      });
  }

  handleCountryUpdate(selectedCountry) {
    this.setState({
      selectedCountry
    });
  }

  handleRankingSwitch(value) {
    let isTopSubset = value === "top";
    this.setState({
      isTopSubset
    });
  }

  handleSliderUpdate(selectedYear) {
    this.setState({
      selectedYear
    });
  }

  handleChartReload() {
    const isStacked = window.innerWidth < 1070;
    if(isStacked){
      window.scroll({ top: 800, left: 0, behavior: 'smooth' });
    }
    this.setState({
      triggerVisualization: true
    });
  }

  handleChartTypeChange(chartType) {
    this.setState({
      chartType
    });
  }

  render() {
    if(this.state.loading) {
      return (
        <div>loading...</div>
      )
    }
    else {
      const categoryInfo = this.state.selectedCategories;
      let title, description;
      if(this.state.chartType === 3) {
        title = categoryInfo[0].categoryName + " vs " + categoryInfo[1].categoryName;
        description = "";
      } else {
        title = categoryInfo[0].categoryName;
        description = categoryInfo[0].categoryDescription;
      }

      return (
        <VisualizationContainer>

          <DashboardNavbar updateChartType={(type) => this.handleChartTypeChange(type)}/>

          <ChartSelectors 
            countries={this.state.countries} 
            categories={this.state.categories}
            onCountryChange={this.handleCountryUpdate} 
            onSwitchRanking={this.handleRankingSwitch}
            onSliderUpdate={this.handleSliderUpdate}
            onCategoryChange={this.handleCategoryUpdate}
            onReloadChart={this.handleChartReload}
            chartType={this.state.chartType}
          />

          <ChartContainer>
            <ChartTitle >{title}</ChartTitle>
            <Descriptor>{description}</Descriptor>
        
            <div>
            <ChartViewer 
              chartType={this.state.chartType} 
              categories={this.state.categories}
              isTopSubset={this.state.isTopSubset}
              selectedCountry={this.state.selectedCountry}
              year={this.state.selectedYear}
              triggerVisualization={this.state.triggerVisualization}
              selectedCategories={this.state.selectedCategories}
             />
             </div>
          </ChartContainer>
        
        </VisualizationContainer>
      )
    }
  }
}