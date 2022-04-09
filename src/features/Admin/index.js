import { Button, Layout, Modal } from 'antd';
import { setUser } from 'app/globalSlice';
import NotFoundPage from 'components/NotFoundPage';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router';
import AdminFooter from './components/AdminFooter';
import SiderBar from './components/SiderBar';
import Book from './pages/Book';
import ClassPage from './pages/ClassPage';
import CoursePage from './pages/CoursePage';
import CourseDetailPage from './pages/CoursePage/pages/CourseDetailPage';
import TopicPage from './pages/CoursePage/pages/TopicPage';
import Exam from './pages/Exam';
import RoutePage from './pages/RoutePage';
import UserPage from './pages/UserPage';
import './style.scss';

const { Header, Content } = Layout;

Admin.propTypes = {};

function Admin(props) {
  const history = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    logout();
  };

  function logout() {
    Modal.success({
      onOk: () => history('/'),
      onCancel: () => history('/'),
      content: 'Logout success',
    });
    dispatch(setUser(false));
    // window.location.reload();
  }

  useEffect(() => {
    document.title = 'Admin';
  }, []);

  return (
    <div>
      <Layout style={{ minHeight: '100vh' }}>
        <SiderBar />
        <Layout className="site-layout">
          <div
            style={{
              backgroundColor: 'white',
              textAlign: 'right',
              padding: '20px',
            }}
          >
            <Button onClick={handleLogout}>Đăng xuất</Button>
          </div>

          <Content
            style={{
              margin: '10px 10px',
              background: 'white',
            }}
          >
            <Routes>
              <Route path="/" element={<UserPage />} />
              <Route path="/courses" element={<CoursePage />} />
              <Route path="/courses/topics" element={<TopicPage />} />
              <Route path="/courses/:slug" element={<CourseDetailPage />} />
              <Route path="/exams/books" element={<Book />} />
              <Route path="/routes/*" element={<RoutePage />} />
              <Route path="/classes/*" element={<ClassPage />} />
              <Route path="/exams/*" element={<Exam />} />
              {/* <Route path="/course/word" element={<WordPage />} /> */}
              <Route component={<NotFoundPage />} />
            </Routes>
          </Content>

          <AdminFooter />
        </Layout>
      </Layout>
    </div>
  );
}

export default Admin;
