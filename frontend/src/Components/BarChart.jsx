import {
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  Tooltip
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { useParams } from 'react-router';
import useCurrentContract from '../hooks/useCurrentContract';

Chart.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

function BarChart() {
  const { address } = useParams();
  const [chartData, setChartData] = useState({});
  const currentContract = useCurrentContract(address);
  const [isLoading, setIsLoading] = useState(true);



  useEffect(() => {

    const getChartData = async () => {
      setIsLoading(true);
      try {
        // Get today's date
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        // Get the events emitted for the day
        const events = await currentContract.contractInstance.getPastEvents('allEvents', {
          fromBlock: 0,
          toBlock: 'latest',
          filter: { timestamp: { $gte: today.getTime() / 1000 } },
        });


        // Create an object to count the number of each event emitted
        const eventCounts = {};
        for (const event of events) {
          if (event.event in eventCounts) {
            eventCounts[event.event]++;
          } else {
            eventCounts[event.event] = 1;
          }
        }

        // Generate the chart data
        const data = {
          labels: Object.keys(eventCounts),
          datasets: [
            {
              label: 'Number of Events',
              data: Object.values(eventCounts),
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
            },
          ],
        };

        // Set the chart data state
        setChartData(data);
      } catch (error) {
        console.error(error);
      }
    };
    getChartData();
    setIsLoading(false);
  }, [currentContract]);

  const data = {
    labels: ['Mon', 'Tue', 'Wed'],
    datasets: [
      {
        label: '369',
        data: [3, 6, 9],
        backgroundColor: 'aqua',
        borderColor: 'black',
        borderWidth: 1
      }
    ]
  }
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            stepSize: 10,
          },
          scaleLabel: {
            display: true,
            labelString: 'Number of Events',
          },
        },
      ],
    },
  }

  return (
    <Container>
      <Bar data={isLoading ? data : chartData} options={options} />
    </Container>
  );
}
export default BarChart;
