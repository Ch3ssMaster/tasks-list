import Item from './Item';

const TasksList = props => {
  return (
    <ul className="task-list">
      {Object.values(props.items).map((item,index) => (
        <Item
          key={item._id}
          id={item._id}
          title={item.title}
          done={item.done}
          onDelete={props.onDeleteItem}
          onEdit={props.onEditItem}
          even={(index % 2) === 0}
        />
      ))}
    </ul>
  );
};

export default TasksList;
