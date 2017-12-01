function hasTouch() {
  return 'ontouchstart' in document.documentElement ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0;
}

if (hasTouch()) { // remove all :hover stylesheets
  try { // prevent exception on browsers not supporting DOM styleSheets properly
    for (var si in document.styleSheets) {
      var styleSheet = document.styleSheets[si];
      if (!styleSheet.rules) continue;

      for (var ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
        if (!styleSheet.rules[ri].selectorText) continue;

        if (styleSheet.rules[ri].selectorText.match(':hover')) {
          styleSheet.deleteRule(ri);
        }
      }
    }
  } catch (ex) {}
}
var setSingleArticle = function(articleId) {
  var html = "";
  var tw = '<div><a class="twitter-share-button"  href="https://twitter.com/intent/tweet?text='+window.location.href+"&hashtag="+articleId+'"><img src="dist/img/twitter.jpg"></a></div>';
  var sm = '<div class="socialMedia">'+tw+'<div class="fb-share-button" data-href="http://thediomed.com" data-layout="button_count" data-size="small" data-mobile-iframe="true"><a class="fb-xfbml-parse-ignore" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fthediomed.com%2F&amp;src=sdkpreparse"><img src="dist/img/fb.jpg"></a></div></div>';

  for (var i = 0; i < articles.length; i++) {

    if (articleId === articles[i].id) {

      html += '  <div class="singleArticleContainer">';
      html += '      <img class="mainImage lazyload" data-size="auto" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAoMBgDTD2qgAAAAASUVORK5CYII=" data-src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAoMBgDTD2qgAAAAASUVORK5CYII=" ';
      html += 'data-srcset="' + articles[i].pic + '-360.jpg 360w,';
      html += articles[i].pic + '-640.jpg 640w,';
      html += articles[i].pic + '-900.jpg 900w,';
      html += articles[i].pic + '-1200.jpg 1200w" alt="logo" />';
      html += '    <div class="articleTitle">' + articles[i].title + '</div>';
      html += '    <div class="singleStatsContainer">';
      html += '      <div class="singleArticleDate">' + new Date(articles[i].year, articles[i].month, articles[i].day).toDateString() + '</div>';
      html += '      <div class="singleArticleAuthor">' + articles[i].author + '</div>';
      html += '    </div>'+sm;
      html += '    <div class="singleDivider"></div>';
      html += '     <div class="singleContent">' + articles[i].content + '<div>';
      html += '    <div>';

      break;
    }

  }
  $(".allArticleContainer").html(html);
  window.location.hash = articleId;
  var x=0;
  var interv = setInterval(function(){
    x++;
    //console.log("interv "+x);
    if (DISQUS){
      reset(articleId);
      clearInterval(interv);
    }
    else if(x===10){//failed disqus
      clearInterval(interv);
    }
  },1000);

  $("#disqus_thread").show();
  //setArticles(articleId, true);
};
var setArticles = function(articleId, isAppend) {
  $("#disqus_thread").hide();
  //console.log("setArticles "+articleId+" "+ isAppend);
  var html = "";
  for (var i = 0; i < articles.length; i++) {
    if (isAppend && articleId === articles[i].id)
      continue;
    html += '<a class="linkToSingle" data-id="' + articles[i].id + '" href="#">';
    html += '  <div class="articleContainer">';
    html += '    <div class="articleTitle grow">' + articles[i].title + '</div>';
    html += '    <div class="imgAndSummaryContainer"><div class="articleImageContainer">';
    html += '      <img class="lazyload" data-size="auto" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAoMBgDTD2qgAAAAASUVORK5CYII=" data-src="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAoMBgDTD2qgAAAAASUVORK5CYII"';
    html += ' data-srcset="' + articles[i].pic + '-180.jpg 360w,';
    html += articles[i].pic + '-360.jpg 640w," alt="pic" /></div>';
    html += '      <span>' + articles[i].teaser + '<span>';
    html += '    </div>';
    html += '    <div class="statsContainer">';
    html += '      <div class="articleDate">' + new Date(articles[i].year, articles[i].month, articles[i].day).toDateString() + '</div>';
    html += '    </div>';
    html += '    <div>';
    html += '    </div>';
    html += '  </div>';
    html += '</a>';
  }
  if (articleId && isAppend) {
    $(".allArticleContainer").append(html);
  } else {
    $(".allArticleContainer").html(html);
  }
  $('html,body').scrollTop(0);

};
var initEvents = function() {
  $(".allArticleContainer").on("click touch", ".linkToSingle", function() {
    var id = Number($(this).attr("data-id"));
    setSingleArticle(id);
  });
  $(".middle, .footerHome").on("click touch", function() {
    setArticles();
  });
};
$(document).ready(function() {
  $(".dateContainer").text(new Date().toDateString());
  var id = Number(window.location.hash.substr(1));
  if (id){
  setSingleArticle(id);
  }
  else{
  setArticles();
  }
  initEvents();
});
