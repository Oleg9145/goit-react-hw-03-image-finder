import React from 'react';

class Button extends React.Component {
  render() {
    if (this.props.images.length === 0) {
      return null;
    }

    return <button onClick={this.props.onLoadMore}>Load more</button>;
  }
}

export { Button };
