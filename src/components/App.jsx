import { ImagesGallery } from './ImageGallery';
import { Searchbar } from './Searchbar';
import React from 'react';
import { fetchImages } from '../servises/server';
import { Loader } from './Loader';
import { Button } from './Button';
class App extends React.Component {
  state = { isLoading: true, images: [], error: null, searchTerm: '', page: 1 };

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
    console.log('Вибране зображення:', image);
  };

  render() {
    const { images, isLoading, error } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleSubmit} />
        {error && <div className="error">{error}</div>}
        {isLoading ? (
          <Loader />
        ) : (
          <ImagesGallery images={images} onImageClick={this.handleImageClick} />
        )}
        {images.length > 0 && (
          <Button images={images} onLoadMore={this.onLoadMore} />
        )}
      </div>
    );
  }
}
export { App };
