// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract SubscriptionManagement {

    mapping(address => ContractEvent[]) public userSubscription;
    address owner;

    event Subscribe(address indexed src, address indexed subscribedContract, string eventSignature);
    
    struct ContractEvent {
        address contractAddress;
        string eventSignature;
        string provider;
        uint256 timestamp;
    }

    modifier onlyOwner{
        require(msg.sender == owner);
        _;
    }

    modifier noDuplicateContractEvent(address contractAddress, string memory eventSignature){
        require(checkDuplicate(contractAddress, eventSignature) == false);
        _;
    }

    constructor(){
        owner = msg.sender;
    }

    function checkDuplicate(address contractAddress, string memory eventSignature) view internal returns (bool){
        ContractEvent[] memory events = userSubscription[msg.sender];
        
        for(uint i = 0; i < events.length; i++){
            if(events[i].contractAddress == contractAddress && compare(events[i].eventSignature, eventSignature))
                return true;
        }

        return false;
    }

    function compare(string memory str1, string memory str2) internal pure returns (bool) {
        return keccak256(abi.encodePacked(str1)) == keccak256(abi.encodePacked(str2));
    }

    function subscribe(address contractAddress, string memory eventSignature, string memory provider) public noDuplicateContractEvent(contractAddress, eventSignature){
        userSubscription[msg.sender].push(
            ContractEvent(contractAddress, eventSignature, provider,block.timestamp)
        );
    }

    function getSubscribedContracts(address userAddress) public view returns (ContractEvent [] memory){
        return userSubscription[userAddress];
    }

}