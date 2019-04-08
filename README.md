RESCUE PLATFORM

RescuePlatform smart contract platform that brings together 3 types of users Donators, Victims, and Disaster Relief Organizations. 

RescuePlatform was built to solve the problem of lack of transparency when it comes to donations to disaster relief victims.


The main purpose of the Rescue PLATFORM IS DONATION TRANSPARENCY

The 3 TYPES of the PARTICIPANTS OF THE RESCUEPLATFORM application ARE: 

1) USERS that are currently located in disaster struck areas that need assistance with donations to be able to survive when natural disasters occur. All they need to provide on the Platform is there name location and ETH address. When signing up as a USER your ETH balance is not accessible on the platform and your Balance is set to 0. As a natural disaster victim you shouldnt have a balance and there is no functionality in the contract for a USER to send transactions. THEY CAN ONLY RECIEVE DONATIONS FROM { DONORS } (2) 

2) DONORS are the benefactors of the platform, they are able to donate to as many USERS as they choose, pending adequate supply of ethereum available. unlike USERS, DONORS have full access to there ethereum balance and can donate to any REGISTERED USER ADDRESS ON THE PLATFORM

3) HELPERS are the NGO (non-governmental organizations) that have items that disaster relief victims would be in need of. Ex. Blankets, First Aid, Food, Shoes, Clothing. 


HOW IT ALL COMES TOGETHER :

DONORS send ETH to USERS,  the USERS buy  relief items from HELPERS

___________________________________________________________________________________________________________________________________________________________________________________________________


1) Register as a USER (function setNewuser) the user enters there name and location (string) and the function requires that the current Address(msg.sender) is not already registered as a USER, DONOR or HELPER. If the address is already assigned the function will throw error

2) Register as a DONOR (function setDonor) the donor enters there name and location(string) and the function requires that the current Address(msg.sender) is not already registered as a USER, DONOR or HELPER. If the address is already assigned the function will throw error

3) Register as a HELPER (function setHelper) the helper enters there name and location(string) and the function requires that the current Address(msg.sender) is not already registered as a USER, DONOR or HELPER. If the address is already assigned the function will throw error

4) DONATE to USER (function donate) this function takes in an address and amount the DONOR wants to send to USER, this function contains a modifier (onlyDonor) only allows address' in the mapping with a status of Donor to invoke this function. If the address(msg.sender) does not have a DONOR. Status the function will throw error

5) USER to HELPER (function userBuyfromHelper) this function takes in an address and amount the USER wants to send to HELPER, this function contains a modifier (onlyUser) only allows address' in the mapping with a status of USER to invoke this function. If the address(msg.sender) does not have a USER. Status the function will throw error.
If the address passes the amount will be sent to the HELPERS Platform Balance (helpers[helper].bal)



Installation & Execution steps

Pre-requsites: truffle, node, npm, metamask, ganache, ganache-cli

NOTE: the ganache port is set to 8545. If you are using ganaceh-cli, please change it to 8545 in truffle.js

Step 1: Download project zip file from github and unzip to a folder

Step 2: In the command Line  enter npm install to install node Modules 
---------------- Step 2 Output ----------------------------------------

Step 3: in a new command Line Tab Run ganache-cli

Step 4: In a new command Line Enter truffle migrate
---------------- Step 4 Output ----------------------------------------
truffle migrate
Using network 'development'.

Running migration: 1_initial_migration.js
 Deploying Migrations...
 ... 0x723c1d337a824781d986b56094a9c75c53a392e1b0ca270dee09bf8dde8df672
 Migrations: 0xc298c9fac91e6a5825c78b025028d34fdb66df36
Saving successful migration to network...
 ... 0xb9c4378613ce38e0f02039f0797f3ef2a68d02d0f16e49bd6291e3c0b5486c5c
Saving artifacts...
Running migration: 2_deploy_contracts.js
 Deploying ProofOfDevice...
 ... 0xb1e051f6abe73d5c28b5700687ba981a96fbe3ae3e6b1b0582370976dce12c6b
 ProofOfDevice: 0x579ddd711d5d14e539d61ed42c5741de16d1e613
Saving successful migration to network...
 ... 0xd00a82812b390986c24ad86259471b1caa8c3cc07fb57683a0f8f37949ba2629
Saving artifacts...

Step 5: Copy and Past the Rescue Contract Address Into the App.js File in line 25

Step 6: cd into client folder and Run NPM start to run front end




User interface will open in chrome browser. Based on the functionality explained in the youtube video, please test and provide feedback.

----------------End of Output ----------------------------------