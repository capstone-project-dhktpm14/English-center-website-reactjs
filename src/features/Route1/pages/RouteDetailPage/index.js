import { ContainerOutlined } from '@ant-design/icons';
import { Col, Result, Row } from 'antd';
import BackToTopButton from 'components/BackToTopButton';
import Parser from 'html-react-parser';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './style.scss';
import imageNotFound from 'assets/images/image-not-found.svg';
import { fetchRouteDetail } from 'features/Route1/routeSlice';
import Footer from 'components/Footer';

function RouteDetailPage(props) {
  const { slug } = useParams();

  const { routeDetail } = useSelector((state) => state.routeClient);

  const { domToReact } = Parser;
  const style = require('style-to-object');

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = routeDetail?.name || 'Blog';
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchRouteDetail({ slug }));
  }, []);

  return (
    <div id="blog-detail-page">
      {routeDetail && Object.keys(routeDetail).length > 0 ? (
        <>
          <Row justify="center" className="topic-thumbnail">
            <img
              src={routeDetail?.image || ''}
              alt={routeDetail?.name}
              onError={(e) => (e.target.src = imageNotFound)}
            />
            <div className="topic-thumbnail__overlay">
              <div className="topic-thumbnail__title">{routeDetail?.name}</div>
              <div className="topic-thumbnail__description">
                <ContainerOutlined />
                {routeDetail?.description}
              </div>
            </div>
          </Row>
          <Row justify="center">
            <Col span={16}>
              <div className="content-blog">
                {routeDetail?.content &&
                  Parser(routeDetail?.content, {
                    replace: (domNode) => {
                      if (domNode.attribs && domNode.attribs.style) {
                        try {
                          style(domNode.attribs.style);
                        } catch (error) {
                          // delete the attribute that's causing the error
                          // then convert the dom node to react
                          delete domNode.attribs.style;
                          return domToReact(domNode);
                        }
                      }
                    },
                  })}
              </div>
            </Col>
          </Row>
          <BackToTopButton />
        </>
      ) : (
        <Result status="404" title="không tìm thấy" />
      )}
      <Footer></Footer>
    </div>
  );
}
RouteDetailPage.propTypes = {};
RouteDetailPage.defaultProps = {};

export default RouteDetailPage;
