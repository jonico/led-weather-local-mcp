/**
 * Function to get the current weather for a specified location.
 *
 * @param {Object} args - Arguments for the weather query.
 * @param {string} args.location - The location for which to retrieve the current weather.
 * @returns {Promise<Object>} - The current weather data for the specified location.
 */
const executeFunction = async ({ location }) => {
  const baseUrl = 'http://api.weatherapi.com/v1/current.json';
  const apiKey = process.env.WEATHER_API_KEY;
  try {
    // Construct the URL with query parameters
    const url = new URL(baseUrl);
    url.searchParams.append('key', apiKey);
    url.searchParams.append('q', location);
    url.searchParams.append('aqi', 'yes');

    // Perform the fetch request
    const response = await fetch(url.toString(), {
      method: 'GET'
    });

    // Check if the response was successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    // Parse and return the response data
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching current weather:', error);
    return {
      error: `An error occurred while fetching the current weather: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for fetching current weather data.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_current_weather',
      description: 'Fetch the current weather for a specified location.',
      parameters: {
        type: 'object',
        properties: {
          location: {
            type: 'string',
            description: 'The location for which to retrieve the current weather.'
          }
        },
        required: ['location']
      }
    }
  }
};

export { apiTool };