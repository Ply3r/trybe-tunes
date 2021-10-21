import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import { FaBorderAll, FaBars } from 'react-icons/fa';
import '../css/favorites.css'

class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoritas: [],
      loading: false,
      grid: false,
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

  handleGridChange = ({ target }) => {
    const { name } = target.closest('button')
    if (name === 'grid') {
      this.setState({ grid: true })
    } else {
      this.setState({ grid: false })
    }
  }

  favoritasContain = () => {
    const { favoritas, grid } = this.state;
    let elements;
    if (favoritas.length) {
      elements = favoritas.map((obj, index) => (
        <MusicCard 
          key={ obj.trackName }
          obj={ obj }
          grid={ grid }
          index={index + 1}
          getFavoritas={ this.getFavoritas }
        />
      ));
    }
    return (
      <div className="page-favorites">
        <div className="buttons-container">
          <button
            onClick={ this.handleGridChange }
            name="grid"
            className={ `bot ${ grid && 'active-bot' }` }
          > 
            <FaBorderAll /> 
          </button>
          <button
            onClick={ this.handleGridChange }
            name="flex" 
            className={ `bot ${ !grid && 'active-bot' }` }
          > 
            <FaBars /> 
          </button>
        </div>
        <h2>Favoritos: </h2>
        <div className={ grid ? 'grid-container heigth' : 'favs' }>
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
