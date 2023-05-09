import Web3 from 'web3';

export default class Contract {

    constructor(
        contractAddress,
        contractABI,
        contractProvider
    ) {
        this.contractAddress = contractAddress;
        this.contractABI = contractABI;
        this.contractProvider = contractProvider;

        switch (contractProvider) {
            case 'Ganache':
                this.web3 = new Web3(Web3.givenProvider);
                break;
            case 'Goerli':
                this.web3 = new Web3('https://eth-goerli.g.alchemy.com/v2/J0r4HncWaCOXf0EsYHEnDz26fj3Sla3i');
                break;
            case 'Sepolia':
                this.web3 = new Web3('https://eth-sepolia.g.alchemy.com/v2/0qa4mNIYOwQeUgs1nJl3_X6sDRcuPkuE+');
                break;
        }

        this.contractInstance = new this.web3.eth.Contract(this.contractABI, this.contractAddress);
    }

    getWeb3() {
        return this.web3;
    }

    async getEventList() {

        const events = await this.contractInstance.getPastEvents('allEvents', {
            fromBlock: 0, toBlock: 'latest'
        });

        const sortedEvents = events.sort((a,b) => b.blockNumber - a.blockNumber);
        const uniqueEvents = new Set();
        const filteredEvents = [];
        const latestBlockNumber = await this.web3.eth.getBlockNumber();
        const latestBlock = await this.web3.eth.getBlock(latestBlockNumber);

        await Promise.all(sortedEvents.map(async event => {
            const eventName = event.event;
            const eventSignature = event.raw.topics[0];
            const eventIdentifier = `${eventName}:${eventSignature}`;
            const eventBlock = await this.web3.eth.getBlock(event.blockNumber);
            const age = latestBlock.timestamp - eventBlock.timestamp;
            

            if (!uniqueEvents.has(eventIdentifier)) {
                uniqueEvents.add(eventIdentifier);
                filteredEvents.push({
                    name: eventName,
                    signature: eventSignature,
                    age: age
                });
            }
        }));

        return filteredEvents;
    }

    async getBalance() {
        const balance = await this.web3.eth.getBalance(this.contractAddress);
        return this.web3.utils.fromWei(balance, 'ether');
    }

}