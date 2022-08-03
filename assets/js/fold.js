// function shoppingcat(){
//     var id = document.getElementById("news");
//  var key = document.getElementById("load_news").innerText;
//  if(key==="Load More"){
//   id.style.height=570+"px";
//   document.getElementById("load_news").innerText="Fold";
//  }else{
//      id.style.height=500+"px";
//   document.getElementById("load_news").innerText="Load More";
//  }
// }

// $(document).ready(function(){
//     $("#load_news").click(function(){
//       $("#news").toggleClass('class_news');
//     //   if 
//       $("#load_news").text(function(i,oriText){
//         if(oriText == 'Load More...') {
//             $("#load_news").text('Fold');
//         }
//         else{
//             $("#load_news").text('Load More...');
//         }
//         return ;
//       });
      
//     });

// });

$(document).ready(function(){
  $("#load_awards").click(function(){
    $("#awards").toggleClass('class_awards');
  //   if 
    $("#load_awards").text(function(i,oriText){
      if(oriText == 'Load More...') {
          $("#load_awards").text('Fold');
      }
      else{
          $("#load_awards").text('Load More...');
      }
      return ;
    });
    
  });

});


$(document).ready(function(){
  $(".load_news").click(function(){

    // $("#news").toggleClass('class_news');
    $(this).prev().toggleClass('class_news');
  //   if 
    $(".load_news").text(function(i,oriText){
      if(oriText == 'Load More...') {
          $(".load_news").text('Fold');
      }
      else{
          $(".load_news").text('Load More...');
      }
      return ;
    });
    
  });

});