import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Space } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";

import RouteTable from "../../components/ClassTable";
import RouteAddForm from "../../components/ClassAddForm";
import { fetchClasses, setClassDefault, setClassFormVisible } from "../../classSlice";
MainPage.propTypes = {};

function MainPage(props) {
  const { isClassFormVisible, classes } = useSelector((state) => state.classes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchClasses());
  }, []);

  const handleAddClick = () => {
    dispatch(setClassFormVisible(true));
    dispatch(setClassDefault());
    console.log(isClassFormVisible);
  };

  return (
    <div id="book-main-page">
      <Space direction="vertical" style={{ width: "100%" }}>
        <div
          className="book-category-button--add"
          style={{ textAlign: "left" }}
        >
          <Button
            type="primary"
            onClick={handleAddClick}
            icon={<PlusCircleOutlined />}
            size="mediunm"
          >
            Thêm route mới
          </Button>
        </div>

        <div className="book-category-table">
          <RouteTable />
        </div>
      </Space>

      {isClassFormVisible && <RouteAddForm />}
    </div>
  );
}

export default MainPage;
