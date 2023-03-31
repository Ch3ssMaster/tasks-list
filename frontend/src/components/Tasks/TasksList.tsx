import Item from './Item';

/**
 * 
 * @param props {items: {[key: string]: {title: string, done: boolean, _id: string}}, onDeleteItem: (id: string) => void, onUpdateItem: (id: string, title: string) => void}
 * @returns JSX.Element
 */

type Task = {
  title: string;
  done: boolean;
  _id: string;
};

type TasksListProps = {
  items: Task[]  ;
  onDeleteItem: (id: string) => void;
  onUpdateItem: (task: { title: string; done: boolean; }, id: string) => void;
};

const TasksList = (props:TasksListProps): JSX.Element => {
  return (
    <ul className="task-list" role='list'>
      {Object.values(props.items).map((item,index) => (
        <Item
          key={item._id}
          id={item._id}
          title={item.title}
          done={item.done}
          onDelete={props.onDeleteItem}
          onEdit={props.onUpdateItem}
          even={(index % 2) === 0}
        />
      ))}
    </ul>
  );
};

export default TasksList;
