import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {HashRouter, Route, Routes} from "react-router-dom";
import {AppBar, Button, CircularProgress, IconButton, LinearProgress, Toolbar, Typography,} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {Login} from "features/auth/Login/Login";
import "./App.css";
import {TodolistsList} from "features/todolists-list/todolist/ui/todolists-list";
import {ErrorSnackbar} from "common/components";
import {useActions} from "common/hooks";
import {selectIsLoggedIn} from "features/auth/auth.selectors";
import {selectAppStatus, selectIsInitialized} from "app/app.selectors";
import {authThunks} from "features/auth/auth.reducer";

function App() {
  const status = useSelector(selectAppStatus);
  const isInitialized = useSelector(selectIsInitialized);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const { initializeApp, logout } = useActions(authThunks);

  useEffect(() => {
    initializeApp({});
  }, []);

  const logoutHandler = () => logout({});

  if (!isInitialized) {
    return (
      <div style={{ position: "fixed", top: "30%", textAlign: "center", width: "100%" }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <HashRouter>
      <div className="App">
        <ErrorSnackbar />
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <Menu />
            </IconButton>
            <Typography variant="h6">TaskCraft</Typography>
            {isLoggedIn && (
              <Button color="inherit" onClick={logoutHandler}>
                Log out
              </Button>
            )}
          </Toolbar>
          {status === "loading" && <LinearProgress />}
        </AppBar>

          <Routes>
            <Route path={"/"} element={<TodolistsList />} />
            <Route path={"/login"} element={<Login />} />
          </Routes>

      </div>
    </HashRouter>
  );
}

export default App;
