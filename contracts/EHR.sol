// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import './Roles.sol';
import "./MedicalRecord.sol";

contract EHR {
  using Roles for Roles.Role;

  Roles.Role private admin;
  Roles.Role private rmo;
  Roles.Role private doctor;
  Roles.Role private patient;

  struct User {
    address id;
    string hash;
    uint u_type;
    string password;
    bool active;
  }

  mapping(address => User) private usersMap;
  mapping(address => address) private patRecordMap;
  mapping(address => bool) private isIAdoneMap;
  mapping(address => address[]) private RmoIAMap;
  mapping(address => address[]) private drPatsMap;

  address [] private all_rmo;
  address [] private doctors;
  address [] private patients;

  string private adminPwd;
  address private nftAddress;

  uint private iACount;
  uint private fdrCount;

  event mintNFT(address _owner, uint _tokenId, string _url);

  constructor() {
    admin.add(msg.sender);
    adminPwd = "admin";

    iACount = 0;
    fdrCount = 0;
  }

  function isAdmin() public view returns (bool)  {
    return admin.has(msg.sender);
  }
//  isAdmin 100
//  incorrect admin password 101
//  RMO 200 Doctor 300 Patient 400
//  incorrect user password 201
//  user not active 202
//  not registered 500
  function userLogin(address _id, string memory _pwd) public view returns (uint){
    if (admin.has(msg.sender)) {
      if ((keccak256(abi.encodePacked(adminPwd)) ==
        keccak256(abi.encodePacked(_pwd)))) {
        return 100;
      }
      return 101;
    } else if (usersMap[_id].id != address(0)) {
      if ((keccak256(abi.encodePacked(usersMap[msg.sender].password)) ==
        keccak256(abi.encodePacked(_pwd)))) {
        if (usersMap[msg.sender].active) {
          if (usersMap[msg.sender].u_type == 1) {
            return 200;
          } else if (usersMap[msg.sender].u_type == 2) {
            return 300;
          } else {
            return 400;
          }
        }
        else return 202;
      } else {
        return 201;
      }
    } else {
      return 500;
    }
  }

  function addUser(string memory _hash, uint _u_type, string memory _pass) public {
    require(!admin.has(msg.sender), "connected as admin");
    require(usersMap[msg.sender].id == address(0), "User already registered");

    if (_u_type == 1) {
      rmo.add(msg.sender);
      all_rmo.push(msg.sender);
    } else if (_u_type == 2) {
      doctor.add(msg.sender);
      doctors.push(msg.sender);
    } else if (_u_type == 3) {
      patient.add(msg.sender);
      patients.push(msg.sender);
    }

    User storage user = usersMap[msg.sender];

    user.id = msg.sender;
    user.password = _pass;
    user.hash = _hash;
    user.u_type = _u_type;
    user.active = false;
  }

  function getUser(address _id) public view returns (User memory) {
    return usersMap[_id];
  }

  function getAllRmo() public view returns (User[] memory) {
    User[] memory rms = new User[](all_rmo.length);
    for (uint i = 0; i < all_rmo.length; i++) {
      rms[i] = usersMap[all_rmo[i]];
    }
    return rms;
  }

  function getAllDocs() public view returns (User[] memory) {
    User[] memory docs = new User[](doctors.length);
    for (uint i = 0; i < doctors.length; i++) {
      docs[i] = usersMap[doctors[i]];
    }
    return docs;
  }

  function getAllPats() public view returns (User[] memory) {
    User[] memory pats = new User[](patients.length);
    for (uint i = 0; i < patients.length; i++) {
      pats[i] = usersMap[patients[i]];
    }
    return pats;
  }

  function verifyUser(address _id) public {
    usersMap[_id].active = true;
  }

  function deactivateUser(address _id) public {
    usersMap[_id].active = false;
  }

//  RMO
// function for doing initial analysis
  function doIA(string memory _hash, address _pat, bool fdr, address dr) public {
    require(rmo.has(msg.sender), "Only RMO can do IA");
    require(!isIAdoneMap[_pat], "IA already done");


    MedicalRecord mr = new MedicalRecord(_pat);
    mr.addInitialAnalysis(msg.sender, _hash);

    patRecordMap[_pat] = address(mr);
    isIAdoneMap[_pat] = true;
    RmoIAMap[msg.sender].push(_pat);

    iACount++;
    if (fdr) {
      drPatsMap[dr].push(_pat);
      fdrCount++;
    }

  }

  function getIAPats() public view returns (address[] memory){
    return RmoIAMap[msg.sender];
  }

  function getPatMR(address _pat) public view returns (address)  {
    return patRecordMap[_pat];
  }

  function getDocPats() public view returns (address[] memory){
    return drPatsMap[msg.sender];
  }

//  misc

  function getAllCounts() public view returns (uint[5] memory)  {
    return ([all_rmo.length, doctors.length, patients.length, iACount, fdrCount]);
  }

  function getAssignedPatientsCount(address _dr) public view returns (uint)  {
    return drPatsMap[_dr].length;
  }

  function getRmoIADonePatCount(address _rmo) public view returns (uint)  {
    return RmoIAMap[_rmo].length;
  }

}
