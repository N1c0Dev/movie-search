import React from 'react'
import {
  Row,
  Container,
} from 'react-bootstrap'
import MovieItem from '../../components/MovieItem'
import './styles.css'

const MovieContainer = ({ movies }) => {



  function renderItems() {
    return movies.map(movie => {
      const favouriteStorage = localStorage.favourite !== undefined ? localStorage.favourite.split(',') : []

      return (<MovieItem movie={movie} favourite={favouriteStorage.indexOf(movie.imdbID) > -1} />)
    })
  }

    return (
      <Container>
        <Row>
          {renderItems()}
        </Row>
      </Container>
    )
}

export default MovieContainer;
