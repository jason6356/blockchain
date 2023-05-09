import { useEffect, useState } from "react";
import { Breadcrumb, Button, Card, CardGroup, Container, Table } from "react-bootstrap";
import { useParams } from "react-router";
import BarChart from './Components/BarChart';
import './Components/css/EventTable.css';
import useCurrentContract from "./hooks/useCurrentContract";
import useMetamask from "./hooks/useMetamask";
import subscriptionContract from "./local-contracts/SubcriptionManagement";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileContract, faNetworkWired, faCoins, faCalendarCheck} from "@fortawesome/free-solid-svg-icons";


function DashBoard() {

    const [account, web3] = useMetamask();

    const { address } = useParams();

    const [contractEvents, setContractEvent] = useState([]);

    const currentContract = useCurrentContract(address);

    const [allEvent, setAllEvent] = useState([]);

    const [contractBalance, setContractBalance] = useState(0);

    const [totalEvents, setTotalEvents] = useState(0);

    const [isLoading, setisLoading] = useState(true);

    useEffect(() => {
        setisLoading(true);

        async function getSubscribedEvents() {
            if (account) {
                //Get the Tuple (Contract Address, Event Signature)
                const results = await subscriptionContract.methods.getSubscribedContracts(account).call();
                console.log(results)

                //Get all the events from the subscription
                const contractEvents = results.filter(
                    result => result['contractAddress'] === address
                )
                    .map(
                        result => result['eventSignature']
                    )
                setContractEvent(contractEvents);
            }
        }
        async function getAllEvents() {
            const data = await currentContract.getEventList();
            setAllEvent(data);
        }
        async function getContractBalance() {
            const balance = await currentContract.getBalance();
            setContractBalance(balance);
        }
        async function getTotalEvents(){
            const events = await currentContract.contractInstance.getPastEvents('allEvents', {
                fromBlock: 0, toBlock: 'latest'
            });
            setTotalEvents(events.length);
        }
        getTotalEvents();
        getContractBalance();
        Promise.all([getSubscribedEvents(), getAllEvents()])
            .then(() => setisLoading(false));
        

    }, [currentContract])

    function convertSecondsToHumanReadable(seconds) {
        const numSeconds = parseInt(seconds, 10);
        const days = Math.floor(numSeconds / (3600 * 24));
        const hours = Math.floor((numSeconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((numSeconds % 3600) / 60);
        const secondsLeft = numSeconds % 60;
        const result = [];

        if (days > 0) {
            result.push(`${days} days`);
        }
        if (hours > 0) {
            result.push(`${hours} hour`);
        }
        if (minutes > 0) {
            result.push(`${minutes} minutes`);
        }
        if (secondsLeft >= 0) {
            result.push(`${secondsLeft} seconds ago`);
        }

        return result.join(' ');
    }

    return (
        <Container>
            <Breadcrumb className="ml-3 mt-3">
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="/view_contracts">Catalog</Breadcrumb.Item>
                <Breadcrumb.Item active>Contract</Breadcrumb.Item>
            </Breadcrumb>

            {/* <hr style={{ backgroundColor: '#ccc', height: 1, marginBottom: 20, marginTop: 20 }} /> */}


            <CardGroup>
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>Contract Address <FontAwesomeIcon icon={faFileContract}/>   </Card.Title>
                        <Card.Text>{address}</Card.Text>
                    </Card.Body>
                </Card>
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>Network <FontAwesomeIcon icon={faNetworkWired}/> </Card.Title>
                        <Card.Text>{!isLoading ? currentContract.contractProvider : 'Loading...'}</Card.Text>
                    </Card.Body>
                </Card>
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>Ethers <FontAwesomeIcon icon={faCoins}/></Card.Title>
                        <Card.Text>Balance : {contractBalance} ETH</Card.Text>
                    </Card.Body>
                </Card>
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>Number Of Events <FontAwesomeIcon icon={faCalendarCheck}/></Card.Title>
                        <Card.Text>Total : {totalEvents} Times</Card.Text>
                    </Card.Body>
                </Card>
            </CardGroup>

            <hr style={{ backgroundColor: '#ccc', height: 1, marginBottom: 20, marginTop: 20 }} />

            <h2>Summary of Events</h2>

            <BarChart address={address} />
            <hr style={{ backgroundColor: '#ccc', height: 1, marginBottom: 20, marginTop: 20 }} />


            <Table>
                <thead>
                    <tr>
                        <th>Event Name</th>
                        <th>Most Recent Calls</th>
                        <th>View</th>
                    </tr>
                </thead>

                {isLoading ? (<h2>Is Loading</h2>) :
                    allEvent.map((event, index) => {
                        return (
                            <tbody key={index}>
                                <tr>
                                    <td className="table-cell">{event.name}</td>
                                    <td className="table-cell">{convertSecondsToHumanReadable(event.age)}</td>
                                    {contractEvents.includes(event.signature) ? (
                                        <td className="table-button"><Button href={`/dashboard/${address}/${event.signature}/${event.name}`}>View</Button></td>
                                    ) : (
                                        <td className="table-button"><Button  href={`/dashboard/${address}/${event.signature}/${event.name}`}>View</Button></td>
                                    )}
                                </tr>
                            </tbody>
                        )
                    })
                }
            </Table>
        </Container>
    );
}

export default DashBoard;