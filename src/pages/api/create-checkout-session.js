const stripe = require("stripe")("sk_test_51ItxE6Gg6NvF1lJPOsxIgzKy9mftqdKXHhCk7umTH4EAVAMyeVVn3zjVsHSwW7GfRbUPHFfyaIABN2KjScRNjh4V00QOcisehO");

export default async (req, res) => {
	const { items, email } = req.body;

	const transformedItems = items.map((item) => ({
		desciption: item.desciption,
		quantity: 1,
		price_data: {
			currency: "usd",
			unit_amount: item.price * 100,
			product_data: {
				name: item.title,
				images: [item.image],
			},
		},
	}));

	const session = await stripe.checkout.sessions.create({
		payment_method_types: ["card"],
		shipping_rates: ["shr_1ItxfMGg6NvF1lJPal7osucF"],
		shipping_address_collection: {
			allowed_countries: ["GB", "US", "CA"],
		},
		line_items: transformedItems,
		mode: "payment",
		success_url: `${process.env.HOST}/success`,
		cancel_url: `${process.env.HOST}/checkout`,
		metadata: {
			email,
			images: JSON.stringify(items.map((item) => item.image)),
		},
	});

	res.status(200).json({ id: session.id });
};
