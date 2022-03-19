import React,{useState} from 'react'
import {Link} from 'react-router-dom'   
import './css/Dashboard.css' 
function DashBoard({info,getRooms,roomsData,isLoggedIn}) {


    return (
        <div id='dashboard'>
        <div id='hotelData'>
               {
                   info.map((item,i) => {
                       return<div key={i}> <p className='name'>{item.name} Hotel</p>
                       <p><img src={`https://ipfs.infura.io/ipfs/${item.hashes}`} style={{ maxWidth: '55pc'}}/></p>
                       <p> City : {item.city}</p>
                       <p>Address : {item.Address}</p>
                       <p>Available Rooms : {item.totalRooms.toNumber()}</p>
                       <p>Price : {item.price.toNumber()}</p>
                       <p>Income : {item.income.toNumber()}</p>
                       </div> 
                   })
               }
</div>
<div id='room'>
<Link to='/add' > <button>Add Hotel</button></Link> 
   
   <h4 id='inp'>Who Is In The Room</h4>
   <input type="Number" placeholder='Room No'  onChange={(e)=>{getRooms(e.target.value || 0)}} />
    <div id="roomData">
        {
            roomsData.map((item,i)=>{
              return  <div key={i}>
                 <p className='name'>Customer Data</p>
                <p> Room No : {item.roomNumber.toNumber()}</p>
                <p>Name : {item.name}</p>
                <p>Age : {item.age.toNumber()}</p>
                <p>Gender ; {item.gender}</p>
                </div>
            })
        }
</div>
      
</div>
            </div>
    )
}

export default DashBoard
