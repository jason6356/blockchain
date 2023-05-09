const Storage = artifacts.require('Storage');
const Owner = artifacts.require('Owner');
const Ballot = artifacts.require('Ballot');
const SubscriptionContract = artifacts.require('Subscription');
const SubscriptionManagement = artifacts.require('SubscriptionManagement');
const CompanyContract = artifacts.require('CompanyContract');

module.exports = function(deployer){
    deployer.deploy(Storage);
    deployer.deploy(Owner);
    deployer.deploy(SubscriptionContract);
    deployer.deploy(SubscriptionManagement);
    deployer.deploy(CompanyContract);
}