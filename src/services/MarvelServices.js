class MarvelService {
  _apiBase = "https://marvel-server-zeta.vercel.app";
  _apiKey = "apikey=d4eecb0c66dedbfae4eab45d312fc1df";
  _allCharactersCache = null;

  GetResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  };

  getAllCharacters = async (offset = 0, limit = 20) => {
    const res = await this.GetResource(
      `${this._apiBase}/characters?${this._apiKey}&limit=${limit}&offset=${offset}`,
    );
    return res.data.results.map(this._transformCharacters);
  };

  getCharacter = async (id) => {
    const res = await this.GetResource(
      `${this._apiBase}/characters/${id}?${this._apiKey}`,
    );
    return this._transformCharacters(res.data.results[0]);
  };

  _transformCharacters = (char) => {
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

  getAllComics = async () => {
    const res = await this.GetResource(
      `${this._apiBase}/comics?${this._apiKey}`,
    );
    return res.data.results.map(this._transformComics);
  };

  getComic = async (id) => {
    const res = await this.GetResource(
      `${this._apiBase}/comics/${id}?${this._apiKey}`,
    );
    return this._transformComics(res.data.results[0]);
  };

  _transformComics = (comic) => {
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

  getCharacterByName = async (name) => {
    let allChars = this._allCharactersCache;
    if (!allChars) {
      const res = await this.GetResource(
        `${this._apiBase}/characters?${this._apiKey}&limit=100`,
      );
      allChars = this._allCharactersCache = res.data.results.map(
        this._transformCharacters,
      );
    }
    return allChars.filter(
      (char) => char.name.toLowerCase() === name.toLowerCase(),
    );
  };
}

export default MarvelService;
