import PDFDocument from "pdfkit";
import fs from "fs";

const verifyBuffering = async () => {
    try {
        const doc = new PDFDocument({ margin: 50 });
        const chunks = [];
        doc.on("data", (chunk) => chunks.push(chunk));

        doc.fontSize(22).text("Liskan Academy", { align: "center" });
        doc.moveDown();
        doc.end();

        const pdfBuffer = await new Promise((resolve, reject) => {
            doc.on("end", () => resolve(Buffer.concat(chunks)));
            doc.on("error", reject);
        });

        console.log("PDF generated. Size:", pdfBuffer.length, "bytes");

        // Check for PDF signature %PDF- (hex: 25 50 44 46 2d)
        const signature = pdfBuffer.slice(0, 5).toString();
        if (signature === "%PDF-") {
            console.log("Verification Success: Valid PDF signature found.");
            fs.writeFileSync("buffered_test.pdf", pdfBuffer);
        } else {
            console.error("Verification Failed: Invalid PDF signature:", signature);
        }
    } catch (err) {
        console.error("Verification failed:", err);
    }
};

verifyBuffering();
