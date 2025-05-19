import React from 'react'

interface recipe{    name : string;    description : string}

const card = ({name , description }:recipe) => {
  return (
    <div className='border-2 w-40 h-40'>
        <h1>{name}</h1>
        <p>{description}</p>
    </div>
  )
}

export default card