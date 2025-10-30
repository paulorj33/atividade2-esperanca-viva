/* ===============================
   INTERAÇÕES DO SITE
   =============================== */

document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ Esperança Viva carregado com sucesso!');

  const header = document.querySelector('.site-header');
  const nav = document.querySelector('nav');
  const navList = document.querySelector('nav ul');

  if (!header || !navList) return;

  // Cria o botão hambúrguer (à direita)
  let menuToggle = document.querySelector('.menu-toggle');
  if (!menuToggle) {
    menuToggle = document.createElement('div');
    menuToggle.classList.add('menu-toggle');
    menuToggle.innerHTML = '<span></span><span></span><span></span>';
    header.appendChild(menuToggle);
  }

  // Função para abrir/fechar o menu fora do header
  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation(); // impede conflito de clique
    navList.classList.toggle('ativo');
    menuToggle.classList.toggle('ativo');

    // Reposiciona o menu abaixo do header quando ativo
    if (navList.classList.contains('ativo')) {
      const headerHeight = header.offsetHeight;
      navList.style.top = `${headerHeight}px`;
    } else {
      navList.style.top = '100%';
    }
  });

  // Fecha o menu se clicar fora
  document.addEventListener('click', (e) => {
    if (!header.contains(e.target) && !nav.contains(e.target)) {
      navList.classList.remove('ativo');
      menuToggle.classList.remove('ativo');
    }
  });

  // Dropdown no mobile
  document.querySelectorAll('.dropdown > a').forEach(link => {
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 800) {
        e.preventDefault();
        const parent = link.parentElement;
        parent.classList.toggle('open');
      }
    });
  });

  // Toast (feedback visual)
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Formulário enviado com sucesso!');
      form.reset();
    });
  });
});

/* ===============================
   TOAST – Feedback visual
   =============================== */
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerText = message;
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add('show'), 100);
  setTimeout(() => {
    toast.classList.remove('show');
    toast.remove();
  }, 3000);
}
