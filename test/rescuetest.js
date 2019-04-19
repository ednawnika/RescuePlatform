
var Rescue = artifacts.require('Rescue')
require('chai')

contract('Rescue', (accounts) => {
  //* *@dev Identifies the preset UserCount HardCoded Into SmartContract */
  it('should deploy the and read the smart contract userCount Value of (66)', async () => {
    const rescueInstance = await Rescue.deployed()
    const userCount = await rescueInstance.getUserCount.call({ from: accounts[0] })
    assert.equal(userCount, 66, 'They are not Equal')
  })

  it('should Identify the owner address of the contract', async () => {
    const rescueInstance = await Rescue.deployed()

    const accThree = accounts[2]
    const accTwo = accounts[1]
    const ownerAddress2 = await rescueInstance.owner.call({ from: accThree })
    const ownerAddress1 = await rescueInstance.owner.call({ from: accTwo })
    assert.notEqual(ownerAddress1, accTwo, 'Both Are Different')
    assert.equal(ownerAddress1, ownerAddress2, 'Both Are Different')
    assert.isString(ownerAddress1, 'Is not A string')
  })

  it('owners address can not register as a User on the platform', async () => {
    const rescueInstance = await Rescue.deployed()
    const ownerAddress = accounts[0]
    const name = 'FirstName Test'
    const location = 'Hollywood, CA'

    await rescueInstance.setNewuser(name, location, { from: ownerAddress })

    const userCount = await rescueInstance.getUserCount.call({ from: ownerAddress })
    // assert.equal(userCount, Error, 'They Are not equal')
    assert.fail(userCount)
  })

  it('An unregistered address can register as a User on the platform and Update the Usercount to 67', async () => {
    const rescueInstance = await Rescue.deployed()
    const newAddress = accounts[1]
    const name = 'SecondName Test'
    const location = 'Hollywood, GA'

    await rescueInstance.setNewuser(name, location, { from: newAddress })

    const userCount = await rescueInstance.getUserCount.call({ from: newAddress })

    assert.equal(userCount, 67, 'The Users amount are not the same')
  })

  it('An registered address as a USER cannot register as a Donator on the platform', async () => {
    const rescueInstance = await Rescue.deployed()
    const newAddress = accounts[1]
    const name = 'AlreadyRegistered Name Test'
    const location = 'Hollywood, GA'

    await rescueInstance.setNewuser(name, location, { from: newAddress })

    const userCount = await rescueInstance.getUserCount.call({ from: newAddress })

    await rescueInstance.setDonor(name, location, { from: newAddress })

    const donorCount = await rescueInstance.getDonorCount.call({ from: newAddress })
    //* *@dev if donorCount is 0 that means setDonor tx failed  */
    assert.equal(donorCount, 0, 'The donor count are not the same')
    assert.equal(userCount, 68, 'The user count are not the same')
  })
})
