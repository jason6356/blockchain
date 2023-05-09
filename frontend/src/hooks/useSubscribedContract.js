import {useEffect, useState} from 'react';
import subscriptionContract from '../local-contracts/SubcriptionManagement';

function useSubscribedContract(accountAddress){

    const [subscribedContract, setSubscribedContract] = useState([]);

    useEffect(() => {

        async function getSubContract(){
            if(accountAddress){
                const results = await subscriptionContract.methods.getSubscribedContracts(accountAddress).call();
                console.log(results[0]['contractAddress'])
                const addresses = results.map(
                    result => result['contractAddress']
                );
                console.log()
                const uniqueAddress = [... new Set(addresses)];
                setSubscribedContract(uniqueAddress);
            }
        }
        getSubContract();

    },[accountAddress]);

    return [subscribedContract];
}

export default useSubscribedContract;