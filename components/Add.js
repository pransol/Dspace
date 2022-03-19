import React,{useState} from 'react'
import './css/add.css'

function Auth({addHotel,captureFile}) {

     const[hotel,setHotel] = useState({
         name:'',
         city:'',
         address:'',
         rooms:'',
         price:''
     })

function handleChange (e) {
   const value = e.target.value;
   setHotel({
       ...hotel,
       [e.target.name] : value
   })
}

    return (
        <div id='add'>
            <div id='mainC' >
                <h4>Add Your Hotel</h4>
               <input type="text" placeholder='Name' name='name' value={hotel.name} onChange={handleChange} />
               <input type='file' placeholder='Image' accept=".jpg, .jpeg, .png, .bmp, .gif" onChange={captureFile} />
               <input type="text" placeholder='City' name='city' value={hotel.city} onChange={handleChange} />
               <input type="text" placeholder='Address' name='address' value={hotel.address} onChange={handleChange} />
               <input type="text" placeholder='TotalRooms' name='rooms' value={hotel.rooms} onChange={handleChange} />
               <input type="text" placeholder='Price' name='price' value={hotel.price} onChange={handleChange} />
             <button onClick={(e)=>{
                e.preventDefault()
                addHotel(hotel.name,hotel.city,hotel.address,hotel.rooms,hotel.price)
            }}>Add Hotel</button>
            </div>
        
            </div>
    )
}

export default Auth
