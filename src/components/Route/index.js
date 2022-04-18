import {
  LinkOutlined
} from '@ant-design/icons';
import { Menu } from 'antd';
import { fetchRoutes } from 'features/Route1/routeSlice';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import commonFuc from 'utils/commonFuc';

function Route(props) {
  const { title, icon } = props;
  const { SubMenu } = Menu;
  const dispatch = useDispatch();
  const history = useNavigate();
  const [dataSource, setDataSource] = useState({});
  const { routes } = useSelector((state) => state.routeClient);
  const data = [];

  useEffect(() => {
    // Phải gọi dispatch trc
    // Thay vì m phảicode đi code lại cái này
    // routeAdminApi.fetchRoute().then((res) => setDataSource(res.data));

    // THì bây giờ m chỉ cần gọi dispatch(fetchRoutes()); là nó sẽ get dữ liệu về cho m
    // M có thể gọi dispatch(fetchRoutes()); ở bất cứ componnent nào
    dispatch(fetchRoutes());
  }, []);


// Chỗ này là dung để thêm số thứ tự
// Nay cũng ko cần code như nnafy nữa

// Gọi hàm này là đủ r commonFuc.addSTTForList(routes, 0)
  // if (dataSource.length > 0) {
  //   dataSource.forEach((element, index) => {
  //     let temp = {
  //       key: element.id,
  //       name: element.name,
  //       description: element.description,
  //       content: element.content,
  //       image: element.image,
  //       slug: element.slug,
  //       stt: index + 1,
  //     };
  //     data.push(temp);
  //   });
  // }

  return (
    <>
      {' '}
      <SubMenu key="Route" icon={icon} title={title}>
        {routes.map((k) => (
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
  title: 'Khoá học',
  icon: <LinkOutlined />,
};
export default Route;
