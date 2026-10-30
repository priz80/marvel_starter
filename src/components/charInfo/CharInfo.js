import { Component } from "react";
import "./charInfo.scss";
import abyss from "../../resources/img/abyss.jpg";
import MarvelService from "../../services/MarvelServices";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

class CharInfo extends Component {
  state = {
    char: null,
    loading: true,
    error: false,
    imageError: false,
  };

  marvelService = new MarvelService();

  onCharLoaded = (char) => {
    this.setState({ char, loading: false, imageError: false });
  };

  onError = () => {
    this.setState({ loading: false, error: true });
  };

  onImageError = () => {
    this.setState({ imageError: true });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.charId !== this.props.charId && this.props.charId) {
      this.loadChar();
    }
  }

  loadChar() {
    if (!this.props.charId) return;
    this.marvelService
      .getCharacter(this.props.charId)
      .then(this.onCharLoaded)
      .catch(this.onError);
  }

  componentDidMount() {
    this.loadChar();
  }

  render() {
    const { char, loading, error, imageError } = this.state;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;

    if (!char) {
      return (
        <div className="char__info">
          {errorMessage}
          {spinner}
        </div>
      );
    }

    const { name, description, thumbnail, homepage, wiki } = char;

    return (
      <div className="char__info">
        <div className="char__basics">
          <img
            src={imageError ? abyss : thumbnail}
            onError={this.onImageError}
            alt={name}
          />
          <div>
            <div className="char__info-name">{name}</div>
            <div className="char__btns">
              <a href={homepage} className="button button__main">
                <div className="inner">homepage</div>
              </a>
              <a href={wiki} className="button button__secondary">
                <div className="inner">Wiki</div>
              </a>
            </div>
          </div>
        </div>
        <div className="char__descr">{description}</div>
        <div className="char__comics">Comics:</div>
        <ul className="char__comics-list">
          {char.comics?.length > 0 ? (
            char.comics.slice(0, 10).map((item, i) => {
              return (
                <li key={i} className="char__comics-item">
                  {item}
                </li>
              );
            })
          ) : (
            <li className="char__comics-item">No comics available</li>
          )}
        </ul>
      </div>
    );
  }
}

export default CharInfo;
