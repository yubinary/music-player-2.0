import React from 'react';
import { FaPlayCircle } from 'react-icons/fa';

export default function Album({ albums, cropParagraph, handleClick, joinArray }) {

  // display albums
  function displayAlbum(albums) {
    let result = [];
    if (albums.length === 0) {
      return (
        <div className="album">
          <p>no result</p>
        </div>
      )
    } else {
      for (let i = 0; i < 5; i++) {
        let album = albums[i];
        result.push(
          <div key={album.id} className="album" >
            <div className="album-thumbnail">
              <img src={album.album.images[1].url} alt={album.album.images[1].url} />
              <div className="album-layer">
                <FaPlayCircle
                  className="album-play-button"
                  onClick={() => handleClick(album)}
                />
              </div>
            </div>
            <div className="album-info">
              <h1>{cropParagraph(album.name, 23)}</h1>
              <p>{cropParagraph(joinArray(album.artists), 26)}</p>
            </div>
          </div >
        )
      }
    }
    return result;
  }

  return (
    <div>
      <h2>Top Tracks</h2>
      <div className="album-list">
        {displayAlbum(albums)}
      </div>
    </div>
  )
}