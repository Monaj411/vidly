import React, { Component } from 'react';
import {getMovies} from './fakeMovieService'
import Pagination from './pagination';
import MoviesTbale from './moviesTbale';
import { paginate } from '../utils/paginate';
import ListGroup from './common/listGroup';
import { getGenres } from '../fakeGenreService';
import { sort } from 'fontawesome';
import _ from 'lodash'
import NavBar from './navBar';
import SearchBox from './common/searchBox';
class Movies
 extends Component {
    state = { 
        movies: [],
        genres: [],
        pageSize: 4,
        sortColumn: {path: 'title', order: 'asc'}

     };

     componentDidMount() {
        const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    
        this.setState({ movies: getMovies(), genres });
      }

handleLike = movie => {
const movies = [...this.state.movies];
const index = movies.indexOf(movie);
movies[index] = {...movies[index]};
movies[index].liked = !movies[index].liked;
this.setState({movies});
}
     handleDelete = movie => {
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({movies});
     }
     handlePageChange = page => {
        this.setState({currentPage: page});
     };
handleGenreSelect = genre => {
    this.setState({selectedGenre: genre, currentPage: 1});

};

handleSort = path => {
    this.setState({sortColumn: {path, order: 'asc'}});
        };
    render() { 
const {length: count} = this.state.movies;
const {pageSize, currentPage, sortColumn, selectedGenre, movies: allMovies} = this.state;

if (count === 0) return <p>There are no movies in the database</p>;
const filtered = selectedGenre && selectedGenre._id ? allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies;
 const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])
const movies = paginate(sorted, currentPage, pageSize ) 
        return (
            <div className="row">
                
                <div c lassName="col-3">                
<ListGroup items={this.state.genres} selectedItem={this.state.selectedGenre} textProperty="name" valueProperty="_id" onItemSelect={this.handleGenreSelect}/></div>
                <div className="col">            
<p>Showing {filtered.length} movies in the database. </p>
< SearchBox />

<MoviesTbale movies={movies} onLike={this.handleLike} onDelete={this.handleDelete} onSort={this.handleSort} />

        
            <Pagination itemsCount={filtered.length} pageSize={pageSize} currentPage={currentPage} onPageChange={this.handlePageChange}/>


</div>
</div>

            
        );
    }
}
 
export default Movies;