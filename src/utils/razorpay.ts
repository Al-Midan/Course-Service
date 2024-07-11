import Razorpay from 'razorpay';

// if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
//   throw new Error('RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET must be set in environment variables');
// }

export const razorpayInstance : Razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID||"rzp_test_BKgZJwO5Jn8JWR",
  key_secret: process.env.RAZORPAY_KEY_SECRET||"ZcgdrEif0s64bb9wa2y400Qz",
});