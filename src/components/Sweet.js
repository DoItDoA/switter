import { updateDoc, deleteDoc, doc } from "@firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { dbService, storageService } from "firebase";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Sweet = ({ sweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newSweet, setNewSweet] = useState(sweetObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm("정말로 삭제하시겠습니까?");
    if (ok) {
      await deleteDoc(doc(dbService, `sweets/${sweetObj.id}`)); // 파이어스토어 데이터 삭제
      await deleteObject(ref(storageService, sweetObj.attachmentUrl)); // storage에서 사진 url을 참고하여 제거가능하다
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  const onSubmit = async (e) => {
    e.preventDefault();
    await updateDoc(doc(dbService, `sweets/${sweetObj.id}`), {
      text: newSweet,
    }); // 파이어스토어 데이터 업데이트
    setEditing(false);
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewSweet(value);
  };

  return (
    <li className="sweet">
      {editing ? (
        <>
          {/* 수정 눌렀을 시 실행 */}
          <form onSubmit={onSubmit} className="container sweetEdit">
            <input
              className="formInput"
              autoFocus
              type="text"
              onChange={onChange}
              value={newSweet}
              required
            />
            <input type="submit" value="수정하기" className="formBtn" />
          </form>
          <button onClick={toggleEditing} className="formBtn cancelBtn">
            취소
          </button>
        </>
      ) : (
        <>
          <span>{sweetObj.text}</span>
          {sweetObj.attachmentUrl && (
            <img src={sweetObj.attachmentUrl} alt="이미지 없음" />
          )}
          {isOwner && (
            <div className="sweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </li>
  );
};
export default Sweet;
