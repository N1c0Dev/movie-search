import React from 'react'


export default class MainContainer extends React.Component {

  state = {
    movieSearch: '',
    movieResults: {},
  }

  handleMovieSearch = ({ target }) => {
    this.setState({
      movieSearch: target.value,
    })
  }

  handleClickList = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}?apikey=${process.env.REACT_APP_APIKEY}&s=${this.state.movieSearch}`)
    .then(resp => resp.json())
    .then(result => {
      this.setState({
        movieResults: result,
      })
    })
  }

  render() {
    const {
      movieResults,
    } = this.state

    return (
      <div>
        <input type="text" onChange={this.handleMovieSearch} />
        <button onClick={this.handleClickList}>Consultar</button>
        <br/>
        {JSON.stringify(movieResults)}
      </div>
    )
  }
}
