import { useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";

import styles from "./listEditor.module.css";

const ListEditor = ({ saveList, handleChangeTitle, deleteList, title }) => {
  const ref = useRef()
  const onEnter = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
      saveList();
    }
  };
  return (
    <div className={styles.listTitleEdit} ref={ref}>
      <TextareaAutosize
        autoFocus
        className={styles.listTitleTextarea}
        placeholder="Enter list title..."
        value={title}
        onChange={handleChangeTitle}
        onKeyDown={onEnter}
        style={{ width: deleteList ? 220 : 245 }}
      />
      {deleteList && <i onClick={deleteList} style={{ cursor: 'pointer', marginLeft: '15px' }} className="fa-solid fa-trash"></i>}
    </div>
  );
}

export default ListEditor;
