import { useState, useEffect} from 'react';
import Web3 from 'web3'

//Get MetaMask Account
function useMetamask(){


    const [account, setAccount] = useState(null);
    const [web3, setWeb3] = useState(null);

    useEffect(() => {

        const init = async () => {
            const { web3, accounts } = await initWeb3();
            setWeb3(web3);
            setAccount(accounts[0]);
        };

        init();

    },[])
    

    return [account, web3];

}

async function initWeb3() {
    if (window.ethereum) {
      try {
        // Request account access if needed
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        // Set web3 instance
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        //console.log(accounts)
        //console.log('Connected to Metamask!');
        return { web3, accounts };
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log('Metamask not detected. Please install Metamask to connect to the Ethereum network.');
    }
  }

export default useMetamask;

