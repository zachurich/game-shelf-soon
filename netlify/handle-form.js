require("dotenv").config();
const fetch = require("node-fetch");
const { BUTTONDOWN_API_KEY } = process.env;
exports.handler = async event => {
  const { email } = JSON.parse(event.body).payload;
  console.log(`Recieved an email address: ${email}`);
  try {
    const response = await fetch("https://api.buttondown.email/v1/subscribers", {
      method: "POST",
      headers: {
        Authorization: `Token ${BUTTONDOWN_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
    });

    console.log("Response: ", response.json());
    return response.json();
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify(error) };
  }
};
