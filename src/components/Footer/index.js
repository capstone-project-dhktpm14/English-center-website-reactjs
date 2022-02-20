import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./style.scss";
import { FacebookOutlined, GoogleOutlined } from "@ant-design/icons";

function Footer({ data }) {
  return (
    <div class="footer">  
    <p class ="footer_name"> Anh ngữ SUNRISE - Đào tạo TOEIC số 1 Việt Nam</p>
      <div class="footer__addr">
        <h2>Liên hệ</h2>
        <address>
          5534 Somewhere In. The World 22193-10212
          <br />
          <a class="footer__btn" href="mailto:khaivv123@gmail.com">
            Email
          </a>
        </address>
      </div>

      <ul class="footer__nav">
        <li class="nav__item nav__item--extra">
          <h2 class="nav__title">Chi Nhánh</h2>

          <ul class="nav__ul nav__ul--extra">
            <li>
              <a href="#">CS1: 41 Tây Sơn, Q. Đống Đa, HN [94]</a>
            </li>

            <li>
              <a href="#">CS1: 41 Tây Sơn, Q. Đống Đa, HN [94]</a>
            </li>

            <li>
              <a href="#">CS1: 41 Tây Sơn, Q. Đống Đa, HN [94]</a>
            </li>

            <li>
              <a href="#">CS4: 40 Nguyễn Hoàng, Mỹ Đình, HN [91]</a>
            </li>

            <li>
              <a href="#">CS5: 12 Nguyễn Văn Lộc, Hà Đông, HN [130]</a>
            </li>

            <li>
              <a href="#">CS6: 18 Nguyễn Văn Cừ, Long Biên, HN [112]</a>
            </li>
          </ul>
        </li>

        <li class="nav__item">
          <h2 class="nav__title">Lối tắt</h2>

          <ul class="nav__ul">
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
