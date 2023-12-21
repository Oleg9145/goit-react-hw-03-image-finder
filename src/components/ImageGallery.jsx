import { ImagesGalleryItem } from './ImageGalleryItem';
import React from 'react';

class ImagesGallery extends React.Component {
  render() {
    const { images } = this.props;
    return (
      <ul className="gallery">
        {images.map(image => (
          <ImagesGalleryItem key={image.id} image={image} />
        ))}
      </ul>
    );
  }
}
export { ImagesGallery };
