import React from 'react'
import {
  Container,
  Row,
  Navbar,
} from 'react-bootstrap'
import MovieItem from '../../components/MovieItem'
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
    fetch(`${process.env.REACT_APP_BASE_URL}?apikey=${process.env.REACT_APP_APIKEY}&s=${this.state.movieSearch}`)
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
              {/* <button onClick={this.handleClickList}>Consultar</button> */}
            </Row>
          </Container>
        </Navbar>
        <Container>
          <div className="title">Movie List</div>
          <Row className="list-container">
            <MovieItem movies={movieResults} />
          </Row>
        </Container>
        <Container>
          <div className="title">Favorites</div>
          <Row className="list-container">
            <MovieItem movies={movieResults} />
          </Row>
        </Container>
      </div>
    )
  }
}
