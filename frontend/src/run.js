import Web3 from 'web3';

const CompanyABI =
	[
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "address",
					"name": "company",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "address",
					"name": "donor",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}
			],
			"name": "DonationReceived",
			"type": "event"
		},
		{
			"inputs": [
				{
					"internalType": "bytes32",
					"name": "_email",
					"type": "bytes32"
				},
				{
					"internalType": "bytes32",
					"name": "_password",
					"type": "bytes32"
				}
			],
			"name": "login",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "logout",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_to",
					"type": "address"
				}
			],
			"name": "makeTransaction",
			"outputs": [],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "receiveDonation",
			"outputs": [],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "bytes32",
					"name": "_name",
					"type": "bytes32"
				},
				{
					"internalType": "bytes32",
					"name": "_email",
					"type": "bytes32"
				},
				{
					"internalType": "bytes32",
					"name": "_password",
					"type": "bytes32"
				}
			],
			"name": "register",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "address",
					"name": "company",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "address",
					"name": "from",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "address",
					"name": "to",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}
			],
			"name": "TransactionMade",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "address",
					"name": "user",
					"type": "address"
				}
			],
			"name": "UserLoggedIn",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "address",
					"name": "user",
					"type": "address"
				}
			],
			"name": "UserLoggedOut",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "address",
					"name": "user",
					"type": "address"
				}
			],
			"name": "UserRegistered",
			"type": "event"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "donations",
			"outputs": [
				{
					"internalType": "address",
					"name": "donor",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_userAddress",
					"type": "address"
				}
			],
			"name": "getDonations",
			"outputs": [
				{
					"components": [
						{
							"internalType": "address",
							"name": "donor",
							"type": "address"
						},
						{
							"internalType": "uint256",
							"name": "amount",
							"type": "uint256"
						}
					],
					"internalType": "struct CompanyContract.Donation[]",
					"name": "",
					"type": "tuple[]"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_userAddress",
					"type": "address"
				}
			],
			"name": "getTransactions",
			"outputs": [
				{
					"components": [
						{
							"internalType": "address",
							"name": "from",
							"type": "address"
						},
						{
							"internalType": "address",
							"name": "to",
							"type": "address"
						},
						{
							"internalType": "uint256",
							"name": "amount",
							"type": "uint256"
						}
					],
					"internalType": "struct CompanyContract.Transaction[]",
					"name": "",
					"type": "tuple[]"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "transactions",
			"outputs": [
				{
					"internalType": "address",
					"name": "from",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "to",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"name": "users",
			"outputs": [
				{
					"internalType": "bytes32",
					"name": "name",
					"type": "bytes32"
				},
				{
					"internalType": "bytes32",
					"name": "email",
					"type": "bytes32"
				},
				{
					"internalType": "bytes32",
					"name": "password",
					"type": "bytes32"
				},
				{
					"internalType": "bool",
					"name": "isLoggedIn",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		}
	];

const contractAddress = '0x007072cF692257E553731461a6fbD82C23d5bCB1'

const web3 = new Web3('https://eth-goerli.g.alchemy.com/v2/J0r4HncWaCOXf0EsYHEnDz26fj3Sla3i');
const version = web3.version.api;

const account = '0x66B3B256b43ea75986B5fAcfE7f02A154e8bC0dD';

const apiUrl = `https://api-goerli.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=GGMCYYXK5MRTDIJ1E926ZAYFS99E6GSI1U`


async function getABI(contractAddress) {

	//	console.log(apiUrl)
	var contractABI = "";
	const response = await fetch(apiUrl);
	const actualResponse = await response.json();

	console.log(actualResponse)
	contractABI = JSON.parse(actualResponse.result)

	if (contractABI != '') {
		var MyContract = new web3.eth.Contract(contractABI, contractAddress);

		const latestBlock = await web3.eth.getBlockNumber();

		const events = await MyContract.getPastEvents('allEvents', {
			fromBlock: 0, toBlock: 'latest'
		});
		events.forEach(e => console.log(e.event))

	} else {
		console.log("Error");
	}
}

async function emitEvent() {
	const web3 = new Web3('http://127.0.0.1:7545');
	const accounts = await web3.eth.getAccounts();
	const contract = new web3.eth.Contract(CompanyABI, '0xd676c8f23321677144fD1F1575561c27dC8cC6e2');
	console.log(accounts);

	accounts.forEach(async e => {

		const name = 'John Doe';
		const email = 'JohnDoe@gmail.com';
		const password = '1234';

		let r1 = Web3.utils.asciiToHex(name);
		let r2 = Web3.utils.asciiToHex(email);
		let r3 = Web3.utils.asciiToHex(password);

		try {
			const response = await contract.methods.register(r1, r2, r3).send({ from: e, gas: 1000000 });
			console.log(response)
		} catch (err) {
			console.log(err)
		}
	})

	const filteredAccounts = accounts.filter((e, i) => i === Math.floor(Math.random()) * accounts.length);

	console.log(filteredAccounts)

	filteredAccounts.forEach(async e => {
		const email = 'JohnDoe@gmail.com';
		const password = '1234';
		let r1 = Web3.utils.asciiToHex(email);
		let r2 = Web3.utils.asciiToHex(password);

		try {
			const response = await contract.methods.login(r1, r2).send({ from: e, gas: 1000000 });
			console.log(response)
		} catch (err) {
			console.log(err)
		}

		try {
			const response = await contract.methods.logout().send({ from: e, gas: 1000000 });
			console.log(response)
		} catch (err) {
			console.log(err)
		}

	})

	const transactionAccounts = accounts.slice(0,accounts.length / 2);

	transactionAccounts.forEach(async e => {
		const randomIndex = Math.floor(Math.random()) * accounts.length;
		const randomEther = Math.random() * 10;

		try {
			const response = await contract.methods.makeTransaction(accounts[randomIndex]).send({ from: e, gas: 1000000, value : ethers});
			console.log(response)
		} catch (err) {
			console.log(err)
		}

	})

}

emitEvent();

