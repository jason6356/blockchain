import {useEffect, useState} from 'react';
import LocalContracts from '../local-contracts/local-contracts.json'
import Contract from '../util/Contract'

export default function useLocalContract(){

 const [contracts, setContracts] = useState([]);

  useEffect(() => {
    const data = LocalContracts.map(contract => {
        return new Contract(contract.address, contract.ABI, contract.provider);
    })
    setContracts(data);
  },[]);

  return [contracts];
}