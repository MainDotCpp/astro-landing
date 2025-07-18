import { Award, CheckCircle, Clock, MessageCircle, Phone, Shield, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function KoreanFinancialLanding() {
  const handleKakaoTalkClick = () => {
    // In a real implementation, this would open Kakao Talk
    window.open('https://open.kakao.com/your-channel-link', '_blank')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">전문 금융 규획 지도</h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed">
            35세 이상 성인을 위한 맞춤형 투자 및 은퇴 계획 상담
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <div className="flex items-center gap-2 text-lg">
              <CheckCircle className="h-6 w-6 text-green-400" />
              <span>무료 상담</span>
            </div>
            <div className="flex items-center gap-2 text-lg">
              <Users className="h-6 w-6 text-green-400" />
              <span>1:1 맞춤 서비스</span>
            </div>
            <div className="flex items-center gap-2 text-lg">
              <Shield className="h-6 w-6 text-green-400" />
              <span>개인정보 보호</span>
            </div>
          </div>
          <Button
            onClick={handleKakaoTalkClick}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-xl px-8 py-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            <MessageCircle className="mr-3 h-6 w-6" />
            카카오톡으로 무료 상담받기
          </Button>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-slate-800">
            왜 지금 금융 계획이 중요할까요?
          </h2>
          <p className="text-xl text-center mb-16 text-slate-600 max-w-3xl mx-auto leading-relaxed">
            변화하는 경제 환경 속에서 안정적인 미래를 위한 체계적인 금융 계획이 필수입니다
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 border-blue-100 hover:border-blue-300 transition-colors duration-300">
              <CardContent className="p-8 text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-800">투자 포트폴리오 구성</h3>
                <p className="text-lg text-slate-600 leading-relaxed">
                  개인의 위험 성향과 목표에 맞는 다양한 투자 상품 조합으로 안정적인 수익 추구
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-100 hover:border-green-300 transition-colors duration-300">
              <CardContent className="p-8 text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-800">은퇴 자금 계획</h3>
                <p className="text-lg text-slate-600 leading-relaxed">
                  현재 나이와 목표 은퇴 시기를 고려한 체계적인 노후 자금 마련 전략 수립
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-100 hover:border-purple-300 transition-colors duration-300">
              <CardContent className="p-8 text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-800">리스크 관리</h3>
                <p className="text-lg text-slate-600 leading-relaxed">
                  예상치 못한 상황에 대비한 보험 및 비상 자금 계획으로 가족의 안전 보장
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Expert Introduction Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800">전문가 소개</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              10년 이상의 경험을 바탕으로 고객 맞춤형 금융 솔루션을 제공합니다
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="order-2 lg:order-1">
              <div className="bg-white p-8 rounded-2xl shadow-xl">
                <h3 className="text-2xl font-bold mb-6 text-slate-800">선대인 금융 전문가</h3>
                <div className="space-y-4 text-lg text-slate-700 leading-relaxed">
                  <p>
                    <span className="font-semibold text-blue-600">✓ 국제공인재무설계사 (CFP)</span>
                    <br />
                    국제적으로 인정받는 최고 수준의 재무설계 자격 보유
                  </p>
                  <p>
                    <span className="font-semibold text-green-600">✓ 10년+ 금융업계 경력</span>
                    <br />
                    대형 금융기관 및 독립 자문사에서의 풍부한 실무 경험
                  </p>
                  <p>
                    <span className="font-semibold text-purple-600">✓ 1,000명+ 고객 상담</span>
                    <br />
                    다양한 연령대와 자산 규모의 고객 포트폴리오 관리 경험
                  </p>
                  <p>
                    <span className="font-semibold text-orange-600">✓ 맞춤형 솔루션</span>
                    <br />
                    개인별 상황과 목표에 최적화된 금융 계획 수립 전문
                  </p>
                </div>

                <div className="mt-8 p-6 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-bold text-lg mb-2 text-slate-800">서비스 철학</h4>
                  <p className="text-slate-700 leading-relaxed">
                    "복잡한 금융 상품을 쉽게 이해할 수 있도록 설명하고, 고객의 인생 목표에 맞는 실현 가능한 계획을 함께
                    만들어갑니다."
                  </p>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative">
                <img
                  src="/images/expert-profile.jpg"
                  alt="선대인 금융 전문가 프로필"
                  className="w-full rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-4 rounded-xl shadow-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold">10+</div>
                    <div className="text-sm">년 경력</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Success Story Highlight */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-2xl shadow-lg">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-slate-800">실제 성공 사례</h3>
                <div className="space-y-3 text-lg text-slate-700">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>
                      체계적인 투자 전략으로
                      {' '}
                      <strong className="text-green-600">월 수익률 12% 달성</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>
                      맞춤형 포트폴리오 구성으로
                      {' '}
                      <strong className="text-blue-600">안정적 수익 실현</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span>
                      단기간 내
                      {' '}
                      <strong className="text-purple-600">목표 수익 달성 가능</strong>
                    </span>
                  </div>
                </div>
                <p className="mt-4 text-slate-600 italic">"30초만 투자하면 내일의 수익 종목을 확인할 수 있습니다"</p>
              </div>
              <div className="text-center">
                <img
                  src="/images/expert-marketing.jpg"
                  alt="투자 성공 사례"
                  className="w-full max-w-md mx-auto rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-slate-800">
            신뢰할 수 있는 전문 서비스
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-slate-800">전문 자격 및 인증</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold">
                    CFP
                  </div>
                  <div>
                    <p className="font-semibold text-lg">국제공인재무설계사 (CFP)</p>
                    <p className="text-slate-600">국제적으로 인정받는 최고 수준의 재무설계 자격</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold">
                    FP
                  </div>
                  <div>
                    <p className="font-semibold text-lg">재무설계사 (FP)</p>
                    <p className="text-slate-600">한국 금융투자협회 공인 재무설계 전문가</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold">
                    10+
                  </div>
                  <div>
                    <p className="font-semibold text-lg">10년 이상 경력</p>
                    <p className="text-slate-600">다양한 고객의 성공적인 금융 계획 수립 경험</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6 text-slate-800">고객 만족도</h3>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="text-center mb-6">
                  <div className="text-5xl font-bold text-blue-600 mb-2">98%</div>
                  <p className="text-xl text-slate-600">고객 만족도</p>
                </div>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <p className="text-lg italic text-slate-700">
                      "복잡했던 투자 계획을 쉽게 이해할 수 있도록 설명해주셔서 감사합니다."
                    </p>
                    <p className="text-sm text-slate-500 mt-2">- 김○○님 (42세)</p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <p className="text-lg italic text-slate-700">"은퇴 후 생활에 대한 불안이 많이 줄어들었어요."</p>
                    <p className="text-sm text-slate-500 mt-2">- 박○○님 (38세)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-900 to-slate-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">지금 바로 무료 상담을 시작하세요</h2>
          <p className="text-xl mb-8 text-blue-100 leading-relaxed">
            카카오톡으로 간편하게 상담 예약하고 맞춤형 금융 계획을 받아보세요
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. 카카오톡 상담</h3>
              <p className="text-blue-100">편리한 메신저로 언제든 문의</p>
            </div>
            <div className="text-center">
              <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. 맞춤 분석</h3>
              <p className="text-blue-100">개인 상황에 맞는 전문 분석</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. 계획 수립</h3>
              <p className="text-blue-100">실행 가능한 금융 계획 제공</p>
            </div>
          </div>

          <Button
            onClick={handleKakaoTalkClick}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-2xl px-12 py-6 rounded-full shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            <MessageCircle className="mr-4 h-8 w-8" />
            지금 무료 상담 시작하기
          </Button>

          <p className="mt-6 text-blue-200 text-lg">✓ 상담료 무료 ✓ 개인정보 보호 ✓ 부담 없는 상담</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">전문 금융 상담</h3>
              <p className="text-slate-300 leading-relaxed">35세 이상 성인을 위한 맞춤형 금융 계획 서비스</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4">서비스</h4>
              <ul className="space-y-2 text-slate-300">
                <li>• 투자 포트폴리오 구성</li>
                <li>• 은퇴 자금 계획</li>
                <li>• 리스크 관리</li>
                <li>• 세금 최적화</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4">연락처</h4>
              <div className="space-y-2 text-slate-300">
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  <span>카카오톡 상담</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  <span>전화 상담 가능</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>평일 9:00-18:00</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 전문 금융 상담. 모든 권리 보유.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
