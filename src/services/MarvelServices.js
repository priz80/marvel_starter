class MarvelService {
  _apiBase = "https://marvel-server-zeta.vercel.app";
  _apiKey = "apikey=d4eecb0c66dedbfae4eab45d312fc1df";

  GetResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  };

  getAllCharacters = () => {
    return this.GetResource(`${this._apiBase}/characters?${this._apiKey}`);
  };

  getCharacters = (id) => {
    return this.GetResource(
      `${this._apiBase}/characters/${id}?${this._apiKey}`,
    );
  };

  getAllComics = () => {
    return this.GetResource(`${this._apiBase}/comics?${this._apiKey}`);
  };

  getComics = (id) => {
    return this.GetResource(`${this._apiBase}/${id}?${this._apiKey}`);
  };

  searchCharacters = (name) => {
    return this.GetResource(
      `${this._apiBase}/characters?name=${name}&${this._apiKey}`,
    );
  };
}

export default MarvelService;
