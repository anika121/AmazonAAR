import { buffer } from "micro";
import * as admin from "firebase-admin";

const serviceAccount = require("../../../permissions.json");

const app = !admin.apps.length
	? admin.initializeApp({
			credential: admin.credential.cert(serviceAccount),
	  })
	: admin.app();

const stripe = require("stripe")("sk_test_51ItxE6Gg6NvF1lJPOsxIgzKy9mftqdKXHhCk7umTH4EAVAMyeVVn3zjVsHSwW7GfRbUPHFfyaIABN2KjScRNjh4V00QOcisehO");

const endpointSecret = "whsec_55cYEryk21yflzzgxz9NgtfGMe8rYKqp";

const fulfillOrder = async (session) => {
	return app
		.firestore()
		.collection("users")
		.doc(session.metadata.email)
		.collection("orders")
		.doc(session.id)
		.set({
			amount: session.amount_total / 100,
			amount_shipping: session.total_details.amount_shipping / 100,
			images: JSON.parse(session.metadata.images),
			timestamp: admin.firestore.FieldValue.serverTimestamp(),
		})
		.then(() => {
			console.log("SUCCESS: Order has been placed!!");
		});
};

export default async (req, res) => {
	if (req.method === "POST") {
		const requestBuffer = await buffer(req);
		const payload = requestBuffer.toString();
		const sig = req.headers["stripe-signature"];

		let event;

		try {
			event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
		} catch (err) {
			return res.status(400).json(`Webhook error ${err.message}`);
		}

		if (event.type === "checkout.session.completed") {
			const session = event.data.object;

			return fulfillOrder(session)
				.then(() => res.status(200))
				.catch((err) =>
					res.status(400).json(`Webhook error ${err.message}`)
				);
		}
	}
};

export const config = {
	api: {
		bodyParser: false,
		externalResolver: true,
	},
};
