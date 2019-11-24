import { drizzleConnect } from 'drizzle-react'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import moment from 'moment/min/moment-with-locales';
import Moment from 'react-moment';

class TableComponent extends Component {
  constructor(props, context) {
    super(props);

    this.retrieveFunction = this.retrieveFunction.bind(this)
    this.onOpenDetails = this.onOpenDetails.bind(this)
    this.onCloseDetails = this.onCloseDetails.bind(this)

    this.contracts = context.drizzle.contracts;

    this.state = {
      files: [],
      openDetails: false,
      currentItemDetail: {}
    }
  }

  onOpenDetails = (item) => {
    console.log('working');
    this.setState({ openDetails: true });
    this.setState({ currentItemDetail: item });
    console.log(this.state.currentItemDetail);

  };

  onCloseDetails = () => {
    this.setState({ openDetails: false });
  };

  componentDidMount(){
    console.log("mount");
    this.retrieveFunction()
    this.contracts["Poe"].events
    .newData({/* eventOptions */}, (error, event) => {
        console.log(error, event);
    })
    .on('data', (event) => {
      this.retrieveFunction()

      console.log(event)
    })
    .on('changed', (event) => {
      console.log("changed");
    })
    .on('error', (error) => console.log(error));
  }

retrieveFunction(){
  this.setState({files: []}, () => {
    console.log("retrieve");

    this.contracts["Poe"].methods.getIndexes().call({from: this.account },
      (error, indexArray) => {
        if (indexArray != null) {
          indexArray.map((item) => {
            return(
              this.contracts["Poe"].methods.getData(item).call({from: this.account },
               (error, file) => {
                    var files = [...this.state.files, {
                        index: item,
                        fileName:file[0],
                        ipfsHash:file[1],
                        tags:file[2],
                        timestamp:file[3],
                        ext: file[4]
                    }];
                    const output = [...new Map(files.map(o => [o.ipfsHash, o])).values()]

                    this.setState({ files: output });
              })
            )
          })
          }
      });
  });
}



  render() {
    return (
      <div>
        <div>
          <div>
            <div>
              {
                this.state.openDetails &&
                <div className="longText">
                  <h4>File details</h4>
                  <div><strong>Name: </strong>{this.state.currentItemDetail.fileName}</div>
                  <div><strong>Ext: </strong>{this.state.currentItemDetail.ext}</div>
                  <div><strong>Link:</strong> <a href={`https://gateway.ipfs.io/ipfs/${this.state.currentItemDetail.ipfsHash}`} target="_blank">{this.state.currentItemDetail.fileName}</a></div>
                  <div><strong>Date:</strong> <Moment unix format="MM/DD/YYYY HH:mm:ss">{this.state.currentItemDetail.timestamp}</Moment></div>
                  <div><strong>Ipfs hash:</strong> {this.state.currentItemDetail.ipfsHash}</div>
                  <div><strong>Tags:</strong> {this.state.currentItemDetail.tags}</div>
                  <br />
                  <button onClick={this.onCloseDetails}>Back</button>
                </div>
              }
            </div>
            <div>
              {
                !this.state.openDetails &&
                <div>
                <h4>Your files on IPFS</h4>
                <div>Click on a file name to open it in a new tab</div>
              <table className="u-full-width">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.files.map((item, index) => {
                    if (item.fileName.length > 10)
                        {
                          item.fileNameShort = item.fileName.substring(0, 10) + "..."
                        }
                        else {
                          item.fileNameShort = item.fileName;
                        }
                     return(
                      <tr key={item.index} key={item.ipfsHash}>
                        <td><a href={`https://gateway.ipfs.io/ipfs/${item.ipfsHash}`} target="_blank">{item.fileNameShort}</a></td>
                        <td><Moment unix format="MM/DD/YYYY">{item.timestamp}</Moment></td>
                        <td>
                          <button onClick={() => this.onOpenDetails(item)}>GO</button>
                        </td>
                      </tr>
                      )
                  })}
                </tbody>
              </table>
            </div>
            }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

TableComponent.contextTypes = {
  drizzle: PropTypes.object
}


const mapStateToProps = state => {
  return {
    contracts: state.contracts
  }
}

export default drizzleConnect(TableComponent, mapStateToProps)
