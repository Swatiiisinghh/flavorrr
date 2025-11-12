import os
import openai
import requests
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Configure API keys
openai.api_key = "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"
# SPOTIFY_CLIENT_ID = os.getenv('SPOTIFY_CLIENT_ID')
# SPOTIFY_CLIENT_SECRET = os.getenv('SPOTIFY_CLIENT_SECRET')

# # Initialize Spotify API client
# spotify_auth_manager = SpotifyClientCredentials(
#     client_id=SPOTIFY_CLIENT_ID,
#     client_secret=SPOTIFY_CLIENT_SECRET
# )
# spotify = spotipy.Spotify(auth_manager=spotify_auth_manager)

# RecipeDB API base URL
RECIPEDB_BASE_URL = "https://cosylab.iiitd.edu.in/recipe"

# Chatbot Functions

def fetch_recipe_of_the_day():
    """Fetches and returns the recipe of the day."""
    url = f"{RECIPEDB_BASE_URL}/recipeOftheDay"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    return {"error": "Failed to fetch recipe of the day."}

def fetch_recipe_by_id(recipe_id):
    """Fetches a recipe by its ID."""
    url = f"{RECIPEDB_BASE_URL}/{recipe_id}"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    return {"error": "Failed to fetch recipe by ID."}

def search_recipes(search_text, region=None, sub_region=None, page=1, page_size=10):
    """Searches for recipes by title."""
    url = f"{RECIPEDB_BASE_URL}-search/recipe"
    params = {
        "searchText": search_text,
        "region": region,
        "subRegion": sub_region,
        "page": page,
        "pageSize": page_size
    }
    response = requests.get(url, params=params)
    if response.status_code == 200:
        return response.json()
    return {"error": "Failed to search recipes."}

def suggest_music_for_dish(dish_name):
    """Suggests a Spotify playlist based on the dish's flavor profile."""
    try:
        # Use the dish name as a search query for playlists
        results = spotify.search(q=dish_name, type='playlist', limit=1)
        if results['playlists']['items']:
            playlist = results['playlists']['items'][0]
            return {
                "name": playlist['name'],
                "url": playlist['external_urls']['spotify']
            }
        else:
            return {"error": "No suitable playlists found."}
    except Exception as e:
        return {"error": f"Spotify API error: {str(e)}"}

def get_ingredient_alternatives(ingredient):
    """Provides modern and historical alternatives for a given ingredient."""
    prompt = (f"Provide both modern and historical alternatives for the ingredient '{ingredient}' "
              f"used in cooking. Include the reasons for each substitution.")
    response = generate_openai_response(prompt)
    return response

def assess_health_suitability(recipe, health_conditions):
    """Assesses the suitability of a recipe based on health conditions."""
    ingredients = recipe.get('Ingredients', [])
    ingredient_list = [ingredient['text'] for ingredient in ingredients]
    ingredients_str = ", ".join(ingredient_list)
    prompt = (f"Given the ingredients: {ingredients_str}. "
              f"Is this recipe suitable for someone with {health_conditions}? "
              f"Provide a detailed explanation.")
    response = generate_openai_response(prompt)
    return response

def suggest_meals_based_on_mood(mood, country=None):
    """Suggests meals based on user's mood and optional country of origin."""
    if country:
        prompt = (f"As a culinary expert, suggest some meals that are perfect for someone who is feeling {mood}. "
                  f"The meals should be from {country} cuisine.")
    else:
        prompt = (f"As a culinary expert, suggest some meals that are perfect for someone who is feeling {mood}.")
    response = generate_openai_response(prompt)
    return response

def generate_openai_response(prompt):
    """Generates a response using OpenAI's GPT model."""
    try:
        response = openai.ChatCompletion.create(
            model="gpt-4",  # or "gpt-3.5-turbo"
            messages=[
                {"role": "system", "content": "You are a helpful assistant specialized in culinary topics."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=300,
            temperature=0.7,
            n=1,
            stop=None,
        )
        return response.choices[0].message['content'].strip()
    except Exception as e:
        return f"Error generating response: {str(e)}"

def handle_sadness():
    """Handles the 'I'm sad' scenario."""
    print("Chatbot: I'm sorry to hear that you're feeling sad. Let me recommend some comforting dishes for you.")
    foods = suggest_food_for_mood("sad")
    print("\nHere are some comforting food options:")
    for food in foods:
        print(f"- {food}")

    # Suggest a specific recipe from RecipeDB API
    search_term = "comfort food"
    recipes = search_recipes(search_term)
    if 'data' in recipes and recipes['data']:
        print("\nRecommended recipes from RecipeDB:")
        for idx, recipe in enumerate(recipes.get('data', []), 1):
            print(f"{idx}. {recipe.get('title', 'No Title')}")
    else:
        print("Chatbot: Sorry, I couldn't find any comforting recipes.")

def suggest_food_for_mood(mood):
    """Suggests food based on the user's mood."""
    # Predefined mapping; can be enhanced with more sophisticated logic
    mood_to_food = {
        "sad": ["chocolate cake", "mac and cheese", "warm tomato soup", "ice cream"],
        "happy": ["fruit salad", "smoothies", "grilled vegetables"],
        "anxious": ["green tea", "dark chocolate", "almonds"],
        "tired": ["coffee", "energy bars", "banana"],
        "angry": ["spicy tacos", "sushi", "fiery chicken wings"],
        "stressed": ["avocado toast", "herbal tea", "dark leafy greens"]
    }
    return mood_to_food.get(mood.lower(), ["pasta", "pizza", "sushi"])

# Main Chatbot Functionality

def chatbot():
    print("Welcome to the Flavor Companion Chatbot!")
    print("You can ask me for personalized meal suggestions, ingredient alternatives, health assessments, and more.")
    print("Type 'exit' to end the conversation.\n")

    while True:
        user_input = input("You: ").strip().lower()
        if user_input in ['exit', 'quit']:
            print("Chatbot: Thank you for using the Flavor Companion Chatbot. Goodbye!")
            break

        # Handle specific queries based on keywords
        if any(word in user_input for word in ['sad', 'happy', 'angry', 'tired', 'stressed', 'anxious']):
            mood = next((word for word in ['sad', 'happy', 'angry', 'tired', 'stressed', 'anxious'] if word in user_input), None)
            country = None
            if 'from' in user_input:
                try:
                    country = user_input.split('from')[-1].strip().title()
                except IndexError:
                    pass
            response = suggest_meals_based_on_mood(mood, country)
            print(f"Chatbot: {response}")
            continue

        elif 'alternative for' in user_input or ('alternative' in user_input and 'ingredient' in user_input):
            # Extract ingredient
            if 'alternative for' in user_input:
                ingredient = user_input.split('alternative for')[-1].strip()
            else:
                ingredient = user_input.split('ingredient')[-1].strip()
            if ingredient:
                response = get_ingredient_alternatives(ingredient)
                print(f"Chatbot: {response}")
            else:
                print("Chatbot: Please specify the ingredient you want alternatives for.")
            continue

        elif 'suitable for' in user_input and 'health' in user_input:
            # Extract health condition and recipe
            health_conditions = input("Chatbot: Please specify your health conditions: ").strip()
            recipe_name = input("Chatbot: Please specify the recipe name: ").strip()
            recipes = search_recipes(recipe_name)
            if 'data' in recipes and recipes['data']:
                recipe = recipes['data'][0]
                response = assess_health_suitability(recipe, health_conditions)
                print(f"Chatbot: {response}")
            else:
                print("Chatbot: I couldn't find that recipe.")
            continue

        elif 'suggest music' in user_input or 'soundscape' in user_input:
            dish_name = input("Chatbot: Please specify the dish name: ").strip()
            if dish_name:
                music = suggest_music_for_dish(dish_name)
                if 'error' in music:
                    print(f"Chatbot: {music['error']}")
                else:
                    print(f"Chatbot: I recommend the playlist '{music['name']}'. You can listen to it here: {music['url']}")
            else:
                print("Chatbot: Please specify the dish name for which you want music suggestions.")
            continue

        elif 'recipe of the day' in user_input:
            recipe = fetch_recipe_of_the_day()
            if 'error' not in recipe:
                print(f"Chatbot: Today's recipe is **{recipe.get('title')}**. Here's a brief overview:")
                print(recipe.get('Description', 'No description available.'))
            else:
                print("Chatbot: Sorry, I couldn't fetch the recipe of the day.")
            continue

        elif 'search recipe' in user_input:
            search_text = input("Chatbot: Enter recipe title or keyword: ").strip()
            region = input("Chatbot: Enter region (optional): ").strip()
            recipes = search_recipes(search_text, region=region if region else None)
            if 'data' in recipes and recipes['data']:
                print("\nChatbot: Here are the search results:")
                for idx, recipe in enumerate(recipes.get('data', []), 1):
                    print(f"{idx}. {recipe.get('title', 'No Title')}")
            else:
                print("Chatbot: No recipes found matching your criteria.")
            continue

        elif 'i am sad' in user_input:
            handle_sadness()
            continue

        else:
            # General query handling using OpenAI's API
            response = generate_openai_response(user_input)
            print(f"Chatbot: {response}")

def main():
    try:
        chatbot()
    except KeyboardInterrupt:
        print("\nChatbot: Session ended. Goodbye!")

if __name__ == "__main__":
    main()
