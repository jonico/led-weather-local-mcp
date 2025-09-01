/**
 * Function to retrieve predefined icons from the LED Name Badge API.
 *
 * @returns {Promise<Array>} - A promise that resolves to an array of predefined icons.
 */
const executeFunction = async () => {
  const url = 'http://localhost:5001/predefined-icons';
  
  try {
    // Perform the fetch request
    const response = await fetch(url, {
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
    console.error('Error retrieving predefined icons:', error);
    return {
      error: `An error occurred while retrieving predefined icons: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for retrieving predefined icons from the LED Name Badge API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_predefined_icons',
      description: 'Retrieve predefined icons from the LED Name Badge API.',
      parameters: {
        type: 'object',
        properties: {},
        required: []
      }
    }
  }
};

export { apiTool };