import React, { useEffect, useState } from "react";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import InputForm from "../../components/InputForm/InputForm";
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from "./style";
import imageLogo from "../../assets/images/logo-login.png";
import { Image } from "antd";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/Loading";
import { jwtDecode } from "jwt-decode"; // Correct import
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/slides/userSlide";

const SignInPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mutation = useMutationHooks(data => UserService.loginUser(data));
  const { data, isPending, isSuccess } = mutation;

  useEffect(() => {
    if (isSuccess && data?.access_token) {
      localStorage.setItem('access_token', JSON.stringify(data.access_token));
      const decoded = jwtDecode(data.access_token);
      console.log('Decoded token:', decoded);
      if (decoded?.id) {
        handleGetDetailsUser(decoded.id, data.access_token).then(() => {
          navigate('/');
        });
      }
    }
  }, [isSuccess]);
  
  const handleGetDetailsUser = async (id, token) => {
    try {
      const res = await UserService.getDetailsUser(id, token);
      if (res && res.data && res.data.length > 0) {
        const user = res.data.find(user => user._id === id); // Find user by id
        if (user) {
          console.log('User details fetched:', user);
          dispatch(updateUser({ ...user, access_token: token }));
        } else {
          console.error('User not found in response.');
        }
      } else {
        console.error('Unexpected API response:', res);
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  console.log('mutation', mutation);

  const handleNavigateSignUp = () => {
    navigate('/sign-up');
  };
  const handleOnchangeEmail = (value) => {
    setEmail(value);
  };
  const handleOnchangePassword = (value) => {
    setPassword(value);
  };
  const handleSignIn = () => {
    mutation.mutate({ email, password });
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgb(0,0,0,0.53)",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: "800px",
          height: "445px",
          borderRadius: "6px",
          backgroundColor: "#fff",
          display: "flex",
        }}
      >
        <WrapperContainerLeft>
          <h1>Xin Chào</h1>
          <p>Đăng Nhập Vào Tài Khoản</p>
          <InputForm style={{ marginBottom: "10px" }} placeholder="abc@gmail.com" value={email} onChange={handleOnchangeEmail} />
          <div style={{ position: "relative" }}>
            <span
              onClick={() => setIsShowPassword(!isShowPassword)}
              style={{
                zIndex: 10,
                position: "absolute",
                top: "4px",
                right: "8px",
              }}
            >
              {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
            <InputForm placeholder="Mật khẩu" type={isShowPassword ? "text" : "password"} value={password} onChange={handleOnchangePassword} />
          </div>

          {data?.status === 'ERR' && <span style={{ color: 'red' }}>{data?.message}</span>}

          <Loading isPending={isPending}>
            <ButtonComponent
              disabled={!email.length || !password.length}
              onClick={handleSignIn}
              size={40}
              styleButton={{
                background: "rgb(255,57,69)",
                height: "48px",
                width: "100%",
                border: "none",
                borderRadius: "4px",
                margin: "26px 0 10px",
              }}
              textButton={"Đăng nhập"}
              styleTextButton={{ color: "#fff", fontSize: "15px", fontWeight: "700" }}
            ></ButtonComponent>
          </Loading>
          <p>
            <WrapperTextLight>Quên Mật Khẩu</WrapperTextLight>
          </p>
          <p>
            Bạn Chưa Có Tài Khoản? <WrapperTextLight onClick={handleNavigateSignUp}>Tạo Tài Khoản</WrapperTextLight>
          </p>
        </WrapperContainerLeft>
        <WrapperContainerRight>
          <Image src={imageLogo} preview={false} alt="image-logo" height="203px" width="203px" />
          <h4>Mua Sắm Tại 3T</h4>
        </WrapperContainerRight>
      </div>
    </div>
  );
};

export default SignInPage;
