import {ButtonGroup, Button} from 'react-bootstrap'
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import contract from '../assets/contract.jpg';

function Contracts(props){

    return (
        <>
            <Card style = { {width : '18rem'}}>
                <Card.Img variant= "top" src={contract}></Card.Img>
                <Card.Body>
                    <Card.Title>{props.name}</Card.Title>
                    <Card.Text>Provider : {props.provider}</Card.Text>
                    <Card.Text>Address : {props.address}</Card.Text>
                        <Button href={`/dashboard/${props.address}`}>View DashBoard</Button>
                </Card.Body>
            </Card>        
        </>

   );

}

export default Contracts;