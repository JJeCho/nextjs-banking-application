"use client"

import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({accounts}: DoughnutChartProps) => {
    const data = {
        datasets: [
            {
                label: 'Banks',
                data: [1250, 7482, 3145],
                backgroundColor: [
                    '#0747b6', '#2265d8', '#2f91fa'
                ]

            }
        ],
        labels: [
            'Bank A', 'Bank B', 'Bank C'
        ]
    }
  return (
    <Doughnut 
    data={data}
    options={{
        cutout: '70%',
        plugins: {
            legend: {
                display: false
            }
        }
    }}
    />
  )
}

export default DoughnutChart