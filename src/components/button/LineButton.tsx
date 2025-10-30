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
        px-8 py-5 text-2xl md:text-3xl rounded-2xl"
      type="button"
    >
      <img
        src={lineIcon.src}
        alt="LINE"
        className="w-14 h-14 md:w-10 md:h-10 mr-4 object-contain"
      />
      LINE友だち追加
    </button>
  )
}
