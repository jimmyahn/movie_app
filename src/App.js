import React,{ Component } from 'react';
import './App.css';
import Movie from './Movie';


class App extends Component {
  state ={}

  componentDidMount(){
    this._getMovies();
  }

  _renderMovies = () =>{
    const movieList = this.state.movieList.map(movie =>{
      return <Movie 
        title={movie.title}
        poster={movie.medium_cover_image} 
        key ={movie.id} 
        genres={movie.genres}
        synopsis={movie.synopsis}
        />
    })
    return movieList
  }

  _getMovies = async () =>{
    const movieList = await this._callApi()
    this.setState({
      movieList
    })
  }

  _callApi = () =>{
    return fetch('https://yts.lt/api/v2/list_movies.json?sort_by=download_count')
    .then(tomato => tomato.json())
    .then(json => json.data.movies)
    .catch(err => console.log(err))
  }

  render(){
    const { movieList } = this.state;
    return (
      <div className={movieList ? "App" : "App--loading"}>
        {movieList ? this._renderMovies() : 'Loading'}
      </div>
    );
  }
}
  

export default App;

//...this.state.movieList, 
        // 기존 array에 아래 dict을 추가하는 코드