import SubscriptionABI from '../ABI/SubscriptionManagement.json';
import Web3 from 'web3';

const web3 = new Web3(Web3.givenProvider);

const subscriptionContract =  new web3.eth.Contract(SubscriptionABI, "0x9c71BCf2E7B425223A6E2B15Ff82B76F34B2aaC6");

export default subscriptionContract;
