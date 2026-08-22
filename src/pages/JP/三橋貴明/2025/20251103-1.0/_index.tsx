import { CheckCircle2 } from 'lucide-react'
import AvatarImg from '@/assets/avatar/三橋貴明_avatar.png'
import Header from '@/assets/JP/三橋貴明/header_1103.jpg'
import Main from '@/assets/JP/三橋貴明/main_1103.jpg'
import { Card } from '@/components/ui/card'
import './styles.css'

export default function InvestmentCoursePage() {
  return (
    <main className="investment-page">
      {/* Decorative background elements */}
      <div className="decorative-bg">
        <div className="blob1" />
        <div className="blob2" />
      </div>
      {/* Hero Section with Profile */}
      <section className="hero-section">
        <div className="hero-content">
          {/* Profile Avatar */}
          <div className="avatar-container">
            <div className="avatar-glow" />
            <div className="avatar-wrapper">
              <div className="avatar-border">
                <div className="avatar-inner">
                  <img src={AvatarImg.src} alt="三橋貴明" />
                </div>
              </div>
            </div>
            <div className="avatar-outer-border" />
          </div>

          <h1 className="main-title">投資の基礎を学ぶ</h1>
          <p className="subtitle">三橋貴明のオンライン講座</p>

          <p className="description">
            初心者でも安心して学べる投資の基礎知識から実践的なテクニックまで、わかりやすく丁寧に指導します。
          </p>
        </div>
      </section>

      {/* Instructor Introduction Image */}
      <section className="section">
        <div className="section-content">
          <Card className="card-wrapper">
            <div className="card-image">
              <img src={Header.src} alt="講師紹介" className="card-image-inner" />
            </div>
          </Card>
        </div>
      </section>

      {/* Course Benefits */}
      <section className="section">
        <div className="section-content">
          <h2 className="section-title">講座の特徴</h2>
          <div className="benefits-list">
            {[
              '投資の基礎知識を体系的に学習',
              '実践的な投資戦略とテクニック',
              '初心者にもわかりやすい解説',
              'オンラインでいつでも学習可能',
              '個別サポートで安心',
            ].map((benefit, index) => (
              <div key={index} className="benefit-item">
                <CheckCircle2 className="benefit-icon" />
                <span className="benefit-text">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Cover Image */}
      <section className="section">
        <div className="section-content">
          <h2 className="section-title">コース内容</h2>
          <Card className="card-wrapper">
            <div className="card-image">
              <img src={Main.src} alt="コース内容" className="card-image-inner" />
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="section-content">
          <Card className="cta-card">
            <h2 className="cta-title">今すぐ無料相談を受ける</h2>
            <p className="cta-description">
              LINEで気軽にご相談ください。投資に関する疑問や講座の詳細についてお答えします。
            </p>
            <a
              onClick={() => {
                window.onLinkBtnClick()
              }}
              rel="noopener noreferrer"
              className="line-button"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
              </svg>
              LINEで相談する
            </a>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p className="footer-text">© 2025 三橋貴明 投資基礎講座</p>
        </div>
      </footer>
    </main>
  )
}
