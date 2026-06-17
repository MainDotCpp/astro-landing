export default function Content() {
  return (
    <>
      <style>
        {`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
          line-height: 1.6;
          color: #333;
          background: #fff;
          padding: 20px;
          max-width: 800px;
          margin: 0 auto;
        }
        h1 {
          font-size: 32px;
          margin-bottom: 20px;
          color: #2c3e50;
        }
        p {
          font-size: 16px;
          margin-bottom: 16px;
          text-align: justify;
        }
        @media (max-width: 600px) {
          h1 {
            font-size: 24px;
          }
          p {
            font-size: 14px;
          }
        }
      `}
      </style>
      <h1>AI基礎</h1>
      <p>
        人工知能（Artificial Intelligence、略称AI）は、コンピュータサイエンスの一分野であり、人間の知能的行動を模倣できるシステムやプログラムを作成することを目的としています。AIの目標は、学習、推論、知覚、意思決定など、通常人間の知能が必要とされるタスクを機械が実行できるようにすることです。
      </p>
      <p>
        AIの核心概念には、機械学習、深層学習、自然言語処理、コンピュータビジョンなどが含まれます。機械学習はAIの重要なサブ分野であり、コンピュータが明示的なプログラミングなしにデータから学習できるようにします。深層学習は機械学習の一分野であり、ニューラルネットワークを使用して人間の脳の働きを模倣します。
      </p>
      <p>
        計算能力の向上とビッグデータの普及により、AI技術は急速に発展しており、医療、教育、交通、金融など、さまざまな分野で大きな可能性を示しています。AIの基礎知識を理解することで、世界を変えつつあるこの技術をより良く理解することができます。
      </p>
    </>
  )
}
