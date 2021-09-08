import { addDoc, collection } from "@firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { dbService, storageService } from "firebase";
import React, { useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const SweetFactory = ({ userObj }) => {
  const [sweet, setSweet] = useState("");
  const [attachment, setAttachment] = useState("");

  const fileInput = useRef(null);

  const onSumbit = async (e) => {
    e.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = ref(storageService, `${userObj.uid}/${uuid()}`); // ref(storage위치 참조 , 폴더명/이미지 이름)
      const response = await uploadString(
        attachmentRef,
        attachment,
        "data_url"
      ); // uploadString 스트링으로 storage에 업로드 한다. (참조대상, 올린 파일이미지, 인코딩된 파일) 인코딩된 파일은 base64, base64url, data_url 중에 하나하고 url로부터 파일 저장하니 data_url 설정
      attachmentUrl = await getDownloadURL(response.ref); // 업로드된 이미지의 url을 가져온다
      fileInput.current.value = null;
    }

    const content = {
      text: sweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    await addDoc(collection(dbService, "sweets"), content); // 파이어베이스의 파이어스토어에 데이터 저장 , userObj.uid는 유저고유id
    setSweet("");
    setAttachment("");
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setSweet(value);
  };

  const onFileChange = (e) => {
    const {
      target: { files },
    } = e;
    const theFile = files[0];
    const reader = new FileReader(); // 읽을 파일의 내용을 읽고 다루게한다. new FileReader()은 인스턴스 생성
    if (theFile) {
      reader.readAsDataURL(theFile); // theFile의 내용을 읽고 끝나면 그 내용을 URL로 저장한다
    }
    reader.onloadend = (e) => {
      const {
        currentTarget: { result },
      } = e;
      setAttachment(result); // 이벤트를 통해 readAsDataURL로 저장된 url 경로를 사용
    }; // 읽기 동작이 끝났을 때마다 발생한다
  };

  const onClearAttachment = () => {
    fileInput.current.value = null; // file input에 남아 있는 이미지 파일명 지우기
    setAttachment("");
  };

  return (
    <form onSubmit={onSumbit} className="factoryForm">
      <div className="factoryInput__container">
        <input
          className="factoryInput__input"
          value={sweet}
          onChange={onChange}
          type="text"
          placeholder="지금 당신이 생각하고 있는 것은 뭔가요?"
        />
        ``
        <input type="submit" value="&rarr;" className="factoryInput__arrow" />
      </div>
      <label htmlFor="attach-file" className="factoryInput__label">
        <span>Add photos</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>
      {/* 파일 미리보기하기위해 onChange 사용 */}
      <input
        id="attach-file"
        type="file"
        accept="image/*"
        onChange={onFileChange}
        ref={fileInput}
        style={{
          opacity: 0,
        }}
      />

      {attachment && (
        <div className="factoryForm__attachment">
          <img
            src={attachment}
            alt="이미지 없음"
            style={{
              backgroundImage: attachment,
            }}
          />
          <div className="factoryForm__clear" onClick={onClearAttachment}>
            <span>삭제</span>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      )}
    </form>
  );
};
export default SweetFactory;
