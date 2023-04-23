import React from 'react'

function Card({data}) {
  return (
    <section className='card'>
        <div className="card-front">
          <svg width="84" height="47" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="23.478" cy="23.5" rx="23.478" ry="23.5" fill="#fff"/><path d="M83.5 23.5c0 5.565-4.507 10.075-10.065 10.075-5.559 0-10.065-4.51-10.065-10.075 0-5.565 4.506-10.075 10.065-10.075 5.558 0 10.065 4.51 10.065 10.075Z" stroke="#fff"/></svg>
          <p className="card-num">{data.number === "" ? "0000 0000 0000 0000" : data.number}</p>
          <div className="card-front-bottom">
            <p className="card-name">{data.name === "" ? "Jane Appleseed" : data.name}</p>
            <p className="card-exp-date">{data.month === "" ? "00" : data.month}/{data.year === "" ? "00" : data.year}</p>
          </div>
        </div>
        <div className="card-back">
          <p className="cvv-num">{data.cvc === "" ? "000" : data.cvc}</p>
        </div>
    </section>
  )
}

export default Card