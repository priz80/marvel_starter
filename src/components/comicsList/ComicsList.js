import { Component } from "react";
import { Link } from "react-router-dom";
import "./comicsList.scss";
import { MarvelService } from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

class ComicsList extends Component {
  state = {
    comics: [],
    loading: true,
    error: false,
  };

  marvelService = new MarvelService();

  onComicsLoaded = (comics) => {
    this.setState({ comics, loading: false });
  };

  onError = () => {
    this.setState({ loading: false, error: true });
  };

  componentDidMount() {
    this.marvelService
      .getAllComics()
      .then(this.onComicsLoaded)
      .catch(this.onError);
  }

  render() {
    const { comics, loading, error } = this.state;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;

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
        {errorMessage}
        {spinner}
        <ul className="comics__grid">{comicItems}</ul>
      </div>
    );
  }
}

export default ComicsList;
