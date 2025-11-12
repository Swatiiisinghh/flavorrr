from flask import Flask, request, jsonify
import requests
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Constants (Consider moving sensitive data to environment variables)
RECIPEDB_BASE_URL = "https://cosylab.iiitd.edu.in/recipe"

def fetch_recipe_details(search_text):
    """
    Fetches the details of the first recipe matching the search_text.
    Returns the detailed recipe data as a dictionary.
    """
    # Step 1: Search for recipes
    search_url = f"https://cosylab.iiitd.edu.in/recipe-search/recipe"
    params = {
        "pageSize": 10,
        "searchText": search_text
    }
    try:
        search_response = requests.get(search_url, params=params)
        search_response.raise_for_status()
    except requests.RequestException as e:
        return {"error": f"Search request failed: {str(e)}"}

    search_data = search_response.json()
    
    # Check if recipes are found
    if search_data.get("success") == "true" and search_data.get("payload", {}).get("data"):
        first_recipe = search_data["payload"]["data"][0]
        recipe_id = first_recipe.get("Recipe_id")
        print(f"Fetching details for Recipe ID: {recipe_id}\n")
        
        # Step 2: Fetch detailed recipe information
        details_url = f"{RECIPEDB_BASE_URL}/{recipe_id}"
        try:
            details_response = requests.get(details_url)
            details_response.raise_for_status()
        except requests.RequestException as e:
            return {"error": f"Details request failed: {str(e)}"}
        
        details_data = details_response.json()
        if details_data.get("success") == "true":
            return details_data["payload"]
        else:
            return {"error": "Failed to fetch recipe details."}
    else:
        return {"error": "No recipes found for the search text."}

def format_recipe_details(recipe):
    """
    Formats the recipe details into a dictionary suitable for JSON response.
    """
    formatted_recipe = {
        "Recipe_title": recipe.get('Recipe_title'),
        "url": recipe.get('url'),
        "Region": recipe.get('Region'),
        "Sub_region": recipe.get('Sub_region'),
        "Continent": recipe.get('Continent'),
        "Calories": recipe.get('Calories'),
        "cook_time": recipe.get('cook_time'),
        "prep_time": recipe.get('prep_time'),
        "total_time": recipe.get('total_time'),
        "servings": recipe.get('servings'),
        "Processes": recipe.get('Processes'),
        "ingredients": [
            {
                "ingredient": ingredient.get("ingredient"),
                "state": ingredient.get("state"),
                "quantity": ingredient.get("quantity"),
                "unit": ingredient.get("unit")
            }
            for ingredient in recipe.get("ingredients", [])
        ],
        "instructions": recipe.get("instructions", [])
    }
    return formatted_recipe

@app.route('/search_recipes', methods=['GET'])
def search_recipes_endpoint():
    """
    API endpoint to search for recipes based on a query.
    Returns a list of recipes with basic information.
    Expects 'query' parameter in the request.
    """
    query = request.args.get('query', '').strip()
    if not query:
        return jsonify({"error": "Query parameter is required."}), 400
    
    # Step 1: Search for recipes
    search_url = f"https://cosylab.iiitd.edu.in/recipe-search/recipe"
    params = {
        "pageSize": 10,
        "searchText": query
    }
    try:
        search_response = requests.get(search_url, params=params)
        search_response.raise_for_status()
    except requests.RequestException as e:
        return jsonify({"error": f"Search request failed: {str(e)}"}), 500
    
    search_data = search_response.json()
    
    # Check if recipes are found
    if search_data.get("success") == "true" and search_data.get("payload", {}).get("data"):
        recipes = search_data["payload"]["data"]
        # Extract basic info for each recipe
        basic_recipes = [
            {
                "Recipe_id": recipe.get("Recipe_id"),
                "Recipe_title": recipe.get("Recipe_title"),
                "url": recipe.get("url")
            }
            for recipe in recipes
        ]
        return jsonify({"success": True, "payload": {"data": basic_recipes}}), 200
    else:
        return jsonify({"error": "No recipes found for the search text."}), 404

@app.route('/recipe/<int:recipe_id>', methods=['GET'])
def get_recipe_details_endpoint(recipe_id):
    """
    API endpoint to get detailed information about a specific recipe.
    """
    details_url = f"{RECIPEDB_BASE_URL}/{recipe_id}"
    try:
        details_response = requests.get(details_url)
        details_response.raise_for_status()
    except requests.RequestException as e:
        return jsonify({"error": f"Details request failed: {str(e)}"}), 500
    
    details_data = details_response.json()
    if details_data.get("success") == "true":
        formatted_recipe = format_recipe_details(details_data["payload"])
        return jsonify({"success": True, "payload": formatted_recipe}), 200
    else:
        return jsonify({"error": "Failed to fetch recipe details."}), 404

@app.route('/search', methods=['GET'])
def search_recipe():
    """
    API endpoint to search for a recipe and return its detailed information.
    Expects 'query' parameter in the request.
    """
    query = request.args.get('query', '').strip()
    if not query:
        return jsonify({"error": "Query parameter is required."}), 400
    
    recipe_details = fetch_recipe_details(query)
    if "error" in recipe_details:
        return jsonify({"error": recipe_details["error"]}), 404
    
    formatted_recipe = format_recipe_details(recipe_details)
    return jsonify({"success": True, "payload": formatted_recipe}), 200

if __name__ == "__main__":
    # It's recommended to use environment variables for host and port in production
    app.run(debug=True, host='0.0.0.0', port=5000)
