import React from 'react';
import { ImagesGalleryItem } from './ImageGalleryItem';

class ImagesGallery extends React.Component {
  render() {
    const { images, onImageClick } = this.props;
    return (
      <ul className="gallery">
        {images.map(image => (
          <ImagesGalleryItem
            key={image.id}
            image={image}
            onClick={() => onImageClick(image)}
          />
        ))}
      </ul>
    );
  }
}
export { ImagesGallery };
