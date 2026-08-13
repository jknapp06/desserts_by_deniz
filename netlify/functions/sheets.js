exports.handler = async (event, context) => {
  console.log("Function called!");
  console.log("API Key:", process.env.DESSERTS_SHEET_API ? "✓ Found" : "✗ NOT FOUND");
  
  const apiKey = process.env.DESSERTS_SHEET_API;
  const sheetId = "10Lz86fUeqTrgBTdrjOa02zzM96G6_KhUVhZBbnuu940";
  
  try {
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Desserts?key=${apiKey}`
    );
    console.log("Google API Response Status:", response.status);
    const data = await response.json();
    console.log("Google API Response:", data);
    
    return {
      statusCode: response.status,
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.error("ERROR:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
