import { useEffect, useState } from 'react';
import { Breadcrumb, Container, Table } from 'react-bootstrap';
import { useParams } from 'react-router';
import getLocalContracts, { getContractByAddress } from './local-contracts/getLocalContracts';
import useCurrentContract from './hooks/useCurrentContract';
import Contract from './util/Contract'

function EventLogs() {

    const { address, eventSignature, eventName } = useParams();
    const [eventLogs, setEventLogs] = useState([]);
    const currentContract = useCurrentContract(address);
    const [latestBlock, setLatestBlock] = useState(0);


    useEffect(() => {

        async function getEventLogs() {
            const events = await currentContract.contractInstance.getPastEvents(eventName, {
                fromBlock: 0,
                toBlock: 'latest',
                address: address,
                topics: [eventSignature]
            });

            console.log(events)
            setEventLogs(events);
            localStorage.setItem(address + eventSignature, JSON.stringify(events));
        }
        const savedData = localStorage.getItem(address + eventSignature);
        if (savedData) {
            console.log('Local Storage Detected!')
            setEventLogs(JSON.parse(savedData));
        }
        getEventLogs();


    }, [currentContract]);

    const truncateHash = (hash, length) => {
        if (hash.length <= length) {
            return hash;
        } else {
            return hash.slice(0, length) + '...';
        }
    }

    const [showFullHash, setShowFullHash] = useState(false);

    return (
        <Container>
            <Breadcrumb className="ml-3 mt-3">
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="/view_contracts">Catalog</Breadcrumb.Item>
                <Breadcrumb.Item href={`/dashboard/${address}`}>Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item active>Event</Breadcrumb.Item>
            </Breadcrumb>

            <hr style={{ backgroundColor: '#ccc', height: 1, marginBottom: 20, marginTop: 20 }} />

            <h2>Event Logs of the event : {eventName}</h2>

            {eventLogs.length <= 0 ? (<h1>No Logs Yet!</h1>) :
                (

                    <Table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Block Number</th>
                                <th>Transaction Hash</th>
                                <th>Event Name</th>
                                {
                                    Object.keys(eventLogs[0].returnValues).filter(e => isNaN(e)).map(e => (<th>{e}</th>))
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {eventLogs.map((log) => (
                                <tr key={log.id}>
                                    <td>{log.id}</td>
                                    <td>{log.blockNumber}</td>
                                    <td>{log.transactionHash.slice(0, 5) + '...'}</td>
                                    <td>{eventName}</td>
                                    {Object.keys(log.returnValues).filter(e => isNaN(e)).map(e => (<td>{log.returnValues[e].length > 10 ? log.returnValues[e].slice(0, 10) + '...' : log.returnValues[e]}</td>))}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
        </Container>
    );
}

export default EventLogs;