import React from 'react';
class ImagesGalleryItem extends React.Component {
  render() {
    const { image, onClick } = this.props;

    const altText = `Photo id ${image.id}`;

    return (
      <li className="gallery-item">
        <img src={image.webformatURL} alt={altText} onClick={onClick} />
      </li>
    );
  }
}
export { ImagesGalleryItem };
