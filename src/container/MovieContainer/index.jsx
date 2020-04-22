import React from 'react'
import {
  Row,
  Container,
} from 'react-bootstrap'
import MovieItem from '../../components/MovieItem'
import './styles.css'

export default class MovieContainer extends React.Component {



  renderItems = () => {
    return this.props.movies.map(movie => (
        <MovieItem movie={movie} />
    ))
  }

  render() {
    return (
      <Container>
        <Row>
          {this.renderItems()}
        </Row>
      </Container>
    )
  }
}
