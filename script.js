const slides = document.querySelectorAll('.slide');
let current = 0;

// Configuração de animações GSAP
gsap.config({
  nullTargetWarn: false
});

// Função para animar elementos dentro do slide
function animateSlideContent(slide) {
  const tl = gsap.timeline();
  
  // Animação específica para o slide1
  if (slide.id === 'slide1') {
    // Título com efeito de typing
    const title = slide.querySelector('h1');
    gsap.set(title, { opacity: 0, scale: 0.8 });
    tl.to(title, {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "elastic.out(1, 0.5)"
    });
    
    // Parágrafos com entrada suave da esquerda
    const paragraphs = slide.querySelectorAll('p');
    paragraphs.forEach((p, i) => {
      gsap.set(p, { opacity: 0, x: -50 });
      tl.to(p, {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: "power2.out"
      }, ">-0.3");
    });
    
    // Lista com efeito bounce
    const listItems = slide.querySelectorAll('li');
    listItems.forEach((item, i) => {
      gsap.set(item, { opacity: 0, y: 30 });
      tl.to(item, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "back.out(1.7)"
      }, ">-0.2");
    });
  } else {
    // Animação padrão para outros slides
    const elements = slide.querySelectorAll('h1, h2, p, pre, a');
    gsap.set(elements, { opacity: 0, y: 20 });
    elements.forEach((el, i) => {
      tl.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
      }, i * 0.2);
    });
  }
  
  return tl;
}

function showSlide(index) {
  // Timeline principal
  const mainTl = gsap.timeline();
  
  slides.forEach((slide, i) => {
    if (i === index) {
      // Entrada do slide atual com efeito de zoom
      mainTl.to(slide, { 
        opacity: 1, 
        scale: 1,
        y: 0, 
        duration: 0.8, 
        ease: "power2.out",
        display: 'flex' 
      });
      
      // Anima o conteúdo do slide após ele aparecer
      mainTl.add(animateSlideContent(slide));
    } else if (slide.style.opacity !== "0") {
      // Saída do slide anterior com efeito de desvanecimento
      mainTl.to(slide, { 
        opacity: 0, 
        scale: 0.8,
        y: -30, 
        duration: 0.5, 
        ease: "power2.in",
        display: 'none' 
      }, 0); // Começa ao mesmo tempo que a animação principal
    }
  });
}

function nextSlide() {
  current = (current + 1) % slides.length;
  showSlide(current);
  // Atualiza os indicadores se a função existir
  if (typeof updateIndicators === 'function') {
    updateIndicators();
  }
}

function prevSlide() {
  current = (current - 1 + slides.length) % slides.length;
  showSlide(current);
  // Atualiza os indicadores se a função existir
  if (typeof updateIndicators === 'function') {
    updateIndicators();
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') nextSlide();
  if (e.key === 'ArrowLeft') prevSlide();
});

window.onload = () => showSlide(current);

// 🌗 Dark mode toggle
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  document.body.classList.toggle('light-mode');
});
