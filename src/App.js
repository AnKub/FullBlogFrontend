import { Routes, Route, Navigate } from 'react-router-dom';
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from 'react-redux';

import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import React from 'react';
import { fetchAuthMe, selectIsAuth } from './redux/slices/auth';

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/posts/:id' element={<FullPost />} />
          <Route path='/posts/:id/edit' element={isAuth ? <AddPost /> : <Navigate to="/login" />} />
          <Route path='/add-post' element={isAuth ? <AddPost /> : <Navigate to="/login" />} />
          <Route path='/login' element={isAuth ? <Navigate to="/" /> : <Login />} />
          <Route path='/register' element={isAuth ? <Navigate to="/" /> : <Registration />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
