import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import MarvelService from "../../services/MarvelServices";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./singleComicPage.scss";

const marvelService = new MarvelService();

const SingleComicPage = () => {
  const { comicId } = useParams();
  const [comic, setComic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    marvelService
      .getComic(comicId)
      .then((data) => {
        setComic(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [comicId]);

  if (error) return <ErrorMessage />;
  if (loading) return <Spinner />;
  if (!comic) return null;

  return (
    <div className="single-comic">
      <img
        src={comic.thumbnail}
        alt={comic.name}
        className="single-comic__img"
      />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{comic.name}</h2>
        <p className="single-comic__descr">{comic.description}</p>

        <Link to="/comics" className="single-comic__back">
          Back to all
        </Link>
      </div>
    </div>
  );
};

export default SingleComicPage;
