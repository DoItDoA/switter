import { signOut, updateProfile } from "@firebase/auth";
import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "@firebase/firestore";
import { authService, dbService } from "firebase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

const Profile = ({ refreshUser, userObj }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const history = useHistory(); // 화면 이동하게하는 hook
  const onLogOutClick = () => {
    signOut(authService); // 로그아웃
    history.push("/");
  };

  // 참고만 하기
  // const getMySweets = async () => {
  //   const sweets = await getDocs(
  //     query(
  //       collection(dbService, "sweets"),
  //       where("creatorId", "==", userObj.uid),
  //       orderBy("createdAt", "desc")
  //     )
  //   ); // console.log 확인시 index가 필요하다고 오류가 뜨는데 오류문에 보면 링크를 클릭시 index를 자동생성해준다
  //   console.log(sweets.docs);
  // };
  // useEffect(() => {
  //   getMySweets();
  // }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (userObj.displayName !== newDisplayName) {
      await updateProfile(userObj, { displayName: newDisplayName }); // updateProfile은 유저의 이름과 photoURL만 변경가능, 유저 이름 변경하기
    }
    refreshUser();
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewDisplayName(value);
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          type="text"
          placeholder="이름 표시"
          autoFocus
          onChange={onChange}
          value={newDisplayName}
          className="formInput"
        />
        <input
          type="submit"
          value="프로필 수정"
          className="formBtn"
          style={{
            marginTop: 10,
          }}
        />
      </form>
      <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        로그아웃
      </span>
    </div>
  );
};
export default Profile;
