import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { hasEthereum, requestAccount } from './ethereum'
import './css/WalletCard.css'

export default function Wallet() {
    // UI state
    const [loading, setLoading] = useState(true);
    const [connected, setConnected] = useState(false);
    const [message, setMessage] = useState('Connect wallet');
    const [userBalance, setUserBalance] = useState(null);
    const [provider, setProvider] = useState(null);
    const [Account, setAccount] = useState();

    // First load
    useEffect( function() {
        async function fetchConnectedAccount() {
            if(! hasEthereum()) {
                setMessage('Install MetaMask')
                setLoading(false)
                return
            }
    
            await setConnectedAccount()

            setLoading(false)
        }
        fetchConnectedAccount() 
    },[])

    // Account changes
    useEffect( function() {
        async function listenMMAccount() {
            if(! hasEthereum()) return
            window.ethereum.on('accountsChanged', async function(accounts) {
                if(accounts && accounts[0]) {
                    setMessage("Connected Wallet")
                    setAccount(accounts[0])
                    setConnected(true)
                } else {
                    setConnected(false)
                    setMessage('Connect wallet');
                }
            })
        }

        listenMMAccount()
    },[])

    //Set Balance
    useEffect( function() {
        async function getBalance() {
            provider.getBalance(Account)
            .then(balanceResult => {
                setUserBalance(ethers.utils.formatEther(balanceResult));
            })
        }

        getBalance()
    }, [Account]);

    // Request connection to wallet
    async function requestConnection() {
        try {
            await requestAccount()
        } catch(error) {
            if(error.message) setMessage(error.message)
        }
    }

    // Set address of connected wallet
    async function setConnectedAccount() {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", [0]);
            const signer = provider.getSigner()
            const address = await signer.getAddress()
            setProvider(provider);
            
            if(address) {
                setConnected(true);
                setAccount(address);
            }
        } catch {
            setMessage('Connect wallet')
        }
    }

    // Handle connect wallet click
    async function handleConnectWallet() {
        setLoading(true);

        await requestConnection()
        await setConnectedAccount()

        setLoading(false);
    }

    return (
        <div className='walletCard'>
            <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={handleConnectWallet}
                disabled={connected || message === 'Install MetaMask'}
            >
                { ! loading ? (
                    <>
                        <span className={ connected ? "rounded-full h-2 w-2 block mr-2 bg-green-500" : "rounded-full h-2 w-2 block mr-2 bg-red-500" } />
                        { message }
                    </>
                ) : (
                    <span>Loading...</span>
                ) }
            </button>
            <div>
                <h6 className="display-10">Wallet: {Account} </h6>
            </div>
            <div className='balanceDisplay'>
                <h6>Balance: {userBalance}</h6>
            </div>
        </div>
    )
}