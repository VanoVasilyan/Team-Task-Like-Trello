import { Component } from "react";
import { connect } from "react-redux";
import { Draggable } from "react-beautiful-dnd";
import CardEditor from "../CardEditor/index";
import styles from "./card.module.css";

class Card extends Component {
  state = {
    hover: false,
    editing: false
  };

  startHover = () => this.setState({ hover: true });
  endHover = () => this.setState({ hover: false });

  startEditing = () => {
    this.setState({
      hover: false,
      editing: true,
      text: this.props.card.text
    });
  }

  endEditing = () => this.setState({ hover: false, editing: false });

  editCard = async text => {
    const { card, dispatch } = this.props;
    this.endEditing();
    dispatch({
      type: "CHANGE_CARD_TEXT",
      payload: { cardId: card._id, cardText: text }
    });
  };

  deleteCard = async () => {
    const { listId, card, dispatch } = this.props;
    if (window.confirm("Are you sure to delete this card?")) {
      dispatch({
        type: "DELETE_CARD",
        payload: { cardId: card._id, listId }
      });
    }
  };

  render() {
    const { card, index } = this.props;
    const { hover, editing } = this.state;

    if (!editing) {
      return (
        <Draggable draggableId={card._id} index={index}>
          {(provided, _snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className={styles.card}
              onMouseEnter={this.startHover}
              onMouseLeave={this.endHover}
            >
              {hover && (
                <div className={styles.cardIcons}>
                  <button className={styles.cardIcon} onClick={this.startEditing}>
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                </div>
              )}
              {card.text}
            </div>
          )}
        </Draggable>
      );
    } else {
      return (
        <CardEditor
          text={card.text}
          onSave={this.editCard}
          onDelete={this.deleteCard}
          onCancel={this.endEditing}
        />
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => ({
  card: state.cardsById[ownProps.cardId]
});

export default connect(mapStateToProps)(Card);
