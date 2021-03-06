import {
  BookOutlined,
  HomeOutlined,
  LoginOutlined,
  ProfileOutlined,
  ScheduleOutlined,
  SolutionOutlined,
  TeamOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Menu, message } from 'antd';
import meApi from 'api/meApi';
import { setLogin } from 'app/globalSlice';
import ModalUpdateProfile from 'components/ModalUpdateProfile';
import Route from 'components/Route';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import IMAGE_ACCOUNT_PAGE from '../../assets/images/header/logo_1.png';
import './style.scss';

Header.propTypes = {};

Header.defaultProps = {};

function Header() {
  const { SubMenu } = Menu;
  const dispatch = useDispatch();
  const history = useNavigate();
  const [current, setCurrent] = useState('');
  const [isModalUpdateProfileVisible, setIsModalUpdateProfileVisible] =
    useState(false);
  // const [avatar, setAvatar] = useState(null);
  // const [name, setName] = useState();
  const [confirmLoading, setConfirmLoading] = useState(false);
  // const { user } = useSelector((state) => state.global);
  const [account, setAccount] = useState();
  const { isLogin } = useSelector((state) => state.global);

  const handleClick = (e) => {
    setCurrent(e.key);
    if (e.key === 'LOGOUT') {
      localStorage.removeItem('token');
      message.success('Bạn đã đăng xuất');
      dispatch(setLogin(false));
      history('/');
      window.location.reload();
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      setAccount(await meApi.fetchProfile());
    };
    fetchProfile();
  }, []);

  // --- HANDLE UPDATE PROFILE
  const handleUpdateProfile = () => {
    setIsModalUpdateProfileVisible(true);
    console.log(isModalUpdateProfileVisible);
  };

  const handleCancelModalUpdateProfile = (value) => {
    setIsModalUpdateProfileVisible(value);
  };

  const handleOklModalUpdateProfile = () => {
    setConfirmLoading(true);
    setConfirmLoading(false);
    setIsModalUpdateProfileVisible(false);
  };
  return (
    <div id="content">
      <div id="header-branches">
        <img src={IMAGE_ACCOUNT_PAGE} alt="zelo_login"></img>
        <p className="name">TRUNG TÂM ANH NGỮ SUNRISE</p>
      </div>
      <div className="menu">
        <Menu
          onClick={handleClick}
          selectedKeys={[current]}
          mode="horizontal"
          style={{
            display: 'flex',
            fontSize: '15px',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '4px 0',
          }}
        >
          <Menu.Item key="HOME2" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          {isLogin && (
            <Menu.Item
              key="WORDNOTE"
              className="modified-item"
              icon={<UnorderedListOutlined />}
            >
              <Link to="/wordnote">Word Note</Link>
            </Menu.Item>
          )}
          <Menu.Item key="CLASS" icon={<TeamOutlined />}>
            <Link to="/classes">Lớp học</Link>
          </Menu.Item>
          <Route title="Khoá học"></Route>
          <Menu.Item key="COURS" icon={<BookOutlined />}>
            <Link to="/course">Học từ vựng</Link>
          </Menu.Item>
          {isLogin && (
            <SubMenu key="HocTap" icon={<ScheduleOutlined />} title="Học tập">
              <Menu.Item key="Test" icon={<ProfileOutlined />}>
                <Link to="/exams">TOEIC online</Link>
              </Menu.Item>
              <SubMenu
                key="ThiPart"
                icon={<ScheduleOutlined />}
                title="Thi theo part"
              >
                <Menu.ItemGroup title="Listening">
                  <Menu.Item key="PART_1">
                    <Link to="/parts/1">Part 1</Link>
                  </Menu.Item>

                  <Menu.Item key="PART_2">
                    <Link to="/parts/2">Part 2</Link>
                  </Menu.Item>

                  <Menu.Item key="PART_3">
                    <Link to="/parts/3">Part 3</Link>
                  </Menu.Item>

                  <Menu.Item key="PART_4">
                    <Link to="/parts/4">Part 4</Link>
                  </Menu.Item>
                </Menu.ItemGroup>

                <Menu.ItemGroup title="Reading">
                  <Menu.Item key="PART_5">
                    <Link to="/parts/5">Part 5</Link>
                  </Menu.Item>

                  <Menu.Item key="PART_6">
                    <Link to="/parts/6">Part 6</Link>
                  </Menu.Item>

                  <Menu.Item key="PART_7">
                    <Link to="/parts/7">Part 7</Link>
                  </Menu.Item>
                </Menu.ItemGroup>
              </SubMenu>
            </SubMenu>
          )}

          {isLogin ? (
            <SubMenu key="ACCOUNT" icon={<UserOutlined />} title="Cá nhân">
              <Menu.Item key="UPDATE">
                <div
                  className="pop_up-personal--item"
                  onClick={handleUpdateProfile}
                >
                  <div className="pop_up-personal--item-icon">
                    <UserOutlined /> Tài Khoản
                  </div>
                </div>
              </Menu.Item>
              <Menu.Item key="LOGOUT" icon={<LoginOutlined />}>
                Đăng xuất
              </Menu.Item>
              {isLogin && isLogin.roleType === 'ADMIN' && (
                <Menu.Item key="ADMIN" icon={<SolutionOutlined />}>
                  <Link to="/admin">Admin</Link>
                </Menu.Item>
              )}
            </SubMenu>
          ) : (
            <SubMenu key="ACCOUNT" icon={<UserOutlined />} title="Account">
              <Menu.Item key="LOGIN">
                <Link to="/account/login">Login</Link>
              </Menu.Item>
              <Menu.Item key="REGISTRY">
                <Link to="/account/registry">Registry</Link>
              </Menu.Item>
            </SubMenu>
          )}
        </Menu>
      </div>
      <ModalUpdateProfile
        isVisible={isModalUpdateProfileVisible}
        onCancel={handleCancelModalUpdateProfile}
        onOk={handleOklModalUpdateProfile}
        loading={confirmLoading}
      />
    </div>
  );
}

export default Header;
