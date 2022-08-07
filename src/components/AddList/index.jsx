import { useState } from "react";
import { useDispatch } from "react-redux";
import shortid from "shortid";
import ListEditor from "../ListEditor/index";
import EditButtons from "../EditButtons/index";

import styles from "./addList.module.css";

const AddList = ({ toggleAddingList }) => {
  const [title, setTitle] = useState('')
  const dispatch = useDispatch();
  const handleChangeTitle = e => setTitle(e.target.value);

  const createList = async () => {
    toggleAddingList();
    dispatch({
      type: "ADD_LIST",
      payload: { listId: shortid.generate(), listTitle: title }
    });
  };

  return (
    <div className={styles.addListEditor}>
      <ListEditor
        title={title}
        handleChangeTitle={handleChangeTitle}
        onClickOutside={toggleAddingList}
        saveList={createList}
      />
      <EditButtons
        handleSave={createList}
        saveLabel={"Add list"}
        handleCancel={toggleAddingList}
      />
    </div>
  );
}

export default AddList;
