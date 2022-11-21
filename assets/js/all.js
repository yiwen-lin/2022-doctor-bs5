
$(document).ready(function() {

  $('[data-js-tabs="true"]').tabs();
      $('[data-js-anchor="true"]').on('click', function (e) {
        e.preventDefault();
        //切換tab
        var tab_id = $(this).data('tab-target');
        $('[data-tab-target-id="' + tab_id + '"]').trigger('click');
        //滾動至anchor目標區塊
        var obj = $(this).attr("href");
        $('html,body').animate({
          scrollTop: $(obj).offset().top
        }, 800);
        return false;
      });

    // navbar side
    $('#navbarSideButton').on('click', function() {
      $('#navbarSide').addClass('reveal');
      $('.overlay').show();
    });

    $('.overlay').on('click', function(){
      $('#navbarSide').removeClass('reveal');
      $('.overlay').hide();
    });

    $('.navbarSide-li').on('click', function(){
      $('#navbarSide').removeClass('reveal');
      $('.overlay').hide();
    });

    //fix doctor nav bar
    //navbar add color
    //intro-img add opacity to show text
    var $siteNav = $('[data-js-id="site-nav"]'),
        siteNav_height = $siteNav.outerHeight(true);
    var op_height= $('.op-overlay').outerHeight(true);
    var $stickyDocNav = $('[data-js-id="doctor-nav"]'),
        docNav_height = $stickyDocNav.outerHeight(true),
        docNav_offsetTop = $stickyDocNav.offset().top;
    var $introImg = $('[data-js-id="intro-img]'),
        introImg_height = $introImg.outerHeight(true);
    $(window).on('scroll',function(){
      var scroll_dis = $(this).scrollTop();
          
      if (scroll_dis >= (op_height - siteNav_height)) {
        $siteNav.addClass('active');
      } else {
        $siteNav.removeClass('active');
      }
      if (scroll_dis >= (docNav_offsetTop - docNav_height)) {
        $stickyDocNav.addClass('sticky').css({
          'top' : siteNav_height + 'px'
        });
      } else {
        $stickyDocNav.removeClass('sticky');
      }

      if (scroll_dis >= (docNav_offsetTop - docNav_height - (introImg_height*1.5))) {
        $('[data-js-id="intro-img"]').addClass('visible')
      }
    });

    //close side nav
    $('[data-js-is="close-sidenav"]').on('click',function(e){
      e.preventDefault();
      $('#navbarSide').removeClass('reveal');
      $('.overlay').hide();
    });

    //給白：小檔案的click toggle效果
    $('.info-btn').on('click', function(){
      $('.info-box').addClass('info-visible');
    });

});