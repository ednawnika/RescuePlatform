Avoiding_common_attacks.md

RescuePlatform smart contract is carefully designed and coded to avoid all common attacks and exploits that were found and implements security measures to avoid any similar ones. 



<!-- Security within RescuePlatform is built at 2 levels.  -->


Following are the common attacks and prevention exists in RescuePlatform smart contract.


1) External calls: There are no external calls in the smart contract

2) Reentrancy: Contract functions does not allow any reentrancy

3) Cross function race condition: Function calls prevent calling another function within the smart contract

4) Timestamp dependence: There are no timestamp dependent actions within the smart contract

5) Integer overflow/underflow: There are no integer calculations code 

6) Forcibly sending ether to the contract: This contract does not accept any ether. 

7) DoS block gas limit: With modifiers in place, the function is not executed if the gas limit is low.

8) Transaction order limitance: Each transaction executed on a device ID has Tx type and status. This prevents users to change state from one to the other bypassing multiple status and test. 
E.g. Only when a device ID is in requested transfer state the owner can approve the transfer request. 

If the device is already in a requested transfer state, if msg sender is not owner then no other transaction is accepted. 



Visibility in functions and state variables:

Each function is clearly defined as external, public, internal or private. State variables are clearly marked as public. 

Alot more notes

Explain how each I get over each 
