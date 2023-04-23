import React from 'react'
import { useState } from 'react'
import {Link} from 'react-router-dom'

function Form({data, setData}) {

  const [errors, setErrors] = useState({
    nameError: "",
    numberError: "",
    monthError: "",
    yearError: "",
    cvcError: ""
})

  const handleChange = (event) => {

    let {name, value} = event.target
    setData(prev => {

      if(name === "number"){
        value = value.replace(/[^\d]/g, "").replace(/(.{4})/g, "$1 ").trim()
      }

      if(name === "month" || name === "year" || name === "cvc"){
        value = value.replace(/[^\d]/g, "").trim()
      }

      return(
        {
          ...prev,
          [name]: value
        }
      )
    })

    

    setErrors(prev => {
      let error = []

       switch(name){
         case "number":
           if(value.length < 19)
           error.push("has to be 16 digits");
         break;

         case "month":
           if(value.length < 2){
            error.push("has to be 2 digits");
           };
           if(parseInt(value) > 12 || parseInt(value) <= 0){
            error.push("invalid month")
           }
         break;

         case "year":
           if(value.length < 2){
            error.push("has to be 2 digits");
           };
           if(parseInt(value) < parseInt(new Date().getFullYear().toString().slice(2))){
            error.push("invalid year")
           }
         break;

         case "cvc":
           if(value.length < 3)
           error.push("has to be 3 digits");
         break;

         default:
           error = [];
       }

      return (
        {
          ...prev,
          [`${name}Error`]: error.join(", ")
        }
      )
  
    })

  }

  const handleClick = (event) => {

    Array.from(document.querySelectorAll("input")).map((e) => {
      if(e.value === ""){
        event.preventDefault()
        setErrors(prev => {
         let error = []
   
          switch(e.value){
            case "":
              error.push("can't be blank");
            break;
   
            default:
              error = [];
          }
   
         return (
           {
             ...prev,
             [`${e.name}Error`]: error.join(", ")
           }
         )
       })
      }
    })

    Object.values(errors).map((e) => {
      if(e !== ""){
        event.preventDefault()
        return
      }
    });

  }


  return (
    <section className='form-section'>
        <form>
          <div>
            <p className='lebel'>Cardholder Name</p>
            <input
              style={{borderColor: errors.nameError !== "" && "hsl(0, 100%, 66%)"}}
              type="text" 
              placeholder='e.g. Jane Appleseed' 
              name="name" 
              onChange={handleChange}
              value={data.name}
            />
            <p className='error-msg'>{errors.nameError}</p>
          </div>
          <div>
            <p className='lebel'>Card Number</p>
            <input 
              style={{borderColor: errors.numberError !== "" && "hsl(0, 100%, 66%)"}}
              type="text" 
              placeholder='e.g. 1234 5678 9123 0000' 
              name="number" 
              onChange={handleChange}
              value={data.number}
              maxLength="19"
            />
            <p className='error-msg'>{errors.numberError}</p>
          </div>
          <div className='form-bottom'>
            <div>
              <p className='lebel'>Exp. Date (MM/YY)</p>
              <div className='expiry-date'>
                <input 
                  style={{borderColor: errors.monthError !== "" && "hsl(0, 100%, 66%)"}}
                  type="text" 
                  placeholder='MM' 
                  className='month' 
                  name='month' 
                  onChange={handleChange}
                  value={data.month}
                  maxLength="2"
                />
                <input 
                  style={{borderColor: errors.yearError !== "" && "hsl(0, 100%, 66%)"}}
                  type="text" 
                  placeholder='YY'
                  name='year' 
                  onChange={handleChange}
                  value={data.year}
                  maxLength="2"
                />
              </div>
              <p className='error-msg'>{errors.monthError === ""? errors.yearError : errors.monthError}</p>
            </div>
            <div className='cvc-div'>
              <p className='lebel'>CVC</p>
              <input 
                style={{borderColor: errors.cvcError !== "" && "hsl(0, 100%, 66%)"}}
                type="text" 
                placeholder='e.g. 123' 
                name='cvc' 
                onChange={handleChange}
                value={data.cvc}
                maxLength="3"
              />
              <p className='error-msg'>{errors.cvcError}</p>
            </div>
          </div>
          <Link onClick={handleClick} to='/Complete' className='button'>Confirm</Link>
        </form>
    </section>
  )
}

export default Form