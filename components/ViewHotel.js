import React from 'react'

import './css/View.css'

function ViewHotel({id,setId,allHotels,bookHotel}) {

   let hotel = allHotels.filter(item=>{
      return item.id == id
   })
    return (
        <div id='view'>
           <button id='back' onClick={()=>{
                   setId('')
               }}> ⬅ </button>
          {
              hotel.map((item,i) => {
                  return<div key={i}>
                  
                  <p id='title'>{item.name}</p>
                  <p><img src={`https://ipfs.infura.io/ipfs/${item.hashes}`} style={{ maxWidth: '90vw', height:'90vh'}}/></p>
                 
                  <div id='data'>
                  <p>City : {item.city}</p>
                  <p>Available Rooms : {item.totalRooms.toNumber()}</p>
                  <p>Price : {item.price.toNumber()}</p>
                  <button onClick={()=>{
                    bookHotel(item.id.toNumber())
                  }}>
                Book 
                  </button>
                  </div>
                  </div>
              })
              
          }
          
        
        </div>
    )
}

export default ViewHotel
