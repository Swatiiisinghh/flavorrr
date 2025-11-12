// src/components/SensoryMappingDashboard.js
import React, { useState, useEffect } from 'react';
import './SensoryMappingDashboard.css';

function SensoryMappingDashboard() {
  const [mood, setMood] = useState('');
  const [sweetness, setSweetness] = useState(50);
  const [spiciness, setSpiciness] = useState(50);
  const [ambiance, setAmbiance] = useState('');
  const [playlist, setPlaylist] = useState('');

  // Define mood options
  const moodOptions = ['Happy', 'Sad', 'Romantic', 'Energetic', 'Relaxed'];

  // Define playlist mappings
  const playlistMappings = {
    Happy: {
      lowSweet: {
        lowSpice: {
          ambiance: 'Bright and Cheerful',
          playlist: 'https://open.spotify.com/playlist/37i9dQZF1DXdPec7aLTmlC',
        },
        mediumSpice: {
          ambiance: 'Upbeat Vibes',
          playlist: 'https://open.spotify.com/playlist/37i9dQZF1DX1lVhptIYRda',
        },
        highSpice: {
          ambiance: 'High Energy',
          playlist: 'https://open.spotify.com/playlist/37i9dQZF1DX0XUsuxWHRQd',
        },
      },
      mediumSweet: {
        lowSpice: {
          ambiance: 'Sunny Day',
          playlist: 'https://open.spotify.com/playlist/37i9dQZF1DX4WYpdgoIcn6',
        },
        mediumSpice: {
          ambiance: 'Feel-Good Hits',
          playlist: 'https://open.spotify.com/playlist/37i9dQZF1DX1lVhptIYRda',
        },
        highSpice: {
          ambiance: 'Party Time',
          playlist: 'https://open.spotify.com/playlist/37i9dQZF1DX0XUsuxWHRQd',
        },
      },
      highSweet: {
        lowSpice: {
          ambiance: 'Joyful Moments',
          playlist: 'https://open.spotify.com/playlist/37i9dQZF1DX4WYpdgoIcn6',
        },
        mediumSpice: {
          ambiance: 'Dance Party',
          playlist: 'https://open.spotify.com/playlist/37i9dQZF1DX0XUsuxWHRQd',
        },
        highSpice: {
          ambiance: 'Extreme Energy',
          playlist: 'https://open.spotify.com/playlist/37i9dQZF1DX0XUsuxWHRQd',
        },
      },
    },
    Sad: {
      lowSweet: {
        lowSpice: {
          ambiance: 'Calm and Reflective',
          playlist: 'https://open.spotify.com/playlist/37i9dQZF1DWXRqgorJj26U',
        },
        mediumSpice: {
          ambiance: 'Melancholic Tunes',
          playlist: 'https://open.spotify.com/playlist/37i9dQZF1DWXRqgorJj26U',
        },
        highSpice: {
          ambiance: 'Emotional Release',
          playlist: 'https://open.spotify.com/playlist/37i9dQZF1DWXRqgorJj26U',
        },
      },
      mediumSweet: {
        lowSpice: {
          ambiance: 'Soothing Sounds',
          playlist: 'https://open.spotify.com/playlist/37i9dQZF1DWXRqgorJj26U',
        },
        mediumSpice: {
          ambiance: 'Heartfelt Melodies',
          playlist: 'https://open.spotify.com/playlist/37i9dQZF1DWXRqgorJj26U',
        },
        highSpice: {
          ambiance: 'Cathartic Beats',
          playlist: 'https://open.spotify.com/playlist/37i9dQZF1DWXRqgorJj26U',
        },
      },
      highSweet: {
        lowSpice: {
          ambiance: 'Hopeful Harmonies',
          playlist: 'https://open.spotify.com/playlist/37i9dQZF1DWXRqgorJj26U',
        },
        mediumSpice: {
          ambiance: 'Healing Rhythms',
          playlist: 'https://open.spotify.com/playlist/37i9dQZF1DWXRqgorJj26U',
        },
        highSpice: {
          ambiance: 'Empowering Beats',
          playlist: 'https://open.spotify.com/playlist/37i9dQZF1DWXRqgorJj26U',
        },
      },
    },
    Romantic: {
      lowSweet: {
        lowSpice: {
          ambiance: 'Intimate Evening',
          playlist: 'https://open.spotify.com/playlist/37i9dQZF1DX4WYpdgoIcn6',
        },
        mediumSpice: {
          ambiance: 'Love Songs',
          playlist: 'https://open.spotify.com/playlist/37i9dQZF1DX0XUsuxWHRQd',
        },
        highSpice: {
          ambiance: 'Passionate Vibes',
          playlist: 'https://open.spotify.com/playlist/37i9dQZF1DX0XUsuxWHRQd',
        },
      },
      mediumSweet: {
        lowSpice: {
          ambiance: 'Romantic Dinner',
          playlist: 'https://open.spotify.com/playlist/37i9dQZF1DWXRqgorJj26U',
        },
        mediumSpice: {
          ambiance: 'Date Night',
          playlist: 'https://open.spotify.com/playlist/37i9dQZF1DWXRqgorJj26U',
        },
        highSpice: {
          ambiance: 'Seductive Beats',
          playlist: 'https://open.spotify.com/playlist/37i9dQZF1DWXRqgorJj26U',
        },
      },
      highSweet: {
        lowSpice: {
          ambiance: 'Sweet Serenades',
          playlist: 'https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M',
        },
        mediumSpice: {
          ambiance: 'Romantic Dance',
          playlist: 'https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M',
        },
        highSpice: {
          ambiance: 'Intense Love',
          playlist: 'https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M',
        },
      },
    },
    Energetic: {
      lowSweet: {
        lowSpice: {
          ambiance: 'Morning Boost',
          playlist: 'https://open.spotify.com/playlist/37i9dQZF1DX2sUQwD7tbmL',
        },
        mediumSpice: {
          ambiance: 'Workout Mix',
          playlist: 'https://open.spotify.com/playlist/37i9dQZF1DX2sUQwD7tbmL',
        },
        highSpice: {
          ambiance: 'High-Intensity Training',
          playlist: 'https://open.spotify.com/playlist/37i9dQZF1DX2sUQwD7tbmL',
        },
      },
      mediumSweet: {
        lowSpice: {
          ambiance: 'Energetic Workday',
          playlist: 'https://open.spotify.com/playlist/37i9dQZF1DWXRqgorJj26U',
        },
        mediumSpice: {
          ambiance: 'Active Lifestyle',
          playlist: 'https://open.spotify.com/playlist/37i9dQZF1DWXRqgorJj26U',
        },
        highSpice: {
          ambiance: 'Party Hits',
          playlist: 'https://open.spotify.com/playlist/37i9dQZF1DWXRqgorJj26U',
        },
      },
      highSweet: {
        lowSpice: {
          ambiance: 'Feel-Good Beats',
          playlist: 'https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M',
        },
        mediumSpice: {
          ambiance: 'Dancefloor Classics',
          playlist: 'https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M',
        },
        highSpice: {
          ambiance: 'Ultimate Party Mix',
          playlist: 'https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M',
        },
      },
    },
    Relaxed: {
      lowSweet: {
        lowSpice: {
          ambiance: 'Peaceful Atmosphere',
          playlist: 'https://open.spotify.com/playlist/37i9dQZF1DX3Ogo9pFvBkY',
        },
        mediumSpice: {
          ambiance: 'Chill Vibes',
          playlist: 'https://open.spotify.com/playlist/37i9dQZF1DX3Ogo9pFvBkY',
        },
        highSpice: {
          ambiance: 'Mellow Beats',
          playlist: 'https://open.spotify.com/playlist/37i9dQZF1DX3Ogo9pFvBkY',
        },
      },
      mediumSweet: {
        lowSpice: {
          ambiance: 'Easy Listening',
          playlist: 'https://open.spotify.com/playlist/37i9dQZF1DX3Ogo9pFvBkY',
        },
        mediumSpice: {
          ambiance: 'Smooth Tunes',
          playlist: 'https://open.spotify.com/playlist/37i9dQZF1DX3Ogo9pFvBkY',
        },
        highSpice: {
          ambiance: 'Laid-back Grooves',
          playlist: 'https://open.spotify.com/playlist/37i9dQZF1DX3Ogo9pFvBkY',
        },
      },
      highSweet: {
        lowSpice: {
          ambiance: 'Serene Melodies',
          playlist: 'https://open.spotify.com/playlist/37i9dQZF1DX3Ogo9pFvBkY',
        },
        mediumSpice: {
          ambiance: 'Relaxing Rhythms',
          playlist: 'https://open.spotify.com/playlist/37i9dQZF1DX3Ogo9pFvBkY',
        },
        highSpice: {
          ambiance: 'Dreamy Soundscapes',
          playlist: 'https://open.spotify.com/playlist/37i9dQZF1DX3Ogo9pFvBkY',
        },
      },
    },
  };

  // Function to determine ambiance and playlist based on mood and taste
  const determineAmbianceAndPlaylist = (
    currentMood,
    currentSweetness,
    currentSpiciness
  ) => {
    if (!currentMood) return { ambiance: '', playlist: '' };

    // Determine sweetness level
    let sweetnessLevel;
    if (currentSweetness <= 33) {
      sweetnessLevel = 'lowSweet';
    } else if (currentSweetness <= 66) {
      sweetnessLevel = 'mediumSweet';
    } else {
      sweetnessLevel = 'highSweet';
    }

    // Determine spiciness level
    let spicinessLevel;
    if (currentSpiciness <= 33) {
      spicinessLevel = 'lowSpice';
    } else if (currentSpiciness <= 66) {
      spicinessLevel = 'mediumSpice';
    } else {
      spicinessLevel = 'highSpice';
    }

    // Fetch ambiance and playlist from mappings
    const moodMapping = playlistMappings[currentMood];
    if (!moodMapping) return { ambiance: '', playlist: '' };

    const sweetnessMapping = moodMapping[sweetnessLevel];
    if (!sweetnessMapping) return { ambiance: '', playlist: '' };

    const spiceMapping = sweetnessMapping[spicinessLevel];
    if (!spiceMapping) return { ambiance: '', playlist: '' };

    return { ambiance: spiceMapping.ambiance, playlist: spiceMapping.playlist };
  };

  // useEffect to update ambiance and playlist when inputs change
  useEffect(() => {
    const { ambiance: newAmbiance, playlist: newPlaylist } =
      determineAmbianceAndPlaylist(mood, sweetness, spiciness);
    setAmbiance(newAmbiance);
    setPlaylist(newPlaylist);
  }, [mood, sweetness, spiciness]);

  return (
    <section className="sensory-mapping-dashboard">
      <h2>Sensory Experience Designer</h2>
      <form className="sensory-form">
        {/* Mood Selection */}
        <div className="sensory-control">
          <label htmlFor="mood">How are you feeling today?</label>
          <select
            id="mood"
            name="mood"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
          >
            <option value="">--Select Mood--</option>
            {moodOptions.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        {/* Sweetness Slider */}
        <div className="sensory-control">
          <label htmlFor="sweetness">Sweetness Preference:</label>
          <input
            type="range"
            id="sweetness"
            name="sweetness"
            min="0"
            max="100"
            value={sweetness}
            onChange={(e) => setSweetness(Number(e.target.value))}
          />
          <span>{sweetness}%</span>
        </div>

        {/* Spiciness Slider */}
        <div className="sensory-control">
          <label htmlFor="spiciness">Spiciness Preference:</label>
          <input
            type="range"
            id="spiciness"
            name="spiciness"
            min="0"
            max="100"
            value={spiciness}
            onChange={(e) => setSpiciness(Number(e.target.value))}
          />
          <span>{spiciness}%</span>
        </div>
      </form>

      {/* Display Ambiance and Playlist */}
      {ambiance && playlist && (
        <div className="results-section">
          <h3>Your Suggested Ambiance:</h3>
          <p className="ambiance">{ambiance}</p>
          <h3>Curated Playlist for You:</h3>
          <a
            href={playlist}
            target="_blank"
            rel="noopener noreferrer"
            className="playlist-link"
          >
            🎵 Listen Now
          </a>
        </div>
      )}
    </section>
  );
}

export default SensoryMappingDashboard;
