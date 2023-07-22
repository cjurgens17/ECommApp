require('dotenv').config();
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// const express = require('express');
// const cors = require('cors');
// const app = express();
// const bodyParser = require('body-parser');
// app.use(cors());
// app.use(express.static('public'));
// app.use(bodyParser.json());

// const MY_DOMAIN = 'http://localhost:4200';

// app.get('/', (req, res) => {
//   res.send('Welcome to My Application'); // Send the welcome text to the view
//   console.log("the server is live!");
// });

// app.post('/create-checkout-session', async (req,res) => {
// try{
//   console.log(req.body);
//   const cartProducts = req.body.products;

//   const lineItems = await cartProducts.map((product) => ({
//     price_data: {
//       currency: 'usd',
//       product_data: {
//         name: product.name,
//         images: [product.image],
//       },
//       unit_amount: parseInt(product.price * 100), //converting to cents for stripe api
//     },
//     quantity: product.quantity,
//   }));

//   const session = await stripe.checkout.sessions.create({
//     line_items: lineItems,
//     mode: 'payment',
//     success_url: `${MY_DOMAIN}/success`,
//     cancel_url: `${MY_DOMAIN}/cancel`
//   });

//   console.log('Stripe Response:', session);
//   res.json({url: session.url})
// } catch (e) {
//   console.error("stripe Post error: ", e);
//   res.status(500).json({ error: 'Error occurred while processing the request.' });
// }
// });

// app.listen(4242, () => console.log('Running in port 4242'));


//connect to heroku
const express = require('express');
const path = require('path');

const app = express();
app.use(express.static('./dist/ecommapplication'));

app.get('/*', (req,res) =>
res.sendFile(path.join(__dirname, 'dist/ecommapplication', 'index.html')),
);

app.listen(process.env.PORT || 8080);


