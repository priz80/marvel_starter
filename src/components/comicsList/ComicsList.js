import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./comicsList.scss";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";

const ComicsList = () => {
  const [comics, setComics] = useState([]);
  const { getAllComics, process } = useMarvelService();

  useEffect(() => {
    getAllComics().then(setComics);
  }, []);

  const isProcessLoading = process === "loading";

  const comicItems = comics.map((comic) => (
    <li className="comics__item" key={comic.id}>
      <Link to={`/comics/${comic.id}`}>
        <img
          src={comic.thumbnail}
          alt={comic.name}
          className="comics__item-img"
        />
        <div className="comics__item-name">{comic.name}</div>
      </Link>
    </li>
  ));

  return (
    <div className="comics__list">
      {isProcessLoading && <Spinner />}
      <ul className="comics__grid">{comicItems}</ul>
    </div>
  );
};

export default ComicsList;
