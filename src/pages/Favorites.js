import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import '../css/favorites.css'

class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoritas: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.getFavoritas();
  }

  getFavoritas = async () => {
    this.setState({ loading: true });
    const favoriteSongs = await getFavoriteSongs();
    this.setState({ favoritas: favoriteSongs, loading: false });
  }

  favoritasContain = () => {
    const { favoritas } = this.state;
    let elements;
    if (favoritas.length) {
      elements = favoritas.map((obj, index) => (
        <MusicCard key={ obj.trackName } obj={ obj } index={index + 1} getFavoritas={ this.getFavoritas } />
      ));
    }
    return (
      <div className="page-favorites">
        <h2>Favoritos: </h2>
        <div className="favs">
          { elements }
        </div>
      </div>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <>
        <Header active="Favorites"/>
        { loading ? <Loading /> : this.favoritasContain() }
      </>
    );
  }
}

export default Favorites;
