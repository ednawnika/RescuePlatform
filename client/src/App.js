import React, { Component } from 'react'
import RescueContract from './contracts/Rescue.json'
import getWeb3 from './utils/getWeb3'
import './App.css'
import Dashboard from './components/Dashboard.js'
import Header from './components/Header.js';
import { func } from 'prop-types';

// var contract = require('truffle-contract')

class App extends Component {
    state = { UserListt: [],
      txReceipts: [],
      userBalance: null,
      currentDonorName:'',
      userCount: 0,
      helperCount: 0,
      donorCount: 0,
      web3: null,
      accounts: null,
      contract: null,
      name: '',
      location: '',
      hash: '',
      RescueAddress: '0x23978114C2b631a55dD1696f311085d048aE74Ba',
      isUserEnrolled: false,
      isDonorEnrolled: false,
      owner: '',
      userBal:null,
      donorList: [],
      userEvent:[],
      userAddressList:[],
      NotRegistered: 'This Address is Not Registered on Rescue Platform',
      currentUsername: '',
      donationReceipt:[]
    }
  
  //*Fetch Data and Contract from Web3 and get Donor and UserList* */
  async loadAddress (e) {
    console.log(e)
    console.log('Loading Users Address')
    const { contract } = this.state
    await contract.methods.donors(e).call().then(res => this.setState({donorList: res.donor}))
    await contract.methods.users(e).call().then(result => this.setState({ UserListt: result.user }))
    console.log(this.state.UserListt)
    console.log(this.state.donorList)
    if (this.state.UserListt === e) {
      console.log('Validated As True Is a User Address')
      this.setState({ isUserEnrolled: true })
    }
    if(this.state.donorList === e){
      this.setState({ isDonorEnrolled: true })
    }
    else { console.log('Not A User')
  }
}

 //*Load Data and Contract from Web3 and get Accounts* */
  async componentDidMount () {
    try {
      const web3 = await getWeb3()
      console.log(web3)
      const accounts = await web3.eth.getAccounts()
      console.log(accounts)
      const networkId = await web3.eth.net.getId()
      const deployedNetwork = RescueContract.networks[networkId]
      const instance = new web3.eth.Contract(
        RescueContract.abi, this.state.RescueAddress
      )
      console.log(instance)
      console.log(instance.methods)
      web3.eth.defaultAccount = this.state.RescueAddress
      const owner = await instance.methods.owner().call()
      console.log(owner)
      
      //**User and Donor Balances */
      const donorBal = await instance.methods.getBalance().call()
       const donorBaleth = web3.utils.fromWei(donorBal, 'ether')
      const usrBal = await instance.methods.getUserBal().call().then(result => web3.utils.fromWei(result, 'ether'))
      console.log(usrBal)
      // const userBaleth = web3.utils.fromWei(usrBal, 'ether')
      const list = await instance.methods.getuserAddresslist().call()
     
      //**Count of Users */
      const usrcount = await instance.methods.getUserCount().call()
      const donorCount = await instance.methods.getDonorCount().call()
      const helperCount = await instance.methods.getHelperCount().call()
      // await instance.events.userCreated()
      this.setState({ userAddressList:list, owner, donorBalance: donorBaleth, helperCount, donorCount, userBalance: usrBal, userCount: usrcount, web3, accounts: accounts[0], contract: instance })
      this.loadAddress(accounts[0])
      console.log()
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      )
      console.error(error)
    }
  };

   addnewUser (e, i) {
    console.log(e, i);
    const Username = e
    const { contract, txReceipts } = this.state
    contract.methods.setNewuser(e, i).send({ from: this.state.accounts })
    .then((receipt) => {
      let tx = this.state.userAddressList
      tx.push({ userAddress: this.state.accounts})
      console.log(tx)
      console.log(this.state.userAddressList)
      this.setState({ currentUsername: Username, isUserEnrolled: true, txReceipts: receipt, userAddressList:tx
      })
    })
  }

  newfunc(){
    console.log("Jordan")
    console.log(this.state.txReceipts)
  }

  addnewDonor (var1, var2) {
    console.log(var1, var2)
    const name = var1
    const location = var2
    this.state.contract.methods.setDonor(name, location).send({ from: this.state.accounts })
      .then((receipt) => {
        let newObj = this.state.txReceipts
        newObj.push(receipt)
        console.log(newObj)
        console.log(this.state.txReceipts)
        this.setState({ isDonorEnrolled: true, txReceipts: newObj, currentDonorName:name })
      })
  }

  addnewHelper (var1, var2) {
    console.log(var1, var2)
    this.state.contract.methods.setHelper(var1, var2).send({ from: this.state.accounts })
      .once('receipt', (receipt) => {
        this.state.txReceipts.push(receipt)
        this.setState({ isEnrolled: true })
      }
      )
  }
 //*Make a preset Donation of 1 Ether to a User* */
   donorTouser = (address)  => {
    const { contract, web3, donationReceipt } = this.state
     
    console.log(address)
    const amount = '1000000000000000000'
    let newVal = web3.utils.fromWei(amount, 'ether');
    console.log(newVal)

    contract.methods.donate(address).send({ from: this.state.accounts, value: newVal , gas:100000 })
    .then(result => donationReceipt.push(result.transactionHash))
    this.reload()
    console.log(this.state.donationReceipt)

    // .then(result => console.log(result.events.donorTouser.returnValues.donor))
      // .then(result => this.setState({donationReceipt: result}))
    
     
  }

   reload = async ( ) => {
    const { contract,  } = this.state
    await contract.methods.getUserBal().call().then(res => this.setState({userBalance: res }))
    console.log(this.state.userBalance)
  }

  render () {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>
    }

    if(this.state.isDonorEnrolled || this.state.isUserEnrolled){
      console.log('Is This a Registered Donor ' + this.state.isDonorEnrolled)
      console.log('Is This a Registered User ' + this.state.isUserEnrolled)
      return <div style={{textAlign: 'center'}}>
              <Header owner={this.state.owner} userBalance={this.state.userBalance}  isUserEnrolled={this.state.isUserEnrolled} accounts={this.state.accounts} contract={this.state.RescueAddress} donorBalance={this.state.donorBalance}/>
              <div>
              <h3>Welcome to Rescue Platform</h3>
                <h4> { this.state.isUserEnrolled ? <div>Your Role is a User</div>:<div>Your Role is a Donor</div>}</h4>
                <div>You can {this.state.isDonorEnrolled ? <div style={{fontSize:'30px', font:'bold'}}>Make</div> : <div>Accept</div>} <span style={{fontSize:'30px', font:'bold'}}>Donations!</span>  </div><br/>
               <div> {
                 this.state.isDonorEnrolled ? <Dashboard selectedAddress={this.donorTouser} userAddressList={this.state.userAddressList} currentDonorName={this.state.currentDonorName} userList={this.state.userAddressList} /> : "Hello " + this.state.currentUsername  }
              </div>
              </div>
             
            </div>

    } else {
      return (

    <div className='container'>
    <Header isUserEnrolled={this.state.isUserEnrolled} userBalance={this.state.userBalance} owner={this.state.owner}  accounts={this.state.accounts} contract={this.state.RescueAddress}  donorBalance={this.state.donorBalance} />
      <h4>Someone in Need? Do you need Help?</h4>
      <div>The userCount is: { this.state.userCount }</div>
      <form onSubmit={(e, i) => {
        e.preventDefault()
        this.addnewUser(this.username.value, this.userlocation.value)
      }}>
        <label>Name:</label>
        <input placeholder="Enter Name Here"type='text' ref={(input) => this.username = input} /> <br/>
        <label>Location:</label>
        <input style={{ marginRight:'2.4rem' }} placeholder="Enter Location Here" type='text' ref={(input) => this.userlocation = input} /><br/> <br/>
        <input style={{ marginRight:'-1.4rem' }} disabled={this.state.isUserEnrolled} type='submit' value='Submit Button'/>
      </form>

      <div>
        <h4>Sign Up as a Donor and Help Someone In Need!!</h4>
        <div>The DonorCount is: { this.state.donorCount }</div>
        <form onSubmit={(e, i) => {
          e.preventDefault()
          this.addnewDonor(this.donorName.value, this.donorLocation.value)
        }}>
            <label>Donor Name:</label>
            <input style={{ marginRight:'4.0rem' }} placeholder="Enter Name Here" type='text' ref={(input) => this.donorName = input} /> <br/>
            <label>Location:</label>
            <input style={{ marginRight:'2.4rem' }}  placeholder="Enter Location Here" type='text' ref={(input) => this.donorLocation = input} /><br/> <br/>
            <input style={{ marginRight:'-1.4rem' }} disabled={this.state.isDonorEnrolled} type='submit' value='Submit Button' />
          </form>
      </div>

        <br/>

      <div>
        <div>The NGOS listed on Rescue Platform: { this.state.helperCount }</div>
        <form onSubmit={(e, i) => {
          e.preventDefault()
          this.addnewHelper(this.name.value, this.location.value)
        }}>
          <label>Institution Name:</label>
          <input style={{ marginRight:'6.0rem' }} placeholder="Enter Name Here" disabled={!this.state.isUserEnrolled} type='text' ref={(input) => this.name = input} /> <br />
          <label>Institution Location:</label> 
          <input style={{ marginRight:'7.3rem' }} placeholder="Enter Location Here" disabled={!this.state.isUserEnrolled} type='text' ref={(input) => this.location = input} /><br/>
          <br/>
          <input style={{ marginRight:'-1.4rem' }} disabled={!this.state.isUserEnrolled} type='submit' value='Submit Button' />
        </form>
      </div>
      <div>
        {}
      </div>
    </div>
    )
  }
}
}

export default App




