import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "@firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import AuthForm from "components/AuthForm";
import { authService } from "firebase";
import React from "react";

const Auth = () => {
  const onSocialClick = async (e) => {
    const {
      target: { name },
    } = e;
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider(); // 구글 로그인 정보 제공
    } else if (name === "github") {
      provider = new GithubAuthProvider(); // 깃헙 로그인 정보 제공
    }
    await signInWithPopup(authService, provider); // 로그인하기 위한 창 띄움
  };

  return (
    <div className="authContainer">
      <FontAwesomeIcon
        icon={faTwitter}
        color={"#04AAFF"}
        size="3x"
        style={{ marginBottom: 30 }}
      />
      <AuthForm />
      <div className="authBtns">
        <button name="google" onClick={onSocialClick} className="authBtn">
          구글로 로그인
          <FontAwesomeIcon icon={faGoogle} />
        </button>
        <button name="github" onClick={onSocialClick} className="authBtn">
          깃허브로 로그인
          <FontAwesomeIcon icon={faGithub} />
        </button>
      </div>
    </div>
  );
};
export default Auth;
