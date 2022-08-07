import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import AddList from '../AddList/index';
import List from "../List/index";
import styles from "./board.module.css";

const Board = () => {
  const dispatch = useDispatch();
  const board = useSelector(state => state.board);
  const [addingList, setAddingList] = useState(false)

  const toggleAddingList = () => setAddingList(!addingList);

  const handleDragEnd = ({ source, destination, type }) => {
    if (!destination) return;

    if (type === "COLUMN") {
      if (source.index !== destination.index) {
        dispatch({
          type: "MOVE_LIST",
          payload: {
            oldListIndex: source.index,
            newListIndex: destination.index
          }
        });
      }
      return;
    }

    if (
      source.index !== destination.index ||
      source.droppableId !== destination.droppableId
    ) {
      dispatch({
        type: "MOVE_CARD",
        payload: {
          sourceListId: source.droppableId,
          destListId: destination.droppableId,
          oldCardIndex: source.index,
          newCardIndex: destination.index
        }
      });
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="COLUMN">
        {(provided, _snapshot) => (
          <div className={styles.board} ref={provided.innerRef}>
            {board.lists.map((listId, index) => {
              return <List listId={listId} key={listId} index={index} />;
            })}
            {provided.placeholder}
            <div className={styles.addList}>
              {addingList ? (
                <AddList toggleAddingList={toggleAddingList} />
              ) : (
                <button
                  onClick={toggleAddingList}
                  className={styles.addListButton}
                >
                  Add a new list
                </button>
              )}
            </div>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Board
