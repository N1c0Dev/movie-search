import React from 'react'
import {
  Col,
  Row,
  Modal,
  Button,
} from 'react-bootstrap'
import './styles.css'

export default class MovieItem extends React.Component {

  state = {
    showModal: false,
  }

  renderItems = () => {
    return this.props.movies.map(movie => {
      return (
        <Col className="text-center image-container" xs={12} sm={12} md={6} lg={4}>
          <div className="image-poster" onClick={() => this.displayInfo(movie.imdbID)}>
            <img className="image-size" src={movie.Poster} alt="Poster"/>
          </div>
          <div className="image-title">{movie.Title}</div>
          <div className="image-subtitle">{movie.Year}</div>
        </Col>
      )
    })
  }

  displayInfo = (movieId) => {
    fetch(`${process.env.REACT_APP_BASE_URL}?apikey=${process.env.REACT_APP_APIKEY}&i=${movieId}`)
    .then(resp => resp.json())
    .then(result => {
      alert(result.Plot)
    })
  }

  handleModal = () => {
    this.setState({
      showModal: !this.state.showModal,
    })
  }

  render() {
    const {
      showModal,
    } = this.state

    return (
      <div>
        <Row>
          {this.renderItems()}
        </Row>
        <Modal show={showModal} onHide={this.handleModal} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
          <Button onClick={this.handleModal}>
          Close
          </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}
