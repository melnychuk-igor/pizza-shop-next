import Stripe from 'stripe';

interface Props {
  description: string;
  orderId: number;
  amount: number; // assumed to be in major currency units (e.g. RUB)
  customerEmail: string;
}

interface StripePaymentData {
  id: string;
  confirmation: { confirmation_url: string };
}

export async function createStripePayment(details: Props): Promise<StripePaymentData> {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const currency = (process.env.STRIPE_CURRENCY ?? 'usd').toLowerCase();
  const successUrl = process.env.STRIPE_SUCCESS_URL;
  const cancelUrl = process.env.STRIPE_CANCEL_URL;

  if (!secretKey) throw new Error('STRIPE_SECRET_KEY is not set');
  if (!successUrl) throw new Error('STRIPE_SUCCESS_URL is not set');
  if (!cancelUrl) throw new Error('STRIPE_CANCEL_URL is not set');

  const stripe = new Stripe(secretKey);

  // Stripe expects the amount in the smallest currency unit (kopeks for usd).
  const unitAmount = Math.round(details.amount * 100);

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    customer_email: details.customerEmail,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: currency as any,
          unit_amount: unitAmount,
          product_data: {
            name: details.description,
          },
        },
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      order_id: String(details.orderId),
    },
  });

  if (!session.url) {
    throw new Error('Stripe session url was not returned');
  }

  return {
    id: session.id,
    confirmation: {
      confirmation_url: session.url,
    },
  };
}

