Avoiding_common_attacks.md

RescuePlatform smart contract is carefully designed and coded to avoid all common attacks and exploits that were found and implements security measures to avoid any similar ones. 

<!-- Security within RescuePlatform is built at 2 levels.  -->

Following are the common attacks and prevention exists in RescuePlatform smart contract.

1) External calls:

        RescueContract Does not Call any external Functions

2) Reentrancy: 

        RescueContract Does not Call any external Functions

3) Cross function race condition: 

        RescueContract Does not CAll any external Functions 

4) Timestamp dependence: 
        
        RescueContract has no timestamp dependent actions within the smart contract

5) Integer overflow/underflow: There are no integer calculations code 

        RescueContract Prevents integer overflow by presetting the donation amount a donor can send to a User @ 1 ether
        Logic : if the user cant input the amount which updates the uint amount. 


Visibility in functions and state variables:


Each function is clearly defined as external, public, internal or private. State variables are clearly marked as public. 

