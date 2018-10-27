(function ($) {
  'use strict'

  /* menu  sticky */
  var header = $('.header-sticky')
  var win = $(window)

  win.on('scroll', function () {
    var scroll = win.scrollTop()
    if (scroll < 245) {
      header.removeClass('sticky')
    } else {
      header.addClass('sticky')
    }
  })

  /* mobile-menu  */
  $('.main-menu nav').meanmenu({
    meanScreenWidth: '991',
    meanMenuContainer: '.mobile-menu'
  })

  /* imagesLoaded  */
  $(document).ready(function () {
    // filter items on button click
    $('.portfolio-menu').on('click', 'button', function () {
      var filterValue = $(this).attr('data-filter')
      $grid.isotope({
        filter: filterValue
      })
    })
    // init Isotope
    var $grid = $('.grid').isotope({
      itemSelector: '.grid-item',
      percentPosition: true,
      masonry: {
        // use outer width of grid-sizer for columnWidth
        columnWidth: '.grid-item'
      }
    })
  })

  /* portfolio menu  */
  $('.portfolio-menu button').on('click', function (event) {
    $(this).siblings('.active').removeClass('active')
    $(this).addClass('active')
    event.preventDefault()
  })

  /* menu-toggle */

  var menutoggle = $('.menu-toggle')
  var mainmenu = $('.main-menu nav')

  menutoggle.on('click', function () {
    if (menutoggle.hasClass('is-active')) {
      mainmenu.removeClass('menu-open')
    } else {
      mainmenu.addClass('menu-open')
    }
  })

  /* Hamburger js */
  var forEach = function (t, o, r) {
    if (Object.prototype.toString.call(t) === '[object Object]') { for (var c in t) Object.prototype.hasOwnProperty.call(t, c) && o.call(r, t[c], c, t)} else { for (var e = 0, l = t.length; l > e; e++) o.call(r, t[e], e, t) }
  }

  var hamburgers = document.querySelectorAll('.hamburger')
  if (hamburgers.length > 0) {
    forEach(hamburgers, function (hamburger) {
      hamburger.addEventListener('click', function () {
        this.classList.toggle('is-active')
      }, false)
    })
  }
})(jQuery)
