import Web3 from 'web3';
import Voting from './Voting.json';

let myAccount;
let myContract;

export const initWeb3 = async () => {
  let provider = window.ethereum;

  if (typeof provider !== 'undefined') {
    provider.request({ method: 'eth_requestAccounts' })
      .then((accounts) => {
        myAccount = accounts[0];
        console.log(`Selected account is ${myAccount}`);
      })
      .catch((err) => {
        console.log(err)
      });
    window.ethereum.on('account has changed', function (accounts) {
      myAccount = accounts[0]
      console.log(`Selected account changed to ${myAccount}`);
    });
  }

  const web3 = new Web3(provider);
  const networkId = await web3.eth.net.getId();
  myContract = new web3.eth.Contract(Voting.abi, Voting.networks[networkId].address);


};