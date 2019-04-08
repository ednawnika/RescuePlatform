import React from 'react'

class Dashboard extends React.Component {


  handleClick = (e) => {
    const value = e.target.value
    console.log(value)

    console.log('Donor Is Donating')
    this.props.selectedAddress(value)
  }

  render () {
    const style = {
      color: 'blue'
    }

    let address = this.props.userAddressList.map((add, index) =>
      <div key={index}>
      <button style={style} onClick={e => this.handleClick(e)} value={add}>{add}</button>
      </div>
    )


    return (<div>
    Users In Need of Funds
      <div>
          {address}
      </div>
    </div>
    )
  }
}

export default Dashboard