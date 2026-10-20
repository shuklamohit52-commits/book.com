import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Razorpay from 'razorpay';
import crypto from 'crypto';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use(express.json());

// Razorpay Credentials from environment
const key_id = process.env.RAZORPAY_KEY_ID || process.env.VITE_RAZORPAY_KEY_ID || 'rzp_live_TnILo6UTe9FqSC';
const key_secret = process.env.RAZORPAY_KEY_SECRET || 'lS7GdqB5KWKKXzyhhH5a5h5N';

const razorpay = new Razorpay({
  key_id,
  key_secret,
});

/**
 * STEP 1: BACKEND - Create Order
 * Endpoint: POST /api/create-order
 * Request: { amount (paise), currency, receipt, notes }
 * Return: { order_id, amount, currency }
 * Minimum amount: 100 paise
 */
app.post('/api/create-order', async (req, res) => {
  try {
    const { amount, currency = 'INR', receipt, notes } = req.body;

    const amountInPaise = Math.round(Number(amount));
    if (!amountInPaise || isNaN(amountInPaise) || amountInPaise < 100) {
      return res.status(400).json({
        error: 'Invalid order amount. Minimum amount is 100 paise (₹1).',
      });
    }

    if (!key_id || !key_secret) {
      return res.status(500).json({
        error: 'Razorpay credentials not configured in server environment.',
      });
    }

    const options = {
      amount: amountInPaise,
      currency: currency || 'INR',
      receipt: receipt || `rcpt_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      notes: notes || {},
    };

    const order = await razorpay.orders.create(options);

    return res.status(200).json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
    });
  } catch (error: any) {
    console.error('Razorpay create-order error:', error);
    if (error?.statusCode === 401) {
      return res.status(401).json({ error: 'Razorpay authentication failed' });
    }
    return res.status(500).json({
      error: error?.error?.description || error?.message || 'Failed to create Razorpay order',
    });
  }
});

/**
 * STEP 3: BACKEND - Verify Signature
 * Endpoint: POST /api/verify-payment
 * Algorithm: HMAC-SHA256(order_id + "|" + payment_id, KEY_SECRET)
 * Compare generated signature with razorpay_signature
 * Return success only if signatures match
 */
app.post('/api/verify-payment', (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, metadata } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        error: 'Missing required parameters: razorpay_order_id, razorpay_payment_id, and razorpay_signature are required.',
      });
    }

    if (!key_secret) {
      return res.status(500).json({
        success: false,
        error: 'Server configuration error: Razorpay KEY_SECRET missing.',
      });
    }

    const payload = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac('sha256', key_secret)
      .update(payload)
      .digest('hex');

    const isMatch = expectedSignature === razorpay_signature;

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        error: 'Invalid payment signature. Signature verification failed.',
      });
    }

    console.log(`Payment successfully verified for order ${razorpay_order_id}, payment ${razorpay_payment_id}`);

    return res.status(200).json({
      success: true,
      message: 'Payment signature verified successfully',
      order_id: razorpay_order_id,
      payment_id: razorpay_payment_id,
      metadata: metadata || null,
    });
  } catch (error: any) {
    console.error('Razorpay verify-payment error:', error);
    return res.status(500).json({
      success: false,
      error: error?.message || 'Error occurred during payment signature verification',
    });
  }
});

/**
 * Frontend configuration endpoint (Returns public Key ID only)
 */
app.get('/api/payment-config', (_req, res) => {
  res.json({
    key_id: key_id || '',
  });
});

async function start() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server started on http://0.0.0.0:${PORT}`);
  });
}

start().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
