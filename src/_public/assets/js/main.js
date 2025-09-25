/* eslint-disable no-undef */
function handleMenu() {
  $('.c-menu__hamburger').on('click', function () {
    $(this).toggleClass('active')
    if ($(this).hasClass('active')) {
      $('.c-menu__sp').addClass('active')
      $('.c-header').addClass('is-active')
      $('html, body').css({ overflow: 'hidden', 'touch-action': 'none' })
    } else {
      $('.c-menu__sp').removeClass('active')
      $('.c-header').removeClass('is-active')
      $('html, body').css({ overflow: 'unset', 'touch-action': 'unset' })
    }
  })

  // ANCHOR LINK SCROLL
  $('.c-menu__text--anchor').click(function () {
    $('.c-menu__hamburger').removeClass('active')
    $('.c-menu__sp').removeClass('active')
    $('.c-header').removeClass('is-active')
    $('html, body').css({ overflowY: 'unset', 'touch-action': 'unset' })
  })

  $('.c-menu__click').click(function () {
    const submenu = $(this).next('.c-menu__submenu--dropdown')
    // $('.c-menu__dropdown').not(submenu).slideUp(300)
    // $('.c-menu__click').not(this).removeClass('active')

    submenu.slideToggle(300)
    $(this).toggleClass('active')
  })
}

function scrollToTop() {
  const $backtotop = $('#s-backtotop')
  const $header = $('#header')
  const $groupBtn = $('.c-group__btns')

  $(window).on('load scroll', function () {
    const scrollTop = $(this).scrollTop()
    const scrollHeight = $(document).height()
    const clientHeight = $(this).height()
    const isSP = $(this).width() <= 767
    const nearBottom =
      scrollTop + clientHeight >= scrollHeight - (isSP ? 1100 : 871)

    // Back to Top button visibility
    if (scrollTop > 300) {
      $backtotop.toggleClass('c-backToTop--fixed', nearBottom)
    } else {
      $backtotop.addClass('c-backToTop--fixed')
    }

    if (scrollTop > 100) {
      $header.addClass('c-header--view')
      $backtotop.fadeIn()
      $groupBtn.addClass('is-fixed')
    } else {
      $header.removeClass('c-header--view')
      $backtotop.fadeOut()
      $groupBtn.removeClass('is-fixed')
    }
  })

  $backtotop.click(function () {
    $('html, body').animate({ scrollTop: 0 }, 1200)
    return false
  })
}

// SLIDER
function worksSlider() {
  new Swiper('.top-mainvisual__slider', {
    loop: true,
    speed: 2000,
    effect: 'fade',
    spaceBetween: 0,
    autoplay: {
      delay: 5000,
    },
  })

  new Swiper('.top-works__slider', {
    speed: 1000,
    slidesPerView: 'auto',
    spaceBetween: 20,
    autoplay: {
      delay: 3000,
    },
    scrollbar: {
      el: '.swiper-scrollbar',
      hide: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 'auto',
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 'auto',
        spaceBetween: 40,
      },
    },
  })
}

function sideBar() {
  $('.c-sidebar__show').click(function () {
    const submenu = $(this).next('.c-sidebar__sub')
    $('.c-sidebar__sub').not(submenu).slideUp(300)
    $('.c-sidebar__show').not(this).removeClass('active')

    submenu.slideToggle(300)
    $(this).toggleClass('active')
  })
}

function formShema() {
  $('form').on('submit', function (e) {
    e.preventDefault()

    let isValid = true

    $('.c-contact__form--error').text('')
    const name = $('#name').val().trim()
    const furigana = $('#furigana').val().trim()
    const phone = $('#phone').val().trim()
    const phoneDigits = phone.replace(/[^0-9]/g, '')
    const email = $('#email').val().trim()
    // const emailConfirm = $('#emailConfirm').val().trim()
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    const radioChecked = $('input[name="inquiry"]:checked').length > 0
    if (!radioChecked) {
      $('.js-error-radio').text('このフィールドに入力してください。')
      isValid = false
    }
    // お名前
    if (name === '') {
      $('.js-error-name').text('このフィールドに入力してください。')
      $('#name').css('border', '2px solid red')
      isValid = false
    } else {
      $('#name').css('border', '2px solid white')
    }
    if (furigana === '') {
      $('.js-error-furigana').text('してください。この項目は必須です。')
      $('#furigana').css('border', '2px solid red')
      isValid = false
    } else {
      $('#furigana').css('border', '2px solid white')
    }

    if (phone === '' || phoneDigits.length < 10 || phoneDigits.length > 11) {
      $('.js-error-phone').text('電話番号は10〜11桁で入力してください。')
      $('#phone').css('border', '2px solid red')
      isValid = false
    } else {
      $('#phone').css('border', '2px solid white')
    }

    // メールアドレス
    if (email === '') {
      $('.js-error-email').text('メールアドレスを入力してください。')
      $('#email').css('border', '2px solid red')
      isValid = false
    } else if (!regexEmail.test(email)) {
      $('.js-error-email').text('正しいメールアドレスを入力してください。')
      $('#email').css('border', '2px solid red')
      isValid = false
    }
    // else if (email !== emailConfirm) {
    //   $('.js-error-emailConfirm').text('メールアドレスが一致しません。')
    //   $('#email').css('border', '2px solid white')
    //   $('#emailConfirm').css('border', '2px solid red')
    //   isValid = false
    // }
    else {
      $('#email').css('border', '2px solid white')
      // $('#emailConfirm').css('border', '2px solid white')
    }

    if (isValid) {
      console.log('フォームは正常に入力されました。')
      this.submit()
    }
  })
}

function menuPath() {
  $(document).ready(function () {
    const currentUrl = window.location.pathname

    $('.c-menu__text').each(function () {
      const link = $(this).attr('href')

      if (link && currentUrl.includes(link)) {
        $(this).addClass('active')
      }
    })
  })
}

function disableZoomInputOnMobile() {
  if (window.innerWidth < 768) {
    document
      .querySelector('meta[name=viewport]')
      ?.setAttribute(
        'content',
        'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
      )
  }
}

function run() {
  new universalParallax().init({
    speed: 8.0,
  })
  AOS.init({
    once: true,
  })
  handleMenu()
  scrollToTop()
  menuPath()
  disableZoomInputOnMobile()

  if (
    window.location.pathname === '/~training/caodinhthy/nest-house/' ||
    window.location.pathname ===
      '/~training/caodinhthy/nest-house/index.html' ||
    window.location.pathname === '/' ||
    window.location.pathname === '/index.html'
  ) {
    $('.c-header__group').removeClass('c-header__subgroup')
    worksSlider()
  } else {
    $('.c-header__group').addClass('c-header__subgroup')
  }

  if (
    window.location.pathname ===
      '/~training/caodinhthy/nest-house/about.html' ||
    window.location.pathname === '/about.html'
  ) {
    $('.c-header').removeClass('c-header--bg')
  }

  if (
    window.location.pathname === '/~training/caodinhthy/nest-house/blog.html' ||
    window.location.pathname ===
      '/~training/caodinhthy/nest-house/blog_detail.html' ||
    window.location.pathname === '/blog.html' ||
    window.location.pathname === '/blog_detail.html'
  ) {
    sideBar()
  }

  if (
    window.location.pathname ===
      '/~training/caodinhthy/nest-house/contact.html' ||
    window.location.pathname === '/contact.html'
  ) {
    formShema()
  }
}

$(function () {
  run()
})
