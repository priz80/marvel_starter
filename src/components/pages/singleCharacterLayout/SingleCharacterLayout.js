import { useState, useEffect } from "react";
import "./singleCharacterLayout.scss";
import { Helmet } from "react-helmet";
import abyss from "../../../resources/img/abyss.jpg";

const SingleCharacterLayout = ({ data }) => {
  const [imgSrc, setImgSrc] = useState(abyss);

  useEffect(() => {
    if (data?.thumbnail && data.thumbnail.startsWith("http")) {
      setImgSrc(abyss);
    } else {
      setImgSrc(data?.thumbnail || abyss);
    }
  }, [data]);

  if (!data) return null;

  const { name, description } = data;

  return (
    <div className="single-comic">
      <Helmet>
        <meta name="description" content={`${name} page`} />
        <title>{name}</title>
      </Helmet>
      <img src={imgSrc} alt={name} className="single-comic__char-img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{name}</h2>
        <p className="single-comic__descr">{description}</p>
      </div>
    </div>
  );
};

export default SingleCharacterLayout;
