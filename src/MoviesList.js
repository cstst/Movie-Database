/* eslint react/no-did-mount-set-state: 0 */

import React, { PureComponent } from 'react';
import Movie from './Movie';
import styled from 'styled-components';
import Search from './Search';

class MoviesList extends PureComponent {
  state = {
    defaultMovies: [],
    searchTerm: '',
    searchMovies: [],
    page: 1,
  }

  componentDidMount() {
    this.movieGetter();
  }

  onSubmit(term) {
    this.setState({
      searchTerm: term,
      page: 1,
    }, function stateUpdateComplete() {
      this.movieGetter(term);
    },
    );

  }
  async movieGetter(term) {
    try {
      if (this.state.searchTerm !== '') {
        const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=aeb610aa5871b9cd6a551230f98b446d&language=en-US&query=${term}&page=${this.state.page}&include_adult=false`);
        const searchMovies = await res.json();
        this.setState({
          searchTerm: term,
          searchMovies: searchMovies.results,
        });
        console.log(searchMovies);
      } else {
        const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=aeb610aa5871b9cd6a551230f98b446d&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${this.state.page}`);
        const defaultMovies = await res.json();
        this.setState({
          defaultMovies: defaultMovies.results,
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  returnDefault = () => {
    this.setState({
      searchTerm: '',
      page: 1,
    });
  }

  pageUp = () => {
    this.setState({
      page: this.state.page + 1,
    }, function stateUpdateComplete() {
      this.movieGetter(this.state.searchTerm);
    },
    );

  }

  pageDown = () => {
    if (this.state.page > 1) {
      this.setState({
        page: this.state.page - 1,
      },
      function stateUpdateComplete() {
        this.movieGetter(this.state.searchTerm);
      },
      );

    }
  }

  render() {
    return (
      <div>
        <Search onSubmit={fields => this.onSubmit(fields.term)} />
        <MovieGrid>
          {
          this.state.searchTerm === '' ? this.state.defaultMovies.map(movie => <Movie key={movie.id} movie={movie} />) :
            this.state.searchMovies.map(movie => <Movie key={movie.id} movie={movie} />)
          }
        </MovieGrid>
        <button onClick={this.pageDown}>-</button>Page<button onClick={this.pageUp}>+</button>
        <h1>{this.state.page}</h1>
      </div>
    );
  }
}

export default MoviesList;

const MovieGrid = styled.div`
    display: grid;
    padding: 1rem;
    grid-template-columns: repeat(6, 1fr);
    grid-row-gap: 1rem;
`;
