import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import RouteAction from "../RouteAction";
import { useDispatch, useSelector } from "react-redux";
import { Table, Tag, Space, Image } from "antd";
import { errorImage } from "constants/defaultImage";
import { fetchRoutes, setRoutes } from "../../routeSlice";
import routeAdminApi from "api/routeAdminApi";

RouteTable.propTypes = {};

const columns = [
  {
    title: "STT",
    dataIndex: "stt",
    key: "stt",
  },
  {
    title: "Tên Route ",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "mô tả ",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "nội dung ",
    dataIndex: "content",
    key: "content",
  },
  {
    title: "Hình ảnh ",
    dataIndex: "image",
    key: "image",
    render: (text, record) => (
      <Image
        width={120}
        src={text ? text : errorImage}
        height={80}
        fallback={errorImage}
        style={{ objectFit: "cover", backgroundPosition: "center center" }}
      />
    ),
    // <img className="book_img" src={text} alt='hình ảnh' />
  },
  {
    title: "",
    dataIndex: "action",
    key: "action",
    align: "center",
    render: (text, record) => <RouteAction routeId={record.key} />,
  },
];

function RouteTable(props) {
  const dispatch = useDispatch();
  const [dataRaw, setData] = useState([]);
  const [dataSource, setDataSource] = useState({});
  const { routes } = useSelector((state) => state.route);
  const data = [];

  useEffect(() => {
    routeAdminApi.fetchRoute().then((res) => setDataSource(res.data))
  }, [routes,]);

  if (dataSource.length > 0) {
    dataSource.forEach((element, index) => {
      let temp = {
        key: element.id,
        name: element.name,
        description: element.description,
        content: element.content,
        image: element.image,
        stt: index + 1,
      };
      data.push(temp);
    });
  }
  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      scroll={{ y: 420 }}
      style={{ height: "490px" }}
    />
  );
}

export default RouteTable;
