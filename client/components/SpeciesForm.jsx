import React, { useEffect, useState } from 'react'
import {Link, Redirect} from 'react-router-dom'
import { getSpeciesAndLocations, getSpecies } from '../apis/whale'

const SpeciesForm = () => {

  const[dataSet, setDataSet] = useState([])
  const[speciesPicture, setSpeciesPicture] = useState("")
  const [id, setId] = useState(0)
  const [redirect, setRedirect] = useState(false)
  // const[location, setSpeciesName] = useState([{name:""}])


  useEffect(()=> {
    fetchSpecies()
  },[])

  const fetchSpecies = () => {
    // getSpeciesAndLocations()
    getSpecies()
    .then(data => {
      setDataSet(data)
      // console.log(data)
    })
  }

  const handleChange = (event) => {

    let selectName = event.target.value

    dataSet.find(species => {
      if (species.name == selectName){
        setSpeciesPicture(species.url)
        setId(species.id)
      }
    })
  }

  const handleSubmit = (event) => {
    // console.log(id)
    event.preventDefault()
    setRedirect(true)
    // (<Link to={`/species/${id}`}/>)
  }



  return (
    <>
      <form onSubmit={handleSubmit}>
        <label for="species">Choose a species:</label>
        <select  name="species" id="species" onChange={handleChange}>
        <option value="" disabled selected>Select a species</option>
      {dataSet.map(species => {
        return(<option key={species.id} value={species.name}>{species.name}</option>
        )
      })}
        </select>

        <button>submit</button>

      </form>
      
      <img style={{width: "300px"}}src={speciesPicture}></img>
      {(redirect && <Redirect to={`/species/${id}`}/>)}
    </>
  )
}

export default SpeciesForm