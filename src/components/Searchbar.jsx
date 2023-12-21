import React from 'react';

class Searchbar extends React.Component {
  render() {
    const { onSubmit } = this.props; // Отримання onSubmit з пропсів

    return (
      <header className="searchbar">
        <form onSubmit={onSubmit}>
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>
          <input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export { Searchbar };
