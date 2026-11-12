import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import abyss from "../../../resources/img/abyss.jpg";

import "./singleComicLayout.scss";

const SingleComicLayout = ({ data }) => {
  const [imageError, setImageError] = useState(false);

  if (!data) return null;

  const { title, description, pageCount, thumbnail, language, price } = data;

  return (
    <div className="single-comic">
      <Helmet>
        <meta name="description" content={`${title} comics book`} />
        <title>{title}</title>
      </Helmet>
      <img
        src={imageError ? abyss : thumbnail}
        onError={() => setImageError(true)}
        alt={title}
        className="single-comic__img"
      />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{title}</h2>
        <p className="single-comic__descr">{description}</p>
        <p className="single-comic__descr">{pageCount}</p>
        <p className="single-comic__descr">Language: {language}</p>
        <div className="single-comic__price">{price}</div>
      </div>
      <Link to="/comics" className="single-comic__back">
        Back to all
      </Link>
    </div>
  );
};

export default SingleComicLayout;
