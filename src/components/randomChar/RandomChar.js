import { Component } from "react";

import "./randomChar.scss";
import MarvelService from "../../services/MarvelServices";
import mjolnir from "../../resources/img/mjolnir.png";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import abyss from "../../resources/img/abyss.jpg";

class RandomChar extends Component {
  state = {
    char: {},
    loading: true,
    error: false,
    imageError: false,
  };

  marvelService = new MarvelService();

  onCharLoaded = (char) => {
    this.setState({ char, loading: false });
  };
  onCharLoading = (char) => {
    this.setState({ loading: true });
  };

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  };

  onImageError = () => {
    this.setState({ imageError: true });
  };

  updateChar = () => {
    // this.setState({ loading: true, error: false });
    const id = Math.floor(Math.random() * 20) + 1;
    this.onCharLoading();
    this.marvelService
      .getCharacter(id)
      .then(this.onCharLoaded)
      .catch(this.onError);
  };

  componentDidMount() {
    this.updateChar();
  }

  render() {
    const { char, loading, error, imageError } = this.state;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? (
      <View
        char={char}
        imageError={imageError}
        onImageError={this.onImageError}
      />
    ) : null;

    return (
      <div className="randomchar">
        {errorMessage}
        {content}
        {spinner}
        <div className="randomchar__static">
          <p className="randomchar__title">
            Random character for today!
            <br />
            Do you want to get to know him better?
          </p>
          <p className="randomchar__title">Or choose another one</p>
          <button className="button button__main" onClick={this.updateChar}>
            <div className="inner">try it</div>
          </button>
          <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
        </div>
      </div>
    );
  }
}

const View = ({ char, imageError, onImageError }) => {
  const { name, description, thumbnail, homepage, wiki } = char;
  return (
    <div className="randomchar__block">
      <img
        src={imageError ? abyss : thumbnail}
        onError={onImageError}
        alt="Random character"
        className="randomchar__img"
      />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{description}</p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;
