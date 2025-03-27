// QR Code Generator
function generateQRCode(elementId, data) {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Elemento ${elementId} não encontrado`);
    return;
  }

  // Limpa o conteúdo anterior se existir
  element.innerHTML = "";

  // Gera o novo QR code
  new QRCode(element, {
    text: data,
    width: 180,
    height: 180,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  });
}

// Gerar QR codes quando o documento carregar
document.addEventListener("DOMContentLoaded", () => {
  // QR Code para WhatsApp
  generateQRCode("whatsapp-qr", "https://wa.me/554498061555");

  // QR Code para GitHub
  generateQRCode("github-qr", "https://github.com/elvishotz");

  // Animar QR codes com GSAP
  const qrCodes = document.querySelectorAll(".qr-code");
  qrCodes.forEach((qr) => {
    gsap.from(qr, {
      scale: 0.5,
      duration: 1,
      ease: "elastic.out(1, 0.5)"
    });
  });
});
