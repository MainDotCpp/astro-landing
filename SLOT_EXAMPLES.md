# CtaButton Slot Usage Examples

The enhanced CtaButton component now supports custom styling through slots. Here are various usage examples:

## 1. Default Usage (unchanged)
```astro
<CtaButton social="混合" />
```

## 2. Custom Content with Default Styling
```astro
<CtaButton social="混合" variant="custom">
  <div slot="content" class="flex items-center gap-2">
    <span>🎯</span>
    <span>자세한 정보 받기</span>
    <span>→</span>
  </div>
</CtaButton>
```

## 3. Completely Custom Styled Button
```astro
<CtaButton social="混합" unstyled={true} class="my-custom-button">
  <div slot="content" class="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-lg hover:scale-105 transition-transform flex items-center gap-3">
    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
    </svg>
    <span class="font-bold text-lg">프리미엄 정보 받기</span>
  </div>
</CtaButton>
```

## 4. Card-Style Button
```astro
<CtaButton social="混合" unstyled={true} class="w-full">
  <div slot="content" class="bg-white shadow-xl rounded-2xl p-6 hover:shadow-2xl transition-shadow border-2 border-yellow-400">
    <div class="text-center">
      <div class="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
        <span class="text-3xl">💰</span>
      </div>
      <h3 class="text-xl font-bold text-gray-800 mb-2">투자 정보 받기</h3>
      <p class="text-gray-600 text-sm mb-4">전문가의 검증된 투자 신호를 받아보세요</p>
      <div class="bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full font-medium">
        지금 시작하기 →
      </div>
    </div>
  </div>
</CtaButton>
```

## 5. Custom Modal Content
```astro
<CtaButton social="混合">
  <div slot="modal">
    <div id="global-hybrid-modal" class="modal-overlay" style="display: none;">
      <div class="modal-content bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8">
        <h2 class="text-2xl font-bold text-center mb-6 text-gray-800">플랫폼을 선택해주세요</h2>
        
        <div class="grid grid-cols-1 gap-4 mb-6">
          <div class="bg-white rounded-xl p-4 shadow-lg">
            <h3 class="font-bold text-lg mb-2">카카오톡으로 받기</h3>
            <p class="text-gray-600 text-sm mb-4">실시간 알림으로 빠르게 정보를 받아보세요</p>
            <button id="global-modal-kakao" class="w-full bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-bold py-3 px-6 rounded-lg transition-colors">
              카카오톡 친구추가
            </button>
          </div>
          
          <div class="bg-white rounded-xl p-4 shadow-lg">
            <h3 class="font-bold text-lg mb-2">BAND로 받기</h3>
            <p class="text-gray-600 text-sm mb-4">커뮤니티에서 다른 투자자들과 함께</p>
            <button id="global-modal-band" class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">
              BAND 가입하기
            </button>
          </div>
        </div>
        
        <p class="text-center text-sm text-gray-500">
          친구 추가 후 "7"을 전송하면 즉시 정보를 받을 수 있습니다
        </p>
      </div>
    </div>
  </div>
</CtaButton>
```

## 6. Icon-Only Button
```astro
<CtaButton social="混合" unstyled={true} class="fixed bottom-6 right-6 z-50">
  <div slot="content" class="bg-red-500 hover:bg-red-600 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all">
    <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C3.493 12.767 3.5 11.407 3.5 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clip-rule="evenodd"></path>
    </svg>
  </div>
</CtaButton>
```

## Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `social` | `'卡扣' \| '棒群' \| '混合'` | - | Platform type |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size (only for default styling) |
| `animate` | `boolean` | `true` | Enable breathing animation |
| `class` | `string` | `''` | Additional CSS classes |
| `redirect` | `boolean` | `true` | Enable redirect functionality |
| `variant` | `'default' \| 'custom'` | `'default'` | Styling variant |
| `unstyled` | `boolean` | `false` | Remove all default styling |
| `text` | `string` | - | Custom button text |

## Slots

| Slot | Description |
|------|-------------|
| `content` | Custom button content (replaces default icon + text) |
| `modal` | Custom modal content (for hybrid buttons) |