import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaDownload } from 'react-icons/fa';

const MemesDisplay = () => {
  const [memes, setMemes] = useState([]);

  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const response = await axios.get('https://memestudioserver.onrender.com/getmemes');
        setMemes(response.data);
      } catch (error) {
        console.error('Error fetching memes:', error);
      }
    };

    fetchMemes();
  }, [memes]);

  const handleDownloadMeme = (imagePath) => {
    const link = document.createElement('a');
    link.href = `https://memestudioserver.onrender.com/${imagePath}`;
    link.download = 'meme.png';
    link.click();
  };

  return (
    <div style={styles.memesGrid}>
      {memes.map((meme) => (
        <div key={meme._id} style={styles.memeItem}>
          <div style={styles.imageWrapper}>
            <img src={`https://memestudioserver.onrender.com/${meme.imagePath}`} alt="meme" style={styles.memeImage} />
  
            <FaDownload
              size={30}
              style={styles.downloadIcon}
              className="download-icon"
              onClick={() => handleDownloadMeme(meme.imagePath)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

const styles = {
  memesGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around', // Distribue l'espace autour des éléments
    alignItems: 'center', // Centrer verticalement
    gap: '10px',
    padding: '10px',
  },  
  memeItem: {
    textAlign: 'center',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
    position: 'relative',
    overflow: 'hidden',
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
  },
  memeImage: {
    maxWidth: '100%',
    height: 'auto',
  },
  downloadIcon: {
    position: 'absolute',
    bottom: '10px',
    right: '10px',
    fontSize: '24px',
    color: '#fff',
    backgroundColor: 'orange',
    borderRadius: '50%',
    padding: '10px',
    cursor: 'pointer',
    display: 'inline-block',
  },
};

export default MemesDisplay;
