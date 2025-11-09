const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const apiService = {
  async fetchArtworks(page = 1, limit = 12) {
    const response = await fetch(`${API_BASE_URL}/artworks?page=${page}&limit=${limit}`);
    return response.json();
  },

  async fetchFeaturedArtworks() {
    const response = await fetch(`${API_BASE_URL}/latest-artworks`);
    return response.json();
  },

  async fetchArtworkById(id) {
    const response = await fetch(`${API_BASE_URL}/artwork/${id}`);
    return response.json();
  },

  async fetchMyArtworks(email) {
    const response = await fetch(`${API_BASE_URL}/my-artworks/${email}`);
    return response.json();
  },

  async addArtwork(artworkData) {
    const response = await fetch(`${API_BASE_URL}/artworks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(artworkData)
    });
    return response.json();
  },

  async updateArtwork(id, artworkData) {
    const response = await fetch(`${API_BASE_URL}/artwork/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(artworkData)
    });
    return response.json();
  },

  async deleteArtwork(id) {
    const response = await fetch(`${API_BASE_URL}/artwork/${id}`, {
      method: 'DELETE'
    });
    return response.json();
  },

  async likeArtwork(id) {
    const response = await fetch(`${API_BASE_URL}/artwork/${id}/like`, {
      method: 'PATCH'
    });
    return response.json();
  },

  async searchArtworks(searchTerm) {
    const response = await fetch(`${API_BASE_URL}/artworks/search/${searchTerm}`);
    return response.json();
  },

  async filterByCategory(category) {
    const response = await fetch(`${API_BASE_URL}/artworks/category/${category}`);
    return response.json();
  },

  async addToFavorites(favoriteData) {
    const response = await fetch(`${API_BASE_URL}/favorites`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(favoriteData)
    });
    return response.json();
  },

  async fetchFavorites(email) {
    const response = await fetch(`${API_BASE_URL}/favorites/${email}`);
    return response.json();
  },

  async removeFromFavorites(userEmail, artworkId) {
    const response = await fetch(`${API_BASE_URL}/favorites`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userEmail, artworkId })
    });
    return response.json();
  },

  async createOrGetUser(userData) {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return response.json();
  },

  async fetchStatistics() {
    const response = await fetch(`${API_BASE_URL}/stats/total-artworks`);
    return response.json();
  },

  async fetchCategoryStats() {
    const response = await fetch(`${API_BASE_URL}/stats/by-category`);
    return response.json();
  }
};

export default apiService;
