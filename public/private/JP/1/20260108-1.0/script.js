// DOM要素の取得
document.addEventListener('DOMContentLoaded', function() {
    // ローディング画面の処理
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(loadingOverlay);

    // ページ読み込み完了後にローディング画面を非表示
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingOverlay.classList.add('hidden');
            setTimeout(() => {
                loadingOverlay.remove();
            }, 500);
        }, 1000);
    });

    // スムーススクロール
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
const headerElement = document.querySelector('.header');
const headerHeight = headerElement ? headerElement.offsetHeight : 0;
const targetPosition = targetSection.offsetTop - headerHeight - 20;

                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // スクロール時のナビゲーションハイライト
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-menu a');

    function updateActiveNav() {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');
            
            if (scrollPos >= top && scrollPos <= bottom) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${id}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // スクロール時の要素表示アニメーション
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);

    // 観察対象の要素を追加
    const animateElements = document.querySelectorAll('.strategy-card, .method-item, .result-card, .timeline-item');
    animateElements.forEach(el => {
        el.classList.add('scroll-reveal');
        observer.observe(el);
    });

// ヘッダーの背景透明度調整
const header = document.querySelector('.header');
function updateHeaderOpacity() {
    // 这个页面没有 .header 的时候，什么都不做，直接返回
    if (!header) return;

    const scrolled = window.scrollY;
    const opacity = Math.min(scrolled / 100, 0.95);
    header.style.background = `rgba(0, 0, 0, ${opacity})`;
}

// 只有真的存在 .header 时，才单独绑定这个监听

    window.addEventListener('scroll', updateHeaderOpacity);

    // 統計数値のカウントアップアニメーション
    function animateCounter(element, start, end, duration) {
        let startTime = null;
        
        function animate(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            
            const current = Math.floor(progress * (end - start) + start);
            element.textContent = current.toLocaleString('ja-JP');
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        }
        
        requestAnimationFrame(animate);
    }

    // 統計セクションが表示されたときにカウントアップを開始
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const text = stat.textContent;
                    let endValue = 0;
                    
                    if (text.includes('25')) endValue = 25;
                    else if (text.includes('800')) endValue = 800;
                    else if (text.includes('2500')) endValue = 2500;
                    
                    if (endValue > 0) {
                        animateCounter(stat, 0, endValue, 2000);
                        statsObserver.unobserve(entry.target);
                    }
                });
            }
        });
    });

    const heroStats = document.querySelector('.hero-stats');
    const resultStats = document.querySelectorAll('.result-stats');
    
    if (heroStats) statsObserver.observe(heroStats);
    resultStats.forEach(stat => statsObserver.observe(stat));

    // パーティクル効果
    function createParticle() {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.background = 'rgba(255, 215, 0, 0.6)';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1';
        
        const startX = Math.random() * window.innerWidth;
        const startY = window.innerHeight + 10;
        const endY = -10;
        const duration = 3000 + Math.random() * 2000;
        
        particle.style.left = startX + 'px';
        particle.style.top = startY + 'px';
        
        document.body.appendChild(particle);
        
        particle.animate([
            { transform: 'translateY(0px)', opacity: 0 },
            { transform: 'translateY(-20px)', opacity: 1, offset: 0.1 },
            { transform: `translateY(${endY - startY}px)`, opacity: 0 }
        ], {
            duration: duration,
            easing: 'linear'
        }).onfinish = () => {
            particle.remove();
        };
    }

    // パーティクルを定期的に生成
    setInterval(createParticle, 500);

    // LINE友だち追加ボタンの特殊効果
    const lineButton = document.querySelector('.btn-line-large');
    if (lineButton) {
        lineButton.addEventListener('click', function() {
            // クリック時のパルス効果
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // 成功メッセージ（実際のLINE追加は外部リンクで処理）
            showNotification('LINE登録ページに移動します...', 'success');
        });
    }

    // 通知システム
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
                <span>${message}</span>
                <button class="notification-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        // 通知のスタイル
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'linear-gradient(135deg, #4CAF50, #45a049)' : 'linear-gradient(135deg, #ffd700, #ffed4e)'};
            color: ${type === 'success' ? '#ffffff' : '#000000'};
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // アニメーション
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // 閉じるボタンの処理
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        });
        
        // 自動で消去
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(400px)';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    // CTAボタンのクリック処理
    const ctaButtons = document.querySelectorAll('.btn-secondary'); // 今はセカンダリボタンのみ処理
    ctaButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (this.textContent.includes('レポート')) {
                e.preventDefault();
                // 分析レポート取得ボタンをクリックした場合、LINE友だち追加セクションにスクロール
const lineSection = document.querySelector('#contact');
if (lineSection) {
    const headerEl = document.querySelector('.header');
    const headerHeight = headerEl ? headerEl.offsetHeight : 0;
    const targetPosition = lineSection.offsetTop - headerHeight - 20;
    
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
                    
                    // スクロール完了後にメッセージを表示とハイライト効果
                    setTimeout(() => {
                        showNotification('分析レポートはLINE友だち追加後に配信されます！', 'success');
                        
                        // LINE セクションをハイライト
                        const lineHeroSection = document.querySelector('.line-hero-section');
                        if (lineHeroSection) {
                            lineHeroSection.style.animation = 'highlight-pulse 2s ease-in-out';
                            
                            // アニメーション終了後にスタイルをリセット
                            setTimeout(() => {
                                lineHeroSection.style.animation = '';
                            }, 2000);
                        }
                    }, 800);
                }
            }
        });
    });

    // LINE登録リンクのクリック処理
    const lineLinks = document.querySelectorAll('a[href="https://www.xiao04.top/JPline04"]');
    lineLinks.forEach(link => {
        link.addEventListener('click', function() {
            showNotification('LINE登録ページに移動します...', 'success');
        });
    });

    // 投資戦略カードのホバー効果
    const strategyCards = document.querySelectorAll('.strategy-card');
    strategyCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // 画像の遅延読み込み
    const images = document.querySelectorAll('img[src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';
                
                const newImg = new Image();
                newImg.onload = () => {
                    img.style.opacity = '1';
                };
                newImg.src = img.src;
                
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // タイピング効果
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // ヒーローセクションのタイトルにタイピング効果を適用
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 80);
        }, 1500);
    }

    // 3D効果
    document.addEventListener('mousemove', function(e) {
        const cards = document.querySelectorAll('.strategy-card, .result-card');
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const cardX = rect.left + rect.width / 2;
            const cardY = rect.top + rect.height / 2;
            
            const deltaX = mouseX - cardX;
            const deltaY = mouseY - cardY;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            
            if (distance < 300) {
                const rotateX = (deltaY / distance) * 5;
                const rotateY = -(deltaX / distance) * 5;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
            } else {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
            }
        });
    });

    // パフォーマンス最適化
    let ticking = false;
    
    function updateOnScroll() {
        updateActiveNav();
        updateHeaderOpacity();
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    });

// エラーハンドリング
window.addEventListener('error', function(e) {
    const err = e.error || e.message || e;
    console.error('JavaScript Error:', err);
    showNotification('申し訳ございません。エラーが発生しました。', 'error');
});


    // レスポンシブ対応
    function handleResize() {
        const isMobile = window.innerWidth <= 768;
        const heroContent = document.querySelector('.hero-content');
        
        if (isMobile && heroContent) {
            heroContent.style.gridTemplateColumns = '1fr';
        } else if (heroContent) {
            heroContent.style.gridTemplateColumns = '1fr 1fr';
        }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize(); // 初期実行

    // キーボードナビゲーション
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // 通知を閉じる
            const notifications = document.querySelectorAll('.notification');
            notifications.forEach(notification => {
                notification.style.transform = 'translateX(400px)';
                setTimeout(() => notification.remove(), 300);
            });
        }
    });

    // アクセシビリティ向上
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #ffd700';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });

    console.log('堀江貴文 株式投資戦略サイトが正常に読み込まれました。');
});
