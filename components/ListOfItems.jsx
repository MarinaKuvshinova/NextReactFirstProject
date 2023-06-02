const items = [
    {
        id: 1,
        name: "milk",
    },{
        id: 2,
        name: "bread",
    },{
        id: 3,
        name: "eggs",
    },
]

import React from 'react'

export default function ListOfItems() {
  return (
    <ul>
        {
           items.length ? items.map(el => <li key={el.id}>{el.name}</li>) : <li>no item</li>
        }
    </ul>
  )
}
