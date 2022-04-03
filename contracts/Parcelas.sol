// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

interface featuresParcelas {

    struct parcelasF{
        uint tokenId;
        string name;
        uint alturaMaxPermitida;
        uint alturaMinPermitida;
    }

    event newParcela(uint tokenId); 

    function addUser(uint tokenId, string memory name, uint alturaMaxPermitida, uint alturaMinPermitida) external returns (bool);
    function changeUserAltura(uint tokenId, uint newAlturaMaxPermitida, uint newAlturaMinPermitida) external returns (bool);
    function changeName(uint tokenId, string memory newName) external returns (bool);
}

contract Parcelas is featuresParcelas {
    //using SafeMath for uint256;

    uint256 public constant mintPriceParcelas = 20000000000000000; // 0.02 ETH.

    uint256 public TotalParcelas = 0;
    uint256 private _tokenIdCounterParcelas = 1;

    parcelasF[] public Parcelasf;

    mapping (uint => address) public parcelasID;
    // Mapping owner address to token count
    mapping(address => uint) private balancesParcelas;

    //constructor() ERC721("Parcelas", "Parcela") {}

    function MintParcelas(string memory name,uint alturaMaxPermitida, uint alturaMinPermitida) public payable {
        uint256 tokenId = _tokenIdCounterParcelas;
        // Comprueba que se ha enviado la cantidad correcta de Ether.
        //require(mintPriceParcelas.mul(1) <= msg.value, "Not enough Ether sent.");
        // Comprueba la alturaMax
        require(alturaMaxPermitida >= 1, "You need to enter a maximum height greater than 1m.");
        // Comprueba la alturaMin
        require(alturaMinPermitida >= 1, "You need to enter a minimum height greater than 1m.");

        //_safeMint(msg.sender, tokenId);
        parcelasID[tokenId] = msg.sender;
        balancesParcelas[msg.sender] = tokenId;
        //parcelasAddress(msg.sender).push(features(msg.sender, tokenId, alturaMaxPermitida, alturaMinPermitida));
        addUser(tokenId, name, alturaMaxPermitida, alturaMinPermitida);
        _tokenIdCounterParcelas++;
        TotalParcelas++;
    }

    function addUser(uint tokenId, string memory name, uint alturaMaxPermitida, uint alturaMinPermitida) public override returns (bool) {
        Parcelasf.push(parcelasF(tokenId, name, alturaMaxPermitida, alturaMinPermitida));
        emit newParcela(tokenId);
        return true;
    }

    function changeUserAltura(uint tokenId, uint newAlturaMaxPermitida, uint newAlturaMinPermitida) public override returns (bool) {
        uint _tokenID = tokenId -1;
        Parcelasf[_tokenID].alturaMaxPermitida = newAlturaMaxPermitida;
        Parcelasf[_tokenID].alturaMinPermitida = newAlturaMinPermitida;
        return true;
    }

    function changeName(uint tokenId, string memory newName) public override returns (bool) {
        uint _tokenID = tokenId -1;
        Parcelasf[_tokenID].name = newName;
        return true;
    }

    function viewParcelas(uint256 Id) public view returns (uint256, string memory, uint256, uint256) {
        uint _Id = Id - 1;
        return (Parcelasf[_Id].tokenId, Parcelasf[_Id].name, Parcelasf[_Id].alturaMaxPermitida, Parcelasf[_Id].alturaMinPermitida);
    }

    function viewParcelas2(uint256 Id) public view returns (address) {
        return (parcelasID[Id]);
    }

}