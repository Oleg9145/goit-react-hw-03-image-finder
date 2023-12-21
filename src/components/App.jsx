import { ImagesGallery } from './ImageGallery';
import { Searchbar } from './Searchbar';
import React from 'react';
import { fetchImages } from '../servises/server';
import { Loader } from './Loader';

class App extends React.Component {
  state = { isLoading: true, images: [], error: null };
  componentDidMount() {
    fetchImages('cats')
      .then(images => {
        this.setState({ images, isLoading: false });
      })
      .catch(error => {
        this.setState({
          isLoading: false,
          error: 'server error',
        });
      });
  }
  handleSubmit = e => {
    e.preventDefault();
  };
  render() {
    const { images, isLoading, error } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleSubmit} />
        {error && <div className="error">{error}</div>}
        {isLoading ? <Loader /> : <ImagesGallery images={images} />}
      </div>
    );
  }
}
export { App };
