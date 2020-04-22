import React from 'react'
import {
  Container,
  Row,
  Navbar,
} from 'react-bootstrap'
import MovieContainer from '../MovieContainer'
import './styles.css'

export default class MainContainer extends React.Component {

  state = {
    movieSearch: '',
    movieResults: [],
  }

  handleMovieSearch = ({target}) => {
    this.setState({
      movieSearch: target.value,
    })
  }

  handleClickList = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}?apikey=${process.env.REACT_APP_APIKEY}&s=${this.state.movieSearch}&type=movie`)
    .then(resp => resp.json())
    .then(result => {
      this.setState({
        movieResults: result.Search,
      })
    })
  }

  handleEnterSearch = (event) => {
    if(event.charCode === 13){
      this.handleClickList()
    }
  }

  render() {
    const {
      movieResults,
    } = this.state

    return (
      <div>
        <Navbar className="navbar-header">
          <Container>
            <Row className="width-100">
              <input className="width-30" type="text" placeholder="Type the movie name and press Enter..." onChange={this.handleMovieSearch} onKeyPress={this.handleEnterSearch} />
            </Row>
          </Container>
        </Navbar>
        <Container>
          <div className="title">Movie List</div>
          <Row className="list-container">
            <MovieContainer movies={movieResults} />
          </Row>
        </Container>
        <Container>
          <div className="title">Favorites</div>
          <Row className="list-container">
            <MovieContainer movies={movieResults} />
          </Row>
        </Container>
      </div>
    )
  }
}
