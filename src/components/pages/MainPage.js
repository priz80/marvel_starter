import { Component } from "react";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from "../../resources/img/vision.png";

class MainPage extends Component {
  state = {
    selectedChar: 1,
  };

  onCharSelected = (id) => {
    this.setState({ selectedChar: id });
  };

  render() {
    return (
      <>
        <ErrorBoundary>
          <RandomChar />
        </ErrorBoundary>

        <div className="char__content">
          <ErrorBoundary>
            <CharList onCharSelected={this.onCharSelected} />
          </ErrorBoundary>

          <ErrorBoundary>
            <CharInfo charId={this.state.selectedChar} />
          </ErrorBoundary>
        </div>
        <img className="bg-decoration" src={decoration} alt="vision" />
      </>
    );
  }
}

export default MainPage;
