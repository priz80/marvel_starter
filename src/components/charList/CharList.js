import { Component } from "react";
import "./charList.scss";
import MarvelService from "../../services/MarvelServices";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import abyss from "../../resources/img/abyss.jpg";

class CharList extends Component {
  state = {
    characters: [],
    loading: true,
    error: false,
    imageError: {},
  };

  marvelService = new MarvelService();

  onCharactersLoaded = (characters) => {
    this.setState({ characters, loading: false });
  };

  onError = () => {
    this.setState({ loading: false, error: true });
  };

  onImageError = (name) => {
    this.setState((prev) => ({
      imageError: { ...prev.imageError, [name]: true },
    }));
  };

  componentDidMount() {
    this.marvelService
      .getAllCharacters()
      .then(this.onCharactersLoaded)
      .catch(this.onError);
  }

  render() {
    const { characters, loading, error, imageError } = this.state;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;

    const charItems = characters.slice(0, 9).map((char) => (
      <li className="char__item" key={char.name}>
        <img
          src={imageError[char.name] ? abyss : char.thumbnail}
          onError={() => this.onImageError(char.name)}
          alt={char.name}
        />
        <div className="char__name">{char.name}</div>
      </li>
    ));

    return (
      <div className="char__list">
        {errorMessage}
        {spinner}
        <ul className="char__grid">{charItems}</ul>
        <button className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

export default CharList;
