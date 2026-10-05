/**
 * Utility to send SMS using Celcom Africa SMS API
 * Endpoint: https://isms.celcomafrica.com/api/services/sendsms/
 */

/**
 * Normalizes phone numbers to standard Kenyan international format
 * Examples:
 *   0729504716 -> 254729504716
 *   0112831405 -> 254112831405
 *   729504716  -> 254729504716
 *   +254729504716 -> 254729504716
 */
export function formatPhoneNumber(phone) {
  let cleaned = String(phone).replace(/[\s\-\(\)\.]/g, "").trim();
  if (cleaned.startsWith("+")) {
    cleaned = cleaned.substring(1);
  }
  if (cleaned.startsWith("07") || cleaned.startsWith("01")) {
    cleaned = "254" + cleaned.substring(1);
  } else if (/^[71]\d{8}$/.test(cleaned)) {
    cleaned = "254" + cleaned;
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
  const apiKey = process.env.CELCOM_API_KEY || "124309f610521606b8d82bd240e7e0a6";
  const partnerID = process.env.CELCOM_PARTNER_ID || "1374";
  const shortcode = process.env.CELCOM_SHORTCODE || "LISKANJOY";
  const baseUrl = process.env.CELCOM_BASE_URL || "https://isms.celcomafrica.com/api/services/sendsms/";

  if (!apiKey) {
    throw new Error("CELCOM_API_KEY is not defined in environment variables or defaults");
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
    message: message,
    pass_type: "plain"
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

  // Check top-level response code if present
  if (responseData && responseData["response-code"] && responseData["response-code"] !== 1001 && responseData["response-code"] !== 200) {
    return {
      success: false,
      data: responseData,
      error: responseData["response-description"] || "Celcom API returned an error"
    };
  }

  // Check responses array if present
  if (responseData && Array.isArray(responseData.responses)) {
    const allFailed = responseData.responses.length > 0 && responseData.responses.every(
      (r) => r["response-code"] && r["response-code"] !== 200 && r["response-code"] !== 1001
    );
    if (allFailed) {
      return {
        success: false,
        data: responseData,
        error: responseData.responses[0]?.["response-description"] || "SMS delivery rejected by Celcom Africa"
      };
    }
  }

  return { success: true, data: responseData };
}

export default sendCelcomSms;

