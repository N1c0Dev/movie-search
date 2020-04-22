import React from 'react'
import {
  Col,
  Modal,
  Button,
  Card,
  Accordion,
} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faStar,
} from '@fortawesome/free-solid-svg-icons'
import './styles.css'

export default class MovieItem extends React.Component {

  state = {
    showModal: false,
    favourite: false,
    movieInfo: {
      Ratings: [],
    },
  }

  displayInfo = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}?apikey=${process.env.REACT_APP_APIKEY}&i=${this.props.movie.imdbID}&type=movie`)
    .then(resp => resp.json())
    .then(result => {
      this.setState({
        movieInfo: result,
      })
      this.handleModal()
    })
  }

  handleModal = () => {
    this.setState({
      showModal: !this.state.showModal,
    })
  }

  handleFavourite = (imdbID) => {
    const favouriteStorage = localStorage.getItem('favourite') === null || localStorage.getItem('favourite') === '' ? '' : localStorage.getItem('favourite')
    if (favouriteStorage.indexOf(imdbID) === -1) {
      localStorage.setItem('favourite', `${favouriteStorage},${imdbID}`)
    }

    this.setState({
      favourite: !this.state.favourite,
    })
  }

  renderRating = (ratings) => (
    ratings.map(rating => (
      <div>
        <span className="modal-item">{rating.Source}:</span> {rating.Value}
      </div>
    ))
  )

  render() {
    const {
      showModal,
      movieInfo,
      favourite,
    } = this.state
    const {
      movie,
    } = this.props

    return (
      <Col className="text-center image-container" xs={movie.Response === 'False' ? 0 : 12} sm={movie.Response === 'False' ? 0 : 12} md={movie.Response === 'False' ? 0: 6} lg={movie.Response === 'False' ? 0 : 4}>
        {
          movie.Response === 'False' ? (
            ''
          ) : (
            <span>
              <div className="image-poster" onClick={this.displayInfo}>
              {movie.hasOwnProperty('Poster') || movie.Poster !== 'N/A' ? (
                <img className="image-size" src={movie.Poster} alt="Poster"/>
                ) : (
                  'Sin poster'
                )
              }
              </div>
              <div className={favourite ? "favourite-fill" : "favourite-default"}>
                <FontAwesomeIcon onClick={() => this.handleFavourite(movie.imdbID)} icon={faStar} />
              </div>
              <div className="image-title">{movie.Title}</div>
              <div className="image-subtitle">{movie.Year}</div>
            </span>
        )
      }
        <Modal show={showModal} onHide={this.handleModal} animation={true}>
          <Modal.Header className="modal-header">
            <Modal.Title>{movieInfo.Title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {movieInfo.Plot}
            <br/>
            <br/>
            <Accordion defaultActiveKey="0">
              <Card>
                <Accordion.Toggle className="modal-item-title" as={Card.Header} eventKey="0">
                  General
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <span className="modal-item">Released:</span> {movieInfo.Released}<br/>
                    <span className="modal-item">Runtime:</span> {movieInfo.Runtime}<br/>
                    <span className="modal-item">Genre:</span> {movieInfo.Genre}<br/>
                    <span className="modal-item">Rated:</span> {movieInfo.Rated}<br/>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Accordion.Toggle className="modal-item-title" as={Card.Header} eventKey="1">
                  Staff
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                  <Card.Body>
                    <span className="modal-item">Director:</span> {movieInfo.Director}<br/>
                    <span className="modal-item">Writer:</span> {movieInfo.Writer}<br/>
                    <span className="modal-item">Actors:</span> {movieInfo.Actors}<br/>
                    <span className="modal-item">Production:</span> {movieInfo.Production}<br/>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Accordion.Toggle className="modal-item-title" as={Card.Header} eventKey="2">
                  Location
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="2">
                  <Card.Body>
                    <span className="modal-item">Language:</span> {movieInfo.Language}<br/>
                    <span className="modal-item">Country:</span> {movieInfo.Country}<br/>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Accordion.Toggle className="modal-item-title" as={Card.Header} eventKey="3">
                  Prizes and ratings
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="3">
                  <Card.Body>
                    <span className="modal-item">Awards:</span> {movieInfo.Awards}<br/>
                      {this.renderRating(movieInfo.Ratings)}
                      <span className="modal-item">Metascore:</span> {movieInfo.Metascore}<br/>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>

          </Modal.Body>
          <Modal.Footer>
          <Button className="blue-site" onClick={this.handleModal}>
            Close
          </Button>
          </Modal.Footer>
        </Modal>
      </Col>
    )
  }
}
