const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

describe("Deploy Token", function () {

  let token;
  let owner;
  let addr1;
  let addr2;

  this.beforeEach(async function() {
    const Token = await ethers.getContractFactory("Token");
    token = await Token.deploy();
    await token.deployed();

    [owner, addr1, addr2] = await ethers.getSigners();

  });

  it("Successfully Desploy", async function () {
    console.log("success");
  });

  it("Deploy 1m supply for the owner of the contract", async function() {
    const balance = await token.balanceOf(owner.address);
    expect(ethers.utils.formatEther(balance) == 100000000)
    console.log(ethers.utils.formatEther(balance));
  });

  it("Should let you send tokens to another address", async function() {
    await token.transfer(addr1.address, ethers.utils.parseEther("100"));
    expect(await token.balanceOf(addr1.address)).to.equal(ethers.utils.parseEther("100"));
  });

  it("Should let you give another address the approval to send on your behalf", async function() {
    await token.connect(addr1).approve(owner.address, ethers.utils.parseEther("1000"));
    await token.transfer(addr1.address, ethers.utils.parseEther("1000"));
    await token.transferFrom(addr1.address, addr2.address, ethers.utils.parseEther("1000"));
    expect(await token.balanceOf(addr2.address)).to.equal(ethers.utils.parseEther("1000"));
  });

});

describe("Desploy Drones", function (){

  let drones;
  let owner;
  let addr1;
  let addr2;

  this.beforeEach(async function() {
    const Drones = await ethers.getContractFactory("Drones");
    drones = await Drones.deploy();
    await drones.deployed();

    [owner, addr1, addr2] = await ethers.getSigners();

  });

  it("Successfully Desploy Drones", async function () {
    console.log("success");
    console.log("Owner", owner.address);
    console.log("Addr 1", addr1.address);
    console.log("Addr 2", addr2.address);
  });

  it("Mint drones", async function() {
    const totalPrice = 0.03 * 1;
    const dron = await drones.MintDrones("Drone 1", 50, 20, { value: ethers.utils.parseEther(totalPrice.toString()) });
    console.log(dron);
  });

});

describe("Desploy Parcelas", function (){

  let drones;
  let owner;
  let addr1;
  let addr2;

  this.beforeEach(async function() {
    const Parcelas = await ethers.getContractFactory("Parcelas");
    parcelas = await Parcelas.deploy();
    await parcelas.deployed();

    [owner, addr1, addr2] = await ethers.getSigners();

  });

  it("Successfully Desploy Parcelas", async function () {
    console.log("success");
    console.log("Owner", owner.address);
    console.log("Addr 1", addr1.address);
    console.log("Addr 2", addr2.address);
  });

  it("Mint Parcelas", async function() {
    const totalPrice = 0.02 * 1;
    const parcela = await parcelas.MintParcelas("Parcela 1", 50, 20, { value: ethers.utils.parseEther(totalPrice.toString()) });
    console.log(parcela);
  }); 

});

describe("Deploy Gestion", function () {

  let owner;
  let addr1;
  let addr2;

  this.beforeEach(async function() {
    const Gestion = await ethers.getContractFactory("Gestion");
    gestion = await Gestion.deploy();
    await gestion.deployed();

    [owner, addr1, addr2] = await ethers.getSigners();

  });

  it("Successfully Desploy Gestion", async function () {
    console.log("success");
    console.log("Owner", owner.address);
    console.log("Addr 1", addr1.address);
    console.log("Addr 2", addr2.address);
  });

  it("Verify Fuminar", async function() {
    const fumigar = await gestion.Fumigar(1, 1, 0);
    console.log(fumigar);
    console.log("Successfully Fumigar")
  });

  it("Verify Parcela Fumigada", async function() {
    const ParcelaFumigada = await gestion.ReturnParcelaFumigada(0);
    console.log(ParcelaFumigada);
  });

});