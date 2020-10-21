q$(document.body).append("<script  src='./src/static/data/skill.js'></script>")

$.each(skillItem, function (i, v) {
  $(".s-items").append(
    `<div class="skill-item col-md-4 col-sm-6 col-xs-12">
      <div class="inner">
        <div class="cover">
          <img src=${ v.imgUrl } alt="">
        </div>
        <div class="progress-info">
        
          <h5 class="progress-title">${v.title}</h5>
          <div class="progress ${ (v.progress) ? '':'hide-progress'}">
            <div class="progress-bar  active " role="progressbar" aria-valuenow="60"
              aria-valuemin="0" aria-valuemax="100" style="width: ${v.progress};">
              ${v.progress}
            </div>
          </div>
          ${v.description}
        </div>
      </div>
    </div>`
  )
})


$(".navbar-default .navbar-toggle")
  .on("blur", function () {
    if (!$(this).hasClass("collapsed")) {
      $(this).trigger("click")
    }
  })
  .on("click", function () {
    $(this).toggleClass('hover')
  })



let timerCover = setInterval(randomShow, 3000)

// 移动端取消浏览器默认行为
$(".skill-item .cover").on("click", function (e) {
  e.preventDefault()
})

$('.skill-item .inner').css({
  'width': $('.skill-item img').css('width'), //获取子元素的宽度
  'height': $('.skill-item img').css('height') //获取子元素的高度
}).on("mouseenter", function coverHide(e) {
  e.preventDefault()

  window.clearInterval(timerCover)
  let randomNum = Math.round(Math.random())
  let hide = randomNum ? {
    'left': '-' + $('.skill-item img').css('width')
  } : {
    'top': '-' + $('.skill-item img').css('height')
  }

  $(this.children).addClass('active').css(hide)
  $(".skill-item .cover:not(.active)").css({
    'left': '0',
    'top': '0'
  })
}).on("mouseleave", function coverHide(e) {
  $(".skill-item .cover").css({
    'left': '0',
    'top': '0'
  }).removeClass('active')
  window.clearInterval(timerCover)
  timerCover = setInterval(randomShow, 3000)
})


let preIndex = -1

function randomShow() {
  let imgLength = $(".skill-item .cover").length
  let randomIndex = Math.floor(Math.random() * imgLength)
  // 避免随机数重复导致过渡效果问题
  if (randomIndex === preIndex) {
    randomIndex = (randomIndex + 1) % imgLength
    preIndex = randomIndex
  } else {
    preIndex = randomIndex
  }
  const randomObj = $(".skill-item .cover").get(randomIndex)
  let randomNum = Math.round(Math.random())
  let hide = randomNum ? {
    'left': '-' + $('.skill-item img').css('width')
  } : {
    'top': '-' + $('.skill-item img').css('height')
  }
  $(randomObj).css(hide)
  const timeOut = setTimeout(() => {
    $(randomObj).css({
      'left': '0',
      'top': '0'
    })
  }, 3000);
  $(".skill-item .progress-info").on("mouseenter", function () {
    window.clearTimeout(timeOut)
  })
}


$('.tab-accordion').on('click', function (e) {
  // let activeTab = $(this).closest('.horizontal-tab').find('.' + $(this).text())
  $('.tab-accordion').removeClass('tab-active')

  $(this).addClass('tab-active').text()
  $(this).find('.' + $(this).text())
  if ($(this).text() === 'All') {
    $('.tab-img').css('display', 'block')
  } else {
    $('.tab-img').css('display', 'block')
    if ($('p:not(.' + $(this).text() + ')').parents('.tab-img')) {
      $('p:not(.' + $(this).text() + ')').parents('.tab-img').css('display', 'none')
    } else {
      $('.tab-img').css('display', 'none')
    }

  }

})



$('.tab-img')
  .on('mouseenter', function (e) {
    // console.log($(this).find('p'))

    $(this).find('.works-info').addClass('show-info')
    $(this).find('p').addClass('show-text')

  })
  .on('mouseleave', function (e) {
    $(this).find('.works-info').removeClass('show-info')
    $(this).find('p').removeClass('show-text')
  })