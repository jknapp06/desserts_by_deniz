exports.handler = async (event, context) => {
  console.log("Function called!");
  console.log("API Key:", process.env.DESSERTS_SHEET_API ? "✓ Found" : "✗ NOT FOUND");
  
  const apiKey = process.env.DESSERTS_SHEET_API;
  const sheetId = "10Lz86fUeqTrgBTdrjOa02zzM96G6_KhUVhZBbnuu940";
  
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "DESSERTS_SHEET_API environment variable not set" })
    };
  }
  
  try {
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Desserts?key=${apiKey}`
    );
    console.log("Google API Response Status:", response.status);
    
    const text = await response.text();
    console.log("Google API Response (raw):", text.substring(0, 500)); // Log first 500 chars
    
    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: `Google Sheets API returned ${response.status}`, details: text })
      };
    }
    
    const data = JSON.parse(text);
    console.log("Google API Response (parsed):", data);
    
    return {
      statusCode: 200,
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
