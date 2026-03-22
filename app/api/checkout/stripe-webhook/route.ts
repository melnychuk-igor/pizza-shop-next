import Stripe from 'stripe';
import { prisma } from '@/libs/prisma';
import { OrderStatus } from '@prisma/client';
// import { OrderSuccessTemplate } from '@/shared/components/shared/email-temapltes/order-success';
// import { sendEmail } from '@/shared/lib';
// import { CartItemDTO } from '@/shared/services/dto/cart.dto';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    const signature = req.headers.get('stripe-signature');
    if (!signature) {
      return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
    }

    if (!stripeSecretKey) throw new Error('STRIPE_SECRET_KEY is not set');
    if (!webhookSecret) throw new Error('STRIPE_WEBHOOK_SECRET is not set');

    // Important: Stripe requires the exact raw request body for signature verification.
    const rawBody = await req.text();

    const stripe = new Stripe(stripeSecretKey);
    const event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);

    if (event.type !== 'checkout.session.completed') {
      return NextResponse.json({ received: true });
    }

    const session = event.data.object as Stripe.Checkout.Session;
    const orderIdRaw = session.metadata?.order_id;

    if (!orderIdRaw) {
      return NextResponse.json({ received: true });
    }

    const orderId = Number(orderIdRaw);
    if (!Number.isFinite(orderId)) {
      return NextResponse.json({ received: true });
    }

    const order = await prisma.order.findFirst({
      where: { id: orderId },
    });

    if (!order) {
      return NextResponse.json({ received: true });
    }

    const isSucceeded = session.payment_status === 'paid';

    await prisma.order.update({
      where: { id: order.id },
      data: { status: isSucceeded ? OrderStatus.SUCCEEDED : OrderStatus.CANCELLED },
    });

    // if (isSucceeded) {
    //   const items = JSON.parse(order.items as string) as CartItemDTO[];

    //   await sendEmail(
    //     order.email,
    //     'Next Pizza / Your order has been successfully completed 🎉',
    //     OrderSuccessTemplate({ orderId: order.id, items }),
    //   );
    // }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.log('[Stripe Webhook] Error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

