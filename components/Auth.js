import React, { useState } from 'react'
import './css/App.css'

function Auth({ registerAO, registerAC }) {

    const [hotel, setHotel] = useState({
        name: '',
        age: '',
        gender: '',
        city: ''
    })

    function handleChange(e) {
        const value = e.target.value;
        setHotel({
            ...hotel,
            [e.target.name]: value
        })
    }


    return (
        <div id='outer'>
            <p id='logo' >D-Space</p>
            <div id='auth'>
                <p id='MainLine'>Register</p>
                <div id='inp'>
                <input type="text" placeholder='Full Name' name='name' value={hotel.name} onChange={handleChange} required />
                <input type="text" placeholder='Age' name='age' value={hotel.age} onChange={handleChange} required />
                <select class="custom-select mr-sm-2"  name='gender' value={hotel.gender} onChange={handleChange} id="inlineFormCustomSelect">
                    <option  selected>Gender</option>
                    <option value='Male'>Male</option>
                    <option value='Female'>Female</option>
                    <option value='Other'>Other</option>
                </select>

                <input type="text" placeholder='City' name='city' value={hotel.city} onChange={handleChange} required />
                </div>
                <div id='abtn'>  <button
                    onClick={(e) => {
                        e.preventDefault()
                        if (hotel.city === '') {
                            alert("Invalid Credentials")
                        } else {
                            registerAC(hotel.name, hotel.age, hotel.gender, hotel.city)
                        }

                    }}
                > Register As Customer </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            if (hotel.city === '') {
                                alert("Invalid Credentials")
                            } else {
                                registerAO(hotel.name, hotel.age, hotel.gender, hotel.city)
                            }

                        }}
                    > Register As Hotel Owner </button></div>
            </div>
        </div>
    )
}

export default Auth
