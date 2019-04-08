pragma solidity ^0.5.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Rescue.sol";


contract TestRescueContract {

    // Rescue rescue = Rescue(DeployedAddresses.Rescue());

    bool isRegistered = true;

    uint userCount = 0;

    string name = "John";
    string location = "Hollywood CA";

    Rescue rescue = Rescue(DeployedAddresses.Rescue());

    function newone() public {
        uint expected = rescue.getUserCount();
        Assert.equal(userCount, expected, "Should Both Equal 0");
    }

}





    // function newaddresscanRegister() public {
        
    //     address registeraUser = rescue.setNewuser(name, location);
    //     uint getUserCount = rescue.getUserCount();
    //     Assert.isTrue(registeraUser, newUser, "Registered Address is a User");
    //     Assert.equal(userCount, getUserCount, "Should be equal");
    // }