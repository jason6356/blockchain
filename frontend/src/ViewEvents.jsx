import Table from 'react-bootstrap/Table';
import vmContract from './local-contracts/Storage';
import {useState, useEffect} from 'react'
import useLocalContract from './hooks/useLocalContract';

export default function ViewEvent() {

    const [events, setEvents] = useState([]);
    const [localContracts] = useLocalContract();


    useEffect (() => {

        const loadEvents = async() => {

            const eventList = await vmContract.getPastEvents("allEvents", {
                filter : {
                    eventName : "Store"
                },
                fromBlock : 0,
                toBlock : 'latest',
            });

            eventList.forEach(e => console.log(e.signature))
            setEvents(eventList);
        }
        loadEvents();

    },[]);


  return (
   <Table striped bordered hover>
      <thead>
        <tr>
          <th>Event Name</th>
          <th>Event Data</th>
        </tr>
      </thead>
      <tbody>
        {events.map((event, index) => (
          <tr key={index}>
            <td>{event.event}</td>
            <td>{JSON.stringify(event.returnValues)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
