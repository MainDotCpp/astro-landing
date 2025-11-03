import { CheckCircle2 } from 'lucide-react'
import AvatarImg from '@/assets/avatar/三橋貴明_avatar.png'
import Header from '@/assets/JP/三橋貴明/header_1103.jpg'
import Main from '@/assets/JP/三橋貴明/main_1103.jpg'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { mixinJump } from '@/utils/jump'

export default function InvestmentCoursePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-primary/10 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-primary/3 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-primary/2 rounded-full blur-3xl" />
      </div>
      {/* Hero Section with Profile */}
      <section className="px-4 pt-8 pb-6 relative z-10">
        <div className="max-w-md mx-auto text-center">
          {/* Profile Avatar */}
          <div className="mb-4 relative inline-block">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 via-primary/20 to-primary/10 blur-xl opacity-60 -z-10" />
            <div className="relative w-28 h-28 mx-auto">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/50 via-primary/40 to-primary/30 p-[3px]">
                <div className="w-full h-full rounded-full bg-background overflow-hidden">
                  <img
                    src={AvatarImg.src}
                    alt="三橋貴明"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="absolute inset-0 rounded-full border-2 border-primary/20 pointer-events-none" />
          </div>

          <h1 className="text-3xl font-bold mb-2 text-balance bg-gradient-to-r from-primary via-primary/90 to-primary/80 bg-clip-text text-transparent">投資の基礎を学ぶ</h1>
          <p className="text-lg text-primary/90 font-medium mb-4">三橋貴明のオンライン講座</p>

          <p className="text-base text-foreground/70 leading-relaxed mb-6">
            初心者でも安心して学べる投資の基礎知識から実践的なテクニックまで、わかりやすく丁寧に指導します。
          </p>
        </div>
      </section>

      {/* Instructor Introduction Image */}
      <section className="px-4 pb-6 relative z-10">
        <div className="max-w-md mx-auto">
          <Card className="overflow-hidden border-2 border-transparent bg-gradient-to-br from-white via-primary/5 to-primary/10 p-[2px] py-0 shadow-lg shadow-primary/10">
            <div className="overflow-hidden rounded-[calc(0.75rem-2px)]">
              <img src={Header.src} alt="講師紹介" className="w-full h-auto object-cover" />
            </div>
          </Card>
        </div>
      </section>

      {/* Course Benefits */}
      <section className="px-4 pb-6 relative z-10">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center bg-gradient-to-r from-foreground via-primary/80 to-foreground bg-clip-text text-transparent">講座の特徴</h2>
          <div className="space-y-3">
            {[
              '投資の基礎知識を体系的に学習',
              '実践的な投資戦略とテクニック',
              '初心者にもわかりやすい解説',
              'オンラインでいつでも学習可能',
              '個別サポートで安心',
            ].map((benefit, index) => (
              <div
                key={index}
                className="flex items-start gap-3 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 p-3 rounded-lg border-l-4 border-primary/40 hover:shadow-md hover:shadow-primary/10 transition-all duration-300 group"
              >
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-foreground/90 text-sm leading-relaxed font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Cover Image */}
      <section className="px-4 pb-6 relative z-10">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center bg-gradient-to-r from-foreground via-primary/80 to-foreground bg-clip-text text-transparent">コース内容</h2>
          <Card className="overflow-hidden border-2 border-transparent bg-gradient-to-br from-white via-primary/5 to-primary/10 p-[2px] py-0 shadow-lg shadow-primary/10">
            <div className="overflow-hidden rounded-[calc(0.75rem-2px)]">
              <img src={Main.src} alt="コース内容" className="w-full h-auto object-cover" />
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 pb-8 relative z-10">
        <div className="max-w-md mx-auto">
          <Card className="bg-gradient-to-br from-primary/10 via-primary/8 to-primary/5 border-primary/30 p-6 shadow-xl shadow-primary/10">
            <h2 className="text-xl font-bold mb-3 text-center text-balance bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">今すぐ無料相談を受ける</h2>
            <p className="text-sm text-foreground/80 mb-5 text-center leading-relaxed">
              LINEで気軽にご相談ください。投資に関する疑問や講座の詳細についてお答えします。
            </p>
            <Button
              size="lg"
              className="w-full text-base font-semibold h-12 bg-gradient-to-r from-[#06C755] to-[#05B34A] hover:from-[#05B34A] hover:to-[#049e41] text-white shadow-lg shadow-[#06C755]/30 hover:shadow-xl hover:shadow-[#06C755]/40 transition-all duration-300 hover:scale-[1.02]"
              asChild
            >
              <a
                href="javascript:void(0)"
                onClick={() => {
                  mixinJump()
                }}
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                </svg>
                LINEで相談する
              </a>
            </Button>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-6 border-t border-primary/20 bg-gradient-to-br from-background to-primary/5 relative z-10">
        <div className="max-w-md mx-auto text-center">
          <p className="text-sm text-foreground/60">© 2025 三橋貴明 投資基礎講座</p>
        </div>
      </footer>
    </main>
  )
}
