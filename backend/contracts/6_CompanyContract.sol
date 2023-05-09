// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract CompanyContract {
    // Declare state variables
    struct User {
        bytes32 name;
        bytes32 email;
        bytes32 password;
        bool isLoggedIn;
    }
    struct Donation {
        address donor;
        uint256 amount;
    }
    struct Transaction {
        address from;
        address to;
        uint256 amount;
    }
    mapping(address => User) public users;
    mapping(address => Donation[]) public donations;
    mapping(address => Transaction[]) public transactions;

    // Events
    event UserRegistered(address user);
    event UserLoggedIn(address user);
    event UserLoggedOut(address user);
    event DonationReceived(address company, address donor, uint256 amount);
    event TransactionMade(address company, address from, address to, uint256 amount);

    // Function to register a new user
    function register(bytes32 _name, bytes32 _email, bytes32 _password) public {
        require(users[msg.sender].name == "", "User already registered");
        User memory newUser = User(_name, _email, _password, false);
        users[msg.sender] = newUser;
        emit UserRegistered(msg.sender);
    }

    // Function to log in a user
    function login(bytes32 _email, bytes32 _password) public {
        require(users[msg.sender].name != "", "User not registered");
        require(users[msg.sender].email == _email, "Incorrect email");
        require(users[msg.sender].password == _password, "Incorrect password");
        users[msg.sender].isLoggedIn = true;
        emit UserLoggedIn(msg.sender);
    }

    // Function to log out a user
    function logout() public {
        require(users[msg.sender].isLoggedIn == true, "User not logged in");
        users[msg.sender].isLoggedIn = false;
        emit UserLoggedOut(msg.sender);
    }

    // Function to receive a donation
    function receiveDonation() public payable {
        require(msg.value > 0, "Donation amount must be greater than zero");
        Donation memory newDonation = Donation(msg.sender, msg.value);
        donations[msg.sender].push(newDonation);
        emit DonationReceived(msg.sender, msg.sender, msg.value);
    }

    // Function to make a transaction
    function makeTransaction(address _to) public payable {
        require(msg.value > 0, "Transaction amount must be greater than zero");
        require(users[_to].name != "", "Recipient not registered");
        Transaction memory newTransaction = Transaction(msg.sender, _to, msg.value);
        transactions[msg.sender].push(newTransaction);
        emit TransactionMade(msg.sender, msg.sender, _to, msg.value);
    }

    // Function to get a user's donations
    function getDonations(address _userAddress) public view returns (Donation[] memory) {
        return donations[_userAddress];
    }

    // Function to get a user's transactions
    function getTransactions(address _userAddress) public view returns (Transaction[] memory) {
        return transactions[_userAddress];
    }
}