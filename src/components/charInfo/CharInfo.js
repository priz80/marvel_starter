import { useState, useEffect } from "react";
import "./charInfo.scss";
import abyss from "../../resources/img/abyss.jpg";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

const CharInfo = ({ charId }) => {
  const [char, setChar] = useState(null);
  const [imgSrc, setImgSrc] = useState(abyss);
  const { getCharacter, process } = useMarvelService();

  useEffect(() => {
    if (!charId) return;
    getCharacter(charId).then((data) => {
      setChar(data);
      
      if (data.thumbnail && data.thumbnail.startsWith("http")) {
        setImgSrc(abyss);
      } else {
        setImgSrc(data.thumbnail);
      }
    });
  }, [charId]);

  const isProcessLoading = process === "loading";

  if (!char) {
    return (
      <div className="char__info">
        {isProcessLoading && <Spinner />}
      </div>
    );
  }

  const { name, description, homepage, wiki, comics } = char;

  return (
    <div className="char__info">
      <div className="char__basics">
        <img
          src={imgSrc}
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
