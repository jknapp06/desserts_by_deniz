// Define menu structure (we'll populate this from the sheet)
const menu = {
  Celebration: {},
  SomethingToBring: {},
  JustBecause: {}
};

// Fetch data from Google Sheets
async function loadMenuData() {
  try {
    // Replace with your actual sheet ID and API key
    const sheetId = "10Lz86fUeqTrgBTdrjOa02zzM96G6_KhUVhZBbnuu940";
    const apiKey = window.DESSERTS_SHEET_API || "YOUR_API_KEY"; // Will use Netlify env var

    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1?key=${apiKey}`
    );

    if (!response.ok) throw new Error("Failed to fetch sheet data");

    const data = await response.json();
    const rows = data.values;

    // Skip header row
    rows.slice(1).forEach(row => {
      const [
        occasion,
        category,
        item,
        description,
        size,
        baseCost,
        laborHours,
        hourlyRate,
        totalPrice,
        notes
      ] = row;

      // Initialize category if it doesn't exist
      if (!menu[occasion]) menu[occasion] = {};
      if (!menu[occasion][category]) menu[occasion][category] = [];

      // Add item to menu
      menu[occasion][category].push({
        name: `${item} (${size})`,
        baseCost: parseFloat(baseCost),
        laborHours: parseFloat(laborHours),
        hourlyRate: parseFloat(hourlyRate),
        total: parseFloat(totalPrice),
        description
      });
    });

    console.log("Menu loaded:", menu);
  } catch (error) {
    console.error("Error loading menu:", error);
    // Fallback to hardcoded data if API fails
    menu.Celebration = {
      Cake: [
        { name: "Chocolate Cake (6-inch)", baseCost: 30, laborHours: 0.5, total: 47.50, description: "Rich chocolate cake" },
        { name: "Chocolate Cake (8-inch)", baseCost: 50, laborHours: 1, total: 85.00, description: "Rich chocolate cake" }
      ]
    };
  }
}

// Initialize menu when page loads
document.addEventListener('DOMContentLoaded', loadMenuData);
