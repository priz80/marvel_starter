import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./comicsList.scss";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import abyss from "../../resources/img/abyss.jpg";

const ComicsList = () => {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState({});
  const { getAllComics } = useMarvelService();

  const onImageError = (name) => {
    setImageError((prev) => ({ ...prev, [name]: true }));
  };

  useEffect(() => {
    setLoading(true);
    getAllComics()
      .then(setComics)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [getAllComics]);

  if (loading) {
    return (
      <div className="comics__list">
        <Spinner />
      </div>
    );
  }

  const comicItems = comics.map((comic) => (
    <li className="comics__item" key={comic.id}>
      <Link to={`/comics/${comic.id}`}>
        <img
          src={imageError[comic.name] ? abyss : comic.thumbnail}
          onError={() => onImageError(comic.name)}
          alt={comic.name}
          className="comics__item-img"
        />
        <div className="comics__item-name">{comic.name}</div>
      </Link>
    </li>
  ));

  return (
    <div className="comics__list">
      <ul className="comics__grid">{comicItems}</ul>
    </div>
  );
};

export default ComicsList;
