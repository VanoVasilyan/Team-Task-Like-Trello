import styles from "./editButtons.module.css";

const EditButtons = ({ handleSave, saveLabel, handleDelete, handleCancel }) => (
  <div className={styles.editButtons}>
    <div
      tabIndex="0"
      className={styles.editButton}
      style={{ backgroundColor: "#5aac44" }}
      onClick={handleSave}
    >
      {saveLabel}
    </div>
    {handleDelete && (
      <div
        tabIndex="0"
        className={styles.editButton}
        style={{ backgroundColor: "#EA2525", marginLeft: 0 }}
        onClick={handleDelete}
      >
        Delete
      </div>
    )}
    <div tabIndex="0" className={styles.editButtonCancel} onClick={handleCancel}>
      <ion-icon name="close" />
    </div>
  </div>
);

export default EditButtons;
