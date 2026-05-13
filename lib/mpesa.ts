const { MPESA_CONSUMER_KEY, MPESA_CONSUMER_SECRET } = process.env;

export const getMpesaAccessToken = async (): Promise<string> => {
  const auth = Buffer.from(`${MPESA_CONSUMER_KEY}:${MPESA_CONSUMER_SECRET}`).toString("base64");
  const res = await fetch(
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
    { headers: { Authorization: `Basic ${auth}` } }
  );
  const data = await res.json();
  return data.access_token;
};
