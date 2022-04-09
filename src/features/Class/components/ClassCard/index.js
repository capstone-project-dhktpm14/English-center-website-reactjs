import { Button, message, Modal, Tooltip } from 'antd';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './style.scss';
import imageNotFound from 'assets/images/image-not-found.svg';
import {
  ScheduleOutlined,
  InsertRowAboveOutlined,
  DeleteOutlined,
  PlusOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import classApi from 'api/classApi';
import meApi from 'api/meApi';
const { confirm, Text } = Modal;

function ClassCard(props) {
  const { classes, maxCharacterCount, img } = props;
  const { id, slug, routeName, description, status, dateStart } = classes;
  const [isTruncated, setIsTruncated] = useState(true);
  const [isRegistry, setIsRegistry] = useState(false);
  const [isFull, setIsFull] = useState(false);
  const [params, setParams] = useState({ classesId: id, status: 'NEW' });
  const shortDescription = isTruncated
    ? description.slice(0, maxCharacterCount) + '...'
    : description;

  const cancelClass = async () => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      content: 'Bạn có muốn huỷ khóa học này không ?',
      async onOk() {
        try {
          setParams({ ...params, status: 'CANCEL' });

          await classApi.cancelSchedule(params);
          setIsRegistry(false);
          message.success('Bạn đã huỷ khoá học');
        } catch (error) {
          message.error('Xóa thất bại');
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const addClass = async () => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      content: 'Bạn có muốn đăng ký khóa học này không ?',
      async onOk() {
        try {
          await classApi.addSchedule(params);
          setIsRegistry(true);
          message.success('Bạn đã đăng ký khoá học');
        } catch (error) {
          message.error('Xóa thất bại');
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  const fetchClass = async () => {
    const data = await meApi.fetchClassOfUser();
    for (let index = 0; index < data.length; index++) {
      if (id === data[index].classesId) {
        setIsRegistry(true);
      }
    }

    return data;
  };

  useEffect(() => {
    if (status === 'FULL') {
      setIsFull(true);
    }
    fetchClass();
  }, [status]);

  return (
    <>
      <div className="class-card">
        <div className="class-card__image">
          <Link to={''}>
            <img
              src={img}
              alt="Oops ... Not found"
              onError={(e) => (e.target.src = imageNotFound)}
            />
          </Link>
        </div>
        <div className="class-card__content">
          <div className="class-card__title">
            {'Route: '}
            {routeName}
          </div>
          <div className="class-card__additional-info">
            <ScheduleOutlined />
            {'Ngày bắt đầu'}
            {': '}
            {dateStart}
          </div>
          <div className="class-card__additional-info">
            <InsertRowAboveOutlined />
            {'Trạng thái'}
            {': '}
            {status}
          </div>
          {description.length > maxCharacterCount ? (
            <>
              <div className="class-card__description">
                {shortDescription}
                <Button
                  type="link"
                  onClick={() => setIsTruncated(!isTruncated)}
                >
                  {isTruncated ? 'Show more >' : 'Hide <'}
                </Button>
              </div>
            </>
          ) : (
            <div className="class-card__description">{description}</div>
          )}
          <div className="class-card-header__right">
            {isFull ? (
              <Tooltip title={'Không thể đăng ký'}>
                <div className="class-card__full">
                  {'Lớp đã đầy,không thể đăng ký'}
                </div>
              </Tooltip>
            ) : (
              <Tooltip title={isRegistry ? 'Cancel' : 'Đăng ký'}>
                <Button
                  style={{ borderRadius: '50%' }}
                  type={isRegistry ? 'danger' : 'primary'}
                  icon={isRegistry ? <DeleteOutlined /> : <PlusOutlined />}
                  size="middle"
                  onClick={() => {
                    isRegistry ? cancelClass() : addClass();
                  }}
                ></Button>
              </Tooltip>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

ClassCard.propTypes = {
  topic: PropTypes.object,
  maxCharacterCount: PropTypes.number,
  img: PropTypes.string,
  classes: PropTypes.object,
};
ClassCard.defaultProps = {
  topic: {},
  maxCharacterCount: 140,
  img: '',
};

export default ClassCard;
