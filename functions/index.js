const functions = require("firebase-functions");
const admin = require("firebase-admin");
const Stripe = require("stripe");

admin.initializeApp();
const stripe = new Stripe("sk_test_51N2KiYDpQVHsLbUuRCYgVGWWPEmztAp8H" +
"Ri1gaxsU9iOS3b3t36HPNcQUOrc0R2S44hRtpNVicslxrkh7blhLlxo00CS9vVlak");

exports.createPaymentIntent = functions.https.onRequest(async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).send("Method Not Allowed");
    return;
  }

  try {
    const {amount} = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
    });

    res.json({clientSecret: paymentIntent.client_secret});
  } catch (err) {
    console.error(err);
    res.status(500).json({error: "Failed to create payment intent"});
  }
});
