import { useState } from "react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage as FormikErrorMessage,
} from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./charSearchForm.scss";

const CharSearchForm = () => {
  const [characters, setCharacters] = useState(null);
  const { loading, error, getCharacterByName, clearError } =
    useMarvelService();

  const onCharLoaded = (chars) => {
    setCharacters(chars);
  };

  const updateChar = (name) => {
    clearError();
    setCharacters(null);

    getCharacterByName(name)
      .then(onCharLoaded)
      .catch(() => {});
  };

  const errorMessage = error ? (
    <div className="char__search-critical-error">
      <ErrorMessage />
    </div>
  ) : null;
  const results = !characters ? null : characters.length > 0 ? (
    <div className="char__search-wrapper">
      <div className="char__search-success">
        Found: {characters[0].name}
      </div>
      <Link
        to={`/characters/${characters[0].id}`}
        className="button button__main"
      >
        <div className="inner">Go to page</div>
      </Link>
    </div>
  ) : (
    <div className="char__search-error">
      The character was not found. Check the name and try again
    </div>
  );

  return (
    <div className="char__search-form">
      <Formik
        initialValues={{
          charName: "",
        }}
        validationSchema={Yup.object({
          charName: Yup.string().required("This field is required"),
        })}
        onSubmit={({ charName }) => {
          updateChar(charName);
        }}
      >
        <Form>
          <label className="char__search-label" htmlFor="charName">
            Or find a character by name:
          </label>
          <div className="char__search-wrapper">
            <Field
              id="charName"
              name="charName"
              type="text"
              placeholder="Enter name"
            />
            <button
              type="submit"
              className="button button__main"
              disabled={loading}
            >
              <div className="inner">{loading ? "Searching..." : "Find"}</div>
            </button>
          </div>
          <FormikErrorMessage
            component="div"
            className="char__search-error"
            name="charName"
          />
        </Form>
      </Formik>
      {results}
      {errorMessage}
    </div>
  );
};

export default CharSearchForm;
