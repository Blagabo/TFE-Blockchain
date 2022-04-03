// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./Drones.sol";
import "./Parcelas.sol";
import "./Token.sol";

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Gestion is Drones, Parcelas, Token {

    enum Pesticida {
        Perticida1,
        Perticida2,
        Perticida3,
        Perticida4,
        Perticida5
    }

    Pesticida public pesticida;

    uint idParcela;

    address private owner;
    uint256 public constant amountPago = 10000000000000000; // 0.01 ETH.

    mapping (uint => bool) droneInUse;
    mapping (uint => bool) parcelaFumigada;
    mapping (uint => Pesticida) pesticidaParcela;

    event parcelasFumigada (uint idParcela);

    constructor() {
        owner = msg.sender;
    }

    function Fumigar(uint _idParcela, uint _idDrones, Pesticida _Pesticida) public payable {
        //uint amount = amountPago;
        // Verifica que el dron no este en uso
        require(droneInUse[_idDrones] == false, "El Dron esta en uso");
        // Verifica si la parcela esta fumigada
        require(parcelaFumigada[_idParcela] == false, "Parcela ya fumigada");

        //address user = msg.sender;

        droneInUse[_idDrones] = true;
        parcelaFumigada[_idParcela] = true;
        pesticidaParcela[_idParcela] = _Pesticida;

        //PagoFumigacion(user, owner, amount);
        emit parcelasFumigada(_idParcela);

    }

    function PagoFumigacion(address from, address to, uint amount) public {
        transferFrom(from, to, amount);
    }

    function ReturnTotalSupply() public view returns (uint256, uint256) {
        return(TotalDrones, TotalParcelas);
    }

    function ReturnParcelaFumigada(uint _idParcela) public view returns (bool) {
        return(parcelaFumigada[_idParcela]);
    }
    
}