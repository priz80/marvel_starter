import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import AppBanner from "../appBanner/AppBanner";

const SinglePage = ({ Component, dataType }) => {
  const { comicId, id } = useParams();
  const charId = id || comicId;
  const [data, setData] = useState(null);
  const { getComic, getCharacter, clearError, loading, error } = useMarvelService();

  useEffect(() => {
    clearError();
    setData(null);

    switch (dataType) {
      case "comic":
        getComic(charId).then((data) => setData(data));
        break;
      case "character":
        getCharacter(charId).then((data) => setData(data));
        break;
      default:
        return;
    }
  }, [charId, dataType, getComic, getCharacter, clearError]);

  if (error) return <ErrorMessage />;
  if (loading) return <Spinner />;
  if (!data) return null;

  return (
    <>
      <AppBanner />
      <Component data={data} />
    </>
  );
};

export default SinglePage;
