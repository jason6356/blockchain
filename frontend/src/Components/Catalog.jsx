import Contracts from "./Contracts";
import {Container, Row, Col} from 'react-bootstrap';
import subscriptionContract from "../local-contracts/SubcriptionManagement";
import { useEffect } from "react";

function Catalog(props){

    const arr = props.contracts;
    console.log(arr)

    const rows = arr.reduce((acc, cur, i) => {
        if (i % 3 === 0) {
          acc.push([]);
        }
        acc[acc.length - 1].push(cur);
        return acc;
      }, []);

      const grid = rows.map((row, i) => (
        <Row key={i} className="mt-5">
          {row.map((item, j) => (
            <Col key={j}>
                <Contracts address={item.contractAddress} provider={item.provider}></Contracts>
            </Col>
          ))}
        </Row>
      ));
    

    return (

        <Container>
            {grid}
        </Container>   
    );
}


export default Catalog;