import React, { Fragment, useEffect,useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DefaultComponent from './components/DefaultComponent/DefaultComponent';
import { routes } from './routes';
import { isJsonString } from './utils';
import {jwtDecode} from "jwt-decode"; // Corrected import
import * as UserService from "./services/UserService";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "./redux/slides/userSlide";
//import axios from 'axios'
import Loading from './components/LoadingComponent/Loading';

function App() {
  const dispatch = useDispatch();
  const [isPending, setIsPending] = useState(false)
  const user = useSelector((state) => state.user)
   
  useEffect(() => {
    setIsPending(true)
    const {storageData, decoded} = handleDecoded()
      if (decoded?.id) {
        handleGetDetailsUser(decoded?.id, storageData);
      }   
      setIsPending(false)   
  }, []);

  const handleDecoded = () =>{
    let storageData = localStorage.getItem('access_token');
    let decoded ={}  
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      decoded = jwtDecode(storageData);    
    }
    return {decoded, storageData}
  }

  UserService.axiosJWT.interceptors.request.use(async (config)=>{
    const currentTime = new Date()
    const { decoded} = handleDecoded()
    if(decoded?.exp < currentTime.getTime() /1000){
      const data = await UserService.refreshToken()
      config.headers['token'] = `Bearer ${data?.access_token}`
    }
    return config
  },(err)=>{
    return Promise.reject(err)
  })

  const handleGetDetailsUser = async (id, token) => {
    try {
      const res = await UserService.getDetailsUser(id, token);
      dispatch(updateUser({ ...res?.data, access_token: token }));
      setIsPending(false)
    } catch (error) {
      console.error('Error fetching user details:', error.response?.data || error.message);
      if (error.response?.status === 401) {
        console.warn('Unauthorized: clearing invalid token');
        localStorage.removeItem('access_token');
      }
    }
  };

  return (
    <div>
      <Loading isPending={isPending} style={{background: '#ccc'}}>
        <Router>
          <Routes>
            {routes.map((route) => {
              const Page = route.page;
              const isCheckAuth = !route.isPrivate || user.isAdmin
              const Layout  = route.isShowHeader ? DefaultComponent : Fragment
              return (
                <Route
                  key={route.path}
                  path={isCheckAuth ? route.path: '*'}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
          </Routes>
        </Router>
      </Loading>
    </div>
  );
}

export default App;
