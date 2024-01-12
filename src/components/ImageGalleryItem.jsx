import React from 'react';
import css from '../css/styles.module.css';

const ImagesGalleryItem = ({ image, onClick }) => {
  const altText = `Photo id ${image.id}`;

  return (
    <li className={css.galleryitem}>
      <img src={image.webformatURL} alt={altText} onClick={onClick} />
    </li>
  );
};

export { ImagesGalleryItem };
