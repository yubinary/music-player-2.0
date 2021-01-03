import React from 'react';
import { BiSearch } from 'react-icons/bi';
import { FaHeart } from 'react-icons/fa';

export default function Header({ artist, searchTerm, setSearchTerm, fetchArtist }) {

  // fetch search term to when button clicked
  function handleSubmit(event) {
    // prevent default action of form (ex. refresh the page)
    event.preventDefault();
    fetchArtist();
  }

  // handle case when song is an empty object
  if (Object.keys(artist).length === 0) {
    return (
      <div className="header" >
        <div className="back" />
        <div className="top">
          <div className="navigation">
            <h1>Music</h1>
            <form className="search-bar"
              onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
              <button className="search-bar-button" type="submit">
                <BiSearch className="search-bar-icon" />
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  } else {

    var headerStyle = {
      backgroundImage: "url(" + artist.images[0].url + ")"
    };

    return (
      <div className="header" >
        <div className="back" style={headerStyle} />
        <div className="top">
          <div className="navigation">
            <h1>Music</h1>
            <form className="search-bar"
              onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
              <button className="search-bar-button" type="submit">
                <BiSearch className="search-bar-icon" />
              </button>
            </form>
          </div>
          <div className="artist">
            <img className="artist-img" src={artist.images[1].url} alt={artist.images[1].url} />
            <div className="artist-info">
              <h2>{artist.name}</h2>
              <div className="artist-detail">
                <p><FaHeart />{artist.followers.total}</p>
                <p>{artist.genres}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}