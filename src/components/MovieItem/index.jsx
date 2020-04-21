import React from 'react'

const MovieItem = ({movies}) => {

  function renderItems(){
    return movies.map(movie => {
      return (
        <div onClick={() => displayInfo(movie.imdbID)}>
          <img src={movie.Poster} alt="Poster"/>
          <div>{movie.Title}</div>
          <div>{movie.Year}</div>
        </div>
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
    <div>
      {renderItems()}
    </div>
  )
}

export default MovieItem
