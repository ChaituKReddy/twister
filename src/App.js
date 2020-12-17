import { useEffect,useState } from 'react';
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import Web3 from 'web3';
import Image from './contracts/Image.json';
//Adding Styles
import './Styles/App.scss';

function App() {

  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  })
  //Functions
  const loadWeb3 = async() => {
    if(window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    }
    if(window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    }
    else {
      window.alert("Please install Metamask!")
    }
  }  

  const loadBlockchainData = async() => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
    const ID = await web3.eth.net.getId();
    const deployedNetwork = Image.networks[ID];
    const address = deployedNetwork.address;
    const instance = new web3.eth.Contract(Image.abi, address);
    setInstance(instance);
  }

  const [account, setAccount] = useState('');
  const [instance, setInstance] = useState();

  return (
    <div className="App">
      <Navbar account={account}/>
      <Home instance={instance} account={account}/>
    </div>
  );
}

export default App;
