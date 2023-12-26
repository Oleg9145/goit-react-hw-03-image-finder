import React from 'react';
import css from '../css/styles.module.css';
class ImagesGalleryItem extends React.Component {
  render() {
    const { image, onClick } = this.props;

    const altText = `Photo id ${image.id}`;

    return (
      <li className={css.galleryitem}>
        <img src={image.webformatURL} alt={altText} onClick={onClick} />
      </li>
    );
  }
}
export { ImagesGalleryItem };
