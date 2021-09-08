import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "@firebase/auth";
import { authService } from "firebase";
import React, { useState } from "react";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      if (newAccount) {
        await createUserWithEmailAndPassword(authService, email, password); // firebase에 이메일과 비밀번호 저장, 홈페이지에서 확인가능 (F12눌러보면 application탭에 indexedDB의 firebaseLocalStorage에 저장이 된다)
      } else {
        await signInWithEmailAndPassword(authService, email, password);
      }
    } catch (error) {
      // 같은 계정으로 만들려고 하거나 비번이 짧음 등 오류남
      setError(error.message);
    }
  };
  return (
    <>
      <form onSubmit={onSubmit} className="container">
        <input
          name="email"
          type="email"
          placeholder="이메일"
          required
          value={email}
          onChange={onChange}
          className="authInput"
        />
        <input
          name="password"
          type="password"
          placeholder="비밀번호"
          required
          value={password}
          onChange={onChange}
          className="authInput"
        />
        <input
          className="authInput authSubmit"
          type="submit"
          value={newAccount ? "회원가입" : "로그인"}
        />
        {error && <span className="authError">{error}</span>}
      </form>
      <span className="authSwitch" onClick={toggleAccount}>
        {newAccount ? "로그인" : "회원가입"}
      </span>
    </>
  );
};

export default AuthForm;
