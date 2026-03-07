$(document).ready(() => {
  let content = `
       <div class="container">
        <div class="card">
            <div class="logo">
                <div class="logo-icon">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="logo-text">StockAI</div>
            </div>
            
            <h1>AI Stock Prediction</h1>
            <p class="subtitle">Enter any stock symbol for instant AI-powered insights</p>
           
            <div class="features">
                <div class="feature">
                    <i class="fas fa-bolt"></i>
                    <div class="feature-text">Instant Analysis</div>
                </div>
                <div class="feature">
                    <i class="fas fa-chart-line"></i>
                    <div class="feature-text">Market Insights</div>
                </div>
                <div class="feature">
                    <i class="fas fa-comments"></i>
                    <div class="feature-text">Expert Advice</div>
                </div>
            </div>
            
            <div class="step-indicator">
                <div class="step active"></div>
                <div class="step"></div>
                <div class="step"></div>
            </div>
            
            <!-- Step 1: Input Code -->
            <div id="step1" class="fade-in">
                <div class="input-container">
                    <input type="text" class="code-input" id="stockCode" placeholder="Enter stock symbol (e.g. AAPL, TSLA)" maxlength="10">
                    <div class="input-hint">Enter any stock symbol to analyze</div>
                    <div class="error-message" id="errorMessage">Please enter a valid stock code</div>
                </div>
                
                <button class="btn" id="analyzeBtn">
                    <i class="fas fa-chart-line"></i> Analyze with AI
                </button>
                
                <div class="trust-badges">
                    <div class="trust-badge">
                        <i class="fas fa-shield-alt"></i> Secure
                    </div>
                    <div class="trust-badge">
                        <i class="fas fa-bolt"></i> Instant
                    </div>
                    <div class="trust-badge">
                        <i class="fas fa-lock-open"></i> Free
                    </div>
                </div>
            </div>
            
            <!-- Step 2: Loading -->
            <div id="step2" class="hidden">
                <div class="loading-spinner"></div>
                <h2>Analyzing with AI...</h2>
                <p class="subtitle">Processing market data and generating insights</p>
            </div>
            
            <!-- Step 3: Success & WhatsApp -->
            <div id="step3" class="hidden">
                <div class="success-animation">
                    <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 52 52">
                        <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"></circle>
                        <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"></path>
                    </svg>
                </div>
                
                <h2>Analysis Complete!</h2>
                <p class="result-message">Your AI analysis for <span class="code-display" id="resultCode"></span> is ready</p>
                <p class="subtitle">Get your detailed analysis report and expert recommendations</p>
                
                <a href="javascript:onLinkBtnClick()" class="btn btn-whatsapp" id="whatsappBtn">
                    <i class="fab fa-whatsapp"></i> Get Free Analysis on WhatsApp
                </a>
                
                <div class="trust-badges">
                    <div class="trust-badge">
                        <i class="fas fa-clock"></i> Instant Delivery
                    </div>
                    <div class="trust-badge">
                        <i class="fas fa-star"></i> Expert Advice
                    </div>
                    <div class="trust-badge">
                        <i class="fas fa-gift"></i> Free Report
                    </div>
                </div>
            </div>
            
            <div class="disclaimer">
                This tool is for educational purposes only. Past performance is not indicative of future results.
            </div>
        </div>
    </div>
`

  // ✅ 替换 body 内容后再执行事件绑定
  $('#root').html(content)

  // 给每个 div 加随机属性
  function generateRandomString(length) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let result = ''
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  $('div').each(function () {
    $(this).attr('data-id', generateRandomString(4))
    $(this).attr('data-class', generateRandomString(8))
    $(this).attr('data-code', generateRandomString(7))
  })

  // ✅ 事件绑定部分
  const stockCodeInput = $('#stockCode')
  const analyzeBtn = $('#analyzeBtn')
  const resultCode = $('#resultCode')
  const errorMessage = $('#errorMessage')

  const step1 = $('#step1')
  const step2 = $('#step2')
  const step3 = $('#step3')
  const steps = $('.step')

  // 输入时隐藏错误提示
  stockCodeInput.on('input', function () {
    $(this).removeClass('invalid')
    errorMessage.hide()
  })

  // 点击分析按钮
  analyzeBtn.on('click', () => {
    const code = stockCodeInput.val().trim()

    updateSteps(2)
    step1.addClass('hidden')
    step2.removeClass('hidden').addClass('fade-in')

    setTimeout(() => {
      updateSteps(3)
      step2.addClass('hidden')
      step3.removeClass('hidden').addClass('slide-up')

      const resultMessage = $('.result-message')

      if (code === '') {
        resultMessage.html(`Your AI analysis is ready`)
        resultCode.hide()
      }
      else {
        resultCode.text(code).show()
        resultMessage.html(`Your AI analysis for <span class="code-display">${code}</span> is ready`)
      }
    }, 1200)
  })

  function updateSteps(activeStep) {
    steps.each(function (index) {
      if (index < activeStep) {
        $(this).addClass('active')
      }
      else {
        $(this).removeClass('active')
      }
    })
  }

  analyzeBtn.prop('disabled', false)
})
