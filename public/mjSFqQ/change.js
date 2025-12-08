// 将页面中所有满足 $XXX.X 格式的文本改为原始数值 * 100
(function () {
  // 正则表达式：匹配 $ 后面跟着数字，然后小数点，再跟着一个数字
  // 例如：$123.4, $999.9, $1.0 等
  const regex = /\$(\d+\.\d+)/g

  // 递归遍历所有文本节点
  function walkTextNodes(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      // 如果文本节点包含匹配的内容
      if (regex.test(node.textContent)) {
        // 重置正则表达式（因为 test 会改变 lastIndex）
        regex.lastIndex = 0
        // 替换文本内容：提取数值，乘以100，然后替换
        node.textContent = node.textContent.replace(regex, (match, value) => {
          const num = Number.parseFloat(value)
          return `$${(num * 100).toFixed(2)}`
        })
      }
    }
    else {
      // 遍历子节点
      for (let i = 0; i < node.childNodes.length; i++) {
        walkTextNodes(node.childNodes[i])
      }
    }
  }

  // 从 body 开始遍历
  walkTextNodes(document.body)

  // 如果页面是动态加载内容的，可以使用 MutationObserver 监听 DOM 变化
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE) {
          walkTextNodes(node)
        }
      })
    })
  })

  // 开始观察 DOM 变化
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  })
})()
