'use client'

import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { jumpToBand, jumpToKakao } from '@/utils/jump'
import kakaoIcon from '/src/assets/kakao-icon.png'

export default function KaKaoFormButton() {
  const [modalVisible, setModalVisible] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [isOpening, setIsOpening] = useState(false)

  // 投资理解程度选项
  const investmentLevels = [
    { id: 1, label: '처음 접해봐요', description: '입문 가이드와 기초 지식 받기 · 친구 추가' },
    { id: 2, label: '초보예요', description: '투자 노하우 배우고 실수 방지하기 · 친구 추가' },
    { id: 3, label: '어느 정도 경험이 있어요', description: '전문 분석 받고 투자 전략 최적화하기 · 친구 추가' },
    { id: 4, label: '경험이 많아요', description: '심층 분석과 시장 인사이트 받기 · 친구 추가' },
  ]

  // 确保组件已挂载
  useEffect(() => {
    setMounted(true)
  }, [])

  // 打开模态框
  const handleOpenModal = () => {
    setModalVisible(true)
    setTimeout(() => setIsOpening(true), 10)
  }

  // 关闭模态框
  const handleCloseModal = () => {
    setIsClosing(true)
    setIsOpening(false)
    setTimeout(() => {
      setModalVisible(false)
      setIsClosing(false)
    }, 500)
  }

  // 处理选项点击
  const handleOptionClick = (levelId: number) => {
    handleCloseModal()
    setTimeout(() => {
      // id 为 1（没接触过）时调用 Band 跳转，其他调用 Kakao 跳转
      if (levelId === 1) {
        jumpToBand()
      }
      else {
        jumpToKakao()
      }
    }, 100)
  }

  // 弹窗内容组件
  const ModalContent = () => {
    const overlayStyle: React.CSSProperties = {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      backdropFilter: 'blur(4px)',
      padding: '16px',
      transition: 'opacity 0.5s ease',
      opacity: isClosing ? 0 : 1,
    }

    const modalStyle: React.CSSProperties = {
      backgroundColor: '#ffffff',
      borderRadius: '20px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      maxWidth: '480px',
      width: '100%',
      padding: '28px',
      position: 'relative',
      border: '1px solid #f3f4f6',
      transition: 'all 0.5s ease',
      transform: isClosing
        ? 'scale(0.95) translateY(16px)'
        : isOpening
          ? 'scale(1) translateY(0)'
          : 'scale(0.95) translateY(16px)',
      opacity: isClosing ? 0 : isOpening ? 1 : 0,
    }

    const iconCircleStyle: React.CSSProperties = {
      width: '72px',
      height: '72px',
      background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 20px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.7s ease',
      transitionDelay: '100ms',
      transform: isClosing ? 'scale(0.75)' : isOpening ? 'scale(1)' : 'scale(0.75)',
      opacity: isClosing ? 0 : isOpening ? 1 : 0,
    }

    const headerStyle: React.CSSProperties = {
      textAlign: 'center',
      marginBottom: '24px',
      transition: 'all 0.7s ease',
      transitionDelay: '200ms',
      opacity: isClosing ? 0 : isOpening ? 1 : 0,
      transform: isClosing ? 'translateY(8px)' : isOpening ? 'translateY(0)' : 'translateY(8px)',
    }

    const titleStyle: React.CSSProperties = {
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#111827',
      marginBottom: '8px',
      lineHeight: '1.3',
    }

    const subtitleStyle: React.CSSProperties = {
      fontSize: '16px',
      color: '#6b7280',
      lineHeight: '1.5',
    }

    const optionsContainerStyle: React.CSSProperties = {
      marginBottom: '0',
      marginTop: '24px',
      transition: 'all 0.7s ease',
      transitionDelay: '500ms',
      opacity: isClosing ? 0 : isOpening ? 1 : 0,
      transform: isClosing ? 'translateY(8px)' : isOpening ? 'translateY(0)' : 'translateY(8px)',
    }

    const optionButtonStyle = (index: number): React.CSSProperties => ({
      width: '100%',
      background: 'linear-gradient(to right, #3b82f6, #2563eb, #4f46e5)',
      color: '#ffffff',
      padding: '16px 20px',
      borderRadius: '12px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      border: '1px solid rgba(59, 130, 246, 0.3)',
      position: 'relative',
      overflow: 'hidden',
      cursor: 'pointer',
      marginBottom: '12px',
      transition: 'all 0.3s ease',
      transitionDelay: isOpening ? `${500 + index * 100}ms` : '0ms',
      opacity: isClosing ? 0 : isOpening ? 1 : 0,
      transform: isClosing ? 'translateY(8px) scale(0.95)' : isOpening ? 'translateY(0) scale(1)' : 'translateY(8px) scale(0.95)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      borderWidth: '1px',
      borderStyle: 'solid',
    })

    const optionLabelStyle: React.CSSProperties = {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '4px',
      position: 'relative',
      zIndex: 10,
    }

    const optionDescStyle: React.CSSProperties = {
      fontSize: '14px',
      opacity: 0.95,
      position: 'relative',
      zIndex: 10,
    }

    const stepsContainerStyle: React.CSSProperties = {
      marginTop: '0',
      marginBottom: '24px',
      padding: '20px',
      background: 'linear-gradient(to right, #eff6ff, #dbeafe)',
      borderRadius: '12px',
      border: '1px solid #bfdbfe',
      transition: 'all 0.7s ease',
      transitionDelay: '300ms',
      opacity: isClosing ? 0 : isOpening ? 1 : 0,
      transform: isClosing ? 'translateY(8px)' : isOpening ? 'translateY(0)' : 'translateY(8px)',
    }

    const stepsTitleStyle: React.CSSProperties = {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#1e40af',
      marginBottom: '16px',
      textAlign: 'center',
    }

    const stepItemStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '12px',
      fontSize: '16px',
      color: '#1e3a8a',
    }

    const stepNumberStyle: React.CSSProperties = {
      width: '32px',
      height: '32px',
      background: 'linear-gradient(135deg, #93c5fd, #60a5fa)',
      color: '#1e40af',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      fontSize: '16px',
      marginRight: '12px',
      flexShrink: 0,
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    }

    const numberHighlightStyle: React.CSSProperties = {
      display: 'inline-block',
      background: '#ffffff',
      color: '#1e40af',
      padding: '4px 12px',
      borderRadius: '6px',
      fontWeight: 'bold',
      fontSize: '18px',
      margin: '0 4px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      border: '2px solid #3b82f6',
    }

    const closeButtonStyle: React.CSSProperties = {
      position: 'absolute',
      top: '16px',
      right: '16px',
      color: '#9ca3af',
      cursor: 'pointer',
      padding: '12px',
      borderRadius: '50%',
      transition: 'all 0.3s ease',
      backgroundColor: 'transparent',
      border: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: isClosing ? 0 : isOpening ? 1 : 0,
      transform: isClosing ? 'scale(0.75)' : isOpening ? 'scale(1)' : 'scale(0.75)',
    }

    return (
      <div style={overlayStyle} onClick={handleCloseModal}>
        <div style={modalStyle} onClick={e => e.stopPropagation()}>
          {/* 弹窗头部 */}
          <div style={headerStyle}>
            <div style={iconCircleStyle}>
              <svg
                style={{ width: '40px', height: '40px', color: '#d97706' }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 style={titleStyle}>투자 경험을 선택해주세요</h3>
            <p style={subtitleStyle}>더 적합한 서비스를 제공해드리기 위해</p>
          </div>

          {/* 步骤说明 */}
          <div style={stepsContainerStyle}>
            <div style={stepsTitleStyle}>친구 추가 후 숫자를 보내주세요</div>
            <div style={stepItemStyle}>
              <div style={stepNumberStyle}>1</div>
              <span>친구 추가하기</span>
            </div>
            <div style={stepItemStyle}>
              <div style={stepNumberStyle}>2</div>
              <span>
                숫자
                <span style={numberHighlightStyle}>7</span>
                {' '}
                을 보내고 보유주 분석 또는 우량주 추천 받기
              </span>
            </div>
          </div>

          {/* 选项列表 */}
          <div style={optionsContainerStyle}>
            {investmentLevels.map((level, index) => (
              <button
                key={level.id}
                onClick={() => handleOptionClick(level.id)}
                style={optionButtonStyle(index)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02) translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 8px 12px -2px rgba(0, 0, 0, 0.15), 0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1) translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                }}
              >
                {/* 背景光效 */}
                <div
                  className="shine-effect"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.2), transparent)',
                  }}
                />

                {/* 按钮内容 */}
                <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <span style={optionLabelStyle}>{level.label}</span>
                  <span style={optionDescStyle}>{level.description}</span>
                </div>

                {/* 脉冲效果 */}
                <div
                  className="pulse-effect"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderRadius: '16px',
                    background: 'linear-gradient(to right, rgba(59, 130, 246, 0.3), rgba(37, 99, 235, 0.3), rgba(79, 70, 229, 0.3))',
                  }}
                />
              </button>
            ))}
          </div>

          {/* 关闭按钮 */}
          <button
            onClick={handleCloseModal}
            style={closeButtonStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#4b5563'
              e.currentTarget.style.backgroundColor = '#f3f4f6'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#9ca3af'
              e.currentTarget.style.backgroundColor = 'transparent'
            }}
            aria-label="모달 닫기"
          >
            <svg style={{ width: '32px', height: '32px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    )
  }

  const mainButtonStyle: React.CSSProperties = {
    width: '100%',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 600,
    background: 'linear-gradient(to right, #fde047, #facc15, #eab308)',
    color: '#111827',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    userSelect: 'none',
    outline: 'none',
    padding: '16px 24px',
    fontSize: '18px',
    borderRadius: '12px',
    border: '1px solid rgba(254, 240, 138, 0.4)',
    borderWidth: '1px',
    borderStyle: 'solid',
    lineHeight: '1.5',
  }

  return (
    <>
      {/* 主按钮 */}
      <button
        onClick={handleOpenModal}
        style={mainButtonStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'linear-gradient(to right, #facc15, #eab308, #ca8a04)'
          e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
          e.currentTarget.style.transform = 'translateY(-2px)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'linear-gradient(to right, #fde047, #facc15, #eab308)'
          e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
          e.currentTarget.style.transform = 'translateY(0)'
        }}
        onFocus={(e) => {
          e.currentTarget.style.outline = '4px solid rgba(254, 240, 138, 0.5)'
          e.currentTarget.style.outlineOffset = '2px'
        }}
        onBlur={(e) => {
          e.currentTarget.style.outline = 'none'
        }}
        type="button"
      >
        {/* Kakao 图标 */}
        <img
          src={kakaoIcon.src}
          alt="Kakao"
          style={{
            width: '32px',
            height: '32px',
            marginRight: '12px',
            objectFit: 'contain',
            filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))',
          }}
        />
        친구 추가하고 보유주 분석 또는 우량주 추천 받기
      </button>

      {/* 使用Portal将弹窗挂载到body */}
      {mounted && modalVisible && createPortal(
        <ModalContent />,
        document.body,
      )}

      {/* 自定义动画样式 */}
      <style>
        {`
        @keyframes shine {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        .shine-effect {
          animation: shine 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        .pulse-effect {
          animation: pulse 2s ease-in-out infinite;
        }

        @media (max-width: 768px) {
          .kakao-form-modal {
            padding: 24px !important;
          }
          .kakao-form-title {
            font-size: 28px !important;
          }
          .kakao-form-subtitle {
            font-size: 18px !important;
          }
          .kakao-form-button {
            font-size: 20px !important;
            padding: 16px 24px !important;
          }
          .kakao-form-option-label {
            font-size: 18px !important;
          }
          .kakao-form-option-desc {
            font-size: 14px !important;
          }
        }
        `}
      </style>
    </>
  )
}
