let clickId = '';
let lineStr = '';

const japaneseStocks = [
  { code: "7203", name: "トヨタ自動車" },
  { code: "9984", name: "ソフトバンクグループ" },
  { code: "6758", name: "ソニーグループ" },
  { code: "6861", name: "キーエンス" },
  { code: "9433", name: "KDDI" },
  { code: "8306", name: "三菱UFJフィナンシャル・グループ" },
  { code: "9432", name: "日本電信電話" },
  { code: "4063", name: "信越化学工業" },
  { code: "6367", name: "ダイキン工業" },
  { code: "7974", name: "任天堂" },
  { code: "6501", name: "日立製作所" },
  { code: "8316", name: "三井住友フィナンシャルグループ" },
  { code: "4519", name: "中外製薬" },
  { code: "9983", name: "ファーストリテイリング" },
  { code: "4568", name: "第一三共" },
  { code: "6594", name: "日本電産" },
  { code: "8035", name: "東京エレクトロン" },
  { code: "4502", name: "武田薬品工業" },
  { code: "7267", name: "ホンダ" },
  { code: "8001", name: "伊藤忠商事" },
  { code: "6981", name: "村田製作所" },
  { code: "4661", name: "オリエンタルランド" },
  { code: "9613", name: "NTTデータグループ" },
  { code: "8058", name: "三菱商事" },
  { code: "3382", name: "セブン&アイ・ホールディングス" },
  { code: "2914", name: "日本たばこ産業" },
  { code: "7751", name: "キヤノン" },
  { code: "8031", name: "三井物産" },
  { code: "6902", name: "デンソー" },
  { code: "6273", name: "SMC" }
];

function createJpStockCascade() {
  const container = document.getElementById('jpStockCascade');
  
  if (!container) {
    console.warn('JP Stock cascade container not found');
    return;
  }
  
  // 清空容器
  container.innerHTML = '';
  
  const containerWidth = container.offsetWidth;
  
  for (let i = 0; i < 40; i++) {
    const stock = japaneseStocks[Math.floor(Math.random() * japaneseStocks.length)];
    const ticker = document.createElement('div');
    ticker.classList.add('jp-stock-ticker');
    
    // 随机生成股价变化
    const changeValue = (Math.random() * 6 - 3).toFixed(2);
    const isPositive = parseFloat(changeValue) > 0;
    
    if (isPositive) {
      ticker.classList.add('positive');
    } else if (parseFloat(changeValue) < 0) {
      ticker.classList.add('negative');
    }
    
    // 设置动画属性
    const duration = Math.random() * 6 + 6; // 6-12秒
    const delay = 0; // 立即开始动画，无延迟
    const leftPosition = Math.random() * (containerWidth - 200);
    const randomOpacity = 0.3 + Math.random() * 0.7; // 0.3-1.0透明度
    const initialTopPosition = Math.random() * window.innerHeight; // 随机初始垂直位置
    
    ticker.style.animationDuration = `${duration}s`;
    ticker.style.animationDelay = `${delay}s`;
    ticker.style.left = `${leftPosition}px`;
    ticker.style.top = `${initialTopPosition}px`;
    ticker.style.opacity = randomOpacity;
    
    // 创建内容
    const codeSpan = document.createElement('span');
    codeSpan.textContent = stock.code;
    codeSpan.style.fontWeight = 'bold';
    
    const nameSpan = document.createElement('span');
    nameSpan.textContent = ` ${stock.name}`;
    nameSpan.style.fontSize = '0.9em';
    nameSpan.style.marginLeft = '6px';
    
    const changeSpan = document.createElement('span');
    changeSpan.textContent = ` ${changeValue > 0 ? '+' : ''}${changeValue}%`;
    changeSpan.style.marginLeft = '8px';
    changeSpan.style.fontWeight = 'bold';
    
    ticker.appendChild(codeSpan);
    ticker.appendChild(nameSpan);
    ticker.appendChild(changeSpan);
    container.appendChild(ticker);
  }
}

function initTestimonialCarousel() {
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.carousel-dot');
  let currentSlide = 0;
  const slideCount = slides.length;
  function showSlide(index) {
    slides.forEach(slide => {
      slide.classList.remove('active');
    });
    dots.forEach(dot => {
      dot.classList.remove('active');
    });
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
  }
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const slideIndex = parseInt(dot.getAttribute('data-index'));
      showSlide(slideIndex);
    });
  });
  setInterval(() => {
    const nextSlide = (currentSlide + 1) % slideCount;
    showSlide(nextSlide);
  }, 5000);
}

function getUrlParams() {
  const params = {};
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  for (const [key, value] of urlParams.entries()) {
    params[key] = value;
  }
  return params;
}

async function sendInitialRequest() {
  const loadingOverlay = document.getElementById('loadingOverlay');
  if (loadingOverlay) {
    loadingOverlay.classList.add('hidden');
  }
  // const params = getUrlParams();
  // try {
  //   const response = await fetch(`/api/pasthome?${new URLSearchParams(params).toString()}`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   });
  //   if (response.status === 200) {
  //     const data = await response.json();
  //     if (data.code === 200 && data.msg === "success") {
  //       clickId = data.clickId;
  //       document.getElementById('loadingOverlay').classList.add('hidden');
  //     }
  //   }
  // } catch (error) {}
}

async function handleLineButtonClick() {
  gtag_report_conversion();
  // try {
  //   const response = await fetch(`/newApi/clickBtn?clickId=${clickId}`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   });
  //   if (response.status === 200) {
  //     const data = await response.json();
  //     if (data.data && data.data.redirectUrl) {
  //       lineStr = data.data.redirectUrl;
  //       gtag_report_conversion(`/contact/open.html?lineStr=${lineStr}`);
  //     }
  //   }
  // } catch (error) {}
}

function runProgressAnimation() {
  const progressBar = document.getElementById('progressBar');
  const progressText = document.getElementById('progressText');
  const progressPercentage = document.getElementById('progressPercentage');
  const analysisProgress = document.getElementById('analysisProgress');
  const analysisComplete = document.getElementById('analysisComplete');
  const steps = [
    { icon: 'step1Icon', text: 'step1Text', message: 'データ収集中...' },
    { icon: 'step2Icon', text: 'step2Text', message: 'テクニカル分析実行中...' },
    { icon: 'step3Icon', text: 'step3Text', message: 'ファンダメンタル分析中...' },
    { icon: 'step4Icon', text: 'step4Text', message: 'AI予測モデル適用中...' },
    { icon: 'step5Icon', text: 'step5Text', message: 'レポート生成中...' }
  ];
  let progress = 0;
  const interval = setInterval(() => {
    progress += 1;
    progressBar.style.width = `${progress}%`;
    progressPercentage.textContent = `${progress}%`;
    if (progress >= 20) {
      document.getElementById(steps[0].icon).classList.remove('text-gray-300');
      document.getElementById(steps[0].icon).classList.add('text-aiBlue');
      document.getElementById(steps[0].text).classList.remove('text-gray-500');
      document.getElementById(steps[0].text).classList.add('text-gray-800');
    }
    if (progress >= 40) {
      document.getElementById(steps[1].icon).classList.remove('text-gray-300');
      document.getElementById(steps[1].icon).classList.add('text-aiBlue');
      document.getElementById(steps[1].text).classList.remove('text-gray-500');
      document.getElementById(steps[1].text).classList.add('text-gray-800');
      progressText.textContent = steps[1].message;
    }
    if (progress >= 60) {
      document.getElementById(steps[2].icon).classList.remove('text-gray-300');
      document.getElementById(steps[2].icon).classList.add('text-aiBlue');
      document.getElementById(steps[2].text).classList.remove('text-gray-500');
      document.getElementById(steps[2].text).classList.add('text-gray-800');
      progressText.textContent = steps[2].message;
    }
    if (progress >= 80) {
      document.getElementById(steps[3].icon).classList.remove('text-gray-300');
      document.getElementById(steps[3].icon).classList.add('text-aiBlue');
      document.getElementById(steps[3].text).classList.remove('text-gray-500');
      document.getElementById(steps[3].text).classList.add('text-gray-800');
      progressText.textContent = steps[3].message;
    }
    if (progress >= 95) {
      document.getElementById(steps[4].icon).classList.remove('text-gray-300');
      document.getElementById(steps[4].icon).classList.add('text-aiBlue');
      document.getElementById(steps[4].text).classList.remove('text-gray-500');
      document.getElementById(steps[4].text).classList.add('text-gray-800');
      progressText.textContent = steps[4].message;
    }
    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        analysisProgress.classList.add('hidden');
        analysisComplete.classList.remove('hidden');
      }, 100);
    }
  }, 50);
}

document.addEventListener('DOMContentLoaded', () => {
  createJpStockCascade();
  initTestimonialCarousel();
  sendInitialRequest();
  const analyzeBtn = document.getElementById('analyzeBtn');
  const stockInput = document.getElementById('stockInput');
  const modal = document.getElementById('analysisModal');
  const closeModal = document.getElementById('closeModal');
  const stockName = document.getElementById('stockName');
  const lineBtn = document.getElementById('lineBtn');
  
  if (analyzeBtn && stockInput && modal && closeModal && stockName) {
    analyzeBtn.addEventListener('click', () => {
    const inputValue = stockInput.value.trim();
    stockName.textContent = inputValue || '銘柄';
    // gtag('event', 'Bdd');
    document.getElementById('analysisProgress').classList.remove('hidden');
    document.getElementById('analysisComplete').classList.add('hidden');
    document.getElementById('progressBar').style.width = '0%';
    document.getElementById('progressPercentage').textContent = '0%';
    for (let i = 1; i <= 5; i++) {
      document.getElementById(`step${i}Icon`).classList.remove('text-aiBlue');
      document.getElementById(`step${i}Icon`).classList.add('text-gray-300');
      document.getElementById(`step${i}Text`).classList.remove('text-gray-800');
      document.getElementById(`step${i}Text`).classList.add('text-gray-500');
    }
    modal.classList.remove('hidden');
    runProgressAnimation();
    });
    closeModal.addEventListener('click', () => {
      modal.classList.add('hidden');
    });
  }
  
  if (lineBtn) {
    lineBtn.addEventListener('click', handleLineButtonClick);
  }
});