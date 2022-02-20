import { AudioOutlined, PauseCircleOutlined } from "@ant-design/icons";
import { message, Tooltip } from "antd";
import Search from "antd/lib/input/Search";
import Header from "components/Header";
// import ignoreSound from "assets/medias/ignore-sound.mp3";
// import listenSound from "assets/medias/listen-sound.mp3";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
// import SpeechRecognition, {
//   useSpeechRecognition,
// } from "react-speech-recognition";

function SearchBar(props) {
  return (
    <div>
      <Search
        placeholder="Từ điển Anh - Việt"
        enterButton="&nbsp;&nbsp;Tra từ&nbsp;&nbsp;"
        size="large"
        //   suffix={suffix}
        //   onSearch={onSearch}
        //   value={wordToTranslate}
        //   className="search-box"
        //   onChange={handleOnChange}
      />
    </div>
  );
}

SearchBar.propTypes = { handleOnClick: PropTypes.func };
SearchBar.defaultProps = { handleOnClick: null };

export default SearchBar;
