import {
  WarningFilled,
  LinkOutlined,
  UserOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { Col, Menu, Modal, Row } from "antd";
import Title from "antd/lib/typography/Title";
import routeAdminApi from "api/routeAdminApi";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

function Route(props) {
  const { title, icon } = props;
  const { SubMenu } = Menu;
  const dispatch = useDispatch();
  const history = useNavigate();
  const [dataSource, setDataSource] = useState({});
  const { routes } = useSelector((state) => state.route);
  const data = [];

  useEffect(() => {
    routeAdminApi.fetchRoute().then((res) => setDataSource(res.data));
  }, [routes]);

  if (dataSource.length > 0) {
    dataSource.forEach((element, index) => {
      let temp = {
        key: element.id,
        name: element.name,
        description: element.description,
        content: element.content,
        image: element.image,
        slug: element.slug,
        stt: index + 1,
      };
      data.push(temp);
    });
  }
 

  return (
    <>
      {" "}
      <SubMenu key="Route" icon={icon} title={title}>
        {data.map((k) => (
          <Menu.Item key={k.key}>
            <div className="pop_up-personal--item">
              <div className="pop_up-personal--item-icon">
                <Link to={`/routes/${k.slug}`}>{k.name}</Link>
              </div>
            </div>
          </Menu.Item>
        ))}
      </SubMenu>
    </>
  );
}

Route.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.object,
};
Route.defaultProps = {
  title: "Khoá học",
  icon: <LinkOutlined />,
};
export default Route;
