import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Alert, Button, Card, CardGroup, Container, Fade, Form } from 'react-bootstrap';
import Web3 from 'web3';
import useMetamask from './hooks/useMetamask';
import subscriptionContract from './local-contracts/SubcriptionManagement';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser, faCoins, faCalendarCheck} from'@fortawesome/free-solid-svg-icons'

function App() {

  const [account, web3] = useMetamask();
  const [balance, setBalance] = useState(0);
  const [numOfSubs, setNumOfSubs] = useState(0);
  const [contractAddress, setContractAddress] = useState('');
  const [eventSignature, setEventSignature] = useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showFailureAlert, setShowFailureAlert] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [selectValue, setSelectValue] = useState('')

  useEffect(() => {

    async function getBalance() {
      const balanceinWei = await web3.eth.getBalance(account);
      const balanceinEth = Web3.utils.fromWei(balanceinWei, 'ether');
      setBalance(balanceinEth);
    }

    async function getSubCount(){
      if(account){
        const results = await subscriptionContract.methods.getSubscribedContracts(account).call();
        setNumOfSubs(results.length);
      }
    }

    getBalance();
    getSubCount();

  }, [account])

  //Subcribe
  async function handleSubmit(event) {
    event.preventDefault(); // prevent form submission

    const eventSignatureHash = web3.utils.sha3(eventSignature);
    try {
      const result = await subscriptionContract.methods
        .subscribe(contractAddress, eventSignatureHash, selectValue)
        .send({ from: account });
      console.log(result);

      //Reset the input field
      setShowSuccessAlert(true);
      setSuccess(true);
      setContractAddress('');
      setEventSignature('');
      setSelectValue('Select_Network');
    } catch (error) {
      console.log(error);
      setFailure(true);
      setShowFailureAlert(true);
    }
  }

  return (
    <div className="App">

      <Container className="mt-3">

        <div>
          {account ? (
            <CardGroup>
              <Card>
                <Card.Body>
                  <Card.Title>User <FontAwesomeIcon icon={faUser} /></Card.Title>
                  <Card.Text>{account}</Card.Text>
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <Card.Title>Balance  <FontAwesomeIcon icon={faCoins} /></Card.Title>
                  <Card.Text>{balance}</Card.Text>
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <Card.Title>Total Of Subscribed Events <FontAwesomeIcon icon={faCalendarCheck} /></Card.Title>
                  <Card.Text>{numOfSubs}</Card.Text>
                </Card.Body>
              </Card>
            </CardGroup>
          ) : (
            <h2>Please connect your MetaMask wallet</h2>
          )}
        </div>


        <h1 className="mt-4">Subscription</h1>

        <hr style={{ backgroundColor: '#ccc', height: 1, marginBottom: 20, marginTop: 20 }} />

        <Container className="mt-3">

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formContactAddress">
              <Form.Label>Contract Address</Form.Label>
              <Form.Control
                onChange={(e) => setContractAddress(e.target.value)}
                type="text"
                placeholder="Paste Contract Address Here"
                value={contractAddress}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEventSignature">
              <Form.Label>Event Name</Form.Label>
              <Form.Control
                onChange={(e) => setEventSignature(e.target.value)}
                type="text"
                placeholder="Paste Event Signature Here"
                value={eventSignature}
              />
            </Form.Group>

            <Form.Group className="mb-5" controlId="formNetworkProvider">
              <Form.Label>Network Provider</Form.Label>
              <Form.Select aria-label="Select Network" onChange={(e) => setSelectValue(e.target.value)} value={selectValue}>
                <option value="Select_Network">Select Network</option>
                <option value="Ganache">Ganache</option>
                <option value="Goerli">Goerli</option>
                <option value="Sepora">Sepora</option>
              </Form.Select>
            </Form.Group>

            <Button variant="primary" type="submit">
              Subcribe
            </Button>
          </Form>
          {success ? 
          <Fade in={showSuccessAlert}>
            <Alert key="success" variant="success">
              Successfully Subscribed to the Contract!
            </Alert>
          </Fade> : <></>
          }
          {failure ? 
          <Fade in={showFailureAlert}>
            <Alert key="danger" variant="danger">
              Error has occurred
            </Alert>
          </Fade> : <></>
          }
        </Container>
      </Container>
    </div>
  )
}

export default App;
