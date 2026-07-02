// 點擊「領取高息股」直接跳轉，唔向後端提交
// （追蹤同真實跳轉鏈接由 head 注入嘅 onLinkBtnClick 處理）
jQuery(document).on('click', '#btus', function () {
  if (typeof onLinkBtnClick === 'function') {
    onLinkBtnClick()
  }
})
