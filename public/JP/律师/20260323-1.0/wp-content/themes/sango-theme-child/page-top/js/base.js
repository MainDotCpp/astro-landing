window.requestAnimFrame = (function (callback) {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      return window.setTimeout(callback, 1000 / 60);
    }
  );
})();
window.cancelAnimFrame = (function (_id) {
  return (
    window.cancelAnimationFrame ||
    window.cancelRequestAnimationFrame ||
    window.webkitCancelAnimationFrame ||
    window.webkitCancelRequestAnimationFrame ||
    window.mozCancelAnimationFrame ||
    window.mozCancelRequestAnimationFrame ||
    window.msCancelAnimationFrame ||
    window.msCancelRequestAnimationFrame ||
    window.oCancelAnimationFrame ||
    window.oCancelRequestAnimationFrame ||
    function (_id) {
      window.clearTimeout(id);
    }
  );
})();
function countChars(str) {
  return str.replace(/[\u0080-\u10FFFF]/g, 'x').length;
}
function closest(el, selector) {
  // type el -> Object
  // type select -> String
  var matchesFn;
  // find vendor prefix
  ['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector'].some(function (fn) {
    if (typeof document.body[fn] == 'function') {
      matchesFn = fn;
      return true;
    }
    return false;
  });
  var parent;
  // traverse parents
  while (el) {
    parent = el.parentElement;
    if (parent && parent[matchesFn](selector)) {
      return parent;
    }
    el = parent;
  }
  return null;
}

function getCssProperty(elem, property) {
  return window.getComputedStyle(elem, null).getPropertyValue(property);
}
var easingEquations = {
  easeOutSine: function (pos) {
    return Math.sin(pos * (Math.PI / 2));
  },
  easeInOutSine: function (pos) {
    return -0.5 * (Math.cos(Math.PI * pos) - 1);
  },
  easeInOutQuint: function (pos) {
    if ((pos /= 0.5) < 1) {
      return 0.5 * Math.pow(pos, 5);
    }
    return 0.5 * (Math.pow(pos - 2, 5) + 2);
  },
};

function isPartiallyVisible(el) {
  var elementBoundary = el.getBoundingClientRect();
  var top = elementBoundary.top;
  var bottom = elementBoundary.bottom;
  var height = elementBoundary.height;
  return top + height >= 0 && height + window.innerHeight >= bottom;
}

function isFullyVisible(el) {
  var elementBoundary = el.getBoundingClientRect();
  var top = elementBoundary.top;
  var bottom = elementBoundary.bottom;
  return top >= 0 && bottom <= window.innerHeight;
}

function CreateElementWithClass(elementName, className) {
  var el = document.createElement(elementName);
  el.className = className;
  return el;
}

function createElementWithId(elementName, idName) {
  var el = document.createElement(elementName);
  el.id = idName;
  return el;
}

function getScrollbarWidth() {
  var outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.width = '100px';
  document.body.appendChild(outer);
  var widthNoScroll = outer.offsetWidth;
  // force scrollbars
  outer.style.overflow = 'scroll';
  // add innerdiv
  var inner = document.createElement('div');
  inner.style.width = '100%';
  outer.appendChild(inner);
  var widthWithScroll = inner.offsetWidth;
  // remove divs
  outer.parentNode.removeChild(outer);
  return widthNoScroll - widthWithScroll;
}
var transform = ['transform', 'msTransform', 'webkitTransform', 'mozTransform', 'oTransform'];
var flex = ['-webkit-box', '-moz-box', '-ms-flexbox', '-webkit-flex', 'flex'];
var fd = ['flexDirection', '-webkit-flexDirection', '-moz-flexDirection'];
var animatriondelay = ['animationDelay', '-moz-animationDelay', '-wekit-animationDelay'];

function getSupportedPropertyName(properties) {
  for (var i = 0; i < properties.length; i++) {
    if (typeof document.body.style[properties[i]] != 'undefined') {
      return properties[i];
    }
  }
  return null;
}
var transformProperty = getSupportedPropertyName(transform);
var flexProperty = getSupportedPropertyName(flex);
var fdProperty = getSupportedPropertyName(fd);
var ad = getSupportedPropertyName(animatriondelay);

function detectIE() {
  var ua = window.navigator.userAgent;
  var msie = ua.indexOf('MSIE ');
  var trident = ua.indexOf('Trident/');
  if (msie > 0 || trident > 0) {
    // IE 10 or older => return version number
    // return 'ie'+parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    return 'ie';
  }
  return false;
}

function detect7() {
  var ua = window.navigator.userAgent;
  var isWin7 = ua.indexOf('Windows NT 6.1');
  if (isWin7 > 0) {
    return 'win7';
  }
  return false;
}

function getPosition(el) {
  var xPos = 0;
  var yPos = 0;
  while (el) {
    if (el.tagName == 'BODY') {
      // deal with browser quirks with body/window/document and page scroll
      var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
      var yScroll = el.scrollTop || document.documentElement.scrollTop;
      xPos += el.offsetLeft - xScroll + el.clientLeft;
      yPos += el.offsetTop - yScroll + el.clientTop;
    } else {
      // for all other non-BODY elements
      xPos += el.offsetLeft - el.scrollLeft + el.clientLeft;
      yPos += el.offsetTop - el.scrollTop + el.clientTop;
    }
    el = el.offsetParent;
  }
  return {
    x: xPos,
    y: yPos,
  };
}
/* images pc <---> sp */
(function () {
  var PicturePolyfill = (function () {
    function PicturePolyfill() {
      var _this = this;
      this.pictures = [];
      this.onResize = function () {
        var width = document.body.clientWidth;
        for (var i = 0; i < _this.pictures.length; i = i + 1) {
          _this.pictures[i].update(width);
        }
      };
      if ([].includes) return;
      var picture = Array.prototype.slice.call(document.getElementsByTagName('picture'));
      for (var i = 0; i < picture.length; i = i + 1) {
        this.pictures.push(new Picture(picture[i]));
      }
      window.addEventListener('resize', this.onResize, false);
      this.onResize();
    }
    return PicturePolyfill;
  })();
  var Picture = (function () {
    function Picture(node) {
      var _this = this;
      this.update = function (width) {
        width <= _this.breakPoint ? _this.toSP() : _this.toPC();
      };
      this.toSP = function () {
        if (_this.isSP) return;
        _this.isSP = true;
        _this.changeSrc();
      };
      this.toPC = function () {
        if (!_this.isSP) return;
        _this.isSP = false;
        _this.changeSrc();
      };
      this.changeSrc = function () {
        var toSrc = _this.isSP ? _this.srcSP : _this.srcPC;
        _this.img.setAttribute('src', toSrc);
      };
      this.img = node.getElementsByTagName('img')[0];
      this.srcPC = this.img.getAttribute('src');
      var source = node.getElementsByTagName('source')[0];
      this.srcSP = source.getAttribute('srcset');
      this.breakPoint = Number(source.getAttribute('media').match(/(\d+)px/)[1]);
      this.isSP = !document.body.clientWidth <= this.breakPoint;
      this.update();
    }
    return Picture;
  })();
  new PicturePolyfill();
})();

var Sticky = (function () {
  function Sticky() {
    var s = this;
    this._target = document.getElementById('header');
    this._nav = document.getElementById('nav');
    this._for_sp = function (top) {
      document.body.style.paddingTop = s._target.clientHeight + 'px';
      s._nav.style.top = s._target.clientHeight + 'px';
      if (top >= 0) {
        s._target.classList.add('fixed');
      } else {
        s._target.classList.remove('fixed');
        document.body.style.paddingTop = 0;
      }
    };
    this._for_pc = function (top, left) {
      if (top > 0) {
        s._target.classList.add('fixed');
      } else {
        s._target.classList.remove('fixed');
      }
      document.body.style.paddingTop = s._target.clientHeight + 'px';
      s._nav.style.top = 'inherit';
    };
    this.handling = function () {
      var _top = document.documentElement.scrollTop || document.body.scrollTop;
      var _left = document.documentElement.scrollLeft || document.body.scrollLeft;
      if (window.innerWidth < 1000) {
        s._for_sp(_top);
      } else {
        s._for_pc(_top, _left);
      }
    };
    window.addEventListener('scroll', s.handling, false);
    window.addEventListener('resize', s.handling, false);
    window.addEventListener('load', s.handling, false);
  }
  return Sticky;
})();

var Anchor = (function () {
  function Anchor() {
    var a = this;
    this._target = '.anchor';
    this._header = document.getElementById('header');
    this._icon_menu = document.getElementById('menu_icon');
    this.timer;
    this.flag_start = false;
    this.iteration;
    this.eles = document.querySelectorAll(this._target);
    this.stopEverything = function () {
      a.flag_start = false;
    };
    this._getbuffer = function () {
      var _buffer;
      if (window.innerWidth < 769) {
        _buffer = a._header.clientHeight;
      } else {
        _buffer = a._header.clientHeight;
      }
      return _buffer;
    };
    this.scrollToY = function (scrollTargetY, speed, easing) {
      var scrollY = window.scrollY || window.pageYOffset,
        scrollTargetY = scrollTargetY || 0,
        speed = speed || 2000,
        easing = easing || 'easeOutSine',
        currentTime = 0;
      var time = Math.max(0.1, Math.min(Math.abs(scrollY - scrollTargetY) / speed, 0.8));

      function tick() {
        if (a.flag_start) {
          currentTime += 1 / 60;
          var p = currentTime / time;
          var t = easingEquations[easing](p);
          if (p < 1) {
            requestAnimFrame(tick);
            window.scrollTo(0, scrollY + (scrollTargetY - scrollY) * t);
          } else {
            window.scrollTo(0, scrollTargetY);
          }
        }
      }
      tick();
    };
    this._getUrl = function () {
      var vars = {};
      var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
      });
      return vars;
    };
    Array.prototype.forEach.call(this.eles, function (el, i) {
      el.addEventListener('click', function (e) {
        var next = el.getAttribute('href').split('#')[1];
        el.classList.add('active');
        if (document.getElementById(next)) {
          a.flag_start = true;
          e.preventDefault();
          if (window.innerWidth < 769) {
            a.scrollToY(document.getElementById(next).offsetTop - a._getbuffer() + 0, 1500, 'easeOutSine');
          } else {
            a.scrollToY(document.getElementById(next).offsetTop - a._getbuffer() + 0, 1500, 'easeOutSine');
          }
        }
      });
    });
    this._start = function () {
      var next = window.location.hash.split('#')[1];
      a.flag_start = true;
      if (next) {
        a.scrollToY(document.getElementById(next).offsetTop - a._getbuffer() + 0, 1500, 'easeOutSine');
      }
    };
    window.addEventListener('load', a._start, false);
    document.querySelector('body').addEventListener('mousewheel', a.stopEverything, false);
    document.querySelector('body').addEventListener('DOMMouseScroll', a.stopEverything, false);
  }
  return Anchor;
})();

var Effect = (function () {
  function Effect() {
    var e = this;
    this.eles = document.querySelectorAll('.effect');
    this.isPar = document.querySelectorAll('.isPar');
    this.handling = function () {
      var _top = document.documentElement.scrollTop;
      Array.prototype.forEach.call(e.eles, function (el, i) {
        if (getPosition(el).y < (window.innerHeight * 3) / 4) {
          setTimeout(function () {
            $(function () {
              $('.step-1').addClass('is_active');
            });
          }, 1000);
        }
      });
    };
    window.addEventListener('scroll', e.handling, false);
    window.addEventListener('load', e.handling, false);
  }
  return Effect;
})();

var Tab = (function () {
  function Tab() {
    // showArticle(0);
    var t = this;
    this._target = document.querySelectorAll('.tab__ul');
    Array.prototype.forEach.call(this._target, function (el, i) {
      var _eles = el.querySelectorAll('a');
      Array.prototype.forEach.call(_eles, function (c) {
        showArticle(c, 0);
        c.addEventListener('click', function (e) {
          e.preventDefault();
          this.parentNode.classList.add('active');
          Array.prototype.forEach.call(_eles, function (child) {
            if (child != c) {
              child.parentNode.classList.remove('active');
            }
          });
          showArticle(this, this.dataset.tabs);
        });
      });
    });
  }

  function showArticle(el, tabNum) {
    arr = closest(el, '.tab__tab').querySelector('.tab__wrapper').querySelectorAll('.tab__content');
    Array.prototype.forEach.call(arr, function (a) {
      if (a.dataset.tabs == tabNum) {
        a.style.display = 'block';
      } else {
        a.style.display = 'none';
      }
    });
  }
  return Tab;
})();

// Accor
var Accor = (function () {
  function Accor() {
    var a = this;
    this.ques = document.querySelectorAll('.ques');
    this.handling = function () {
      Array.prototype.forEach.call(a.ques, function (el, i) {
        el.addEventListener('click', function (e) {
          e.preventDefault();
          el.classList.toggle('open');
          var panel = this.nextElementSibling;
          if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
          } else {
            panel.style.maxHeight = panel.scrollHeight + 'px';
          }
        });
      });
    };
    this.handling();
  }
  return Accor;
})();

window.addEventListener('DOMContentLoaded', function () {
  new Accor();
  new Effect();
});
