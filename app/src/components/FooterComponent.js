import { drizzleConnect } from "drizzle-react";
import React, { Component } from 'react'
import PropTypes from 'prop-types'


class FooterComponent extends Component {
  constructor(props, context) {
    super(props);

  }


  render() {
    return (
      <footer>
        <br />
        <br />
        <div>
          Hi {this.props.account}, check my other projects on rinkeby:
        </div>
        <div>
          <ul>
            <li><a href="https://www.devoleum.com/" target="_blank">Devoleum</a></li>
            <li><a href="https://www.documentum.nanadevs.com/" target="_blank">Documentum</a></li>
            <li><a href="https://dogenealogy.netlify.com/" target="_blank">Dogenealogy</a></li>
          </ul>
        </div>
      </footer>
    )
  }
}

FooterComponent.contextTypes = {
  drizzle: PropTypes.object
}


const mapStateToProps = state => {
  return {
    contracts: state.contracts
  }
}

export default drizzleConnect(FooterComponent, mapStateToProps)
