import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../css/musicas.css';

class Musicas extends Component {
  render() {
    const { musicas } = this.props;
    const elements = musicas.map((musica) => (
      <Link
        data-testid={ `link-to-album-${musica.collectionId}` }
        key={ musica.collectionName }
        to={ `/album/${musica.collectionId}` }
      >
        <div className="album-card">
          <img src={ musica.artworkUrl100 } alt={ musica.collectionName } />
          <h2>{ musica.collectionName }</h2>
          <h4>{ musica.artistName }</h4>
        </div>
      </Link>
    ));
    return (
      <div className="grid-container">
        { elements }
      </div>
    );
  }
}

Musicas.propTypes = {
  musicas: PropTypes.arrayOf(
    PropTypes.shape({
      artistId: PropTypes.number,
      artistName: PropTypes.string,
      collectionId: PropTypes.number,
      collectionName: PropTypes.string,
      collectionPrice: PropTypes.number,
      artworkUrl100: PropTypes.string,
      releaseDate: PropTypes.string,
      trackCount: PropTypes.number,
    }),
  ).isRequired,
};

export default Musicas;
