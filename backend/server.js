const cors = require("cors");
const express = require("express");
const axios = require("axios"); // Import axios
const bodyParser = require("body-parser"); // For Express < 4.16.0

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
// Middleware
app.use(bodyParser.json()); // For Express < 4.16.0
// For Express >= 4.16.0 use: app.use(express.json());

// Route for handling POST requests
app.post("/submit-info", async (req, res) => {
  console.log("Received data:", req.body);
  jsonRequest = JSON.stringify(req.body);
  console.log(jsonRequest);
  let data = JSON.stringify({
    text: [jsonRequest],
    allow_entity_types: [],
    restrict_entity_types: [],
    return_entities: true,
    vault_id: "<VAULT ID>",
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://<VAULT URL>/v1/detect/text",
    headers: {
      "X-SKYFLOW-ACCOUNT-ID": "<ACCOUNT ID>",
      "Content-Type": "application/json",
      Authorization:
        "Bearer <BEARER TOKEN>",
    },
    data: data,
  };

  try {
    const response = await axios.request(config);
    // console.log("External API response:", response.data);
    sensitive_data = response.data["entities"];
    // Respond to the original client request
    res.status(200).json({
      message: "Sensitive data identified!",
      externalApiResponse: sensitive_data,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
  // Here, you'd typically validate the data and save it to a database
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
