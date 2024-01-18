import { useState } from 'react';
import css from './Searchbar.module.css';

function Searchbar({ onSubmit }) {
  const [q, setQ] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(q);
  };

  const onChange = e => {
    setQ(e.currentTarget.value);
  };

  const {
    Searchbar,
    SearchForm,
    SearchFormButton,
    SearchFormButtonLabel,
    SearchFormInput,
  } = css;
  return (
    <header className={Searchbar}>
      <form className={SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={SearchFormButton}>
          <span className={SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={SearchFormInput}
          name="text"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={onChange}
        />
      </form>
    </header>
  );
}

export default Searchbar;
