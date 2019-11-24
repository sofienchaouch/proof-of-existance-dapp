import { drizzleConnect } from "drizzle-react";
import React, { Component } from 'react'
import PropTypes from 'prop-types'


class HeaderComponent extends Component {
  constructor(props, context) {
    super(props);

  }


  render() {
    return (
      <header>
        <div class="row">
          <div class="four columns">
            Proof of Existence
          </div>
          <div class="eight columns">
            Account
            <br/>
            {this.props.account}
          </div>
        </div>
      </header>
    )
  }
}

HeaderComponent.contextTypes = {
  drizzle: PropTypes.object
}


const mapStateToProps = state => {
  return {
    contracts: state.contracts
  }
}

export default drizzleConnect(HeaderComponent, mapStateToProps)
