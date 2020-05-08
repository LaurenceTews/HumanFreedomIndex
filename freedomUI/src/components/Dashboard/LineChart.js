import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { getTimeSeriesByCategory } from './DashboardApi';
 

export default class LineChart extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: null,
        }
    };

    componentDidMount = () => this.componentDidUpdate(0)

    componentDidUpdate(prevProps) {
        if(prevProps !== this.props) {
            this.setChartData(this.props.selectedCountry, this.props.selectedCategories[0].categoryId);
        } 
    }

    setChartData(country, category) {
        getTimeSeriesByCategory(country, category).then(res => {
            let labels = res.data.flatMap(datapoint => datapoint.year);
            let data = res.data.flatMap(datapoint => datapoint[category]);
            this.setState({
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
        return (
            <Line 
            data={this.state.data}
            height={500}
            options={{
                maintainAspectRatio: false,
                legend: {
                    display: false
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: false
                        },
                        gridLines: {
                            display: false
                        }
                    }],
                    xAxes: [{
                        // scaleLabel: {
                        //     display: true,
                        //     labelString: "Year",
                        //     fontSize: 18,
                        //     padding: 20
                        // },
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