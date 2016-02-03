$(document).ready(function(){
  $('#home-link').click(function(){
    $('.active-sub').hide();
    $('.active-sub').removeClass('active-sub');
    $('.active').removeClass('active');
  })

  $('.menu-item').click(function(e){
    $('.active-sub').hide();
    $('.active-sub').removeClass('active-sub');
    $('.active').removeClass('active');
    $(this).children('.submenu').addClass('active-sub').show();
    $(this).children('a').addClass('active');
  });
});
