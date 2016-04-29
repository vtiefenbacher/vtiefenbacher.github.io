var links = new Array;

function load_content(id, waypoint) {
  var url = $('#'+id).data('pageurl');

  $.get(url, function(data){
    // console.log('triggered: ' + url);
    var html = $.parseHTML(data);
    var newHTML = $(html).find( '.wrapper' ).html();
    // console.log(newHTML);
    $('#'+id).append(newHTML).fadeIn(200, function(){
      links.shift();
      // console.log('newLinks: '+links);

      currentProject = $('#'+id);
      // console.log(currentProject);
      waypoint.destroy();
      load_waypoint(currentProject, '75%');

      active_waypoint(currentProject, id);
    });

  })
}

$(document).ready(function(){


  var currentId = $('.post-content').data('pid');
  var currentProject = $('#'+currentId)
  var newDiv;
  var nextId;
  $('#_menuitem_'+currentId).nextAll().each(function(i, e){
    // console.log(i, e);
    links.push($(e).data('id'));
    newDiv = '<div class="wrapper" id='+ $(e).data('id') +' data-pageurl='+ $(e).data('url') +' >'
    $('.page-content').append(newDiv)
  })

  // Waypoint.offsetAliases['200pastbottom'] = function() {
  //   console.log(this.context.innerHeight() - this.adapter.outerHeight());
  //   return this.context.innerHeight() - this.adapter.outerHeight() - 200;
  //
  // }

  load_waypoint(currentProject, 'bottom-in-view');
  active_waypoint(currentProject, currentId);

});

function load_waypoint(cProject, offset) {
  console.log('new waypoint: ' + cProject);
  var waypoint = cProject.waypoint(function(direction) {
    // console.log(this.element.id + ' is here');
    nextId = links[0];
    // console.log('next: '+nextId);

    if(direction=='down'){
      console.log('TRIGGER: ' + nextId);
      load_content(nextId, this);
    }
  }, {
    offset: offset
  })
}

function active_waypoint(cProject, id) {

  var waypoint = cProject.waypoint(function(direction) {
    if (direction=='down'){
      $('.li-side.active').removeClass('active');
      $('#_menuitem_'+id).addClass('active');
      load_background($('#_menuitem_'+id).data('back'));
    }
  }, {
    offset: '75%'
  });
  var waypoint = cProject.waypoint(function(direction) {
    if (direction=='up'){
      $('.li-side.active').removeClass('active');
      $('#_menuitem_'+id).addClass('active');
      load_background($('#_menuitem_'+id).data('back'));
    }
  }, {
    offset: 'bottom-in-view'
  });
}
