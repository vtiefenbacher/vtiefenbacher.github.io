// $("#loadingDiv").show();


$(document).ready(function(){
  $('#side-menu').slicknav({
    label: '',
    prependTo: '#home-link-mobile'
  });

  var nImages = $("#gallery img").length;
  var loadCounter = 0;
  console.log(nImages);
  //binds onload event listner to images
  $("#gallery img").on("load", function() {
    console.log('loadCounter');
    loadCounter++;
    if(nImages == loadCounter) {
      $(this).parent().fadeIn(1000);
      // $("#loadingDiv").hide();
    }
  }).each(function() {
    if(this.complete) $(this).trigger("load");
  });
});


function expand_text(obj){
  $(obj).addClass('expanded');

}
