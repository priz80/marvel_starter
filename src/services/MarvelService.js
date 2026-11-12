import { useCallback } from "react";
import { useHttp } from "../hooks/http.hook";

const _apiBase = "https://marvel-server-zeta.vercel.app";
const _apiKey = "apikey=d4eecb0c66dedbfae4eab45d312fc1df";

let _allCharactersCache = null;

const _transformCharacters = (char) => {
  return {
    id: char.id,
    name: char.name,
    description: char.description,
    thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
    homepage: char.urls[0].url,
    wiki: char.urls[1].url,
    comics: char.comics.items,
  };
};

const _transformComics = (comic) => {
  const thumbnail = comic.thumbnail
    ? comic.thumbnail.path + "." + comic.thumbnail.extension
    : "";

  return {
    id: comic.id,
    name: comic.title,
    title: comic.title,
    description: comic.description || "",
    pageCount: comic.pageCount || 0,
    thumbnail,
    language: comic.retailerDate || "N/A",
    price: comic.prices?.[0]?.price || null,
  };
};

const useMarvelService = () => {
  const { request, clearError, process } = useHttp();

  const getCharacter = useCallback(
    (id) =>
      request(
        `${_apiBase}/characters/${id}?${_apiKey}`,
      ).then((res) => _transformCharacters(res.data?.results?.[0] || res.results?.[0])),
    [request],
  );

  const getComic = useCallback(
    (id) =>
      request(
        `${_apiBase}/comics/${id}?${_apiKey}`,
      ).then((res) => _transformComics(res.data?.results?.[0] || res.results?.[0])),
    [request],
  );

  const getCharacterByName = useCallback(
    (name) => {
      if (!_allCharactersCache) {
        return request(
          `${_apiBase}/characters?${_apiKey}&limit=100`,
        ).then((res) => {
          const results = res.data?.results || res.results || [];
          _allCharactersCache = results.map(_transformCharacters);
          return _allCharactersCache.filter(
            (char) => char.name.toLowerCase() === name.toLowerCase(),
          );
        });
      }
      return Promise.resolve(
        _allCharactersCache.filter(
          (char) => char.name.toLowerCase() === name.toLowerCase(),
        ),
      );
    },
    [request],
  );

  const getAllCharacters = useCallback(
    (offset = 0, limit = 20) =>
      request(
        `${_apiBase}/characters?${_apiKey}&limit=${limit}&offset=${offset}`,
      ).then((res) => {
        const results = res.data?.results || res.results || [];
        return results.map(_transformCharacters);
      }),
    [request],
  );

  const getAllComics = useCallback(
    () =>
      request(
        `${_apiBase}/comics?${_apiKey}`,
      ).then((res) => {
        const results = res.data?.results || res.results || [];
        return results.map(_transformComics);
      }),
    [request],
  );

  return {
    process,
    getCharacter,
    getComic,
    getCharacterByName,
    getAllCharacters,
    getAllComics,
    clearError,
  };
};

export { useMarvelService };
export default useMarvelService;
