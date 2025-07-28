import { CheckCircle, Clock, MessageCircle, Shield, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function LineLandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageCircle className="h-8 w-8 text-green-500" />
              <h1 className="text-2xl font-bold text-gray-900">ビジネス相談室</h1>
            </div>
            <Button className="bg-green-500 hover:bg-green-600">今すぐLINE追加</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            無料でプロの
            <span className="text-green-500">ビジネス相談</span>
            を受けませんか？
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            経験豊富なビジネスコンサルタントが、あなたの事業成長をサポートします。
            <br />
            LINEで気軽に相談できる、新しいビジネス支援サービスです。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" className="bg-green-500 hover:bg-green-600 text-lg px-8 py-4">
              <MessageCircle className="mr-2 h-5 w-5" />
              LINE友達追加で今すぐ相談
            </Button>
            <p className="text-sm text-gray-500">※完全無料・登録不要</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">なぜLINEビジネス相談室が選ばれるのか？</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Clock className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <CardTitle>24時間対応</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  いつでもLINEでメッセージを送信可能。忙しいあなたのスケジュールに合わせて対応します。
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <CardTitle>専門家チーム</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  各分野の専門家が在籍。マーケティング、財務、人事など幅広い相談に対応できます。
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Shield className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <CardTitle>完全無料</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  基本的な相談は完全無料。まずは気軽にご相談いただき、価値を実感してください。
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">提供サービス</h3>
          <div className="space-y-6">
            {[
              '事業戦略・マーケティング戦略の立案',
              '新規事業開発のアドバイス',
              '資金調達・投資に関する相談',
              '組織運営・人材育成の支援',
              'デジタル化・DX推進のサポート',
              '海外展開・グローバル戦略',
            ].map((service, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                <span className="text-lg text-gray-700">{service}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">お客様の声</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-600 mb-4">
                  "LINEで気軽に相談できるのが本当に便利です。新規事業の立ち上げで悩んでいましたが、的確なアドバイスをいただき、売上が3倍になりました。"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                  <div>
                    <p className="font-semibold">田中様</p>
                    <p className="text-sm text-gray-500">IT企業経営者</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-600 mb-4">
                  "資金調達で困っていた時、こちらのサービスを利用しました。専門的なアドバイスのおかげで、希望額の調達に成功できました。"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                  <div>
                    <p className="font-semibold">佐藤様</p>
                    <p className="text-sm text-gray-500">スタートアップ創業者</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-green-500">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl font-bold text-white mb-6">今すぐ無料相談を始めませんか？</h3>
          <p className="text-xl text-green-100 mb-8">LINE友達追加するだけで、すぐに専門家に相談できます</p>
          <Button size="lg" className="bg-white text-green-500 hover:bg-gray-100 text-lg px-8 py-4">
            <MessageCircle className="mr-2 h-5 w-5" />
            LINE友達追加（無料）
          </Button>
          <p className="text-sm text-green-100 mt-4">※しつこい営業は一切ありません</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">ビジネス相談室</h4>
              <p className="text-gray-400">あなたのビジネス成長を全力でサポートします。</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">サービス</h4>
              <ul className="space-y-2 text-gray-400">
                <li>事業戦略相談</li>
                <li>マーケティング支援</li>
                <li>資金調達サポート</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">お問い合わせ</h4>
              <p className="text-gray-400">
                LINE: @business-support
                <br />
                営業時間: 24時間対応
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 ビジネス相談室. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
