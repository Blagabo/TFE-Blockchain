import React, {useReducer} from 'react'
import "./css/Cards.css";

function CardDrones({title, imageSource, dronesID, AlturaMax, AlturaMin}) {

  //const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

  return (
    <div className="card text-center bg-dark animate__animated animate__fadeInUp">
        <img className='card-img-top' src={imageSource} alt="" />
        <div className='card-body text-light'>
          <h4 className='card-title'>{title}</h4>
          <p className='card-text text-secondary'>
            <h4>ID: {dronesID}</h4>
            <h5>Altura Maxima: {AlturaMax}</h5>
            <h5>Altura Minima: {AlturaMin}</h5>
          </p>
        </div>
    </div>
  )
}

export default CardDrones