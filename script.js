/* global document, window, IntersectionObserver */

const icon = (name) => `<svg class="icon" aria-hidden="true"><use href="#i-${name}"/></svg>`;
const sourcePreview = document.getElementById('stage-visual').innerHTML;
const stages = {
  fonte: {
    number: '01',
    title: 'Tudo começa na fonte.',
    description: 'O Navega coleta anúncios fluviais publicados no Instagram.',
    points: ['Vínculo com a publicação original.', 'Data e contexto preservados.'],
    tech: 'INSTAGRAM · PROCEDÊNCIA',
    code: {
      fonte: 'Instagram',
      original_preservado: true,
      vinculo_com_agencia: false,
    },
    note: 'Estrutura ilustrativa. Nenhuma conexão é realizada por esta página.',
    visual: sourcePreview,
  },
  coleta: {
    number: '02',
    title: 'Guardar o original.',
    description: 'O coletor preserva imagem e metadados para manter o caminho até a fonte.',
    points: [
      'Rotina diária, com autorização e API ligadas.',
      'Reutilizar um arquivo não é fazer nova coleta.',
    ],
    tech: 'COLETOR PYTHON · MONITOR · INTEGRIDADE',
    code: {
      intervalo_horas: 24,
      limite_publicacoes_por_ciclo: 3,
      janela_publicacoes: 100,
      integridade: 'hash do original',
    },
    note: 'Limites documentados em 03/11. A rotina depende de autorização e servidor em execução.',
    visual: `<div class="capture-demo"><span class="mini-label">DA PUBLICAÇÃO AO ARQUIVO</span><div>${icon('image')}<p><strong>Imagem original</strong><small>Preservada para consulta</small></p></div><div>${icon('clock')}<p><strong>Contexto da publicação</strong><small>Fonte e data vinculadas</small></p></div><div>${icon('shield')}<p><strong>Integridade</strong><small>Hash para verificar o arquivo</small></p></div><span>24h entre ciclos · até 3 publicações por ciclo</span></div>`,
  },
  extracao: {
    number: '03',
    title: 'Transformar imagem em campos.',
    description: 'OCR local e leituras de IA já realizadas ajudam a organizar os dados anunciados.',
    points: [
      'Embarcação, rota, dia e horário com evidência.',
      'Chegada e saída são eventos distintos.',
    ],
    tech: 'OCR LOCAL · LEITURAS DE IA · CAMPOS',
    code: {
      embarcacao: 'L/M Cidade de Manaquiri',
      origem: 'Manaus',
      destino: 'Tabatinga',
      dia_mes: '05/10',
      horario_local: '05:00',
      ano: null,
      preco: null,
    },
    note: 'Recorte real da primeira linha do flyer. Não são executados dois modelos a cada coleta.',
    visual: `<div class="field-demo"><span class="mini-label">EXEMPLO HISTÓRICO · PRIMEIRA LINHA</span><div><span>Embarcação</span><b>Cidade de Manaquiri</b></div><div><span>Trajeto</span><b>Manaus → Tabatinga</b></div><div><span>Dia / mês</span><b>05/10</b></div><div><span>Horário</span><b>05:00</b></div><div class="missing"><span>Ano · preço</span><b>Não informados</b></div></div>`,
  },
  qualidade: {
    number: '04',
    title: 'A evidência decide.',
    description:
      'Regras verificam consistência e suficiência antes da liberação. O painel de revisão é opcional.',
    points: [
      'Evidência suficiente: elegível à liberação.',
      'Conflito ou lacuna crítica: reter e se abster.',
    ],
    tech: 'PUBLICAÇÃO SELETIVA · RASTREABILIDADE',
    code: {
      suficiente: 'elegível à liberação automática',
      insuficiente: 'retido; chat se abstém',
      revisao_humana: 'opcional',
      ano_contextual: 'publicação oficial recente do ano corrente; até 90 dias, no mesmo ano',
    },
    note: 'Política de 06/11 implementada e testada com dados sintéticos. Esta página não aprova registros reais.',
    visual: `<div class="quality-demo"><span class="mini-label">DOIS CAMINHOS POSSÍVEIS</span><div>${icon('check')}<p><strong>Evidência suficiente</strong><small>Elegível à liberação automática</small></p></div><div>${icon('alert')}<p><strong>Evidência insuficiente</strong><small>Retido · resposta sem confirmação de viagem</small></p></div><p>Revisão humana disponível como opção.</p></div>`,
  },
  banco: {
    number: '05',
    title: 'Preservar o dado e sua história.',
    description:
      'O PostgreSQL mantém originais, extrações e decisões vinculados. O chat usa apenas registros liberados e suficientes.',
    points: [
      'Histórico preservado nas atualizações.',
      'Sem correspondência suficiente, o chat se abstém.',
    ],
    tech: 'POSTGRESQL · PRISMA · AUDITORIA',
    code: {
      captura: 'vinculada ao original',
      extracao: 'candidato armazenado',
      decisao: 'humana ou automática, identificada',
      chat: 'somente dados liberados e suficientes',
      historico: 'preservado',
    },
    note: 'Modelo conceitual, não SQL ao vivo. Persistência documentada em 03/11; liberação real pela nova política ainda não verificada.',
    visual: `<div class="database-demo">${icon('database')}<strong>PostgreSQL</strong><div class="database-nodes"><span>Original</span><i></i><span>Campos</span><i></i><span>Decisão</span></div><p>Ligados pela procedência.<br/>Armazenar não significa liberar.</p></div>`,
  },
};

function selectStage(key) {
  const stage = stages[key];
  document.querySelectorAll('[data-stage]').forEach((button) => {
    const selected = button.dataset.stage === key;
    button.setAttribute('aria-selected', String(selected));
    button.tabIndex = selected ? 0 : -1;
  });
  document.getElementById('pipeline-panel').setAttribute('aria-labelledby', `tab-${key}`);
  document.getElementById('stage-number').textContent = `ETAPA ${stage.number} / 05`;
  document.getElementById('stage-title').textContent = stage.title;
  document.getElementById('stage-description').textContent = stage.description;
  document.getElementById('stage-points').replaceChildren(
    ...stage.points.map((point) => {
      const item = document.createElement('li');
      item.textContent = point;
      return item;
    }),
  );
  document.getElementById('stage-tech').textContent = stage.tech;
  // These templates are fixed editorial content; no remote or visitor text is interpolated.
  document.getElementById('stage-visual').innerHTML = stage.visual;
  document.getElementById('stage-code').textContent = JSON.stringify(stage.code, null, 2);
  document.getElementById('code-note').textContent = stage.note;
}

function bindTabs(selector, dataKey, select) {
  const narrow = window.matchMedia('(max-width: 700px)');
  const tablist = document.querySelector('.pipeline-tabs');
  const updateOrientation = () =>
    tablist.setAttribute('aria-orientation', narrow.matches ? 'vertical' : 'horizontal');
  narrow.addEventListener('change', updateOrientation);
  updateOrientation();
  const tabs = [...document.querySelectorAll(selector)];
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => select(tab.dataset[dataKey]));
    tab.addEventListener('keydown', (event) => {
      let next;
      if (event.key === (narrow.matches ? 'ArrowDown' : 'ArrowRight'))
        next = (index + 1) % tabs.length;
      if (event.key === (narrow.matches ? 'ArrowUp' : 'ArrowLeft'))
        next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next === undefined) return;
      event.preventDefault();
      select(tabs[next].dataset[dataKey]);
      tabs[next].focus();
    });
  });
}
bindTabs('[data-stage]', 'stage', selectStage);
selectStage('fonte');

const map = document.querySelector('.map-topography');
const mapMarkers = [...map.querySelectorAll('[data-location]')];
const mapDetail = document.getElementById('map-detail');
const mapRoute = document.getElementById('map-travel-path');
const mapBranch = map.querySelector('.map-branch');
const mapBoat = map.querySelector('.map-boat');
const mapToggle = document.querySelector('.map-animation-toggle');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

mapMarkers.forEach((marker) => {
  marker.addEventListener('click', () => {
    map.querySelector('[aria-pressed="true"]').setAttribute('aria-pressed', 'false');
    marker.setAttribute('aria-pressed', 'true');
    mapDetail.querySelector('strong').textContent = marker.querySelector('.map-name').textContent;
    mapDetail.querySelector('span').textContent =
      marker.dataset.detail ?? 'Integra a rota-base do catálogo.';
  });
});

function drawMap() {
  const bounds = map.getBoundingClientRect();
  const centers = mapMarkers.map((marker) => {
    const pin = marker.querySelector('.map-pin').getBoundingClientRect();
    return {
      x: Math.round(pin.left + pin.width / 2 - bounds.left),
      y: Math.round(pin.top + pin.height / 2 - bounds.top),
    };
  });
  const [origin, ...stops] = centers.slice(0, -1);
  const route = stops.reduce((path, stop, index) => {
    const previous = centers[index];
    if (stop.y === previous.y) {
      const bend = (index % 2 === 0 ? -1 : 1) * Math.min(19, (stop.y + 8) / 4);
      const midpoint = (stop.x + previous.x) / 2;
      return `${path} C${midpoint},${previous.y + bend} ${midpoint},${stop.y + bend} ${stop.x},${stop.y}`;
    }
    const turn = previous.x < bounds.width / 2 ? -25 : 25;
    return `${path} C${previous.x + turn},${previous.y} ${stop.x + turn},${stop.y} ${stop.x},${stop.y}`;
  }, `M${origin.x},${origin.y}`);
  const benjamin = centers.at(-3);
  const atalaia = centers.at(-1);
  const branchMiddle = (benjamin.y + atalaia.y) / 2;
  mapBranch.setAttribute(
    'd',
    `M${benjamin.x},${benjamin.y} C${benjamin.x - 34},${branchMiddle} ${atalaia.x - 34},${branchMiddle} ${atalaia.x},${atalaia.y}`,
  );
  mapRoute.setAttribute('d', route);
  mapBoat.style.offsetPath = `path("${route}")`;
}

drawMap();
map.classList.add('map-ready');
new window.ResizeObserver(drawMap).observe(map);

function updateMapMotion() {
  mapToggle.hidden = reducedMotion.matches;
}
updateMapMotion();
reducedMotion.addEventListener('change', updateMapMotion);
mapToggle.addEventListener('click', () => {
  const paused = mapBoat.classList.toggle('is-paused');
  mapToggle.textContent = paused ? 'Retomar simulação' : 'Pausar simulação';
});

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.getElementById('navigation');
function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menu');
  navigation.classList.remove('is-open');
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  navigation.classList.toggle('is-open', open);
});
navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});
document.addEventListener('click', (event) => {
  if (!event.target.closest('.nav-wrap')) closeMenu();
});

if ('IntersectionObserver' in window) {
  const navLinks = [...navigation.querySelectorAll('a')];
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      navLinks.forEach((link) => {
        if (link.hash === `#${visible.target.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    },
    { rootMargin: '-15% 0px -45% 0px', threshold: [0, 0.1, 0.3] },
  );
  navLinks.forEach((link) => observer.observe(document.querySelector(link.hash)));
}

let printDetails = [];
// Include editorial details in PDF, then restore their original state.
window.addEventListener('beforeprint', () => {
  printDetails = [...document.querySelectorAll('details')].filter((item) => !item.open);
  printDetails.forEach((item) => {
    item.open = true;
  });
});
window.addEventListener('afterprint', () => {
  printDetails.forEach((item) => {
    item.open = false;
  });
  printDetails = [];
});
document.getElementById('print-button').addEventListener('click', () => window.print());

const chatExample = document.getElementById('chat-example');
const chatExampleButton = document.getElementById('run-chat-example');
chatExampleButton.addEventListener('click', () => {
  chatExample.hidden = !chatExample.hidden;
  chatExampleButton.setAttribute('aria-expanded', String(!chatExample.hidden));
  chatExampleButton.querySelector('span').textContent = chatExample.hidden
    ? 'Simular viagem'
    : 'Reiniciar simulação';
});

const flyerDialog = document.getElementById('evidence-flyer-dialog');
const flyerImage = document.getElementById('evidence-flyer-image');
document.getElementById('open-evidence-flyer').addEventListener('click', () => {
  document.getElementById('evidence-dialog-image').src = flyerImage.src;
  flyerDialog.showModal();
});

// Chapter links retain a direct MP4 fallback when JavaScript is unavailable.
const presentationVideo = document.getElementById('navega-presentation');
const presentationStatus = document.getElementById('presentation-status');
document.querySelectorAll('[data-video-time]').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const seconds = Number(link.dataset.videoTime);
    const seek = () => {
      presentationVideo.currentTime = seconds;
      presentationVideo.play().catch(() => {
        presentationStatus.textContent = 'Capítulo selecionado. Use o botão de reprodução do vídeo.';
      });
    };
    if (presentationVideo.readyState >= 1) seek();
    else {
      presentationVideo.addEventListener('loadedmetadata', seek, { once: true });
      presentationVideo.load();
    }
    presentationStatus.textContent = 'Capítulo: ' + link.textContent.trim();
    presentationVideo.scrollIntoView({ block: 'center', behavior: 'auto' });
    presentationVideo.focus({ preventScroll: true });
  });
});
presentationVideo.addEventListener('error', () => {
  presentationStatus.textContent = 'Não foi possível reproduzir. Use o link para baixar o MP4 ou leia o roteiro abaixo.';
});
