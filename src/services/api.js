import axios from 'axios';

const API_URL = 'https://script.google.com/macros/s/AKfycbw7Fg6WEmi5D3t-5CN3-09rDakBmEArRGs1RZUu-9SEfk-LNNEuclesSWoXmR2IsQ18pA/exec';

export const fetchPlayers = async () => {
  try {
    const response = await axios.get(API_URL);
    // The Google Apps Script returns data.
    // Sometimes Google Apps Script requires following redirects or returns data inside a property.
    // Assuming standard JSON output from Apps Script GET request.
    if (response.data && Array.isArray(response.data.data)) {
      return response.data.data;
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching players:', error);
    throw error;
  }
};
