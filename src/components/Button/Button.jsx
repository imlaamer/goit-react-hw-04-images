import css from './Button.module.css';

function Button({ onClick }) {
  return (
    <div className={css.buttonBox}>
      <button type="button" className={css.Button} onClick={onClick}>
        Load More
      </button>
    </div>
  );
}

export default Button;
