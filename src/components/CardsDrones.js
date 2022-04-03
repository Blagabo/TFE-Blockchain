import React from 'react'
import CardDrones from './CardDrones'

import image1 from '../img/drone.jpg'

const cards = [
    {
        id: 1,
        title: 'Drone',
        image: image1
    }
]

function CardsDrones({dronesID, droneAlturaMax, droneAlturaMin }) {
    return (
      <div className='container d-flex justify-content-center align-items-center h-100'>
          <div className='row'>
              {
                  cards.map(card => (
                      <div className='col-md-6' key={card.id}>
                          <CardDrones title={card.title} imageSource={card.image} dronesID={dronesID} AlturaMax={droneAlturaMax} AlturaMin={droneAlturaMin} />
                      </div>
                  ))
              }
          </div>
      </div>
    )
  }

export default CardsDrones