import React, { Component } from 'react'

class Header extends Component {
  render () {
    const style = {
      fontSize: '16px',
      fontWeight: 'bold'
    }
    return (
      <div style={style}className='header'>
        <div>The contract address is: {this.props.contract }</div>
        <div>The owner address is: {this.props.owner }</div>
        <div>Your address is: {this.props.accounts }</div>
        <div>Your Balance is</div>{ this.props.isUserEnrolled ? this.props.userBalance : this.props.donorBalance }
      </div>
    )
  }
}

export default Header
