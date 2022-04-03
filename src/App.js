/////////////////////////////////////////////////////////
import React, { useReducer, useState } from 'react';
import { ethers } from "ethers";
import "./App.css";
import Wallet from './components/Wallet';
import CardsParcelas from './components/CardsParcelas';
import CardsDrones from './components/CardsDrones';
import { hasEthereum, requestAccount } from './components/ethereum'

// Import ABI Code to interact with smart contract
import Gestion from './artifacts/contracts/Gestion.sol/Gestion.json';

// The contract address
let secret = require("./address.json")
const GestionAddres = secret.gestion.address;

function App() {

    // Constants
    const MINT_PRICE_DRONES = 0.03;
    const MINT_PRICE_PARCELAS = 0.02;


    // Mint Drones
    const [mintNameDrone, setMintNameDrone] = useState("")
    const [mintMaxAlturaDrone, setMaxAlturaDrone] = useState(1)
    const [mintMinAlturaDrone, setMintMinAlturaDrone] = useState(1)

    // Mint Parcelas
    const [mintNameParcelas, setMintNameParcelas] = useState("")
    const [mintMaxAlturaParcelas, setMaxAlturaParcelas] = useState(1)
    const [mintMinAlturaParcelas, setMintMinAlturaParcelas] = useState(1)

    //Const Data Blockchain
    const [provider, setProvider] = useState()
    const [Signer, setSigner] = useState()
    const [address, setAddress] = useState()
    const [Contracts, setContract] = useState()

    //Const Parcelas y Drones
    const [parcelasID, setParcelasID] = useState()
    const [dronesID, setDronesID] = useState()
    const [dronesAlturaMax, setDronesAlturaMax] = useState()
    const [dronesAlturaMin, setDronesAlturaMin] = useState()
    const [parcelaAlturaMax, setParcelaAlturaMax] = useState()
    const [parcelaAlturaMin, setParcelaAlturaMin] = useState()

    //Const Fumigar
    const [parcelaFumigar, setParcelaFumigar] = useState()
    const [droneFumigar, setdroneFumigar] = useState()
    const [parcelaFumigadaVerify, setParcelaFumigadaVerify] = useState()
    const [parcelaFumigadaBool, setParcelaFumigadaBool] = useState(false)


    async function dataBlockChainSigner() {
        const _provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(_provider)
        const _signer = _provider.getSigner();
        setSigner(_signer)
        const _address = await _signer.getAddress();
        setAddress(_address)
        const _contract = new ethers.Contract(GestionAddres, Gestion.abi, _signer);
        setContract(_contract)
    }

    async function mintDrones() {
        console.log("Mint = Nombre : ", mintNameDrone, " Altura Max: ", mintMaxAlturaDrone, "Altura Min: ", mintMinAlturaDrone);
        if (mintMaxAlturaDrone < 1) {
            window.alert("Set Altura Max.");
            return
        }
        if (mintMinAlturaDrone < 1) {
            window.alert("Set Altura Min.");
            return
        }
        if (mintNameDrone === "") {
            window.alert("Set Name a Dron");
            return
        }
        try {
            // If MetaMask exists
            if (typeof window.ethereum !== "undefined") {
                await requestAccount();

                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                //const address = await signer.getAddress()

                const contract = new ethers.Contract(GestionAddres, Gestion.abi, signer);
                const totalPrice = MINT_PRICE_DRONES * 1
                const transaction = await contract.MintDrones(mintNameDrone, mintMaxAlturaDrone, mintMinAlturaDrone, { value: ethers.utils.parseEther(totalPrice.toString()) })

                await transaction.wait();
                window.alert("Congrats, you minted Drone!");
            }
        } catch {
            window.alert("Error.");
        }
    }

    async function mintParcelas() {
        console.log("Mint = Nombre : ", mintNameParcelas, " Altura Max: ", mintMaxAlturaParcelas, "Altura Min: ", mintMinAlturaParcelas);
        if (mintMaxAlturaParcelas < 1) {
            window.alert("Set Altura Max.");
            return
        }
        if (mintMinAlturaParcelas < 1) {
            window.alert("Set Altura Min.");
            return
        }
        if (mintNameParcelas === "") {
            window.alert("Set Name a Parcela");
            return
        }
        try {
            // If MetaMask exists
            if (typeof window.ethereum !== "undefined") {
                await requestAccount();

                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();

                const contract = new ethers.Contract(GestionAddres, Gestion.abi, signer);
                const totalPrice = MINT_PRICE_PARCELAS * 1
                const transaction = await contract.MintParcelas(mintNameParcelas, mintMaxAlturaParcelas, mintMinAlturaParcelas, { value: ethers.utils.parseEther(totalPrice.toString()) })

                await transaction.wait();
                window.alert("Congrats, you minted Parcela!");
            }
        } catch {
            window.alert("Error.");
        }
    }

    async function viewDronesID() {
        await dataBlockChainSigner()
            //const contract = new ethers.Contract(GestionAddres, Gestion.abi, Signer);
        const data = await Contracts.viewDrones2(1);
        console.log("data: ", data);
    }

    async function viewDrones(Id) {
        await dataBlockChainSigner()
            //const contract = new ethers.Contract(GestionAddres, Gestion.abi, Signer);
        const data = await Contracts.viewDrones(Id);
        setDronesID(data[0].toNumber())
        setDronesAlturaMax(data[2].toNumber());
        setDronesAlturaMin(data[3].toNumber());
        console.log("ID: ", dronesID);
        console.log("Name: ", data[1]);
        console.log("Altura Max: ", dronesAlturaMax);
        console.log("Altura Min: ", dronesAlturaMin);
    }

    async function viewParcelasID() {
        await dataBlockChainSigner()
        const data = await Contracts.viewParcelas2(1);
        console.log("data: ", data);
    }

    async function viewParcelas(Id) {
        await dataBlockChainSigner()
            //const Contract = new ethers.Contract(GestionAddres, Gestion.abi, Signer);
        const data = await Contracts.viewParcelas(Id);
        setParcelasID(data[0].toNumber());
        setParcelaAlturaMax(data[2].toNumber());
        setParcelaAlturaMin(data[3].toNumber());
        console.log("ID: ", parcelasID);
        console.log("Name: ", data[1]);
        console.log("Altura Max: ", parcelaAlturaMax);
        console.log("Altura Min: ", parcelaAlturaMin);
    }

    async function TotalSupply() {
        await dataBlockChainSigner()
        const totalSupply = await Contracts.ReturnTotalSupply();
        console.log("Total Drones: ", totalSupply[0].toNumber());
        console.log("Total Parcelas: ", totalSupply[1].toNumber());
    }

    async function Fumigar(IdDrone, IdParcela) {

        IdDrone = parseInt(droneFumigar);
        IdParcela = parseInt(parcelaFumigar);

        await viewDrones(IdDrone)
        await viewParcelas(IdParcela)

        if (dronesAlturaMax > parcelaAlturaMax) {
            window.alert("El Dron no puede fumigar esta parcela -1");
            return
        }
        if (dronesAlturaMin < parcelaAlturaMin) {
            window.alert("El Dron no puede fumigar esta parcela -2");
            return
        }
        if (dronesID !== IdDrone) {
            window.alert("Vuelve a Fumigar para confirmar");
            return
        }
        if (parcelasID !== IdParcela) {
            window.alert("Error con la Parcela");
            return
        }

        await dataBlockChainSigner()
        const data = await Contracts.Fumigar(IdParcela, IdDrone, 0)
        console.log(data)
    }

    async function VerifyParcelaFumigada() {
        await dataBlockChainSigner()
        const ParcelaFumigada = await Contracts.ReturnParcelaFumigada(parcelaFumigadaVerify);
        console.log(ParcelaFumigada);
        setParcelaFumigadaBool(ParcelaFumigada);
    }

    // Return
    return ( 
    <div className = "App" >
        <Wallet />
        <div className = "App-header" > 
        { /* DESCRIPTION  */ } 
        <div className = "description" >
          <h1 className = "display-4 fw-bold" > Fumigacion de Parcelas con Drones </h1> 
          <h5 className = "display-8 fw-bold" > Dapp made in Solidity and Web3 </h5> 
        </div > 
        <div className = 'container' >
          <div className = 'row' >
            <div className = 'col' >
              <div className = 'container' > 
              { /* BUTTONS - Fetch and Set  */ } 
              <h5 > Minteo Drones </h5> 
              <button onClick = { mintDrones }
                type = "button"
                className = "btn btn-primary" > Mint Drones </button> 
                { /* INPUT TEXT Parcela */ } 
                <div className = "input-group mb-3" >
        <span className = "input-group-text"
        id = "basic-addon1" > Nombre del Drone </span> 
        <input type = "text"
          className = "form-control"
          onChange = {
              (e) => setMintNameDrone(e.target.value)
          }
          value = { mintNameDrone }
          placeholder = "Drone 1">
        </input> 
        </div > 
        { /* INPUT TEXT Parcela */ } 
        <div className = "input-group mb-3" >
        <span className = "input-group-text"
        id = "basic-addon1" > Altura Maxima </span> 
        <input type = { "number" }
          className = "form-control"
          onChange = {
              (e) => setMaxAlturaDrone(e.target.value)
          }
          value = { mintMaxAlturaDrone }
          placeholder = "1"
          min = "1"
          max = { "1000" } >
        </input> 
        </div > 
        { /* INPUT TEXT Parcela */ } 
        <div className = "input-group mb-3" >
        <span className = "input-group-text"
        id = "basic-addon1" > Altura Minima </span> 
        <input type = { "number" }
          className = "form-control"
          onChange = {
              (e) => setMintMinAlturaDrone(e.target.value)
          }
          value = { mintMinAlturaDrone }
          placeholder = "1"
          min = "1"
          max = { "1000" }>
        </input> 
        </div > 
        </div> 
        </div > 
        <div className = 'col' >
        <div className = 'container' > 
        { /* BUTTONS - Fetch and Set */ } 
        <h5 > Minteo Parcelas </h5> 
        { /* INPUT TEXT Parcela */ } 
        <button onClick = { mintParcelas }
          type = "button"
          className = "btn btn-primary" > Mint Parcela </button> 
        
        <div className = "input-group mb-3" >
        <span className = "input-group-text"
          id = "basic-addon1" > Nombre del Parcela </span> 
        <input type = "text"
          className = "form-control"
          onChange = {
              (e) => setMintNameParcelas(e.target.value)
          }
          value = { mintNameParcelas }
          placeholder = "Parcela 1" >
        </input> 
        </div > 
        { /* INPUT TEXT Parcela */ } 
        <div className = "input-group mb-3" >
        <span className = "input-group-text"
        id = "basic-addon1" > Altura Maxima Permitida </span> 
        <input type = { "number" }
          className = "form-control"
          onChange = {
              (e) => setMaxAlturaParcelas(e.target.value)
          }
          value = { mintMaxAlturaParcelas }
          placeholder = "1"
          min = "1"
          max = { "1000" }>
        </input> 
        </div > 
        { /* INPUT TEXT Parcela */ } 
        <div className = "input-group mb-3" >
        <span className = "input-group-text"
          id = "basic-addon1" > Altura Minima Permitida </span> 
        <input type = { "number" }
          className = "form-control"
          onChange = {
              (e) => setMintMinAlturaParcelas(e.target.value)
          }
          value = { mintMinAlturaParcelas }
          placeholder = "1"
          min = "1"
          max = { "1000" }>
        </input> 
        </div > 
        </div> 
        </div > 
        </div> 
        </div > 
        { /* BUTTONS - Fetch and Set  */ } 
        <div className = "custom-buttons" >
        <button onClick = { viewDrones }
          type = "button"
          className = "btn btn-danger" > viewDronesID </button> 
        <button onClick = { viewParcelasID }
        type = "button"
        className = "btn btn-danger" > viewParcelasID </button> 
        <button onClick = { viewParcelas }
        type = "button"
        className = "btn btn-danger" > viewParcelas </button> 
        <button onClick = { TotalSupply }
        type = "button"
        className = "btn btn-danger" > TotalSupply </button> 
        </div > 
        <div className = 'container' >
          <div className = 'row' >
            <div className = 'col' >
              <div className = 'container' > 
              { /* BUTTONS - Fetch and Set  */ } 
              <h4 > Fumigar </h4> 
              <button onClick = { Fumigar }
                type = "button"
                className = "btn btn-success" > Fumigar </button> 
                { /* INPUT TEXT Parcela */ } 
                <div className = "input-group mb-3" >
                  <span className = "input-group-text"
                    id = "basic-addon1" > ID del Drone </span> 
                    <input type = { "number" }
                      className = "form-control"
                      onChange = {
                          (e) => setdroneFumigar(e.target.value)
                      }
                      value = { droneFumigar }
                      placeholder = "1"
                      min = "1"
                      max = { "1000" }>
                    </input> 
        </div > 
        { /* INPUT TEXT Parcela */ } 
        <div className = "input-group mb-3" >
        <span className = "input-group-text"
        id = "basic-addon1" > ID de la Parcela </span> 
        <input type = { "number" }
        className = "form-control"
        onChange = {
            (e) => setParcelaFumigar(e.target.value)
        }
        value = { parcelaFumigar }
        placeholder = "1"
        min = "1"
        max = { "1000" }>
        </input> 
        </div > 
        </div> 
        </div > 
        <div className = 'col' >
        <div className = 'container' > 
        { /* BUTTONS - Fetch and Set  */ } 
        <h5 > Verify Parcela Fumigada </h5> 
        <button onClick = { VerifyParcelaFumigada }
        type = "button"
        className = "btn btn-danger" > Verify Parcela Fumigada </button> 
        { /* INPUT TEXT Parcela */ } 
        <div className = "input-group mb-3" >
        <span className = "input-group-text"
        id = "basic-addon1" > ID de la Parcela </span> 
        <input type = { "number" }
        className = "form-control"
        onChange = {
            (e) => setParcelaFumigadaVerify(e.target.value)
        }
        value = { parcelaFumigadaVerify }
        placeholder = "1"
        min = "1"
        max = { "1000" }>
        </input> 
        </div > 
        <div >
        <h3 > Parcela Fumigada: { parcelaFumigadaBool } {
            !parcelaFumigadaBool ? ( <
                >
                False </>
            ) : ( 
              <span > True </span>
            )
        } 
        </h3> 
        </div >
        </div> 
        </div > 
        </div> 
        </div > 
        <div className = 'container' >
        <h4 > TUS PARCELAS </h4> 
        <div className = 'col' >
        <CardsParcelas btn = { Fumigar } parcelasID = { parcelasID } parcelaAlturaMax = { parcelaAlturaMax } parcelaAlturaMin = { parcelaAlturaMin }/> 
        </div > 
        <h4 > TUS DRONES </h4> 
        <div className = 'col' >
        <CardsDrones dronesID = { dronesID } droneAlturaMax = { dronesAlturaMax } droneAlturaMin = { dronesAlturaMin }/> 
        </div > 
        </div> 
        </div > 
        </div>
    );
}

export default App;