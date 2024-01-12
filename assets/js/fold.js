function extractLinks(str) {
  // Regular expression to match the pattern
  const regex = /\[(.*?)\]\(((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*)\)/g;

  // Use the matchAll() method to find all matches
  const matches = [...str.matchAll(regex)];
  matches.map(match => {
    const linkStr = match[0];
    str = str.replace(linkStr, `<font color="#5F699F"><a href="${match[2]}">${match[1]}</a></font>`);
  });

  return str;
}

function addFoldButton(name,show_num){
  $(`#${name}ItemList .p_item`).each(function(index) {
    if (index >= show_num) {
      $(this).hide();
    }
  });

  $(`#${name}ItemList`).next('.load_items').addClass('folded');
}

// Add unfold/fold function to the items
function toggleItems(pItems, foldState, show_num) {
  pItems.each(function(index) {
    if (foldState && index >= show_num) {
      $(this).hide();
    } else {
      $(this).show();
    }
  });
}

$(document).ready(function() {
  var highlight_num = 6;
  var show_num = 8;
  
  // Load News ---------------------------------
  var newsName = "News";
  $.get(`./assets/js/files/${newsName}.txt`, function(data) {
    var lines = data.split("\n");
    var result = [];
    for (var i = 0; i < lines.length; i++) {
      var item = lines[i].split(" ");
      var item_date = item[0];
      var item_content = item.slice(1).join(" ");
      var className = (i < highlight_num) ? 'newdatenew' : 'newdateold';
      item_content = extractLinks(item_content)
      result.push(`<p class="p_item"><span class=${className}><news_font_new>${item_date}</news_font_new></span><span class="item_content">${item_content}</span></p>`);
    }
    var itemList = result.join("");
    $(`#${newsName}ItemList`).html(itemList);

    $(`#${newsName}ItemList .p_item`).each(function(index) {
      if (index >= show_num) {
        $(this).hide();
      }
    });
    addFoldButton(newsName,show_num)
    // var loadItems = $(`#${newsName}ItemList`).next('.load_items');
    // loadItems.addClass('folded');
  });

  // Loaded Awards ---------------------------------
  var awardName = "Awards";
  $.get(`./assets/js/files/${awardName}.txt`, function(data) {
    var lines = data.split("\n");
    var result = [];
    for (var i = 0; i < lines.length; i++) {
      var item = lines[i].split(" ");
      var item_date = item[0];
      var isHighlight = item_date.includes("*");
      item_date = item_date.replace("*", "");
      var item_content = item.slice(1).join(" ");

      if(isHighlight){
        content_block = `<b><font color="#ce1030">${item_content}</font><br /></b>`
      }
      else{
        content_block = item_content;
      }
      result.push(`<p class="p_item"><span class="item_content">${item_date}</span><span class="item_content">${content_block}</span></p>`);
    }
    var itemList = result.join("");
    $(`#${awardName}ItemList`).html(itemList);

    addFoldButton(awardName,show_num)
    
    
  });
  
  // Attach click event to the load_items button ---------------------------------
  $(".load_items").click(function() {
    var pItems = $(this).prev().find('.p_item');
    var foldState = $(this).hasClass('folded');
    toggleItems(pItems, foldState, show_num);
    $(this).toggleClass('folded');
    $(this).text(foldState ? 'Load More...' : 'Fold');
    $(this).data('foldState', !foldState); // Save the updated foldState
  });
});


// $(document).ready(function(){
//   $(".load_items").click(function(){

//     // $("#news").toggleClass('class_news');
//     $(this).prev().toggleClass('class_news');
//   //   if 
//     $(this).text(function(i,oriText){
//       if(oriText == 'Load More...') {
//           $(this).text('Fold');
//       }
//       else{
//           $(this).text('Load More...');
//       }
//       return ;
//     });
    
//   });

// });