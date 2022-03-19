import React, { Component } from 'react';
import Auth from './Auth';
import Main from './Main';
import Add from './Add';

import Web3 from 'web3';

import { BrowserRouter as Router , Route , Routes } from 'react-router-dom';

// contract
import Hotel from '../abis/HotelBooking.json'

// IPFS
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) 

class App extends Component {

  async componentWillMount(){
    await this.loadWeb3();
    await this.loadBlockChainData();
 }

 async   loadBlockChainData() {
    const web3 = window.web3;

    const accounts = await web3.eth.getAccounts()
    this.setState({account : accounts[0]})
    console.log(this.state.account)

    let networkId = await web3.eth.net.getId();
    let HotelData = Hotel.networks[networkId]
    let hotel = new web3.eth.Contract(Hotel.abi, HotelData.address);
     this.setState({hotel})

 

    const isLoggedIn = await hotel.methods.isLoggedIn(this.state.account).call();
    this.setState({isLoggedIn})

    const display = await hotel.methods.display(this.state.account).call();
    this.setState({display})

    const myHotelId = await hotel.methods.myHotel(this.state.account).call()
    const id = myHotelId.toNumber()
    this.setState({id})
   
     const myHotel = await hotel.methods.hotel(id).call()
     this.setState({myHotel:[...this.state.myHotel,myHotel]})

   
     const Hotels = await hotel.methods.totalHotels().call()
      const NoOfHotels = Hotels.toNumber()

      for(let i = 1;i <= NoOfHotels ; i++){
        const allHotels = await hotel.methods.hotel(i).call();
        this.setState({allHotels:[...this.state.allHotels,allHotels]})
      }
     
      const currentHotel = await hotel.methods.currentHotel(this.state.account).call()
      this.setState({currentHotel:[currentHotel]})

      const leaveNo = await hotel.methods.leaveNo().call()
      let lNo = leaveNo.toNumber();

      for(let i = lNo;i >= 0 ; i--){
      const history = await hotel.methods.history(this.state.account,i).call();
      this.setState({lodgingHistory:[...this.state.lodgingHistory,history]})
    }
  }

  async loadWeb3 () {
    if(window.ethereum){
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable();
   }else if(window.web3){
     window.web3 = new Web3(window.web3.currentProvider);
   }else{
     alert("please install metamask")
   }
  }


  captureFile = event => {

    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)

    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })
      console.log('buffer', this.state.buffer)
    }
  }

  uploadImage = (name,city,address,totalRooms,price) => {
    console.log("Submitting file to ipfs...")

    //adding file to the IPFS
    ipfs.add(this.state.buffer, (error, result) => {
      console.log('Ipfs result', result)
      if(error) {
        console.error(error)
        return
      }


      this.state.hotel.methods.addHotel(name,result[0].hash,city,address,totalRooms,price).send({from:this.state.account})
    
    })
  }

    registerAsHW = (name,age,gender,city) => {
       this.state.hotel.methods.registerAsHotelOwner(name,age,gender,city).send({from:this.state.account})
    }

    registerAsCustomer = (name,age,gender,city) => {
      this.state.hotel.methods.resisterAsCustomer(name,age,gender,city).send({from:this.state.account})
    }

      getRoomData = async(no) => {
        const data= await this.state.hotel.methods.hotelRoom(this.state.id,no).call();
        console.log(data)
        this.setState({roomsData:[data]})
      }

      bookHotel = (id) => {
         this.state.hotel.methods.bookHotel(id).send({from:this.state.account})
      }

      leaveHotel = (id,amt) => {
        this.state.hotel.methods.leaveHotel(id).send({from:this.state.account, value:amt})
      }

  constructor(props) {
    super(props);
    this.state = {
      account:'',
      hotel:{},
      myHotel:[],
      allHotels:[],
      isLoggedIn:'',
      id:'',
      roomsData:[],
      display:'',
      currentHotel:[],
      lodgingHistory:[]
    }
  }

  render() {
    console.log(this.state.lodgingHistory)
    return (
      <div>
  
   <Router>
     <Routes>
     {
     this.state.isLoggedIn ? <Route path="/" exact element={<Main history={this.state.lodgingHistory} leaveHotel={this.leaveHotel} currentHotel={this.state.currentHotel} bookHotel={this.bookHotel} display={this.state.display} info={this.state.myHotel} getRooms={this.getRoomData} roomsData={this.state.roomsData} allHotels={this.state.allHotels}  /> }   /> :<Route path='/' exact element={ <Auth registerAO={this.registerAsHW} registerAC={this.registerAsCustomer}/> } />
   } 

    <Route path="/add" element={<Add addHotel={this.uploadImage} captureFile={this.captureFile} /> }/>

  </Routes>
     </Router>

      </div>
    );
  }
}

export default App;
