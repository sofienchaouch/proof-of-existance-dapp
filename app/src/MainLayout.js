import React from "react";
import {
  AccountData,
  ContractData,
  ContractForm,
} from "drizzle-react-components";

import UploadComponent from "./components/UploadComponent";
import HeaderComponent from "./components/HeaderComponent";
import TableComponent from "./components/TableComponent";
import FooterComponent from "./components/FooterComponent";

import logo from "./logo.png";


export default ({ accounts }) => (
  <div className="App">
      <HeaderComponent account={accounts[0]}/>
      <div className="container">
        <UploadComponent account={accounts[0]} />
        <TableComponent account={accounts[0]} />
        <FooterComponent account={accounts[0]} />
      </div>
    </div>

);
