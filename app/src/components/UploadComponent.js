import { drizzleConnect } from 'drizzle-react'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
const IPFS = require('ipfs-api');
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });


class UploadComponent extends Component {
  constructor(props, context) {
    super(props);

    this.handleFileChange = this.handleFileChange.bind(this)
    this.handleTagsChange = this.handleTagsChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleIpfsResult = this.handleIpfsResult.bind(this)
    this.callContractMethod = this.callContractMethod.bind(this)

    this.contracts = context.drizzle.contracts;

    this.state = {
      fileName:'',
      ipfsHash:'',
      tags:'',
      message:'',
      file:'',
      files: [],
      buffer:'',
      transactionHash:'',
      txReceipt: '',
      etherscanLink:''
    }
  }

  componentDidMount(){
    console.log("mount");
    console.log(this.props);
    this.contracts["Poe"].events
    .newData({/* eventOptions */}, (error, event) => {
        console.log(error, event);
    })
    .on('data', (event) => {
      this.setState({ message: "File addedd successfully"});
      this.setState({ etherscanLink:''});
      console.log(event)
    })
    .on('changed', (event) => {
      console.log("changed");
    })
    .on('error', (error) => console.log(error));
  }




  handleFileChange(e) {
    this.setState({file:e.target.files[0]})
    this.setState({fileName:e.target.files[0].name})

    const file = e.target.files[0]
    let reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => this.getBuffer(reader)
  }

  getBuffer = async(reader) => {
    const buffer = await Buffer.from(reader.result);
    this.setState({buffer})
  }

  handleTagsChange(e) {
    this.setState({tags:e.target.value})
  }

  handleFormSubmit(e) {
    e.preventDefault();

    this.setState({ message: "Uploading to IPFS, please wait..." });
    ipfs.files.add(this.state.buffer, this.handleIpfsResult);

  }

  handleIpfsResult(err,files){
    console.log(err,files);
    this.setState({ ipfsHash:files[0].hash });
    this.setState({ message: "Upload successful: "+ files[0].hash });

    this.callContractMethod();
  }

  callContractMethod(){
    const ext = /^.+\.([^.]+)$/.exec(this.state.fileName);

    this.contracts["Poe"].methods.setData(
      this.state.fileName,
      this.state.ipfsHash,
      this.state.tags,
      ext == null ? "" : ext[1]
    ).send({from: this.account })
    .on('transactionHash', (transactionHash) => {
      this.setState({transactionHash});
      this.setState({fileName: ''});
      this.setState({ message: "Tx hash: "});
      this.setState({ etherscanLink:'https://rinkeby.etherscan.io/tx/' + transactionHash});
    })


  }

  render() {
    return (
      <div className="section">
        <br></br>
        <form onSubmit={e => e.preventDefault()} className="form" id="form">
          <h4>Proof of Existence</h4>
          <p>Use the form below in order to add a file on IPFS
             and the Hash inside our Ethereum smart contract.
             The IPFS hash and the timestamp can be used in the future to see if a file
              is tampered or it's the original file uploaded,
              thanks to the immutably stored values on Ethereum.

           </p>
        <div className="upload-btn-wrapper" data-provides="fileupload">
          <label><strong>1. Choose a file</strong></label>
          <br/>
          <input type="file" className="button" onChange={this.handleFileChange} name="resume" />
        </div>

          <br />
          <br />

          <div>
            <div>
                <div className="field">
                  <div><strong>2. Add tags</strong></div>
                  <div className="control">
                    <input type="text" className="u-full-width" onChange={this.handleTagsChange} />
                  </div>
                  <div>
                    {  this.state.fileName !== '' &&
                      <div><strong>3. Upload {this.state.fileName} on IPFS and the hash on Ethereum</strong></div>
                    }
                  {  this.state.fileName !== '' &&
                    <button type="button" className="button" onClick={this.handleFormSubmit}>UPLOAD</button>
                  }
                  </div>
                </div>
            </div>
          </div>
          <div>
            <div className="longText">
              <p>
                <strong>
                  {this.state.message}
                  <a href={this.state.etherscanLink} target="_blank">{this.state.etherscanLink}</a>
                </strong>
              </p>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

UploadComponent.contextTypes = {
  drizzle: PropTypes.object
}

const mapStateToProps = state => {
  return {
    contracts: state.contracts
  }
}

export default drizzleConnect(UploadComponent, mapStateToProps)
