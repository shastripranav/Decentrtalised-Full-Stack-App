
import './App.css';

import { useState } from "react";
import { ethers } from "ethers";
import Add from "./artifacts/contracts/Add.sol/Add.json";

const address_cont = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
function App() {

  const [no1, setNo1] = useState(0);
  const [no2, setNo2] = useState(0);
  const [result, setResult] = useState("");

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function fetchResult() {
    // If MetaMask exists
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
                                      address_cont,
                                      Add.abi,
                                      provider
                                    );
      try {
        const data = await contract.showTotal();
        var ans = Number(data._hex)
        console.log("data: ", ans);
        setResult(ans);
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  }
  async function setvalue() {
    // If MetaMask exists
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      
      const contract = new ethers.Contract(address_cont,Add.abi, signer);
      const transaction = await contract.setValues(no1,no2);

      await transaction.wait();
      fetchResult();
    }
  }





  return (
    <div className="App">
     <div className="App-header">
        {/* DESCRIPTION  */}
        <div className="description">
          <h1>Calculator : Add</h1>
          <h3>Full stack dapp using ReactJS and Hardhat</h3>
        </div>
        {/* BUTTONS - Fetch and Set */}
        <div className="custom-buttons">
          <button onClick={fetchResult} style={{ backgroundColor: " green" }}>
            Get Result
          </button>
          <button onClick={setvalue} style={{ backgroundColor: "blue" }}>
            Set Values
          </button>
        </div>
        {/* INPUT TEXT - String  */}
        <input
          onChange={(e) => setNo1(Number(e.target.value))}
          value={no1}
          placeholder="First Numer"
        />
        <input
          onChange={(e) => setNo2(Number(e.target.value))}
          value={no2}
          placeholder="Second Numer"
        />

        {/* Current Value stored on Blockchain */}
        <h2 className="greeting">Result is : {result}</h2>
        
      </div> 
    </div>
  );
}

export default App;
