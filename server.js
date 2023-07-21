

const stripe = require('stripe')('sk_test_51NWLWiAAwBntl43mAAscP0tDxysTzcY6oO8PfCPxpbBmEJVgl9WlJchi0x3pFgycOrtWMW9yCMdoy0jb2Comob3f00Jnz53sLm');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.static('public'));

const MY_DOMAIN = 'http://localhost:4200';

app.get('/', (req, res) => {
  res.send('Welcome to My Application'); // Send the welcome text to the view
  console.log("the server is live!");
});

app.post('/create-checkout-session', async (req,res) => {
try{
  const session = await stripe.checkout.sessions.create({

    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'T-shirt',
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${MY_DOMAIN}/success`,
    cancel_url: `${MY_DOMAIN}/cancel`
  });
  res.redirect(303, session.url);
} catch (e) {
  throw new Error("stripe Post error: ", e.message);
}
})

app.listen(4242, () => console.log('Running in port 4242'));

