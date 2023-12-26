import { ImagesGallery } from './ImageGallery';
import { Searchbar } from './Searchbar';
import React from 'react';
import { fetchImages } from '../servises/server';
import { Loader } from './Loader';
import { Button } from './Button';
import { Modal } from './Modal';
import css from '../css/styles.module.css';
class App extends React.Component {
  state = {
    isLoading: true,
    images: [],
    error: null,
    searchTerm: '',
    page: 1,
    modal: false,
    modalData: null,
  };

  onLoadMore = () => {
    this.setState(
      prevState => ({ page: prevState.page + 1 }),
      () => {
        this.loadImages(this.state.searchTerm, this.state.page);
      }
    );
  };

  loadImages = (searchTerm, page) => {
    this.setState({ isLoading: true });

    fetchImages(searchTerm, page)
      .then(newImages => {
        if (page > 1) {
          this.setState(prevState => ({
            images: [...prevState.images, ...newImages],
            isLoading: false,
          }));
        } else {
          this.setState({ images: newImages, isLoading: false });
        }
      })
      .catch(error => {
        this.setState({
          isLoading: false,
          error: 'server error',
        });
      });
  };

  componentDidMount() {
    this.loadImages('', 1);
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchTerm !== this.state.searchTerm) {
      this.loadImages(this.state.searchTerm, 1);
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const searchValue = e.currentTarget.elements.searchInput.value;
    this.setState({ searchTerm: searchValue, page: 1 }, () => {
      this.loadImages(searchValue, 1);
    });
  };

  handleImageClick = image => {
    this.setState({ modalData: image, modal: true });
  };
  closeModal = () => {
    this.setState({ modal: false, modalData: null });
  };

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.key === 'Escape') {
      this.closeModal();
    }
  };
  render() {
    const { images, isLoading, error, modal, modalData } = this.state;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleSubmit} />
        {error && <div className="error">{error}</div>}
        {isLoading ? (
          <Loader />
        ) : (
          <ImagesGallery images={images} onImageClick={this.handleImageClick} />
        )}
        {images.length > 0 && <Button onLoadMore={this.onLoadMore} />}
        {modal && (
          <Modal image={modalData} isOpen={modal} onClose={this.closeModal} />
        )}
      </div>
    );
  }
}
export { App };
