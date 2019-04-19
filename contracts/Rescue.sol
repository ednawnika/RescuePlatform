pragma solidity ^0.5.0;

//@title RescuePlatform
contract Rescue {

    //owner of address
    address public owner;

    //keep count of different users
    uint userCount;
    uint donorCount;
    uint helperCount;
    
    //map to a struct users, donor, helpers
    mapping(address => User) public users;
    mapping(address => Donor) public donors;
    mapping(address => Helper) public helpers;
    
    mapping (address => uint) public balances;
    
    //keep track of states of users
    enum Status { Donor, User, Helper }

    //only owner can call
    modifier onlyOwner() {
        require(owner == msg.sender);
        _;
    }

    //only donor can call function 
    modifier onlyDonor() {
        require(donors[msg.sender].status == Status.Donor);
        _;
    }
 
    //only user can call 
    modifier onlyUser() {
        require(users[msg.sender].status == Status.User);
        _;
    }

     //only helper can call function 
    modifier onlyHelper() {
        require(users[msg.sender].status == Status.Helper);
        _;
    }
    //**@dev event emitters */
    event userCreated(uint usno, address user, string name, string location, uint bal);
    event helperCreated( uint ddno, address helper, string name, string location, uint bal);
    event donorCreated(uint hpno, address donor, string name, string location, uint bal);
    
    event userTohelper(address user, address helper, uint amountTransferred);
    event donorTouser(address donor, address user, uint amountTransferred);
    
    event helperWithdrawal(address helper, uint amountWithdraw, uint totalbal);
    

    //runs only once on contract deployements sets initial counts to 0
    constructor() public {
    owner = msg.sender;
    userCount = 66;
    donorCount = 0;
    helperCount = 0;
    }

    //user struct
    struct User {
        uint usno;
        address user;
        string name;
        string location;
        Status status;
        uint bal;
        
    }

    address[] userAddresslist;
    
    //user struct
    struct Donor {
        uint dnno;
        address donor;
        string name;
        string location;
        Status status;
        uint bal;
        
    }
    
    //user struct
    struct Helper {
        uint hpno;
        address helper;
        string name;
        string location;
        Status status;
        uint bal;
    }
    
    //get balance of msg.sender
    function getBalance() public view returns (uint){
           return msg.sender.balance; 
    }
    //get balance of a user balance
     function getUserBal() public view returns (uint){
           return users[msg.sender].bal; 
    }
    //get balance of a Helper balance
    function getHelperbal() public view returns(uint){
           return helpers[msg.sender].bal;
    }
    
    // get total user count 
    function getUserCount() public view returns (uint){
        return userCount;
    }
    //get total donor count
    function getDonorCount() public view returns (uint){
        return donorCount;
    }
    //get total helper count
   function getHelperCount() public view returns (uint){
        return helperCount;
    }
    
    function getuserAddresslist() public view returns (address[] memory) {
      return userAddresslist;
    }
    
    //@param: user will set name and location
    //@dev: upgradeable to uport identity
    //returns bool
    function setNewuser(string memory _name, string memory _location) public returns (bool) {
        require(msg.sender != users[msg.sender].user);
        require(msg.sender != owner);
        require (msg.sender != donors[msg.sender].donor);
        require(msg.sender != helpers[msg.sender].helper);
        
        users[msg.sender] = User({ usno: userCount, user: msg.sender, name: _name, location: _location, status: Status.User, bal:0});
        userCount = userCount + 1;
        emit userCreated(userCount, msg.sender, _name, _location, users[msg.sender].bal);
        userAddresslist.push(msg.sender);
        return true; 
    }
     //@param: donor will set name and location
    //@dev: upgradeable to uport identity
    //returns bool
    function setDonor(string memory _name, string memory _location) public returns (bool) {
        require(msg.sender != users[msg.sender].user);
        require (msg.sender != donors[msg.sender].donor);
        require(msg.sender != helpers[msg.sender].helper);
        donors[msg.sender] = Donor({ dnno: donorCount, donor: msg.sender, name: _name, location: _location, status: Status.Donor, bal: msg.sender.balance});
        donorCount = donorCount + 1;
        emit donorCreated(donorCount, msg.sender, _name, _location, msg.sender.balance);
        return true;
    }
    //@param: helper will set name and location
    //@dev: upgradeable to uport identity
    //returns bool
    function setHelper(string memory _name, string memory _location) public returns (bool) {
        require(msg.sender != users[msg.sender].user);
        require (msg.sender != donors[msg.sender].donor);
        require(msg.sender != helpers[msg.sender].helper);
        helpers[msg.sender] = Helper({ hpno:helperCount, helper:msg.sender, name: _name, location: _location, status: Status.Helper, bal: 0});
        helperCount = helperCount + 1;
        emit helperCreated(helperCount, msg.sender, _name, _location, msg.sender.balance);
        return true;
    }
    //@param - address
    //@dev - only allows donators to keep ETH balances and transfer to Users balances, if user is not in mapping
        //error will throw
        //works
    function donate(address _to) public payable onlyDonor returns (bool){
        require(_to == users[_to].user && msg.sender == donors[msg.sender].donor);
        // require that reciever of donation address is in user mapping
        require(msg.sender.balance >= msg.value);
        donors[msg.sender].bal -= msg.value;
        users[_to].bal += msg.value;
        emit donorTouser(msg.sender, _to, msg.value);
        return true;
    }
    
    //@param address of helper to donate to and amount of donation
    //@dev fx is to allow users to make purchases from the helper for disaster relief items
    //if not in the users mapping fx will fail
    function userBuyfromHelper(address _to, uint amount) public payable onlyUser returns (bool){
         require(msg.sender == users[msg.sender].user && _to == helpers[_to].helper);
        // require that reciever of donation address is in user mapping
        require(users[msg.sender].bal >= amount);
        users[msg.sender].bal -= amount;
        helpers[_to].bal += amount;
        emit userTohelper(msg.sender, _to, amount);
        return true;
    }


    //@param uint - amount of withdrawal /
    //@dev allows a registered helper to withdraw the funds recieved from Users
    function helperWithdraw(uint withdrawalAmount) public onlyHelper returns (uint){
        require(msg.sender == helpers[msg.sender].helper && withdrawalAmount <= helpers[msg.sender].bal);
        helpers[msg.sender].bal -= withdrawalAmount;
        balances[msg.sender] += withdrawalAmount;
        helpers[msg.sender].bal = 0;
        emit helperWithdrawal(msg.sender, withdrawalAmount, withdrawalAmount + msg.sender.balance);
        return msg.sender.balance;
    } 
}