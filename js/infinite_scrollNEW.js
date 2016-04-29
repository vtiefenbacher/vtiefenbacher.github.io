var links = new Array;

function load_content(id) {
  var url = $('#'+id).data('pageurl');
  console.log('triggered');
  $.get(url, function(data){
    var html = $.parseHTML(data);
    var newHTML = $(html).find( '.wrapper' ).html();
    // console.log(newHTML);
    $('#'+id).append(newHTML).fadeIn();
    links.shift();
    // console.log(links);

    currentProject = $('#'+id);
    console.log(currentProject);
    load_waypoint(currentProject);
    active_waypoint(currentProject, id);
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
    newDiv = '<div class="wrapper" id='+ $(e).data('id') +' data-pageurl='+ $(e).data('url') +' style="display: none;">'
    $('.page-content').append(newDiv)
  })

  Waypoint.offsetAliases['200-past-bottom'] = function() {
    return this.context.innerHeight() - this.adapter.outerHeight() + 200
  }

  load_waypoint(currentProject);
  active_waypoint(currentProject, currentId);

});

function load_waypoint(cProject) {
  var waypoint = cProject.waypoint(function(direction) {
    // console.log(this.element.id + ' is here');
    nextId = links[0];
    console.log(links);
    // console.log('next: '+nextId);

    if(direction=='down'){
      load_content(nextId);
    }
    this.destroy();
  }, {
    offset: '200-past-bottom'
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
