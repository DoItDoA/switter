import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";
import Sweet from "components/Sweet";
import { dbService } from "firebase";
import React, { useEffect, useState } from "react";
import SweetFactory from "components/SweetFactory";

const Home = ({ userObj }) => {
  const [sweets, setSweets] = useState([]);

  // 새로고침해야 리렌더링이 된다. 참고만 하기
  // const getSweets = async () => {
  //   const dbsweets = await getDocs(collection(dbService, "sweets"));
  //   dbsweets.forEach((doc) => {
  //     const sweetObject = {
  //       ...doc.data(),
  //       id: doc.id,
  //     }; // 객체 분해하여 재구성
  //     setSweets((prev) => [sweetObject, ...prev]); // 반복문 이용하여 데이터 호출할때마다 set에 누적 저장
  //   });
  // };

  useEffect(() => {
    // getSweets();

    const getData = onSnapshot(
      query(collection(dbService, "sweets"), orderBy("createdAt", "desc")),
      (snapshot) => {
        const sweetArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })); // data()를 실행하여 데이터화 하기
        setSweets(sweetArray);
      }
    ); // onSnapshot은 firestore에 create,delete,update될 때마다 실행, query안에 컬렉션 대상과 orderBy넣어 정렬
    return () => getData();
  }, []);

  return (
    <div className="container">
      <SweetFactory userObj={userObj} />
      <ul style={{ marginTop: 30 }}>
        {sweets.map((sweet) => (
          <Sweet
            key={sweet.id}
            sweetObj={sweet}
            isOwner={sweet.creatorId === userObj.uid}
          />
        ))}
      </ul>
    </div>
  );
};
export default Home;
