import { useState, useEffect } from "react";
import "./charList.scss";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import abyss from "../../resources/img/abyss.jpg";

const CharList = ({ onCharSelected }) => {
  const [characters, setCharacters] = useState([]);
  const [imageError, setImageError] = useState({});
  const [offset, setOffset] = useState(9);
  const [limit] = useState(9);
  const [loadingMore, setLoadingMore] = useState(false);
  const { getAllCharacters } = useMarvelService();

  const onImageError = (name) => {
    setImageError((prev) => ({ ...prev, [name]: true }));
  };

  const onLoadMore = () => {
    if (loadingMore) return;
    setLoadingMore(true);

    getAllCharacters(offset, limit)
      .then((newCharacters) => {
        setCharacters((prev) => [...prev, ...newCharacters]);
        setOffset((prev) => prev + limit);
        setLoadingMore(false);
      })
      .catch(() => setLoadingMore(false));
  };

  useEffect(() => {
    getAllCharacters(0, limit)
      .then(setCharacters)
      .catch(() => {});
  }, [getAllCharacters, limit]);

  const charItems = characters.map((char) => (
    <li
      className="char__item"
      key={char.id}
      onClick={() => onCharSelected(char.id)}
    >
      <img
        src={imageError[char.name] ? abyss : char.thumbnail}
        onError={() => onImageError(char.name)}
        alt={char.name}
      />
      <div className="char__name">{char.name}</div>
    </li>
  ));

  return (
    <div className="char__list">
      <ul className="char__grid">{charItems}</ul>
      {loadingMore && <Spinner />}
      <button
        className="button button__main button__long"
        onClick={onLoadMore}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default CharList;
