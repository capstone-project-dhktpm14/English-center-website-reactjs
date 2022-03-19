import React from "react";
import {
  AliwangwangOutlined,
  FacebookOutlined,
  AppstoreOutlined,
  BookOutlined,
  UsergroupAddOutlined,
  LinkOutlined,
  CarryOutOutlined,
  InsertRowAboveOutlined,
} from "@ant-design/icons";
import { Menu, Layout } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import { Link } from "react-router-dom";

const { Sider } = Layout;

SiderBar.propTypes = {};

function SiderBar(props) {
  return (
    <Sider collapsible>
      <div className="logo" />
      <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
        <Menu.Item key="1" icon={<UsergroupAddOutlined />}>
          <Link to="/admin"> Quản lý người dùng</Link>
        </Menu.Item>
        <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Khoá học">
          <Menu.Item key="2" icon={<AliwangwangOutlined />}>
            <Link to="/admin/courses"> Quản lý khoá học</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<AliwangwangOutlined />}>
            <Link to="/admin/courses/topics"> Quản lý Topic</Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="4" icon={<BookOutlined />}>
          <Link to="/admin/exams/books"> Quản lý bộ đề</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<CarryOutOutlined />}>
          <Link to="/admin/exams">Quản lý đề thi</Link>
        </Menu.Item>
        <Menu.Item key="6" icon={<LinkOutlined />}>
          <Link to="/admin/routes">Quản lý Route</Link>
        </Menu.Item>
        <Menu.Item key="7" icon={<InsertRowAboveOutlined />}>
          <Link to="/admin/classes">Quản lý lớp học</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default SiderBar;
