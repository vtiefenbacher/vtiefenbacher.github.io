
$(document).ready(function(){
  $('#side-menu').slicknav({
    label: '',
    prependTo: '#home-link-mobile'
  });
  $('.pin img').load(function() {}).each(function(i, e){
    $(e).closest('.pin').addClass('loaded');
  })

});


function expand_text(obj){
  $(obj).addClass('expanded');

}
