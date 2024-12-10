import React, { useEffect, useState } from 'react';
import { WrapperTextHeaderSmall, WrapperHeader, WrapperHeaderAccount, WrapperTextHeader, WrapperContentPopup } from './style';
import { Col, Badge, Popover } from 'antd';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import { UserOutlined, CaretDownOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as UserService from "../../services/UserService";
import { resetUser } from '../../redux/slides/userSlide';
import Loading from '../LoadingComponent/Loading';

const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [userName, setUserName] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const dispatch = useDispatch();
  const [isPending, setPending] = useState(false);

  const handleNavigateLogin = () => {
    navigate('/sign-in');
  };

  const handleLogout = async () => {
    setPending(true);
    await UserService.logoutUser(); // Simulate delay
    localStorage.removeItem('access_token'); // Remove access_token from localStorage
    dispatch(resetUser()); // Reset Redux state
    setPending(false);
  };

  useEffect(() => {
    setPending(true);
    setUserName(user?.name || ''); // Default to empty string if no name
    setUserAvatar(user?.avatar || ''); // Default to empty string if no avatar
    setPending(false);
  }, [user?.name, user?.avatar]);

  const content = (
    <div>
      <WrapperContentPopup onClick={() => navigate('/profile-user')}>Thông tin người dùng</WrapperContentPopup>
      {user?.isAdmin && (
        <WrapperContentPopup onClick={() => navigate('/system/admin')}>Quản lí hệ thống</WrapperContentPopup>
      )}
      <WrapperContentPopup onClick={handleLogout}>Đăng xuất</WrapperContentPopup>
    </div>
  );

  return (
    <div style={{ width: '100%', background: 'rgb(26,148,255)', display: 'flex', justifyContent: 'center' }}>
      <WrapperHeader style={{ justifyContent: isHiddenSearch ? 'space-between' : 'unset' }}>
        <Col span={6}>
          <WrapperTextHeader>SIÊU SAO</WrapperTextHeader>
        </Col>

        {!isHiddenSearch && (
          <Col span={12}>
            <ButtonInputSearch size="large" textButton="Tìm kiếm" placeholder="Bạn cần gì?" />
          </Col>
        )}

        <Col span={6} style={{ display: 'flex', gap: '54px', alignItems: 'center' }}>
          <Loading isPending={isPending}>
            <WrapperHeaderAccount>
              {userAvatar ? (
                <img
                  src={userAvatar}
                  alt="avatar"
                  style={{
                    height: '30px',
                    width: '30px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <UserOutlined style={{ fontSize: '30px' }} />
              )}

              {user?.access_token ? (
                <Popover content={content} trigger="click" style={{ float: 'right' }}>
                  <div style={{ cursor: 'pointer' }}>{userName || user?.email}</div> {/* Display name or email */}
                </Popover>
              ) : (
                <div onClick={handleNavigateLogin} style={{ cursor: 'pointer' }}>
                  <WrapperTextHeaderSmall>Đăng nhập/Đăng kí</WrapperTextHeaderSmall>
                  <div>
                    <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
                    <CaretDownOutlined />
                  </div>
                </div>
              )}
            </WrapperHeaderAccount>
          </Loading>

          {!isHiddenCart && (
            <div>
              <Badge count={4} size="small">
                <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }} />
              </Badge>
              <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
            </div>
          )}
        </Col>
      </WrapperHeader>
    </div>
  );
};


export default HeaderComponent;
