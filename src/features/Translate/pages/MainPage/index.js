import { Col, Row } from "antd";
import Header from "components/Header";
import SearchBar from "features/Translate/components/SearchBar";
import TranslateResult from "features/Translate/components/TranslateResult";
import { fetchTranslates } from "features/Translate/translateSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
function MainPage(props) {
  // const dispatch = useDispatch();
  // const { translateResult } = useSelector((state) => state.translate);
  // const [isFirstRender, setIsFirstRender] = useState(true);
  // // const translateResult = TRANSLATE_RESULT;

  useEffect(() => {
    document.title = "Tra từ";
  }, []);

  const handleOnClick = (value) => {
    console.log("tra");
  };

  return (
    <div>
      <Header></Header>
      <div id="translate-main-page">
        <Row justify="center">
          <Col span={24}>
            <img
              src="https://raw.githubusercontent.com/anhtienzz123/web-tieng-anh/main/web-tieng-anh-client/src/assets/images/logo_dict.png"
              alt="Oops ... Notfound"
            />
            <SearchBar handleOnClick={handleOnClick} />
          </Col>
        </Row>
      </div>
    </div>
  );
}
MainPage.propTypes = {};

export default MainPage;
