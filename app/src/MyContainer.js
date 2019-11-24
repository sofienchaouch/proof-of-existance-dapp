import MainLayout from "./MainLayout";
import { drizzleConnect } from "drizzle-react";

const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    Poe: state.contracts.Poe,
    drizzleStatus: state.drizzleStatus,
  };
};

const MyContainer = drizzleConnect(MainLayout, mapStateToProps);

export default MyContainer;
