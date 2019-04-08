Design_pattern_desicions.md


 Donators on the rescue platform can only transfer funds to users. and the users can only send that either too Helpers(which is a transfer to the contract), Helpers are allowed to withdraw, but to register as a Helper, the registration process will differ.  

 

Ownership:

3 user levels

Owner: Smart contract owner who is equivalent to super user and can temporarily pause and unpause a contract. 
Device Owner: When a new device ID is registered the creator becomes the owner of the device ID. The owner has full control over the device ID and can execute destruct function to delete device ID
Tx Originator: Transaction originator is any common user who would request device ID proof from device owners. They will not be able to delete the device ID or modify any device data. 

The clearly defined 3 levels of roles help in providing secure and easy access to smart contract and ownership.


Maintenance:

There can be improved registration with the implementation of uport

RescuePlatform smart contract stores the intracontract balance of the users and only allows users with ether to send that recieved ether from donators to helpers.


Security:

Security of smart contract is very important for its existence. RescuePlatform smart contract is carefully designed with security in mind. An external address that attempts to invoke a function will always fail if that address is not  present in the mapping. 

{ Users } always have a 0 balance on the platform regardless if there account has ether because of the Struct Address Registration, There are no Functions in the Rescue Contract to send ETH outside of the ecosystem for a USER they can only accept donations. There are no functions a User can call to transfer ether from there rescueplatform account into there own ether balance. 

As a User - You can only transact with the helpers

As a Helper - You can only withdraw ether

As a Donator - You are the only client on the platform that has access to there ether balance. AND ONLY DONATE ETH  TO USERS 

this is used as another level of security. 
**
**

Security within RescuePlatform is built at 2 levels. 

Function level security: At each function level, there are several modifiers to validate device ownership, transaction type and transaction status. 
modifier onlyDonor() {
        require(donors[msg.sender].status == Status.Donor);
        _;
    }

 
 
 
Emitted Events:

Each function when executed emits events which are recorded in the contract blockchain for history. 

    event userCreated(uint usno, address user, bytes16 name, bytes16 location, uint bal);

    event helperCreated( uint ddno, address helper, bytes16 name, bytes16 location, uint bal);

    event donorCreated(uint hpno, address donor, bytes16 name, bytes16 location, uint bal);
    
    event userTohelper(address user, address helper, uint amountTransferred);

    event donorTouser(address donor, address user, uint amountTransferred);
    
    event helperWithdrawal(address helper, uint amountWithdraw, uint totalbal);

