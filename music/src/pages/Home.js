import React, { useState } from 'react';
import axios from 'axios';

import Header from "../components/Header.js";
import Player from "../components/Player.js";
import Album from "../components/Album.js";
import Song from "../components/Song.js";

import "../styles/Home.css";
import "../styles/Header.css";
import "../styles/AlbumSong.css";
import "../styles/Player.css";

export default function Home() {
  const [artistId, setArtistId] = useState("");
  const [artist, setArtist] = useState({});
  const [songs, setSongs] = useState([]);
  const [songToPlay, setSongToPlay] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  // first object is the song playing
  const [playlist, setPlaylist] = useState([{}]);

  // make get song request to Spotify API, used callback
  function fetchSong(setFunction, artistId) {
    let idParam = encodeURIComponent(artistId);
    let url = "https://spotify-api-wrapper.appspot.com/artist/" + idParam + "/top-tracks";

    axios.get(url)
      .then(result => {
        setFunction(result.data.tracks);
      })
      .catch(error => {
        console.error(error);
      })
  }

  function fetchArtist() {
    let searchParam = encodeURIComponent(searchTerm);
    let url = "https://spotify-api-wrapper.appspot.com/artist/" + searchParam;

    axios.get(url)
      .then(result => {
        let id = result.data.artists.items[0].id;
        let artist = result.data.artists.items[0];
        setArtistId(id);
        fetchSong(setSongs, id);
        setArtist(artist)
      })
      .catch(error => {
        console.error(error);
      })
  }

  // pass song prop when song clicked
  function handleClick(song) {
    setSongToPlay(song);
  }

  // helper function that crops paragraph by given length
  function cropParagraph(p, len) {
    let crop = "";
    if (p && p.length > len) {
      crop = p.substring(0, len - 2) + "..."
    } else {
      crop = p;
    } return crop;
  }

  return (
    <div className="body">
      <div className="home">
        <Header
          artist={artist}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          fetchArtist={fetchArtist}
        />
        <div className="results">
          <Album
            albums={songs}
            cropParagraph={cropParagraph}
            handleClick={handleClick}
          />
          <Song
            songs={songs}
            cropParagraph={cropParagraph}
            handleClick={handleClick}
            playlist={playlist}
            setPlaylist={setPlaylist}
          />
        </div>
      </div>
      <Player
        song={songToPlay}
        playlist={playlist}
        setPlaylist={setPlaylist}
        cropParagraph={cropParagraph}
      />
    </div >
  )
} 