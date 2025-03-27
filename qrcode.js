// QR Code Generator
function generateQRCode(elementId, data) {
  new QRCode(document.getElementById(elementId), {
    text: data,
    width: 180,
    height: 180,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });
}

// Gerar QR codes quando o documento carregar
document.addEventListener('DOMContentLoaded', () => {
  // QR Code para WhatsApp
  generateQRCode('whatsapp-qr', 'https://wa.me/5547999999999');
  
  // QR Code para GitHub
  generateQRCode('github-qr', 'https://github.com/elvishotz');

  // Animar QR codes com GSAP
  const qrCodes = document.querySelectorAll('.qr-code');
  qrCodes.forEach(qr => {
    gsap.from(qr, {
      opacity: 0,
      scale: 0.5,
      duration: 1,
      ease: "elastic.out(1, 0.5)",
      scrollTrigger: {
        trigger: qr,
        start: "top center"
      }
    });
  });
});