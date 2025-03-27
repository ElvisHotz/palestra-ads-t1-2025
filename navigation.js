// Navegação apenas por teclado e swipe
document.addEventListener('DOMContentLoaded', () => {
  // Função para atualizar os indicadores (mantida para compatibilidade)
  window.updateIndicators = function() {
    // Função vazia para evitar erros, já que os indicadores foram removidos
  };
});

// Adiciona swipe para dispositivos móveis
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', e => {
  touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50;
  if (touchEndX < touchStartX - swipeThreshold) {
    // Swipe para esquerda (próximo slide)
    nextSlide();
  }
  if (touchEndX > touchStartX + swipeThreshold) {
    // Swipe para direita (slide anterior)
    prevSlide();
  }
}