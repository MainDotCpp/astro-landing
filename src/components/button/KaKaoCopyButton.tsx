'use client'

import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { mixinJump } from '@/utils/jump'
import kakaoIcon from '/src/assets/kakao-icon.png'

export default function KakaoCopyButton() {
  const [modalVisible, setModalVisible] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [isOpening, setIsOpening] = useState(false)

  // 确保组件已挂载
  useEffect(() => {
    setMounted(true)
  }, [])

  // 剪贴板复制功能
  const copyToClipboard = async (text: string): Promise<boolean> => {
    try {
      // 现代浏览器剪贴板API
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text)
        return true
      }

      // 兼容性回退方案
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      textArea.style.top = '-999999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()

      const successful = document.execCommand('copy')
      document.body.removeChild(textArea)
      return successful
    }
    catch (error) {
      console.error('복사 실패:', error)
      return false
    }
  }

  // 处理复制点击
  const handleCopyClick = async () => {
    const success = await copyToClipboard('7')

    if (success) {
      setModalVisible(true)
      // 触发打开动画
      setTimeout(() => setIsOpening(true), 10)
    }
    else {
      console.warn('복사에 실패했습니다. 수동으로 복사해 주세요')
    }
  }

  // 关闭弹窗
  const handleCloseModal = () => {
    setIsClosing(true)
    setIsOpening(false)
    // 等待动画完成后隐藏弹窗
    setTimeout(() => {
      setModalVisible(false)
      setIsClosing(false)
    }, 500)
  }

  // 弹窗内容组件
  const ModalContent = () => (
    <div className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-md p-4 transition-all duration-500 ${
      isClosing ? 'opacity-0' : 'opacity-100'
    }`}
    >
      <div className={`bg-gradient-to-br from-white via-gray-50 to-white rounded-3xl shadow-2xl max-w-lg w-full p-6 md:p-8 relative border border-gray-100 transition-all duration-500 transform ${
        isClosing
          ? 'scale-95 opacity-0 translate-y-4'
          : isOpening
            ? 'scale-100 opacity-100 translate-y-0'
            : 'scale-95 opacity-0 translate-y-4'
      }`}
      >
        {/* 弹窗头部 */}
        <div className="text-center mb-8">
          <div className={`w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg transition-all duration-700 delay-100 ${
            isClosing ? 'scale-75 opacity-0' : isOpening ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
          }`}
          >
            <svg className="w-10 h-10 md:w-12 md:h-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className={`transition-all duration-700 delay-200 ${
            isClosing ? 'opacity-0 translate-y-2' : isOpening ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
          >
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">복사 완료!</h3>
            <p className="text-xl md:text-2xl text-gray-600">숫자 「7」이 클립보드에 복사되었습니다</p>
          </div>
        </div>

        {/* 复制内容显示 */}
        <div className={`bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-5 mb-8 border border-blue-100 transition-all duration-700 delay-300 ${
          isClosing ? 'opacity-0 translate-y-2' : isOpening ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
        >
          <div className="text-xl md:text-2xl text-blue-800 mb-3 font-medium">복사된 내용:</div>
          <div className="font-mono text-2xl md:text-3xl bg-white px-6 py-4 rounded-xl border-2 border-blue-200 text-blue-900 text-center font-bold shadow-sm">
            7
          </div>
        </div>

        {/* 操作引导 */}
        <div className={`mb-8 transition-all duration-700 delay-400 ${
          isClosing ? 'opacity-0 translate-y-2' : isOpening ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
        >
          <h4 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">다음 단계:</h4>
          <div className="space-y-5 text-xl md:text-2xl text-gray-700">
            <div className="flex items-center justify-center">
              <span className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-700 rounded-full flex items-center justify-center text-xl md:text-2xl font-bold mr-5 shadow-sm border border-blue-200">1</span>
              <span className="font-medium">친구 추가하기</span>
            </div>
            <div className="flex items-center justify-center">
              <span className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-700 rounded-full flex items-center justify-center text-xl md:text-2xl font-bold mr-5 shadow-sm border border-blue-200">2</span>
              <span className="font-medium">「7」을 보내고 상승주 받기</span>
            </div>
          </div>
        </div>

        {/* 操作按钮 - 只保留添加好友按钮 */}
        <div className={`w-full transition-all duration-700 delay-500 ${
          isClosing ? 'opacity-0 translate-y-2' : isOpening ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
        >
          <button
            onClick={mixinJump}
            className="w-full bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 text-white py-5 px-8 rounded-2xl shadow-xl border border-blue-400/30 relative overflow-hidden"
          >
            {/* 背景光效 - 无限循环 */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine"></div>

            {/* 按钮内容 */}
            <span className="relative z-10 flex items-center justify-center">
              친구 추가
            </span>

            {/* 脉冲效果 - 无限循环 */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/30 via-blue-500/30 to-indigo-500/30 animate-pulse"></div>
          </button>
        </div>

        {/* 关闭按钮 */}
        <button
          onClick={handleCloseModal}
          className={`absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-all duration-300 p-3 hover:bg-gray-100 rounded-full ${
            isClosing ? 'opacity-0 scale-75' : isOpening ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}
          aria-label="모달 닫기"
        >
          <svg className="w-7 h-7 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* 主按钮 */}
      <button
        onClick={handleCopyClick}
        className="w-full inline-flex items-center justify-center font-semibold
          bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 text-gray-900
          hover:from-yellow-400 hover:via-yellow-500 hover:to-yellow-600
          shadow-lg hover:shadow-2xl transform hover:-translate-y-1
          transition-all duration-300 ease-in-out
          cursor-pointer select-none focus:outline-none
          focus:ring-4 focus:ring-yellow-300/50 focus:ring-offset-2
          px-8 py-5 text-2xl md:text-3xl rounded-2xl border-2 border-yellow-200/30"
      >
        {/* Kakao 图标 */}
        <img
          src={kakaoIcon.src}
          alt="Kakao"
          className="w-14 h-14 md:w-10 md:h-10 mr-4 object-contain drop-shadow-s"
        />
        친구 추가하고 상승주 무료 받기
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
        
        .animate-shine {
          animation: shine 2s ease-in-out infinite;
        }
        `}
      </style>
    </>
  )
}
