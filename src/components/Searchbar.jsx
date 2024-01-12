import React from 'react';
import css from '../css/styles.module.css';

const Searchbar = ({ onSubmit }) => {
  return (
    <header className={css.searchbar}>
      <form onSubmit={onSubmit}>
        <button type="submit" className={css.formbutton}>
          <span>Search</span>
        </button>
        <input
          name="searchInput"
          className={css.SearchForminput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

export { Searchbar };
