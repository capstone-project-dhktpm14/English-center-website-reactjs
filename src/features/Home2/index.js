import React from "react";
import PropTypes from "prop-types";
import { Switch, Route,Routes, useRouteMatch } from "react-router-dom";
import MainPage from "./pages/MainPage";
import NotFoundPage from "components/NotFoundPage";
import Footer from "components/Footer";

Home.propTypes = {};

function Home(props) {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<MainPage/>} />
        <Route element={<NotFoundPage/>} />
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default Home;
