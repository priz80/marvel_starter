import { useState, useCallback } from "react";
import MarvelService from "./MarvelServices";

const marvelService = new MarvelService();

const useMarvelService = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getCharacter = useCallback((id) => {
    setLoading(true);
    setError(false);
    return marvelService
      .getCharacter(id)
      .then((data) => {
        setLoading(false);
        return data;
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }, []);

  const getComic = useCallback((id) => {
    setLoading(true);
    setError(false);
    return marvelService
      .getComic(id)
      .then((data) => {
        setLoading(false);
        return data;
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }, []);

  const getCharacterByName = useCallback((name) => {
    setLoading(true);
    setError(false);
    return marvelService
      .getCharacterByName(name)
      .then((data) => {
        setLoading(false);
        return data;
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }, []);

  const clearError = useCallback(() => setError(false), []);

  return { loading, error, getCharacter, getComic, getCharacterByName, clearError };
};

export default useMarvelService;
