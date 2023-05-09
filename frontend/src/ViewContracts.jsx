import { Breadcrumb, Button, Container, Form } from 'react-bootstrap';
import Catalog from './Components/Catalog'
import {useEffect, useState} from 'react';
import subscriptionContract from './local-contracts/SubcriptionManagement';
import useMetamask from './hooks/useMetamask';

export default function ViewContracts() {

    const [account, web3] = useMetamask();
    const [subscribedContract, setSubscribedContract] = useState([]);

    useEffect(() => {

        async function getSubContract(){
            if(account){
                const results = await subscriptionContract.methods.getSubscribedContracts(account).call();
                const uniquePairs = new Set();
                const addresses = [];
                results.forEach(e => {
                    const itemIdentifier = `${e.contractAddress}:${e.provider}`
                    if(!uniquePairs.has(itemIdentifier)){
                        uniquePairs.add(itemIdentifier);
                        addresses.push(e)
                    }
                })
                console.log(addresses)
                setSubscribedContract(addresses);
            }
        }
        getSubContract();

    },[account]);

    return (
        <Container>
            <Breadcrumb className="ml-3 mt-3">
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item active >Catalog</Breadcrumb.Item>
            </Breadcrumb>
            <h1 className="mt-3 mb-3">Subscribed Contracts</h1>
            <Catalog contracts={subscribedContract} />
        </Container>

    );
}