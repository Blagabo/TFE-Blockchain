// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;


//import "@openzeppelin/contracts/access/Ownable.sol";
//import "@openzeppelin/contracts/utils/math/SafeMath.sol";

interface featuresDrones {

    struct dronesF{
        uint tokenId;
        string name;
        uint alturaMaxPermitida;
        uint alturaMinPermitida;
    }

    event newPDrone(uint tokenId); 

    function addUserDrones(uint tokenId, string memory name, uint alturaMaxPermitida, uint alturaMinPermitida) external returns (bool);
    function changeUserAlturaDrones(uint tokenId, uint newAlturaMaxPermitida, uint newAlturaMinPermitida) external returns (bool);
    function changeNameDrones(uint tokenId, string memory newName) external returns (bool);
}

contract Drones is featuresDrones {
    //using SafeMath for uint256;

    uint256 public constant mintPrice = 30000000000000000; // 0.03 ETH.

    uint256 public TotalDrones = 0;
    uint256 public _tokenIdCounterDrones = 1;

    dronesF[] public Dronesf;

    mapping (uint => address) public dronesID;
    // Mapping owner address to token count
    mapping(address => uint) private balancesDrones;

    //constructor() ERC721("Drones", "Drone") {}

    function MintDrones(string memory name,uint alturaMaxPermitida, uint alturaMinPermitida) public payable {
        uint256 tokenId = _tokenIdCounterDrones;
        // Comprueba que se ha enviado la cantidad correcta de Ether.
        //require(mintPrice.mul(1) <= msg.value, "Not enough Ether sent.");
        // Comprueba la alturaMax
        require(alturaMaxPermitida >= 1, "You need to enter a maximum height greater than 1m.");
        // Comprueba la alturaMin
        require(alturaMinPermitida >= 1, "You need to enter a minimum height greater than 1m.");

        //_safeMint(msg.sender, tokenId);
        dronesID[tokenId] = msg.sender;
        balancesDrones[msg.sender] = tokenId;
        //dronesAddress(msg.sender).push(features(msg.sender, tokenId, alturaMaxPermitida, alturaMinPermitida));
        addUserDrones(tokenId, name, alturaMaxPermitida, alturaMinPermitida);
        _tokenIdCounterDrones++;
        TotalDrones++;
    }

    function addUserDrones(uint tokenId, string memory name, uint alturaMaxPermitida, uint alturaMinPermitida) public override returns (bool) {
        Dronesf.push(dronesF(tokenId, name, alturaMaxPermitida, alturaMinPermitida));
        emit newPDrone(tokenId);
        return true;
    }

    function changeUserAlturaDrones(uint tokenId, uint newAlturaMaxPermitida, uint newAlturaMinPermitida) public override returns (bool) {
        uint _tokenID = tokenId -1;
        Dronesf[_tokenID].alturaMaxPermitida = newAlturaMaxPermitida;
        Dronesf[_tokenID].alturaMinPermitida = newAlturaMinPermitida;
        return true;
    }

    function changeNameDrones(uint tokenId, string memory newName) public override returns (bool) {
        uint _tokenID = tokenId -1;
        Dronesf[_tokenID].name = newName;
        return true;
    }

    function viewDrones(uint256 Id) public view returns (uint256, string memory, uint256, uint256) {
        uint _Id = Id - 1;
        return (Dronesf[_Id].tokenId, Dronesf[_Id].name, Dronesf[_Id].alturaMaxPermitida, Dronesf[_Id].alturaMinPermitida);
    }

    function viewDrones2(uint256 Id) public view returns (address) {
        return (dronesID[Id]);
    }

}