$(document).ready(function(){
  var lastScrollTop = 0,
      scrollDirection,
      scrollTop,
      positionList = new Array(),
      activeLink = $('.li-side.active'),
      currentProject = activeLink.data('id');
  // $('.li-side').each(function(i, e) {
  //   console.log(i, e);
  // });



  function pushToList(id) {
    $('#'+id).imagesLoaded(function(){
      console.log($('#'+id).height());
      positionList.push(Array(
        $('#'+id).offset().top,
        $('#'+id).offset().top + $('#'+id).height(),
        id
      ));
      console.log(positionList);
    });
  }

  function makeActive(url, direction){
    activeLink.removeClass('active');
    if (direction == 'down') {
      activeLink.next().addClass('active');
      activeLink = activeLink.next();
    }
    // if (direction == 'up') {
    //   activeLink.prev().addClass('active');
    //   activeLink = activeLink.prev();
    // }
  }

  function makeLiActive(direction) {
    $.each(positionList, function(index, value){
      if (scrollTop >= positionList[index][0] && scrollTop <= positionList[index][1]){
        if (currentProject!=positionList[index][2]) {
          currentProject=positionList[index][2];
          console.log(currentProject);
          activeLink.removeClass('active');
          if (direction == 'down') {
            activeLink.next().addClass('active');
            activeLink = activeLink.next();
          }
          if (direction == 'up') {
            activeLink.prev().addClass('active');
            activeLink = activeLink.prev();
          }

          // $('.li-side.active').removeClass('active');
          // $('#li'+currentProject).addClass('active');

        }
      }
    });
  }

  function loadmore(url, direction, title) {
    console.log(url, direction);
    $.get(url, function(data){
      var html = $.parseHTML(data);
      var newHTML = $(html).find( '.page-content' ).html();
      // makeLiActive(url, direction);
      if (direction == 'down') {
        $('.page-content').append(newHTML);
        pushToList(title);
      }
      // if (direction == 'up') {
      //   $('.page-content').prepend(newHTML);
      // }
    })
  }

  $('#right-container').imagesLoaded(function(){
    positionList.push(Array(0, $('.wrapper').height(), $('.wrapper').attr('id')));
    console.log(positionList);
    if ($('.wrapper').height() <= $(window).height()) {
      if (activeLink.next().data('url')!=undefined) {
        var url = activeLink.next().data('url');
        loadmore(url, 'down', activeLink.next().data('id'));
      }
    }
  });

  function getScrollDirection() {
    var st = $(window).scrollTop();
    if (st > lastScrollTop) {
      scrollDirection = 'down';
      // console.log($(window).scrollTop());
    }
    else if (st < lastScrollTop) {
      scrollDirection = 'up';
    }
    lastScrollTop = st;
  }


  $(window).scroll(function() {
    scrollTop = $(window).scrollTop();
    getScrollDirection();
    makeLiActive(scrollDirection);
    if(scrollTop == $(document).height() - $(window).height()) {
      if (activeLink.next().data('url')!=undefined) {
        var url = activeLink.next().data('url');
        loadmore(url, scrollDirection, activeLink.next().data('id'));
      }
      else {console.log('endofpage');}
    }
    // if(scrollTop == 0) {
    //   console.log('starti');
    //   if (activeLink.prev().data('url')!=undefined) {
    //     var url = activeLink.prev().data('url');
    //     loadmore(url, scrollDirection);
    //   }
    //   else {console.log('startofpage');}
    // }
  });
});
