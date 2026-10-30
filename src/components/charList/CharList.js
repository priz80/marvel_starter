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
    offset: 9,
    limit: 9,
    loadingMore: false,
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

  onLoadMore = () => {
    const { offset, limit, loadingMore } = this.state;
    if (loadingMore) return;

    this.setState({ loadingMore: true });

    this.marvelService
      .getAllCharacters(offset, limit)
      .then((newCharacters) => {
        this.setState((prev) => ({
          characters: [...prev.characters, ...newCharacters],
          offset: prev.offset + prev.limit,
          loadingMore: false,
        }));
      })
      .catch(this.onError);
  };

  componentDidMount() {
    this.marvelService
      .getAllCharacters(0, 9)
      .then(this.onCharactersLoaded)
      .catch(this.onError);
  }

  render() {
    const { characters, loading, error, imageError, loadingMore } = this.state;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const moreSpinner = loadingMore ? <Spinner /> : null;

    const charItems = characters.map((char) => (
      <li
        className="char__item"
        key={char.id}
        onClick={() => this.props.onCharSelected(char.id)}
      >
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
        {moreSpinner}
        <button
          className="button button__main button__long"
          onClick={this.onLoadMore}
        >
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

export default CharList;
