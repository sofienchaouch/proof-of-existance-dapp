pragma solidity ^0.4.24;

import '@openzeppelin-solidity/contracts/ownership/Ownable.sol';
import '@openzeppelin-solidity/contracts/lifecycle/Pausable.sol';

contract Poe is Ownable, Pausable {

  //The struct containing the file details
  struct IpfsData {
    string name;
    string hashLink;
    string tags;
    uint timestamp;
    string dataExt;
  }

  //This will be fired when a new file is added
  event newData(
                  address indexed dataOwner,
                  string name,
                  string hashLink,
                  string tags,
                  uint timestamp,
                  string _dataExt
                );

  IpfsData[] public ipfsData;
  mapping (address => uint[]) private ownerIndexes;
  mapping (uint => address) public dataOwner;

  /**
  * @notice Get the indexes of the files previously inserted by the user
  * @dev Get owner data from ownerIndexes mapping
  * @return Array uint ownerIndexes
  */
  function getIndexes() public view returns (uint[] memory) {
    return ownerIndexes[msg.sender];
  }

  /**
  * @notice The owner of the file get the single file info by the index
  * @dev The owner get file from ipfsData using the index input
  * @return name, hashLink, tags, timestamp, dataExt
  */
  function getData(uint _index) public view returns (string memory, string memory, string memory, uint, string memory) {
    require(msg.sender == dataOwner[_index]);
    return (
      ipfsData[_index].name,
      ipfsData[_index].hashLink,
      ipfsData[_index].tags,
      ipfsData[_index].timestamp,
      ipfsData[_index].dataExt
      );
  }

  /**
   * @dev Check text length
   */
  modifier isTextLengthOk(string memory _name, string memory _hashLink, string memory _tags, string memory _dataExt) {
    require(bytes(_hashLink).length <= 46);
    require(bytes(_tags).length <= 60);
    require(bytes(_name).length <= 60);
    require(bytes(_dataExt).length <= 4);
    _;
  }

  /**
  * @notice Add data of a file
  * @dev add a new ipfsData struct element and emit newData event
  * @param _name Name of the file
  * @param _hashLink Hash of IPFS file
  * @param _tags concatenate tags string
  * @param _dataExt File extension string
  */
  function setData(string memory _name, string memory _hashLink, string memory _tags, string memory _dataExt)
    public
    whenNotPaused
    isTextLengthOk(_name,_hashLink,_tags, _dataExt)
  {
    uint id = ipfsData.push(IpfsData(_name, _hashLink, _tags, now, _dataExt)) - 1;
    ownerIndexes[msg.sender].push(id);
    dataOwner[id] = msg.sender;
    emit newData(msg.sender, _name, _hashLink, _tags, now, _dataExt);
  }



}
