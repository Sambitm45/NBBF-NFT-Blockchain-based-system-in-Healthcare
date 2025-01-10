// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract MedicalRecord {

  struct Record {
    uint mid;
    address drId;
    string recordHash;
    uint256 date;
    bool mileStone;
    uint tokenId;
  }

  mapping(uint => Record) private mrMapping;
  mapping(address => bool) private hasAccess;

  address private owner;
  Record private initialAnalysis;

  uint private mId;

  constructor(address _owner){
    owner = _owner;
    mId = 0;
  }

  function addInitialAnalysis(address _drId, string memory _recordHash) public {
    initialAnalysis = Record({mid: mId, drId: _drId, recordHash: _recordHash, date: block.timestamp, tokenId: 0, mileStone: false});
    mId++;
  }

  function getInitialAnalysis() public view returns (Record memory) {
    return initialAnalysis;
  }

  function addRecord(address _drId, string memory _recordHash) public {
    require(hasAccess[msg.sender], "No edit access to this record");
    mrMapping[mId] = Record({mid: mId, drId: _drId, recordHash: _recordHash, date: block.timestamp, tokenId: 0, mileStone: false});
    mId++;
  }

  function viewRecords() public view returns (Record[] memory) {
    Record[] memory records = new Record[](mId);
//    if (mId > 1)
    for (uint i = 0; i < mId; i++) {
      records[i] = mrMapping[i];
    }
    return records;
  }

//  give Access

  function giveAccessToDoc(address _doc) public {
    hasAccess[_doc] = true;
  }

  function revokeAccessToDoc(address _doc) public {
    hasAccess[_doc] = false;
  }

  function checkDocAccess(address _doc) public view returns (bool)  {
    return hasAccess[_doc];
  }

}
