import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons';
import { unwrapResult } from '@reduxjs/toolkit';
import { Button, Dropdown, Menu, message } from 'antd';
import confirm from 'antd/lib/modal/confirm';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBook, setBookFormVisible, setBookUpdate } from '../../bookSlice';

BookAction.propTypes = {
  bookId: PropTypes.number.isRequired,
};

function BookAction(props) {
  const { bookId } = props;
  const { books } = useSelector((state) => state.book);
  const dispatch = useDispatch();

  const handleUpdate = () => {
    const book = books.find((c) => c.id === bookId);
    dispatch(setBookUpdate(book));
    dispatch(setBookFormVisible(true));
  };

  const handleDelete = () => {
    confirm({
      content: 'Bạn có chắc chắn xóa không ?',
      async onOk() {
        try {
          unwrapResult(await dispatch(deleteBook({ bookId })));
          message.success('Xóa thành công');
        } catch (error) {
          message.error('Xóa thất bại');
        }
      },
    });
  };

  const menu = (
    <Menu>
      <Menu.Item onClick={handleUpdate}>
        <div className="menu-adjust--center">
          <EditTwoTone twoToneColor="#ad8b00" />
          <span className="menu-title">Sửa thông tin</span>
        </div>
      </Menu.Item>

      <Menu.Divider />
      <Menu.Item onClick={handleDelete}>
        <div className="menu-adjust--center">
          <DeleteTwoTone twoToneColor="#a8071a" />
          <span className="menu-title">Xóa</span>
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} placement="bottomLeft">
      <Button type="primary" ghost>
        Thao tác
      </Button>
    </Dropdown>
  );
}

export default BookAction;
