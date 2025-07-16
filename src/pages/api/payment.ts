import type { NextApiRequest, NextApiResponse } from 'next';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { upiId } = req.body;

  try {
    const subscription = await razorpay.subscriptions.create({
      plan_id: 'plan_Qtbe2v0HY52okN',
      customer_notify: 1,
      total_count: 12, // monthly for 1 year
    });

    return res.status(200).json({
      key: process.env.RAZORPAY_KEY_ID,
      subscriptionId: subscription.id,
      email: 'testuser@email.com',
      contact: '9123456789',
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
}
