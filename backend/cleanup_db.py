import os
from dotenv import load_dotenv
import requests

# Load environment variables from .env file
load_dotenv()

def get_all_points(api_url, api_key, collection_name):
    url = f"{api_url}/collections/{collection_name}/points/scroll"
    headers = {
        "api-key": api_key,
        "Content-Type": "application/json"
    }
    response = requests.post(url, headers=headers, json={})
    response.raise_for_status()  # Raise an exception for bad responses (4xx or 5xx)
    points = response.json()["result"]["points"]
    point_ids = [point["id"] for point in points]
    return point_ids

def delete_all_points(api_url, api_key, collection_name):
    point_ids = get_all_points(api_url, api_key, collection_name)
    if not point_ids:
        print("No points to delete.")
        return
    
    url = f"{api_url}/collections/{collection_name}/points/delete"
    headers = {
        "api-key": api_key,
        "Content-Type": "application/json"
    }
    data = {
        "points": point_ids
    }
    response = requests.post(url, headers=headers, json=data)
    response.raise_for_status()  # Raise an exception for bad responses (4xx or 5xx)
    print("All points deleted successfully.")

# Extract API URL, API key, and collection name from environment variables
api_url = os.getenv("QDRANT_URL")
api_key = os.getenv("QDRANT_API_KEY")
collection_name = os.getenv("QDRANT_COLLECTION")

# Call delete_all_points function
delete_all_points(api_url, api_key, collection_name)
