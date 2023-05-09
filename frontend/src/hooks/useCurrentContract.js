import { useState, useEffect } from 'react'
import { getContractByAddress } from '../local-contracts/getLocalContracts';

export default function useCurrentContract(address) {


    const [currentContract, setCurrentContract] = useState(null);

    useEffect(() => {
        async function fetchContract() {
            const data = await getContractByAddress(address);
            setCurrentContract(data);
        }
        fetchContract();
    }, [])

    return currentContract;
}