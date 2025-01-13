import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

// Ensure the invoices directory exists
const INVOICES_DIR = path.join(process.cwd(), 'public', 'invoices');
if (!fs.existsSync(INVOICES_DIR)) {
  fs.mkdirSync(INVOICES_DIR, { recursive: true });
}

export async function generateInvoicePDF(order) {
  return new Promise((resolve, reject) => {
    try {
      // Generate unique filename
      const filename = `invoice-${order._id.toString()}-${Date.now()}.pdf`;
      const filepath = path.join(INVOICES_DIR, filename);

      // Create a document
      const doc = new PDFDocument({ size: 'A4', margin: 50 });
      const stream = fs.createWriteStream(filepath);

      doc.pipe(stream);

      // Company Header
      doc
        .fontSize(20)
        .text('Madhuraj System Solutions', 50, 50)
        .fontSize(10)
        .text('Tax Invoice / Bill of Supply', { align: 'right' })
        .moveDown();

      // Invoice Details
      doc
        .fontSize(10)
        .text(`Invoice Number: ${order._id.toString().slice(-8)}`, { align: 'right' })
        .text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, { align: 'right' })
        .moveDown();

      // Customer Details
      doc
        .fontSize(12)
        .text('Bill To:', 50, 150)
        .fontSize(10)
        .text(order.shippingAddress.fullName, 50, 170)
        .text(order.shippingAddress.addressLine1, 50, 185)
        .text(
          `${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.pincode}`, 
          50, 
          200
        )
        .moveDown();

      // Table Header
      const startY = 250;
      doc
        .text('Item', 50, startY)
        .text('Quantity', 300, startY)
        .text('Price', 400, startY)
        .text('Total', 500, startY)
        .moveTo(50, startY + 15)
        .lineTo(550, startY + 15)
        .stroke();

      // Items
      let currentY = startY + 25;
      order.items.forEach((item, index) => {
        doc
          .text(item.product.name, 50, currentY)
          .text(item.quantity.toString(), 300, currentY)
          .text(`₹${item.price.toLocaleString()}`, 400, currentY)
          .text(`₹${(item.price * item.quantity).toLocaleString()}`, 500, currentY);
        currentY += 20;
      });

      // Total
      doc
        .moveTo(50, currentY + 10)
        .lineTo(550, currentY + 10)
        .stroke()
        .text('Total Amount', 400, currentY + 20)
        .text(`₹${order.totalAmount.toLocaleString()}`, 500, currentY + 20);

      // Finalize PDF
      doc.end();

      stream.on('finish', () => {
        // Return a public URL path to the invoice
        const publicPath = `/invoices/${filename}`;
        resolve(publicPath);
      });

      stream.on('error', (error) => {
        console.error('Stream error:', error);
        reject(error);
      });

    } catch (error) {
      console.error('Invoice generation error:', error);
      reject(error);
    }
  });
}
