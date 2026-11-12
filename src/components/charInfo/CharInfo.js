import { useState, useEffect } from "react";
import "./charInfo.scss";
import abyss from "../../resources/img/abyss.jpg";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";

const CharInfo = ({ charId }) => {
  const [char, setChar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const { getCharacter } = useMarvelService();

  useEffect(() => {
    if (!charId) return;
    setLoading(true);
    getCharacter(charId)
      .then((data) => {
        setChar(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [charId, getCharacter]);

  if (loading) {
    return (
      <div className="char__info">
        <Spinner />
      </div>
    );
  }

  if (!char) {
    return <div className="char__info">No character found</div>;
  }

  const { name, description, thumbnail, homepage, wiki, comics } = char;

  return (
    <div className="char__info">
      <div className="char__basics">
        <img
          src={imageError ? abyss : thumbnail}
          onError={() => setImageError(true)}
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
        {comics?.length > 0 ? (
          comics.slice(0, 10).map((item, i) => (
            <li key={i} className="char__comics-item">
              {item}
            </li>
          ))
        ) : (
          <li className="char__comics-item">No comics available</li>
        )}
      </ul>
    </div>
  );
};

export default CharInfo;
