import { useState, useRef } from "react";
import classes from "./Item.module.css";

//crear el tipo ItemProps
type ItemProps = {
  id: string;
  title: string;
  done: boolean;
  onDelete: (id: string) => void;
  onEdit: (task: { title: string; done: boolean }, id: string) => void;
  even: boolean;
};

/**
 *
 * @param props: {id: string, title: string, done: boolean, onDelete: (id: string) => void, onEdit: (task: {title: string, done: boolean}, id: string) => void, even: boolean}
 * @returns JSX.Element
 */

const Item = (props: ItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDone, setIsDone] = useState(props.done);
  const titleRef = useRef<HTMLDivElement>(null);

  const deleteHandler = () => {
    props.onDelete(props.id);
  };

  const editHandler = () => {
    titleRef.current?.focus();
    setIsEditing(true);
  };

  const saveHandler = () => {
    titleRef?.current?.blur();
    // si el título por props es disitinto al título por referencia
    if (props.title !== titleRef.current?.textContent) {
      props.onEdit(
        { title: titleRef.current?.textContent || "", done: props.done },
        props.id
      );
    }
    setIsEditing(false);
  };

  const doneHandler = () => {
    setIsDone(!isDone);
    props.onEdit({ title: props.title, done: !isDone }, props.id);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    // si se pulsa Enter o Escape se guarda el título
    if (event.key === "Enter" || event.key === "Escape") {
      // si está vacío el título se elimina la tarea
      if (titleRef.current?.textContent?.trim() === "") {
        deleteHandler();
      } else {
        saveHandler();
      }
    }
    // si se pulsa Supr y el modo edición está habilidado vaciar el título
    if (event.key === "Delete" && isEditing) {
      if (titleRef.current !== null) {
        titleRef.current.textContent = "";
      }
    }
  };

  return (
    <li
      className={`${classes["task-item"]} 
    ${props.even && classes.even}`}
    >
      <div
        onClick={editHandler}
        onKeyDown={handleKeyPress}
        contentEditable={true}
        suppressContentEditableWarning={true}
        onBlur={saveHandler}
        ref={titleRef}
        className={`${classes.title} ${isEditing && classes["edit-mode"]} ${
          props.done && classes.isDone
        }`}
      >
        {props.title}
      </div>
      <span
        onClick={doneHandler}
        className={`${classes.actions} ${classes.done} `}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M243.8 339.8C232.9 350.7 215.1 350.7 204.2 339.8L140.2 275.8C129.3 264.9 129.3 247.1 140.2 236.2C151.1 225.3 168.9 225.3 179.8 236.2L224 280.4L332.2 172.2C343.1 161.3 360.9 161.3 371.8 172.2C382.7 183.1 382.7 200.9 371.8 211.8L243.8 339.8zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z" />
        </svg>
      </span>
      <span
        onClick={editHandler}
        className={`${classes.actions} ${classes.edit}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.8 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
        </svg>
      </span>
      <span
        onClick={deleteHandler}
        className={`${classes.actions} ${classes.delete}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
          <path d="M290.7 57.4L57.4 290.7c-25 25-25 65.5 0 90.5l80 80c12 12 28.3 18.7 45.3 18.7H288h9.4H512c17.7 0 32-14.3 32-32s-14.3-32-32-32H387.9L518.6 285.3c25-25 25-65.5 0-90.5L381.3 57.4c-25-25-65.5-25-90.5 0zM297.4 416H288l-105.4 0-80-80L227.3 211.3 364.7 348.7 297.4 416z" />
        </svg>
      </span>
    </li>
  );
};

export default Item;
