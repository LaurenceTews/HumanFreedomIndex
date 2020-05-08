import React, { Component } from 'react';
import { Scatter } from 'react-chartjs-2';
import { getCrossCategoryByYear } from './DashboardApi';


export default class ScatterChart extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: null,
            display: false
        };
    };

    componentDidMount() {
        const catX = this.props.selectedCategories[0].categoryId;
        const catY = this.props.selectedCategories[1].categoryId
        this.setChartData(catX, catY, this.props.year);
    }

    componentDidUpdate(prevProps) {
        const categories = this.props.selectedCategories;

        if(prevProps !== this.props) {
            this.setChartData(categories[0].categoryId, categories[1].categoryId, this.props.year);
        } 
    }

    setChartData(categoryX, categoryY, year) {
        getCrossCategoryByYear(categoryX, categoryY, year).then(res => {
            let labels = res.data.flatMap(datapoint => datapoint.country);
            let data = []
            res.data.forEach( country => data.push({
                x: country[categoryX],
                y: country[categoryY]
            }));

            this.setState({
                display: true,
                data: {
                    datasets: [
                        {
                            backgroundColor: '#FFD880',
                            borderColor: '#FF8C80',
                            data: data,
                            fill: false,
                            pointRadius: 4,
                            spansGaps: true
                        }
                    ],
                    labels: labels
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
            let catX = this.props.selectedCategories[0].categoryName;
            let catY = this.props.selectedCategories[1].categoryName;
            return (
                <Scatter 
                data={this.state.data}
                height={500}
                options={{
                    tooltips: {
                        callbacks: {
                            label: function(tooltipItem, data) {
                                var label = data.labels[tooltipItem.index];
                                return label;
                                //   return label + '  ' + catX + ": " + 
                                //   tooltipItem.xLabel + '   ' + catY + ": " + tooltipItem.yLabel;
                            }
                        }
                    },
                    maintainAspectRatio: false,
                    legend: {
                        display: false
                    },
                    scales: {
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: catY,
                                fontSize: 18,
                                padding: 20
                            },
                            ticks: {
                                beginAtZero: false
                            },
                            gridLines: {
                                display: false
                            }
                        }],
                        xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: catX,
                                fontSize: 18,
                                padding: 20
                            },
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