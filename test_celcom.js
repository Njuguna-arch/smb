import 'dotenv/config';
import { sendCelcomSms, formatPhoneNumber } from './src/utils/celcomSms.js';

console.log("========================================");
console.log("    Celcom Africa SMS Test Script       ");
console.log("========================================");

const apiKey = process.env.CELCOM_API_KEY;
const partnerID = process.env.CELCOM_PARTNER_ID;
const shortcode = process.env.CELCOM_SHORTCODE;
const baseUrl = process.env.CELCOM_BASE_URL || 'https://isms.celcomafrica.com/api/services/sendsms/';

console.log(`Endpoint:    ${baseUrl}`);
console.log(`API Key:     ${apiKey ? (apiKey.substring(0, 6) + '...' + apiKey.slice(-4)) : '❌ NOT SET (Please add CELCOM_API_KEY to your .env)'}`);
console.log(`Partner ID:  ${partnerID || '⚠️  NOT SET (Celcom requires partnerID from your dashboard)'}`);
console.log(`Shortcode:   ${shortcode || '⚠️  NOT SET (Celcom requires registered Sender ID/shortcode)'}`);
console.log("----------------------------------------\n");

if (!apiKey) {
  console.error("❌ Error: CELCOM_API_KEY is not configured in .env!");
  console.log("Please open .env and add your Celcom API Key:\n  CELCOM_API_KEY=your_key_here\n");
  process.exit(1);
}

// Get phone number from command line args (default to test dummy if none provided)
const targetPhone = process.argv[2] || "254712345678";
const testMessage = process.argv[3] || "EduSphere Test SMS via Celcom";

console.log(`Testing with:`);
console.log(`  Recipient: ${formatPhoneNumber(targetPhone)}`);
console.log(`  Message:   "${testMessage}"`);
console.log("\nSending request to Celcom API...");

try {
  const result = await sendCelcomSms({
    to: targetPhone,
    message: testMessage
  });

  console.log("\n--- Response from Celcom ---");
  console.log(JSON.stringify(result, null, 2));

  if (result.success) {
    console.log("\n✅ SMS sent successfully!");
  } else {
    console.log(`\n⚠️ Request failed or rejected: ${result.error}`);
    if (result.data?.errors) {
      console.log("Validation details:", result.data.errors);
    }
  }
} catch (err) {
  console.error("\n❌ Request failed with error:", err.message);
}

console.log("\nTip: To test with your actual phone number, run:");
console.log("  node test_celcom.js 0712345678 \"Your test message\"");
