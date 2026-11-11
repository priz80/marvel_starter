import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import AppBanner from "../appBanner/AppBanner";

const SinglePage = ({ Component, dataType }) => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { getComic, getCharacter, clearError } = useMarvelService();

  useEffect(() => {
    clearError();
    setData(null);
    setLoading(true);

    switch (dataType) {
      case "comic":
        getComic(id)
          .then((data) => {
            setData(data);
            setLoading(false);
          })
          .catch(() => {
            setLoading(false);
            setError(true);
          });
        break;
      case "character":
        getCharacter(id)
          .then((data) => {
            setData(data);
            setLoading(false);
          })
          .catch(() => {
            setLoading(false);
            setError(true);
          });
        break;
      default:
        return;
    }
  }, [id, dataType]);

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
