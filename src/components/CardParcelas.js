import React, {useReducer} from 'react'
import "./css/Cards.css";

function CardParcelas({title, imageSource, btn, parcelasID, AlturaMax, AlturaMin}) {

  //const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

  return (
    <div className="card text-center bg-dark animate__animated animate__fadeInUp">
        <img className='card-img-top' src={imageSource} alt="" />
        <div className='card-body text-light'>
          <h4 className='card-title'>{title}</h4>
          <p className='card-text text-secondary'>
            <h4>ID: {parcelasID}</h4>
            <h5>Altura Maxima Permitida: {AlturaMax}</h5>
            <h5>Altura Minima Permitida: {AlturaMin}</h5>
          </p>
          <button onClick={btn} type="button" className="btn btn-success">Fumigar</button>
        </div>
    </div>
  )
}

export default CardParcelas