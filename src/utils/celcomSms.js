/**
 * Utility to send SMS using Celcom Africa SMS API
 * Endpoint: https://isms.celcomafrica.com/api/services/sendsms/
 */

/**
 * Normalizes phone numbers to standard format (e.g. 0712345678 -> 254712345678)
 */
export function formatPhoneNumber(phone) {
  let cleaned = String(phone).replace(/[\s\-\(\)]/g, "").trim();
  if (cleaned.startsWith("+")) {
    cleaned = cleaned.substring(1);
  }
  if (cleaned.startsWith("07") || cleaned.startsWith("01")) {
    cleaned = "254" + cleaned.substring(1);
  }
  return cleaned;
}

/**
 * Sends SMS via Celcom Africa
 * @param {Object} options
 * @param {string|string[]} options.to - Recipient phone number or array of phone numbers
 * @param {string} options.message - The text message to send
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 */
export async function sendCelcomSms({ to, message }) {
  const apiKey = process.env.CELCOM_API_KEY;
  const partnerID = process.env.CELCOM_PARTNER_ID;
  const shortcode = process.env.CELCOM_SHORTCODE;
  const baseUrl = process.env.CELCOM_BASE_URL || "https://isms.celcomafrica.com/api/services/sendsms/";

  if (!apiKey) {
    throw new Error("CELCOM_API_KEY is not defined in environment variables");
  }

  const recipients = Array.isArray(to) ? to : [to];
  const formattedRecipients = recipients.map(formatPhoneNumber).filter(Boolean);

  if (formattedRecipients.length === 0) {
    throw new Error("No valid recipient phone numbers provided");
  }

  const payload = {
    apikey: apiKey,
    partnerID: partnerID || "",
    shortcode: shortcode || "",
    mobile: formattedRecipients.join(","),
    message: message
  };

  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const responseData = await response.json().catch(() => null);

  if (!response.ok) {
    const errorMsg = responseData?.["response-description"] || responseData?.message || `HTTP ${response.status}`;
    return { success: false, data: responseData, error: errorMsg };
  }

  if (responseData && responseData["response-code"] && responseData["response-code"] !== 1001 && responseData["response-code"] !== 200) {
    return {
      success: false,
      data: responseData,
      error: responseData["response-description"] || "Celcom API returned an error"
    };
  }

  return { success: true, data: responseData };
}

export default sendCelcomSms;
