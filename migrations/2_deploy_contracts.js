var RescueContract = artifacts.require("./Rescue.sol");


module.exports = function(deployer) {

  deployer.deploy(RescueContract);

};
