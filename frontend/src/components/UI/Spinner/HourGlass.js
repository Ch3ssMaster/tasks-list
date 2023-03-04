import classes from "./HourGlass.module.css";

/**
 * @description Componente para mostrar un spinner durantes las peticiones a la API
 * @returns {JSX.Element} HourGlass
 */
function HourGlass() {
  return (
    <div title="spinner" className={classes.container}>
      <div className={classes["lds-hourglass"]}></div>
    </div>
  );
}

export default HourGlass;
