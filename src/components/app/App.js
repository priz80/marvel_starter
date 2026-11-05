import { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
import { MainPages, ComicsPage, Page404, SingleComicPage } from "../pages";

class App extends Component {
  render() {
    return (
      <Router basename="/marvel_starter">
        <div className="app">
          <AppHeader />

          <main>
            <Routes>
              <Route path="/" element={<MainPages />} />
              <Route path="/comics" element={<ComicsPage />} />
              <Route path="/comics/:comicId" element={<SingleComicPage />} />
              <Route path="*" element={<Page404 />} />
            </Routes>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
