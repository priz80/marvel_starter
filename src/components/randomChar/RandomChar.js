import { useState, useEffect, useCallback } from "react";
import "./randomChar.scss";
import useMarvelService from "../../services/MarvelService";
import mjolnir from "../../resources/img/mjolnir.png";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import abyss from "../../resources/img/abyss.jpg";

const RandomChar = () => {
  const [char, setChar] = useState({});
  const [imageError, setImageError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { getCharacter } = useMarvelService();

  const updateChar = useCallback(() => {
    setLoading(true);
    setError(false);
    const id = Math.floor(Math.random() * 20) + 1;
    getCharacter(id)
      .then((data) => {
        setChar(data);
        setImageError(false);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [getCharacter]);

  useEffect(() => {
    updateChar();
  }, [updateChar]);

  return (
    <div className="randomchar">
      {error && <ErrorMessage />}
      {loading ? (
        <Spinner />
      ) : (
        <View char={char} imageError={imageError} onImageError={() => setImageError(true)} />
      )}
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">Or choose another one</p>
        <button className="button button__main" onClick={updateChar}>
          <div className="inner">try it</div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  );
};

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
