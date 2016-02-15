
$(document).ready(function(){
  $('#side-menu').slicknav({
    label: '',
    prependTo: '#home-link-mobile'
  });
  $('.pin img').load(function() {}).each(function(i, e){
    $(e).closest('.pin').addClass('loaded');
  })
  // if ($('.post-text').text()=='') {
  //   console.log('s empty');
  // }
  if ($('body').width() > 920) {
    var background = $('body').data('background');
    if (background != ''){
      $('body').css('backgroundImage', 'url('+background+')');
      load_background();
    }
  }
});

function load_background() {
  $('body').imagesLoaded(function(){
    $('body').addClass('hasloaded');
  })
}

function expand_text(obj){
  var height;
  $('.text-wrapper').toggleClass('expanded');
  height = ($('.text-wrapper').hasClass('expanded') ? $('.post-text').height() + 20 : '200px');
  $('.text-wrapper').css('max-height', height);
  $('#expand-icon').toggleClass('swapped');
}
