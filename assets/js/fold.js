
$(document).ready(function(){
  $(".load_items").click(function(){

    // $("#news").toggleClass('class_news');
    $(this).prev().toggleClass('class_news');
  //   if 
    $(this).text(function(i,oriText){
      if(oriText == 'Load More...') {
          $(this).text('Fold');
      }
      else{
          $(this).text('Load More...');
      }
      return ;
    });
    
  });

});