import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import * as movieAPI from '../services/movieAPI';
import { Loading } from '../components';

class MovieDetails extends Component {
  constructor() {
    super();

    this.state = {
      movie: '',
    };
  }

  componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    movieAPI.getMovie(id).then((result) => this.setState({ movie: result }));
  }

  async handleClick(deleteMovie) {
    await movieAPI.deleteMovie(deleteMovie);
  }

  renderDetails(movie) {
    const { id, title, storyline, genre, rating, subtitle } = movie;
    return (
      <div className="movie-data">
        <h2>{`Title: ${title}`}</h2>
        <h3>{`Subtitle: ${subtitle}`}</h3>
        <p>{`Storyline: ${storyline}`}</p>
        <p>{`Genre: ${genre}`}</p>
        <p>{`Rating: ${rating}`}</p>
        <div className="links">
          <Link to={ `/movies/${id}/edit` }>EDITAR</Link>
          <Link to="/">VOLTAR</Link>
          <Link to="/" onClick={ () => this.handleClick(id) }>
            DELETAR
          </Link>
        </div>
      </div>
    );
  }

  render() {
    const { movie } = this.state;
    const { imagePath } = movie;
    if (!movie) return <Loading />;
    return (
      <div data-testid="movie-details" className="movie-details">
        <img alt="Movie Cover" src={ `../${imagePath}` } />
        {this.renderDetails(movie)}
      </div>
    );
  }
}

MovieDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default MovieDetails;
