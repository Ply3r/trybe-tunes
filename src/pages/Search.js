import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import Musicas from '../components/Musicas';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import '../css/search.css'

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artista: '',
      artistaBuscado: '',
      loading: false,
      buttonDisable: true,
      musicas: [],
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, this.buttonIsDisable);
  }

  onButtonClick = async () => {
    const { artista } = this.state;
    this.setState({ loading: true, artista: '', artistaBuscado: artista });
    const results = await searchAlbumsAPI(artista);
    this.setState({ musicas: results, loading: false });
  }

  buttonIsDisable = () => {
    const { artista } = this.state;
    if (artista.length >= 2) {
      this.setState({ buttonDisable: false });
    } else {
      this.setState({ buttonDisable: true });
    }
  }

  searchContain = () => {
    const { artistaBuscado, artista, buttonDisable, musicas } = this.state;
    return (
      <div className="page-search">
        <div className="input-search">
          <input
            name="artista"
            value={ artista }
            onChange={ this.handleChange }
          />
          <button
            onClick={ this.onButtonClick }
            disabled={ buttonDisable }
            type="button"
          >
            Pesquisar
          </button>
        </div>
        <h1>
          {`Resultado de álbuns de: ${artistaBuscado}`}
        </h1>
        <div>
          { musicas.length ? <Musicas musicas={ musicas } />
            : ''}
        </div>
      </div>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <>
        <Header active="Search" />
        { loading ? <Loading /> : this.searchContain() }
      </>
    );
  }
}

export default Search;
