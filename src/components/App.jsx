import React, { useState, useEffect } from 'react';
import { ImagesGallery } from './ImageGallery';
import { Searchbar } from './Searchbar';
import { fetchImages } from '../servises/server';
import { Loader } from './Loader';
import { Button } from './Button';
import { Modal } from './Modal';
import css from '../css/styles.module.css';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  const loadImages = () => {
    setIsLoading(true);
    fetchImages(searchTerm, page)
      .then(newImages => {
        setImages(prevImages =>
          page > 1 ? [...prevImages, ...newImages] : newImages
        );
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
        setError('server error');
      });
  };

  useEffect(() => {
    if (searchTerm) {
      loadImages();
    }
    const handleKeyDown = e => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [searchTerm, page]);

  const handleSubmit = e => {
    e.preventDefault();
    const searchValue = e.currentTarget.elements.searchInput.value.trim();
    if (searchValue && searchValue !== searchTerm) {
      setSearchTerm(searchValue);
      setPage(1);
      setImages([]);
    }
  };

  const handleImageClick = image => {
    setModalData(image);
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
    setModalData(null);
  };

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={handleSubmit} />
      {error && <div className="error">{error}</div>}
      {isLoading ? (
        <Loader />
      ) : (
        <ImagesGallery images={images} onImageClick={handleImageClick} />
      )}
      {images.length > 0 && <Button onLoadMore={onLoadMore} />}
      {modal && <Modal image={modalData} isOpen={modal} onClose={closeModal} />}
    </div>
  );
};

export { App };
