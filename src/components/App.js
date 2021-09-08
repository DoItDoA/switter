import React, { useEffect, useState } from "react";
import { authService } from "firebase";
import Router from "components/Router";
import { onAuthStateChanged } from "@firebase/auth";

function App() {
  const [init, setInit] = useState(false); // 유저정보 가져올 때까지 초기화
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        setUserObj(user);
      } else {
        setUserObj(null);
      }
      setInit(true);
    }); // 유저 변화가 있을 때 실행된다. 즉 로그아웃이나 계정생성등 아니면 파이어베이스가 초기화될 때도 실행된다. authService를 통해 파이어베이스로부터 유저정보를 가져와서 user에 정보가 있으면 로그인
  }, []);

  const refreshUser = () => {
    const user = authService.currentUser; // currentUser는 현재 로그인한 유저 정보 가져옴
    setUserObj({ displayName: user.displayName }); // 현재 displayName의 수정, 만약 setUserObj(user)를 넣었을 경우 displayName만 바뀌었지만 내용이 워낙 방대해 리렌더링이 안된다. 그래서 displayName만 변경
  };

  return (
    <>
      {init ? (
        <Router
          refreshUser={refreshUser}
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
        />
      ) : (
        "초기화 중..."
      )}
      <footer>&copy; {new Date().getFullYear()} Switter</footer>
    </>
  );
}

export default App;
