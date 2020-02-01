const fetch = require("node-fetch");
const { BUTTONDOWN_API_KEY } = process.env;

const VALID_CODES = new Set([200, 201]);

exports.handler = async event => {
  const email = event.body;
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

    const body = await response.json();
    if (response && VALID_CODES.has(response.status)) {
      return { statusCode: 200, body: JSON.stringify(body) };
    }
    console.log(response.status);
    console.log("Error: ", body);
    throw Error("There was an error.");
  } catch (error) {
    console.log(error);
    return { statusCode: 500, body: JSON.stringify(error) };
  }
};
