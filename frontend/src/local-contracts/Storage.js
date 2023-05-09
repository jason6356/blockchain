import Web3 from 'web3';
import abi from '../ABI/Storage.json'

const web3 = new Web3(Web3.givenProvider);

const vmContract =  new web3.eth.Contract(abi, "0xF40B0EF446C0dEa7970F7251E9afd93297c665B6");

export default vmContract;