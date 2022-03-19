import React from 'react'
import DashBoard from './DashBoard'
import Content from './Content'



function Main({history , leaveHotel,currentHotel,bookHotel,display,info,getRooms,roomsData,allHotels}) {

    return (
        <div>
            {
                display ? <Content history={history} leave={leaveHotel} currentHotel={currentHotel} bookHotel={bookHotel} allHotels={allHotels} /> : <DashBoard info={info} getRooms={getRooms} roomsData={roomsData} />
            }
        </div>
    )
}

export default Main
