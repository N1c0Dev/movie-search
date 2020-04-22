import React from 'react'
import {
  Container,
  Row,
  Navbar,
  Col,
} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFilm,
  faHeart,
} from '@fortawesome/free-solid-svg-icons'
import MovieContainer from '../MovieContainer'
import './styles.css'

export default class MainContainer extends React.Component {

  state = {
    movieSearch: '',
    movieResults: [],
    noMovieText: "No movies found",
    noFavouriteText: "No favourites found",
    searchPlaceholder: "Type the movie title and press Enter..."
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
        movieResults: result.hasOwnProperty('Search') ? result.Search : [],
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
      noMovieText,
      noFavouriteText,
      searchPlaceholder,
    } = this.state

    return (
      <div>
        <Navbar className="navbar-header">
          <Container>
            <Row className="width-100">
              <input className="width-30" type="text" placeholder={searchPlaceholder} onChange={this.handleMovieSearch} onKeyPress={this.handleEnterSearch} />
            </Row>
          </Container>
        </Navbar>
        <Container>
          <div className="title">Movie List</div>
          {
            movieResults.length <= 0 ? (
              <Row className="list-container">
                <Col className="text-center image-container" xs={12} sm={12} md={4} lg={4} />
                <Col className="text-center image-container" xs={12} sm={12} md={4} lg={4} >
                  <FontAwesomeIcon className="default-icons" icon={faFilm}/>
                  <div className="default-title">{noMovieText}</div>
                </Col>
              <Col className="text-center image-container" xs={12} sm={12} md={4} lg={4} />
              </Row>
            ) : (
              <Row className="list-container">
                <MovieContainer movies={movieResults} />
              </Row>
            )
          }

        </Container>
        <Container>
          <div className="title">Favorites</div>
          <Row className="list-container margin-bottom-50">
            <Col className="text-center image-container" xs={12} sm={12} md={4} lg={4} />
            <Col className="text-center image-container" xs={12} sm={12} md={4} lg={4}>
              <FontAwesomeIcon className="default-icons" icon={faHeart} />
              <div className="default-title">{noFavouriteText}</div>
            </Col>
            <Col className="text-center image-container" xs={12} sm={12} md={4} lg={4} />
          </Row>
        </Container>
      </div>
    )
  }
}
