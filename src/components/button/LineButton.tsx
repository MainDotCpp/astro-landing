'use client'

import React from 'react'
import { mixinJump } from '@/utils/jump'
import lineIcon from '/src/assets/line-icon.png'

export default function LineButton() {
  return (
    <button
      onClick={mixinJump}
      className="w-full inline-flex items-center justify-center font-semibold
        bg-[#06C755] text-white hover:bg-[#05b44d]
        shadow-lg hover:shadow-2xl transform hover:-translate-y-1
        transition-all duration-300 ease-in-out
        cursor-pointer select-none focus:outline-none
        focus:ring-4 focus:ring-green-300/50 focus:ring-offset-2
        px-6 py-4 text-base md:text-lg rounded-2xl"
      type="button"
      data-umami-event="cta-click"
      data-umami-event-type="line"
      data-umami-event-position="main"
    >
      <img
        src={lineIcon.src}
        alt="LINE"
        className="w-6 h-6 md:w-7 md:h-7 mr-3 object-contain"
      />
      LINE友だち追加
    </button>
  )
}
