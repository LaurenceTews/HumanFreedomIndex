import React, { Component } from 'react';
import { Bar, Chart } from 'react-chartjs-2';
import { getTopByCategory } from './DashboardApi';

Chart.defaults.global.defaultFontColor = 'black';
Chart.defaults.global.defaultFontFamily = "'Segoe UI', 'Roboto', 'Oxygen','Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'";

const topColours = [            
    '#70DD88', 
    '#7EDC87',
    '#8CDC86',
    '#9ADB85',
    '#A9DB84',
    '#B7DA84',
    '#C5DA83',
    '#D4D982',
    '#E2D981',
    '#F0D880',
    '#FFD880'    
];

const bottomColours = [
    '#FF8C80',
    '#FF9380',
    '#FF9B80',
    '#FFA280',
    '#FFAA80',
    '#FFB280',
    '#FFB980',
    '#FFC180',
    '#FFC880',
    '#FFD080',
    '#FFD880'
];

export default class BarChart extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: null,
        }
    };

    componentDidMount() {
        this.handleSetChartData(this.props);
    }

    componentDidUpdate(prevProps) {
        if(prevProps !== this.props) {
            this.handleSetChartData(this.props);
        }
    }

    handleSetChartData({ selectedCategories, year, isTopSubset}) {
        this.setChartData(selectedCategories[0].categoryId, year, isTopSubset ? "desc" : "asc")
    }

    setChartData(cat, year, sortOrder) {
        getTopByCategory(cat, year, sortOrder).then(res => {
            this.setState({
              data: {
                datasets: [
                    {
                        backgroundColor: this.props.isTopSubset ? topColours : bottomColours,
                        borderColor: 'white',
                        data: res.data.flatMap(datapoint => datapoint[cat])
                    }
                ],
                labels: res.data.flatMap(datapoint => datapoint.country)
              }
            });
        });
    }

  render() {
      if(!this.state.data) {
          return (
              <div>loading...</div>
          )
      }
      else {      
        return (
            <Bar 
            data={this.state.data}
            height={500}
            options={{
                maintainAspectRatio: false,
                legend: {
                    display: false,
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: false,
                        },
                        gridLines: {
                            display: false
                        }
                    }],
                    xAxes: [{
                            gridLines: {
                                display: false
                            },
                            barPercentage: 1,
                    }],
                }
              }}
            />
        )
    }
  }
}
