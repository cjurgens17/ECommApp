

const stripe = require('stripe')(pk_test_51NWLWiAAwBntl43mXvC8ry0BgpMW2cX2dQz2esXN2t33lIInATenOopU9s9HxQREcBJskNLXeKGHq5VNw6FyRhEB00FiIlR8te);
const express = require('express');
const app = express();
app.use(express.static('public'));

const MY_DOMAIN = 'http://localhost:4200';

const product = await stripe.products.create({
  name: 'Valhalla Java',
  description: 'The Viking Coffee',
  image: 'https://m.media-amazon.com/images/I/61BnSZMLBvL._SX679_.jpg'
});

const price = await stripe.prices.create({
  product: `${product}`,
  unit_amount: 10.99,
  currency: 'usd'
});

app.post('/create-checkout-session', async (req,res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        //this will probably be dynaimc from the checkout page
        price: `${price}`,
        quantity: 1
      },
    ],
    mode: 'payment',
    success_url: `${MY_DOMAIN}/success`,
    cancel_url: `${MY_DOMAIN}/cancel`
  });

  res.redirect(303, session.url);
})

app.listen(4200, () => console.log('Running in port 4200'));

