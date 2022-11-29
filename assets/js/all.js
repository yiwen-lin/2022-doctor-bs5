
$(document).ready(function() {
  var $siteNav = $('[data-js-id="site-nav"]'),
      siteNav_height = $siteNav.outerHeight(true);
  var op_height= $('.op-overlay').outerHeight(true);
  var $stickyDocNav = $('[data-js-id="doctor-nav"]'),
      docNav_height = $stickyDocNav.outerHeight(true),
      docNav_offsetTop = $stickyDocNav.offset().top;
  var $introImg = $('[data-js-id="intro-img"]'),
      introImg_height = $introImg.outerHeight(true);
      
  $('[data-js-tabs="true"]').tabs();
    $('[data-js-anchor="true"]').on('click', function (e) {
      e.preventDefault();
      //切換tab
      var tab_id = $(this).data('tab-target');
      $('[data-tab-target-id="' + tab_id + '"]').trigger('click');
      //滾動至anchor目標區塊
      var obj = $(this).attr("href");
      $('html,body').animate({
        scrollTop: $(obj).offset().top - (docNav_height*2)
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
    
    $(window).on('scroll',function(){
      var scroll_dis = $(this).scrollTop();
          
      if (scroll_dis >= (op_height - siteNav_height)) {
        $siteNav.addClass('active');
      } else {
        $siteNav.removeClass('active');
      }
      if (scroll_dis >= (docNav_offsetTop - docNav_height*2)) {
        $stickyDocNav.addClass('sticky').css({
          'top' : siteNav_height + 'px'
        });
      } else {
        $stickyDocNav.removeClass('sticky');
      }

      if (scroll_dis >= (docNav_offsetTop - siteNav_height - (docNav_height * 2))) {
        $('.tab__panel.current').find('[data-js-id="intro-img"]').addClass('visible');
      } else {
        $('.tab__panel.current').find('[data-js-id="intro-img"]').removeClass('visible');
      }
    });

    //close side nav
    $('[data-js-is="close-sidenav"]').on('click',function(e){
      e.preventDefault();
      $('#navbarSide').removeClass('reveal');
      $('.overlay').hide();
    });

    //小檔案的click
    $('[data-js-id="info-btn"]').on('click', function(e){
      e.stopPropagation();
      var $info_box = $(this).next('[data-js-id="info-box"]'),
          boxIsVisible = $info_box.hasClass('info-visible');
      if (boxIsVisible) {
        $(this).find('[data-js-id="btn-txt"]').text('小檔案');
        $info_box.removeClass('info-visible');
      } else {
        $(this).find('[data-js-id="btn-txt"]').text('關閉');
        $info_box.addClass('info-visible');
      }
    });

     //lightGallery
     var $dynamicGallery = $('[data-js-id="open-popup"]');
     $dynamicGallery.on('click', function(e){
       e.preventDefault();
       //get doctor number
       let $target = $(this).data('recommend-num'); 
       if (doctors[$target] !== undefined) {
         let $images = doctors[$target];
         let $baseUrl = 'assets/images/recommend/';
         let $setImage = '';
 
         for(let $i in $images) {
           let $imageUrl = $baseUrl + $images[$i] + '.jpg';
           $setImage += `<img src="${$imageUrl}">`
         }
 
         if ($setImage !== undefined) {
           $('#galleryBlock').html($setImage);
 
           const lg = document.getElementById('galleryBlock');
 
           lightGallery(lg,{
             download: false,
             actualSize: false,
             plugins: [lgZoom],
             zoom: true,
             showZoomInOutIcons: true,
             mobileSettings: {
              showCloseIcon: true,
            }
           });
 
           $('#galleryBlock').find('img').trigger('click');
         }
       }
     });

     //click tab and scroll to tab__content top
     $('[data-id="js-tab"]').on('click', function(){
        $(window).scrollTop($('.tab__content').offset().top - (docNav_height*2));
     });
});