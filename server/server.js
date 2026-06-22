require("dotenv").config();

const express = require("express");
const axios = require("axios");
const cors = require("cors");
const jsforce = require("jsforce");

const app = express();

app.use(cors());
app.use(express.json());

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI =
  "https://salesforce-metadata-manager.vercel.app";

// LOGIN API
app.post("/token", async (req, res) => {
  try {
    const { code } = req.body;

    const response = await axios.post(
      "https://login.salesforce.com/services/oauth2/token",
      new URLSearchParams({
        grant_type: "authorization_code",
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        code,
      }),
      {
        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded",
        },
      }
    );

    console.log("TOKEN SUCCESS");

    res.json(response.data);
  } catch (error) {
    console.log("TOKEN ERROR");
    console.log(
      error.response?.data || error.message
    );

    res.status(500).json(
      error.response?.data || {
        error: error.message,
      }
    );
  }
});

// GET VALIDATION RULES
app.get("/validation-rules", async (req, res) => {
  try {
    const accessToken =
      req.headers.authorization?.split(" ")[1];

    const instanceUrl =
      req.headers.instanceurl;

    const response = await axios.get(
      `${instanceUrl}/services/data/v62.0/tooling/query`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          q: "SELECT Id, ValidationName, Active FROM ValidationRule",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.log(
      error.response?.data || error.message
    );

    res.status(500).json(
      error.response?.data || {
        error: error.message,
      }
    );
  }
});

// DEPLOY RULE API
app.post("/deploy-rule", async (req, res) => {
  try {
    const {
      accessToken,
      instanceUrl,
      ruleName,
      active,
    } = req.body;

    const conn = new jsforce.Connection({
      instanceUrl,
      accessToken,
    });

    console.log("==============");
    console.log("DEPLOY REQUEST");
    console.log("Rule:", ruleName);
    console.log("Active:", active);
    console.log("==============");

    // Real Metadata API deployment would go here

   try {
  const metadata = await conn.metadata.read(
    "ValidationRule",
    `Account.${ruleName}`
  );

  metadata.active = active;

  const result = await conn.metadata.update(
    "ValidationRule",
    metadata
  );

  console.log("METADATA UPDATE RESULT");
  console.log(result);

  res.json({
    success: true,
    message: `${ruleName} updated successfully`,
    result,
  });

} catch (err) {
  console.log(err);

  res.status(500).json({
    success: false,
    error: err.message,
  });
}
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

app.listen(3000, () => {
  console.log(
    "Server running on port 3000"
  );
});