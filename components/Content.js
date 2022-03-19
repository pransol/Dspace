import React,{useState} from 'react'
import './css/Content.css'
import ViewHotel from './ViewHotel'

import {Grid} from '@material-ui/core'

function Content({history,leave,currentHotel,bookHotel,allHotels}) {

    const[id,setId] = useState()

    const [city,setCity] = useState('')
    const [profile,setProfile] = useState(false)

    let hotel = allHotels.filter(item=>{
        return  item.city.toLowerCase() == city
     })

     let final;
     if( city  == '' ){
         final = allHotels
     }else{
         final = hotel
     }

    return (
        <div id='Content'>
        <div id="nav">
               <h4>Search Hotels By : </h4>
               <input type="text" placeholder='City' value={city} onChange={(e)=>{setCity(e.target.value)}} />
              <h4 onClick={()=>setProfile(!profile)}>Activity</h4>
              <span style={profile ? {display:'Block'}:{display:'none'}} >
              <h3>CurrentHotel</h3>
  {
    currentHotel.map(item => {
        return <div style={{borderBottom:"1px solid #A3A3A3",marginBottom:'1pc',height:'15pc'}}>
           
            <p>Hotel Name : {item.name}</p>
            <p>City : {item.city}</p>
            <p>Bill : {item.price.toNumber()}</p>
            <button onClick={()=>{
              leave(item.id.toNumber() ,item.price.toNumber() )
          }}>Pay and leave</button>
        </div>
    })
}
     <h3>Recent</h3>
    {
        
        history.map((item,i)=>{
            return <div id='history'>   
            <p>Hotel : {item.name}</p>
            <p>City : {item.city}</p>
            <p>Bill : {item.price.toNumber()}</p>
        </div>
        })
    }


              </span>
           </div>
          {  !id ?  
              <Grid  container spacing={4} id="display">
                {
                   final.map((item,i) => {
                       return<Grid key={i} item xs={3} id='main'>
                       <p><img src={`https://ipfs.infura.io/ipfs/${item.hashes}`} style={{ width: '520px' , height:'400px'}}/></p>
                      <div id='nameBtn'> <h3>{item.name}</h3>
                     <button 
                     onClick={()=>{
                        setId(item.id.toNumber())
                     }}
                     >view</button> </div>
                       </Grid> 
                   })
               }
             </Grid>
          
           :  <ViewHotel  id={id} setId={setId} allHotels={allHotels} bookHotel={bookHotel} /> }

        </div>
    )
}

export default Content
