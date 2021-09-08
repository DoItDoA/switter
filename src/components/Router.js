import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "components/Navigation";

function Router({ refreshUser, isLoggedIn, userObj, setName }) {
  return (
    <HashRouter>
      {/* 로그인 했으면 홈과 프로필 뜨게함 */}
      {isLoggedIn && <Navigation userObj={userObj} setName={setName} />}
      <Switch>
        <>
          {isLoggedIn ? (
            <div
              style={{
                maxWidth: 890,
                width: "100%",
                margin: "0 auto",
                marginTop: 80,
                display: "flex",
                justifyContent: "center",
              }}
            >
              {/* 로그인 시 홈과 프로필로 이동하가능하게 설정 */}
              <Route exact path="/">
                <Home userObj={userObj} />
              </Route>
              <Route exact path="/profile">
                <Profile userObj={userObj} refreshUser={refreshUser} />
              </Route>
              <Redirect from="*" to="/" />
            </div>
          ) : (
            <>
              {/* <Route component={Auth}/> 와 같다 */}
              {/* 로그인 안했을 시 로그인 접속 창뜨게 함 */}
              <Route exact path="/">
                <Auth />
              </Route>
              <Redirect from="*" to="/" />
            </>
          )}
        </>
      </Switch>
    </HashRouter>
  );
}

export default Router;
