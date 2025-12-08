// ===================================
// FAQ アコーディオン効果
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // 現在のFAQ項目を切り替え
            const isActive = item.classList.contains('active');
            
            // 他のすべてのFAQ項目を閉じる
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // 現在の項目がアクティブでない場合、アクティブにする
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});

// 固定CTAボタンは常に表示され、スクロール監視は不要

// ===================================
// 株式ティッカーアニメーション効果
// ===================================
function updateTicker() {
    const tickerItems = document.querySelectorAll('.ticker-item');
    
    tickerItems.forEach(item => {
        const value = item.querySelector('.ticker-value');
        const change = item.querySelector('.ticker-change');
        
        if (!value || !change) return;
        
        // 小さな変動をランダムに生成（デモ効果のみ）
        const currentValue = parseFloat(value.textContent.replace(',', ''));
        const variation = (Math.random() - 0.5) * 5; // ±2.5の変動
        const newValue = (currentValue + variation).toFixed(2);
        
        // 値動き率を計算
        const changeValue = variation.toFixed(2);
        const changePercent = ((variation / currentValue) * 100).toFixed(2);
        
        // 表示を更新
        value.textContent = parseFloat(newValue).toLocaleString('ja-JP', {minimumFractionDigits: 2});
        
        // 値動き状態を更新
        if (variation > 0) {
            value.classList.remove('down');
            value.classList.add('up');
            change.classList.remove('down');
            change.classList.add('up');
            change.textContent = `+${changeValue} (+${changePercent}%)`;
        } else if (variation < 0) {
            value.classList.remove('up');
            value.classList.add('down');
            change.classList.remove('up');
            change.classList.add('down');
            change.textContent = `${changeValue} (${changePercent}%)`;
        }
        
        // 点滅アニメーションを追加
        value.style.animation = 'none';
        setTimeout(() => {
            value.style.animation = 'tickerFlash 0.5s ease';
        }, 10);
    });
}

// 点滅アニメーションスタイルを追加
const style = document.createElement('style');
style.textContent = `
    @keyframes tickerFlash {
        0% { opacity: 1; }
        50% { opacity: 0.6; }
        100% { opacity: 1; }
    }
`;
document.head.appendChild(style);

// 5秒ごとにティッカーを更新（デモ効果のみ）
setInterval(updateTicker, 5000);

// ===================================
// スムーズスクロール効果
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===================================
// オブザーバーAPI - 要素がビューに入ったときにアニメーションを追加
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(30px)';
            entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// アニメーションが必要な要素を観察
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll(
        '.feature-item, .testimonial-card, .schedule-card, .faq-item'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});

// ===================================
// パフォーマンス最適化：画像の遅延読み込み（実際の画像がある場合）
// ===================================
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // 遅延読み込みをサポートしていないブラウザの場合、Intersection Observerを使用
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    const lazyImages = document.querySelectorAll('img.lazy');
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================================
// コンソール出力（開発者情報）
// ===================================
console.log('%c日本株式投資学習コミュニティ', 'color: #1A535C; font-size: 20px; font-weight: bold;');
console.log('%c教育目的の非営利コミュニティです', 'color: #B08B59; font-size: 14px;');
console.log('%c投資勧誘および銘柄推薦を行いません', 'color: #DC3545; font-size: 12px;');

