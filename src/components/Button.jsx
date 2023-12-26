import React from 'react';
import css from '../css/styles.module.css';

const Button = ({ onLoadMore }) => {
  return (
    <button className={css.Button} onClick={onLoadMore}>
      Load more
    </button>
  );
};

export { Button };
