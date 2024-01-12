import React from 'react';
import css from '../css/styles.module.css';
import { ImagesGalleryItem } from './ImageGalleryItem';

const ImagesGallery = ({ images, onImageClick }) => {
  return (
    <ul className={css.ImageGallery}>
      {images.map(image => (
        <ImagesGalleryItem
          key={image.id}
          image={image}
          onClick={() => onImageClick(image)}
        />
      ))}
    </ul>
  );
};

export { ImagesGallery };
