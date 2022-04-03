import React from 'react';
import CardParcelas from './CardParcelas'

import image2 from '../img/parcela.jpg'

const cards = [
    {
        id: 1,
        title: 'Parcela',
        image: image2
    },
]

function CardsParcelas({btn, parcelasID, parcelaAlturaMax, parcelaAlturaMin }) {

    const profileData = async () => {

        cards.push({
            id: 3,
            title: 'Parcela',
            image: image2
        },)
        console.log(cards)
    };

  return (
    <div className='container d-flex justify-content-center align-items-center h-100'>
        <div id="card" className='row'>
            {
                cards.map(card => (
                    <div className='col-md-6' key={card.id}>
                        <CardParcelas title={card.title} imageSource={card.image} btn={btn} parcelasID={parcelasID} AlturaMax={parcelaAlturaMax} AlturaMin={parcelaAlturaMin} />
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default CardsParcelas
