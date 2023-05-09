import Contract from '../util/Contract';
import LocalContracts from '../local-contracts/local-contracts.json'

const apiKey = 'GGMCYYXK5MRTDIJ1E926ZAYFS99E6GSI1U'

export default function getLocalContracts(){

    const data = LocalContracts.map(contract => {
        return new Contract(contract.address, contract.ABI, contract.provider);
    })

    return [data];
}

export async function getContractByAddress(address){
    let data = LocalContracts.map(contract => {
        return new Contract(contract.address, contract.ABI, contract.provider);
    })
    .find(contract => contract.contractAddress === address);

    console.log(data)

    if(data) return data;

    const goerliAPI = `https://api-goerli.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=${apiKey}`
    //Try Goerli Network
    let response = await fetch(goerliAPI)
    let actualResponse = await response.json();
    let contractABI = JSON.parse(actualResponse.result);
  
    if(contractABI)
        return new Contract(address, contractABI, 'Goerli');
    

    const sepoliaAPI = `https://api-sepolia.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=${apiKey}`
    //Try Goerli Network
    response = await fetch(goerliAPI)
    actualResponse = await response.json();
    contractABI = JSON.parse(actualResponse.result);

    if(contractABI)
        return new Contract(address, contractABI, 'Sepolia');

    return null;

}