import { jump } from '@/utils/jump'
import img8 from './static/picture/1d76c479-e315-40bd-8f02-f7db79eff89f.jpg'
import img1 from './static/picture/1e583aab351ae1560153a416a8c3ff7.jpg'
import img3 from './static/picture/9bb7ff8b58e50eb3673e90cffdd0ae1.jpg'
import img9 from './static/picture/428f7e5aab2f1b56c27b780f6eb564e.jpg'
import img2 from './static/picture/73746cd0e44d0576830793a96109619.jpg'
import img4 from './static/picture/a7299e8830c5977810712c051a53ed1.jpg'
import img6 from './static/picture/d8d77f83-1a49-4bee-967b-1608ce7fb479.jpg'
import img7 from './static/picture/d727b1ce0fe06944f1617057be6c24e.jpg'
import img5 from './static/picture/ebd01cd9-7e87-4b2a-ba55-a9a4673af8b8.jpg'
import kakaoBtn from './static/picture/kk-ast0107.png'

export default function Body() {
  return (
    <>
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#f8fafc',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        fontSize: '24px',
      }}
      >
        <div style={{
          margin: '0 auto',
          lineHeight: '1.6',
        }}
        >
          <style>
            {`
            @media (max-width: 768px) {
              .responsive-container {
                padding: 16px !important;
              }
              .responsive-text {
                font-size: 22px !important;
              }
              .responsive-heading {
                font-size: 32px !important;
              }
              .responsive-button {
                padding: 12px 24px !important;
                font-size: 18px !important;
              }
            }
            @media (max-width: 414px) {
              .responsive-text {
                font-size: 24px !important;
                line-height: 1.8 !important;
              }
              .responsive-heading {
                font-size: 34px !important;
                line-height: 1.3 !important;
              }
              .responsive-button {
                font-size: 20px !important;
                padding: 14px 28px !important;
              }
              h2 {
                font-size: 30px !important;
              }
              .warning-text {
                font-size: 20px !important;
              }
              .content-text {
                font-size: 22px !important;
              }
            }
          `}
          </style>
          <main style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            overflow: 'hidden',
            marginTop: '20px',
            marginBottom: '20px',
          }}
          >
            <div style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '2174/1000',
              overflow: 'hidden',
            }}
            >
              <img
                src={img1.src}
                alt="경제학자 김영익 소개"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '12px 12px 0 0',
                }}
              />
            </div>
            <div
              className="responsive-container"
              style={{
                backgroundColor: 'white',
              }}
            >
              <div
                className="responsive-text"
                style={{
                  fontSize: '28px',
                  lineHeight: '1.7',
                  color: '#374151',
                  marginBottom: '24px',
                }}
              >
                안녕하세요 저는 김영익 대한민국의 경제학자입니다. 한강의 기적을 이룬 대한민국! 빠른 경제 성장과
                동시에 한국의 인당 국민소득은 매우 높아졌지만 빈부 격차는 점점 더 심각해지고 있습니다.물가는
                지속적으로 상승하지만 우리들의 월급은 어떻습니까? 팍팍해지는현실의 벽 앞에 누구나 할 것 없이 힘든
                시기를 보내고 있습니다. 청년들은 연애와 결혼을 포기하고 심지어 일자리도 구하지 못하고 있습니다.
                부모들은 죽어라 일하면서 스스로의 가정을 지키기에 급급한 처지입니다. 우리는 여기서 결단을
                내려야합니다. 더 이상은 노동으로 벌어 들이는수입으로는 살아 갈수 없음을요. 그래서 저는 오직
                주식투자만이 유일한 탈출구라 믿고 열심히 공부하여 전문투자자가 되었고, 공부한지 2년만에 300억이란
                돈을 벌었습니다. 여러분도 하실 수 있습니다.
              </div>
            </div>

            <div style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '2174/1000',
              overflow: 'hidden',
              margin: '24px 0',
            }}
            >
              <img
                src={img2.src}
                alt="주식투자 안내"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '8px',
                }}
              />
            </div>
            <div style={{
              padding: '20px 32px',
              backgroundColor: '#fef3c7',
              border: '2px solid #f59e0b',
              borderRadius: '8px',
              margin: '24px 0',
            }}
            >
              <div
                className="warning-text"
                style={{
                  fontSize: '22px',
                  color: '#92400e',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span style={{ fontSize: '24px' }}>⚠️</span>
                <span>특별안내: 유료로 그룹 가입을 요구하는것은 모두 사기입니다.</span>
              </div>
            </div>
            <div style={{
              backgroundColor: 'white',
            }}
            >
              <h1
                className="responsive-heading"
                style={{
                  fontSize: '38px',
                  fontWeight: '700',
                  lineHeight: '1.4',
                  color: '#1f2937',
                  marginBottom: '24px',
                  textAlign: 'left',
                }}
              >
                어떤 투자를 하더라도 경제에 대한 기본지식, 경제흐름에 대한 이해가 전제돼있어야 합니다.
              </h1>
              <p style={{
                fontSize: '24px',
                lineHeight: '1.7',
                color: '#4b5563',
                marginBottom: '32px',
              }}
              >
                싫든좋든간에 어쩔수 없이 자본주의를 살아가야 하는 우리에게 재테크 공부는 선택이 아닌 필수라고 생각합니다. 방법이 있다는 전제하에 주식투자로 얻는 수익은 힘들게 출근해 얻은 월급의 수십, 수백배입니다.
              </p>
              <div style={{
                backgroundColor: '#f9fafb',
                borderRadius: '8px',
                borderLeft: '4px solid #3b82f6',
              }}
              >
                <p style={{
                  fontSize: '22px',
                  lineHeight: '1.6',
                  color: '#374151',
                  margin: 0,
                }}
                >
                  사람은 항상 출근할 수 없습니다. 현재의 곤경에서 벗어나기 위해 무언가를 해야합니다. 그렇지 않으면 당신이 늙었을 때 당신은 계속 일할 수 있습니까? 직장에서의 급여는 가족과 함께 살기에 충분합니까?
                </p>
              </div>

              <div style={{
                backgroundColor: '#dcfce7',
                borderRadius: '12px',
                border: '2px solid #16a34a',
                margin: '32px 0',
              }}
              >
                <h2 style={{
                  fontSize: '28px',
                  fontWeight: '700',
                  color: '#15803d',
                  margin: '0 0 16px 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
                >
                  <span>🔥</span>
                  유명 증권 애널리스트들과 공동으로 무료 주식 커뮤니티를 구축했습니다
                </h2>
                <p style={{
                  fontSize: '24px',
                  lineHeight: '1.6',
                  color: '#166534',
                  margin: 0,
                  fontWeight: '500',
                }}
                >
                  주식투자를 통해 대한민국 국민이라면 누구나 얻을 수 있는 수익을 창출하며 대한민국 금융시장 경제를 활성화하고 국민의 삶의 질과 행복을 높이는 것이 저희의 목표입니다.
                </p>
              </div>

              <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                margin: '32px 0',
              }}
              >
                <div style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '2174/1000',
                  overflow: 'hidden',
                  margin: '24px 0',
                }}
                >
                  <img
                    src={img3.src}
                    alt="매니저 소개 및 카카오톡 안내"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '8px',
                    }}
                  />
                </div>
                <div style={{
                  backgroundColor: '#fef3c7',
                  borderRadius: '8px',
                  border: '2px solid #f59e0b',
                  margin: '24px 0',
                }}
                >
                  <div style={{
                    fontSize: '22px',
                    color: '#92400e',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px',
                  }}
                  >
                    <span style={{ fontSize: '24px', flexShrink: 0 }}>⚠️</span>
                    <span>
                      매니저 카카오톡 추가하려면 아래 버튼을 클릭하세요! "7"을 보내주시면 2월에 급등한 주식종목 3개를 보내드립니다! 오늘 선착순 300명의 투자자가 제 투자커뮤니티의 VIP 회원이 되시며, 각 투자자는 1:1 상담기회를 받으실 수 있습니다.
                    </span>
                  </div>
                </div>
                <a
                  onClick={jump}
                  className="link-btn"
                  style={{
                    display: 'inline-block',
                    backgroundColor: '#fee500',
                    color: '#3c1e1e',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    fontWeight: '700',
                    fontSize: '26px',
                    textAlign: 'center',
                    border: '2px solid #f9cc00',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    transition: 'all 0.3s ease',
                    width: '100%',
                    marginBottom: '16px',
                  }}
                >
                  <img src={kakaoBtn.src} alt="" width="2174" height="1000" className="img-flex" />
                </a>
                <div style={{
                  backgroundColor: '#f0f9ff',
                  borderRadius: '12px',
                  border: '2px solid #0ea5e9',
                  margin: '24px 0',
                }}
                >
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                  }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                    }}
                    >
                      <span style={{ fontSize: '24px', flexShrink: 0 }}>🔥</span>
                      <p style={{
                        margin: 0,
                        fontSize: '22px',
                        lineHeight: '1.6',
                        color: '#0c4a6e',
                      }}
                      >
                        1주일만에 1000만원에서 수억원의 수익을 만드신 회원도 이미 있습니다. 작년 12월말까지 회원의 절반 이상이 주간 목표율 400%를 달성했습니다.
                      </p>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                    }}
                    >
                      <span style={{ fontSize: '24px', flexShrink: 0 }}>🔥</span>
                      <p style={{
                        margin: 0,
                        fontSize: '22px',
                        lineHeight: '1.6',
                        color: '#0c4a6e',
                      }}
                      >
                        지난주에 제가 추천한 주식종목이 420% 상승했습니다. 주식을 통해 조기은퇴가 가능합니다. 제 재산 300억이 그 증거입니다.
                      </p>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                    }}
                    >
                      <span style={{ fontSize: '24px', flexShrink: 0 }}>🔥</span>
                      <p style={{
                        margin: 0,
                        fontSize: '22px',
                        lineHeight: '1.6',
                        color: '#0c4a6e',
                        fontWeight: '600',
                      }}
                      >
                        38,000명이 넘는 사람들이 무료로 혜택을 받고 있습니다. 선착순 300명만 받습니다!
                      </p>
                    </div>
                  </div>
                </div>
                <img
                  src={img4.src}
                  alt="매니저 사진 및 소개"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '8px',
                  }}
                />
                <div style={{ padding: '10px', fontSize: '24px', fontWeight: 700, color: '#374151' }}>
                  사진 속의 매니저는 저의 조수입니다. 연세대학교 경영학과 출신으로 훌륭한 애널리스트이자 현재 제 투자
                  단톡방에서 매니저를 맡고 있습니다. 저는 일이 너무 바빠서 매니저의 카카오톡을 추가하시면 저의
                  커뮤니티에 가입할수 있습니다 .커뮤니티에 가입한 신규회원님은 무료로 3개의 우량주를 받을수가 있습니다
                  .저는 매일 회원님들과 커뮤니티에서 소통하고 만날것입니다 우리의 만남을 기대합니다 !
                </div>
                <div style={{
                  backgroundColor: '#fef3c7',
                  padding: '20px',
                  borderRadius: '8px',
                  border: '2px solid #f59e0b',
                  margin: '24px 0',
                }}
                >
                  <div style={{
                    fontSize: '22px',
                    color: '#92400e',
                    fontWeight: '600',
                    lineHeight: '1.6',
                  }}
                  >
                    <div style={{ marginBottom: '12px' }}>
                      <span style={{ fontSize: '24px' }}>⚠️</span>
                      {' '}
                      매니저 카카오톡 추가하려면 아래 버튼을 클릭하세요! "
                      <span style={{ color: '#e74c3c', fontWeight: '800' }}>7</span>
                      "을 보내주시면 2월에 급등한 주식종목 3개를 보내드립니다!
                    </div>
                    <div style={{ marginBottom: '12px' }}>
                      <span style={{ fontSize: '24px' }}>⚠️</span>
                      {' '}
                      카카오톡 친구추가 후 메세지를 보내주시면 자세한 이벤트 내용을 안내해드리겠습니다.
                    </div>
                    <div>
                      <span style={{ fontSize: '24px' }}>⚠️</span>
                      {' '}
                      주의사항: 유료로 그룹 가입을 요구하는 것은 모두 사기입니다.
                    </div>
                  </div>
                </div>
                <a onClick={jump} className="link-btn">
                  <img
                    src={kakaoBtn.src}
                    alt=""
                    width="2174"
                    height="1000"
                    className="img-flex"
                  />
                </a>
                <p style={{
                  textAlign: 'center',
                }}
                >
                  <h2 style={{
                    fontSize: '32px',
                    fontWeight: '700',
                    color: '#1f2937',
                    marginBottom: '32px',
                  }}
                  >
                    무엇을 얻어갈 수 있나요?
                  </h2>
                  <img
                    src={img5.src}
                    alt="특별 혜택 안내"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '8px',
                    }}
                  />
                  <img
                    src={img6.src}
                    alt="추가 혜택 안내"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '8px',
                    }}
                  />
                  <div
                    style={{ backgroundColor: '#2b2b2b', color: '#fff', padding: '0 22px 22px', marginTop: '-1px', fontSize: '22px', lineHeight: '1.6' }}
                  >
                    저희가 주최하는 오프라인 전문지식 강의와 온라인 금융강좌를 무료로 수강하실 수 있습니다.
                  </div>
                  <img
                    src={img7.src}
                    alt="기술적 분석 및 전략"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '8px',
                    }}
                  />
                  <div style={{
                    textAlign: 'center',
                    fontSize: '28px',
                    margin: '24px 0',
                    color: '#3b82f6',
                  }}
                  >
                    ↓
                  </div>
                  <div style={{
                    backgroundColor: '#f8fafc',
                    borderRadius: '8px',
                    margin: '24px 0',
                    lineHeight: '1.7',
                    fontSize: '22px',
                  }}
                  >
                    저는 주식 시장에 대한 몇 가지 중요한 통찰력을 공유하고 싶습니다.
                    <br />
                    1: 시장은 변동성이 크며 더 이상 인내심을 갖고 연구하고 기다릴 시간이 없습니다.
                    <br />
                    2: 정보가 부족합니다. 대부분의 사람들은 정확한 시장 정보를 얻을 수 없기 때문에 정보에 입각한 결정을
                    내릴 수 없기 때문입니다.
                    <br />
                    3: 심리적 압박 투자에 대한 욕심과 두려움 때문에 더 잘 대응할 방법이 없습니다.
                    <br />
                    4: 위험 관리 위험 관리는 투자의 핵심입니다. 레버리지를 현명하게 사용하지 않으면 더 큰 손실을 초래할
                    수 있습니다.
                    <br />
                    <span id="i23zmh">
                      <span style={{ color: '#dab005', fontWeight: 800 }}>⚠️</span>
                    </span>
                    소중한 정보와 자원을 제공할 것을 약속드리며,&nbsp;
                    <span id="ib1599">
                      내 카카오톡에 추가하려면 아래 버튼을
                      클릭하세요! "
                    </span>
                    <span id="i4h681" draggable={true} style={{ color: '#e74c3c' }}>7</span>
                    <span id="iup9lj">
                      "을 보내주시면 2월에 급등한 주식 3개를 보내드립니다! 오늘 선착순 300명의 투자자가 내 투자
                      커뮤니티의 VIP 회원이 되며, 각 투자자는 1:1 상담 기회를 받게 됩니다.
                    </span>
                    <br id="irwo1o" draggable={true} />
                    <span id="if5k2q" draggable={true}>
                      🔥
                      38,000명이 넘는 사람들이 무료로 혜택을 받았고, 장소 수는 제한되어 있습니다.
                    </span>
                    <br />
                  </div>
                  <a onClick={jump} className="link-btn">
                    <img
                      src={kakaoBtn.src}
                      alt=""
                      width="2174"
                      height="1000"
                      className="img-flex"
                    />
                  </a>
                  <a
                    onClick={jump}
                    className="link-btn"
                  >
                  </a>
                  <div style={{ padding: '10px', fontSize: '26px', fontWeight: 700, color: '#374151' }}>
                    지금 바로 저희 단톡방 조수님을 추가하신다면 , 단톡방 즉시 가입하실수 있고 3개의 폭등주도
                    수령하실수가 있습니다 .
                  </div>
                  <img
                    src={img8.src}
                    alt="추가 정보 및 안내"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '8px',
                    }}
                  />
                  <span id="ic5znh"></span>
                  <img
                    src={img9.src}
                    alt="청중 클룭 및 참여 안내"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '8px',
                    }}
                  />
                </p>
              </div>
            </div>
          </main>
          <div style={{
            position: 'fixed',
            bottom: '20px',
            zIndex: 1000,

          }}
          >
            <a
              onClick={jump}
              className="responsive-button link-btn"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#fee500',
                color: '#3c1e1e',
                textDecoration: 'none',
                fontWeight: '700',
                fontSize: '20px',
                textAlign: 'center',
                border: '2px solid #f9cc00',
                boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                minWidth: '60px',
                minHeight: '60px',
              }}
            >
              <img src={kakaoBtn.src} alt="" className="img-flex" style={{ width: '100%' }} />
            </a>
          </div>
        </div>
      </div>

    </>
  )
}
