import React from 'react'
import {
  Col,
  Row,
  Container,
} from 'react-bootstrap'
import './styles.css'

const MovieItem = ({movies}) => {

  function renderItems(){
    return movies.map(movie => {
      return (
        <Col className="text-center image-container" xs={12} sm={6} md={6} lg={4} onClick={() => displayInfo(movie.imdbID)}>
          <div className="image-poster">
            <img className="image-size" src={movie.Poster} alt="Poster"/>
          </div>
          <div className="image-title">{movie.Title}</div>
          <div className="image-subtitle">{movie.Year}</div>
        </Col>
      )
    })
  }

  function displayInfo(movieId){
    fetch(`${process.env.REACT_APP_BASE_URL}?apikey=${process.env.REACT_APP_APIKEY}&i=${movieId}`)
    .then(resp => resp.json())
    .then(result => {
      alert(result.Plot)
    })
  }

  return (
    <Row>
      {renderItems()}
    </Row>
  )
}

export default MovieItem
