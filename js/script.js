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
  //***** audio ****

  $('.play-button').click(function(){
    console.log('play');
    $('.button-animate').removeClass('button-animate');
    $(this).addClass('button-animate');
    $(this).parents().prev('audio').get(0).play();
  })
  $('.pause-button').click(function(){
    if (!$(this).parents().prev('audio').get(0).paused){
      $('.button-animate').removeClass('button-animate');
      $(this).addClass('button-animate');
      $(this).parents().prev('audio').get(0).pause();
    }
  })
  $('.stop-button').click(function(){
    $('.button-animate').removeClass('button-animate');
    $(this).parents().prev('audio').get(0).pause();
    $(this).parents().prev('audio').get(0).currentTime = 0;
  })
  // ***** menu hover to highlight thumbnails *****
  $('.pin').hover(function(e) {
    var id = $(this).data('id');
    $('#_menuitem_'+id).addClass('active');
  });
  $('.pin').mouseleave(function(e) {
    var id = $(this).data('id');
    $('#_menuitem_'+id).removeClass('active');
  });
  $('.li-side a').hover(function(e) {
    var id = $(this).parent('.li-side').attr('id');
    console.log(id);
    id = id.replace('_menuitem_', '');
    console.log(id);
    $('[data-id='+id+']').addClass('hovered');

  });
  $('.li-side a').mouseleave(function(e) {
    var id = $(this).parent('.li-side').attr('id');
    id = id.replace('_menuitem_', '');
    $('[data-id='+id+']').removeClass('hovered');
  });

  if (!$('#content-container').hasClass('mobile')){
    $('#side-menu').slicknav({
      label: '',
      prependTo: '#home-link-mobile'
    });
  }
  $('.pin img').load(function() {}).each(function(i, e){
    $(e).closest('.pin').addClass('loaded');
  })
  // if ($('.post-text').text()=='') {
  //   console.log('s empty');
  // }
  load_background($('body').data('background'));



});



function load_background(background) {
  // $("body").removeClass("hasloaded");
  // if ($('body').width() > 920 || $('body').data('mobileback')=='1') {
  //   if (background != undefined){
  //     // $('body').append('<div id="fakeBack"></div>');
  //     // $('#fakeBack').css('background','#fff url('+oldBackground+') no-repeat top center fixed')
  //     // console.log(background);
  //     console.log(background);
  //     preload(background, function() {
  //
  //       $("body").addClass("hasloaded");
  //       $("body").css('background','#fff url('+background+') no-repeat top center fixed');
  //       $("body").css('backgroundSize', 'cover');
  //
  //     });
  //   }
  //   else {
  //     // console.log(background);
  //     preload(background, function() {
  //       $("body").addClass("hasloaded");
  //       $("body").css('backgroundImage','none');
  //       $("body").css('background-color', '#fff');
  //     });
  //   }
  // }
}



// function pushToList(id) {
//   $('#'+id).imagesLoaded(function(){
//     console.log();
//     // console.log($('#'+id).height());
//     positionList.push(Array(
//       $('#'+id).offset().top,
//       $('#'+id).offset().top + $('#'+id).height(),
//       id
//     ));
//     // console.log(positionList);
//   });
// }

// function updatePositionList(id) {
//   $.each(positionList, function(index, value) {
//
//     var obj = positionList[index][2];
//     console.log($('#' + obj).height());
//     positionList[index][0] = $('#' + obj).offset().top;
//     positionList[index][1] = $('#' + obj).offset().top + $('#' + obj).height();
//     console.log(positionList[index]);
//   })
// }

function expand_text(obj){
  var height;
  var $wrapper = $(obj).children('.text-wrapper');
  $wrapper.toggleClass('expanded');
  height = ($wrapper.hasClass('expanded') ? $wrapper.children('.post-text').height() + 20 : '200px');
  $wrapper.css('max-height', height);
  $wrapper.siblings('.expand-icon').toggleClass('swapped');
  setTimeout(function(){
    updatePositionList($(obj).data('pid'));
  }, 1000)
}
