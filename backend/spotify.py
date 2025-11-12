import spotipy
from spotipy.oauth2 import SpotifyClientCredentials

# Spotify API credentials (set up at https://developer.spotify.com/)
SPOTIFY_CLIENT_ID = '168c07992a03424990bf8aa01c80ea41'
SPOTIFY_CLIENT_SECRET = 'e9ae7bc6638a4cbe94f1b5064ededca2'

# Authenticate using Spotify's Client Credentials flow
auth_manager = SpotifyClientCredentials(
    client_id=SPOTIFY_CLIENT_ID,
    client_secret=SPOTIFY_CLIENT_SECRET
)
sp = spotipy.Spotify(auth_manager=auth_manager)

# Taste to music mapping
def map_taste_to_music(taste):
    # Define a taste-to-music mapping (example genres)
    taste_genre_map = {
        "sweet": ["pop", "acoustic"],
        "sour": ["punk", "grunge"],
        "bitter": ["metal", "hard-rock"],
        "salty": ["jazz", "blues"],
        "umami": ["classical", "ambient"]
    }
    
    # Fetch genres based on taste
    genres = taste_genre_map.get(taste.lower(), ["pop"])  # Default to "pop"
    
    print(f"Selected genres for taste '{taste}': {genres}")
    
    # Search Spotify tracks by genre
    track_results = []
    for genre in genres:
        results = sp.search(q=f"genre:{genre}", type='track', limit=5)  # Fetch top 5 tracks
        for track in results['tracks']['items']:
            track_info = {
                "name": track['name'],
                "artist": track['artists'][0]['name'],
                "spotify_id": track['id'],
                "genre": genre
            }
            track_results.append(track_info)
    
    return track_results

# Example usage
taste = "sweet"  # User's taste preference
tracks = map_taste_to_music(taste)

# Print and display the results
print(f"Recommended tracks for taste '{taste}':\n")
for track in tracks:
    print(f"Track: {track['name']} | Artist: {track['artist']} | Genre: {track['genre']} | Spotify ID: {track['spotify_id']}")
