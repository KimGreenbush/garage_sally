import React, {useState, useEffect} from 'react'
import {Link, navigate} from '@reach/router'
import axios from "axios"


const NewPostSale = props => {

    const [datetime, setDatetime] = useState();
    const [location, setLocation] = useState();
    const [zipcode, setZipcode] = useState();
    const [errors, setErrors] = useState();


    function submitHandler(e){
        console.log("submit button was click")
        e.preventDefault();

        const newGarageSale ={
            datetime: datetime,
            location: location,
            zipcode: zipcode,
        }


        axios.post("http://localhost:8000/api/garages/new", newGarageSale)
        .then((res)=>{
            console.log(res);
            navigate("/dashboard")
        })
        .catch((err)=>{
            console.log(err);
            setErrors(err.response?.data?.errors)
        })

        console.log(newGarageSale);
    }



    return (

        <div className="newGarageSale-container">

            <div className="backBTN-container">
                <Link to="/dashboard">	back</Link>
                <img src="/img/Group5.png" alt=""/>
            </div>

            <div className="user-container">
                <img src="/img/placeholder.png" alt=""/>
                <p>Luis Cardona</p>
            </div>

            <nav>
                <Link to="/new-sale"> new sale</Link>
                <Link to="/edit/:id"> re-post</Link>
            </nav>
      

            <form onSubmit={(e)=> {submitHandler(e)}}>

                {errors?.datetime && (<p style={{color: "red"}}>
                {errors.datetime?.message}</p>)}
                <input 
                type="date"
                placeholder="date"
                onChange={e => {setDatetime(e.target.value)}}
                />

                
                <div className="timeStamp-container">
                    <label>Start Time</label>
                    {errors?.zipecode && (<p style={{color: "red"}}>
                    {errors.zipecode?.message}</p>)}
                    <input 
                    type="time"
                    placeholder="Start Time:"
                    onChange={e => {setZipcode(e.target.value)}}
                    />

                    <label>End Time</label>
                    {errors?.location && (<p style={{color: "red"}}>
                    {errors.location?.message}</p>)}
                    <input 
                    type="time"
                    placeholder="End Time:"
                    onChange={e => {setLocation(e.target.value)}}
                    />
                </div>

                        
                <div className="addressForm-container">
                    {errors?.location && (<p style={{color: "red"}}>
                    {errors.location?.message}</p>)}
                    <input 
                    placeholder="Location:"
                    onChange={e => {setLocation(e.target.value)}}
                    />
                    
                    {errors?.zipecode && (<p style={{color: "red"}}>
                    {errors.zipecode?.message}</p>)}
                    <input 
                    placeholder="Zip Code:"
                    onChange={e => {setZipcode(e.target.value)}}
                    />
                </div>

                <button> Post Sale</button>

            </form>         

        </div>
    )
}



export default NewPostSale
