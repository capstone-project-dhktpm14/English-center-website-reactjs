import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './style.scss';
import { FacebookOutlined, GoogleOutlined } from '@ant-design/icons';

Footer.propTypes = {
  data: PropTypes.object,
};

Footer.defaultProps = {};

function Footer({ data }) {
  return (
    <div className="footer">
      <p className="footer_name">
        {' '}
        Anh ngữ SUNRISE - Đào tạo TOEIC số 1 Việt Nam
      </p>
      <div className="footer__addr">
        <h2>Liên hệ</h2>
        <address>
          5534 Somewhere In. The World 22193-10212
          <br />
          <a className="footer__btn" href="mailto:khaivv123@gmail.com">
            Email
          </a>
        </address>
      </div>

      <ul className="footer__nav">
        <li className="nav__item nav__item--extra">
          <h2 className="nav__title">Chi Nhánh</h2>

          <ul className="nav__ul nav__ul--extra">
            <li>
              <a>CS1: 41 Tây Sơn, Q. Đống Đa, HN [94]</a>
            </li>

            <li>
              <a>CS2: 41 Tây Sơn, Q. Đống Đa, HN [94]</a>
            </li>

            <li>
              <a>CS3: 41 Tây Sơn, Q. Đống Đa, HN [94]</a>
            </li>

            <li>
              <a>CS4: 40 Nguyễn Hoàng, Mỹ Đình, HN [91]</a>
            </li>

            <li>
              <a>CS5: 12 Nguyễn Văn Lộc, Hà Đông, HN [130]</a>
            </li>

            <li>
              <a>CS6: 18 Nguyễn Văn Cừ, Long Biên, HN [112]</a>
            </li>
          </ul>
        </li>

        <li className="nav__item">
          <h2 className="nav__title">Lối tắt</h2>

          <ul className="nav__ul">
            <li>
              <a href="#">Tài khoản</a>
            </li>

            <li>
              <a href="#">Khoá học</a>
            </li>

            <li>
              <a href="#">Test online</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

export default Footer;
