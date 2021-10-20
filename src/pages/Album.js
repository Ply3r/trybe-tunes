import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Header from '../components/Header';
import '../css/album.css'

class Album extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albumName: '',
      artistName: '',
      albumImage: '',
      musics: [],
    };
  }

  componentDidMount() {
    this.getMusics();
  }

  getMusics = async () => {
    const { match: { params: { id } } } = this.props;
    const obj = await getMusics(id);
    this.setState({
      albumName: obj[0].collectionName,
      artistName: obj[0].artistName,
      albumImage: obj[0].artworkUrl100,
      musics: obj.slice(1, obj.length),
    });
  }

  render() {
    const { albumName, artistName, albumImage, musics } = this.state;
    let elements;
    if (musics.length) {
      elements = musics.map((obj, index) => (
        <MusicCard
          key={ obj.trackName }
          obj={ obj }
          index={ index + 1 }
        />
      ));
    }
    return (
      <>
        <Header />
        <div className="page-album">
          <div className="album-information">
            <img src={ albumImage } alt="album" />
            <h1 data-testid="album-name">{ albumName }</h1>
            <h3 data-testid="artist-name">{ artistName }</h3>
          </div>
          <div className="musicas">
            { elements }
          </div>
        </div>
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
