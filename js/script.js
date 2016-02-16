var preload = function(src, callback) {
  // Create a temporary image.
  var img = new Image();

  // Invoke the callback as soon as the image is loaded
  // Has to be set **before** the .src attribute. Otherwise
  // `onload` could fire before the handler is set.
  img.src = src;
  $(img).load(callback);


};

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
  load_background($('body').data('background'));
});



function load_background(background) {
  $("body").removeClass("hasloaded");
  if ($('body').width() > 920) {
    if (background != ''){
      preload(background, function() {
        $("body").addClass("hasloaded");
        $("body").css('background','#fff url('+background+') no-repeat top center fixed');
        $("body").css('backgroundSize', 'cover');
      });
    }
    else {
      $("body").addClass("hasloaded");
      $("body").css('backgroundImage','none');
      $("body").css('background', '#fff');

    }
  }
}

function expand_text(obj){
  var height;
  $('.text-wrapper').toggleClass('expanded');
  height = ($('.text-wrapper').hasClass('expanded') ? $('.post-text').height() + 20 : '200px');
  $('.text-wrapper').css('max-height', height);
  $('#expand-icon').toggleClass('swapped');
}
