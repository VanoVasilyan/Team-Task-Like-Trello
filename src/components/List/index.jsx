import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Droppable, Draggable } from "react-beautiful-dnd";
import shortid from "shortid";
import Card from "../Card/index";
import CardEditor from "../CardEditor/index";
import ListEditor from "../ListEditor/index";

import styles from "./list.module.css";

const List = ({ listId, index }) => {
  const dispatch = useDispatch()
  const [editingTitle, setEditingTitle] = useState(false)
  const [addingCard, setAddingCard] = useState(false)
  const [title, setTitle] = useState('')
  const list = useSelector(state => state.listsById[listId])

  const toggleAddingCard = () => setAddingCard(!addingCard);

  const addCard = async cardText => {
    toggleAddingCard();
    const cardId = shortid.generate();
    dispatch({
      type: "ADD_CARD",
      payload: { cardText, cardId, listId }
    });
  };

  const toggleEditingTitle = () => setEditingTitle(!editingTitle);

  const handleChangeTitle = e => setTitle(e.target.value);

  const editListTitle = async () => {
    toggleEditingTitle();
    dispatch({
      type: "CHANGE_LIST_TITLE",
      payload: { listId, listTitle: title }
    });
  };

  const deleteList = async () => {
    if (window.confirm("Are you sure to delete this list?")) {
      dispatch({
        type: "DELETE_LIST",
        payload: { listId, cards: list.cards }
      });
    }
  };

  return (
    <Draggable draggableId={list._id} index={index}>
      {(provided, _snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={styles.list}
        >
          {editingTitle ? (
            <ListEditor
              list={list}
              title={title}
              handleChangeTitle={handleChangeTitle}
              saveList={editListTitle}
              deleteList={deleteList}
            />
          ) : (
            <div className={styles.listTitle} onClick={toggleEditingTitle}>
              {list.title}
            </div>
          )}
          <Droppable droppableId={list._id}>
            {(provided, _snapshot) => (
              <div ref={provided.innerRef}>
                {list.cards.length > 0 &&
                  list.cards.map((cardId, index) => (
                    <Card
                      key={cardId}
                      cardId={cardId}
                      index={index}
                      listId={list._id}
                    />
                  ))}
                {provided.placeholder}
                {addingCard ? (
                  <CardEditor
                    onSave={addCard}
                    onCancel={toggleAddingCard}
                    adding
                  />
                ) : (
                  <div className={styles.toggleAddCard} onClick={toggleAddingCard}>
                    Add a card
                  </div>
                )}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}

export default List
