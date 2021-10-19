import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorite: false,
      loading: false,
    };
  }

  componentDidMount() {
    this.checkFavorite();
  }

  handleCheck = ({ target: { name, checked } }) => {
    this.setState({ [name]: checked }, this.addOrRemove);
  }

  checkFavorite = async () => {
    const { obj: { trackId } } = this.props;
    const favoriteSongs = await getFavoriteSongs();
    const favorite = favoriteSongs.find((item) => item.trackId === trackId);
    if (favorite) {
      this.setState({ favorite: true });
    }
  }

  addOrRemove = async () => {
    const { favorite } = this.state;
    const { obj, getFavoritas } = this.props;
    this.setState({ loading: true });
    if (favorite) {
      await addSong(obj);
    } else {
      await removeSong(obj);
      getFavoritas();
    }
    this.setState({ loading: false });
  }

  trackContain() {
    const { obj: { trackName, previewUrl, trackId, artworkUrl100 }, index } = this.props;
    const { favorite } = this.state;
    return (
      <div className="musica">
        <p>{ index }</p>
        <img src={ artworkUrl100 } alt="musica-imagem" />
        <h3>{ trackName }</h3>
        <audio
          data-testid="audio-component"
          src={ previewUrl }
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label htmlFor="track-id">
          Favorita
          <input
            name="favorite"
            checked={ favorite }
            onChange={ this.handleCheck }
            id="track-id"
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
          />
        </label>
      </div>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <>
        { loading ? <Loading /> : this.trackContain() }
      </>
    );
  }
}

MusicCard.propTypes = {
  obj: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
    previewUrl: PropTypes.string.isRequired,
  }).isRequired,
  getFavoritas: PropTypes.func,
};

MusicCard.defaultProps = {
  getFavoritas: () => '',
};

export default MusicCard;
