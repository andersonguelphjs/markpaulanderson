/* JavaScript Media Queries */ ;
(function($, window) {
  if (matchMedia) {
    var mq = window.matchMedia("(min-width: 901px)");
    mq.addListener(widthChange);
    widthChange(mq);
  }

  // media query change
  function widthChange(mq) {
    console.log("width over 901");
    var msg = (mq.matches ? "more" : "less") + " than 901 pixels";
    if (mq.matches) {
      console.log("over 901 " + msg);
      $(document).ready(function(){
        $("#newsContainer").find(".item").off("click");
        $(document).on('click', '[data-lightbox]', lity);
      })
    } else {
      $(document).ready(function(){
        $(document).on('off', '[data-lightbox]');
        $("#newsContainer").find(".item").on("click", function() {
          console.log(".content");
          $(this).find(".content").toggleClass("long");
        })

      })

      console.log("no matches");
    }
  }

  var topSliderData = [{
      "id": 1,
      "imgSrc": "dist/assets/images/one/blinds",
      "imgOpacity":"0.7",
      "ext": ".png",
      "topMsg": "1 in 5 Canadians will experience mental illness in their lifetime. <br><br>With your support, we can change that.",
      "bottomMsg": "we can change that"
    },
    {
      "id": 2,
      "imgSrc": "dist/assets/images/one/carolSophie",
      "imgOpacity":"0.7",
      "ext": ".jpg",
      "topMsg": "Since 2016, we’ve raised awareness of mental illness and over $1m to fund new research into its causes.",
      "bottomMsg": "learn more below"
    },
    {
      "id": 3,
      "imgSrc": "dist/assets/images/one/green",
      "imgOpacity":"0.9",
      "ext": ".png",
      "topMsg": "Show your support by joining us on March 27, 2018 for the Miner’s Lamp Award Dinner.",
      "bottomMsg": "event details below"
    }
  ]

  $(document).ready(function() {

    function initEvents() {
      /*section nav and top slider*/
      $("#hamburger").on("click", function() {
        $(".navigation,.overlay").addClass("open");
      })
      $(".overlay,.navigation").on("click", function() {
        $(".overlay,.navigation").removeClass("open");
      })
      /*section two*/
      $("#titleContainer").find("div").on("click", function() {
        var id = $(this).attr("data-id");
        $("#titleContainer").find("span").removeClass("showingChild");
        $(this).find("span").addClass("showingChild");
        $(".quote[data-id]").css("display", "none");
        $(".quote[data-id='" + id + "']").fadeIn("fast");
      })
/*
      $(".startOwl").on("click", function(){
        var startPos = $(this).attr("data-start");
        console.log("ioone!");
        $(".lilyItem").hide();

      })*/

      $('button,a[href*="#"]')
        // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function(event) {
          // On-page links
          if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
            &&
            location.hostname == this.hostname
          ) {
            // Figure out element to scroll to
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            // Does a scroll target exist?
            if (target.length) {
              // Only prevent default if animation is actually gonna happen
              event.preventDefault();
              $('html, body').animate({
                scrollTop: target.offset().top
              }, 1000, function() {
                // Callback after animation
                // Must change focus!
                var $target = $(target);
                $target.focus();
                if ($target.is(":focus")) { // Checking if the target was focused
                  return false;
                } else {
                  $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
                  $target.focus(); // Set focus again
                };
              });
            }
          }
        });


      $(document).on('lity:open', function(event, instance) {
          console.log('Lightbox opened');

          $('.owl-news').owlCarousel({
            center: false,
            items:1,
            loop: true,
            nav: false,
          //  startPosition:startPos,
            dots: false,
            onDestroy:function (){
              console.log("destoryed@!!");
            }
          });

      });

      $("body").on("click", ".lity-close",function(){
        console.log("closed owl");
        $('.owl-news').owlCarousel('destroy');
        });
/*
      $("#newsContainer").find(".content").on("click", function() {
        console.log(".content");
        $(this).toggleClass("long");
      })
      */

      $(".sectionThreeItemContainer").on("click", function() {
        console.log(".content");
        $(this).find(".sectionThreeItemBlurb").toggleClass("long");
      })
      $(".logoCaretContainer").find(".more").on("click", function() {
        console.log(".logoListAllContainer");
        $(".logoListAllContainer").toggleClass("long");
      });
      $(".contentContainer").on("click", function() {
        console.log(".contentBox");
        $(this).find(".contentBox").toggleClass("long");
      });

    }

    function initTopSlider() {
      var topSliderHtml = "";
      for (var i = 0; i < topSliderData.length; i++) {
        topSliderHtml += "<div class='item' data-id='" + topSliderData[i].id + "'>";
        topSliderHtml += "<img style='opacity:"+topSliderData[i].imgOpacity+"' class='topSliderImg' src='" + topSliderData[i].imgSrc + "-320" + topSliderData[i].ext + "'" +
          " srcset='" + topSliderData[i].imgSrc + "-640" + topSliderData[i].ext + " 640w, " +
          topSliderData[i].imgSrc + "-900" + topSliderData[i].ext + " 900w, " +
          topSliderData[i].imgSrc + "-1200" + topSliderData[i].ext + " 1200w' alt='" + topSliderData[i].imgSrc + topSliderData[i].id + "'>";

        topSliderHtml += "<div class='topSliderTopMsg'>" + topSliderData[i].topMsg + "</div>";
        //topSliderHtml += "<div class='topSliderBottomMsg'>" + topSliderData[i].bottomMsg + "</div>";
        topSliderHtml += "<span><a href='#titleContainer'><img class='topSliderCaret' src='dist/assets/svg/OffWhiteCarat.svg'></a></span></div>";
      }
      console.log(topSliderHtml);

      $('.owl-one').html(topSliderHtml).owlCarousel({
        loop: true,
        autoplay: false,
        dots: false,
        responsive: {
          0: {
            items: 1
          }
        }
      });
    }
    var carouselChanged = function(event) {
      $("#newsContainer").find(".content").removeClass("long");
    };

    $('.owl-two').owlCarousel({
      center: true,
      items: 1.2,
      loop: true,
      margin: 10,
      nav: false,
      dots: false,
      onDragged: carouselChanged,
      responsive: {
        901: {
          items: 3
        }
      }
    });

    $('.owl-three').owlCarousel({
      center: true,
      items: 1,
      loop: true,
      margin: 10,
      nav: false,
      dots: false,
      responsive: {
        901: {
          items: 2,
          center: false,
        }
      }
    })
var initLightGalleries = function(){

  var gallery2016=["_MG_6530","_MG_6531","_MG_6536","_MG_6550","_MG_6558","_MG_6566","_MG_6577","_MG_6579","_MG_6605","_MG_6624","_MG_6636","_MG_6639","_MG_6643","_MG_6660","_MG_6689","_MG_6695","_MG_6702","_MG_6723","_MG_6724","_MG_6733","_MG_6740","_MG_6745","_MG_6748","_MG_6759",
  "_MG_6760","_MG_6762","_MG_6806","_MG_6810","_MG_6827","_MG_6842","_MG_6868","_MG_6956","_MG_7071","_MG_6568","_MG_6710","_MG_6924","_MG_6929","_MG_6951","_MG_6958","_MG_6963","_MG_6973","_MG_6988","_MG_7006","_MG_7007","_MG_7022","_MG_7035","_MG_7084","_MG_7093","_MG_7112",
  "_MG_7135","_MG_7136","_MG_7170","_MG_7179","_MG_7195","_MG_7202","_MG_7214","_MG_7238","_MG_7270","_MG_7344","_MG_7347","_MG_7350","_MG_7380","_MG_7389","_MG_7431","_MG_7484","_MG_7489","_MG_7493","_MG_7512","_MG_7524","_MG_7539","_MG_7541","_MG_7544","_MG_7558","_MG_7567",
  "_MG_7568","_MG_7596","_MG_7602","_MG_7624","_MG_7632","_MG_7635","_MG_7638","_MG_7644","_MG_7646","_MG_7650","_MG_7652","_MG_7653","_MG_7667","_MG_7673","_MG_7691","_MG_7692","_MG_7720","_MG_7723"];
  var gallery2017=["PIM_0012","PIM_0019","PIM_0024","PIM_0027","PIM_0031","PIM_0034","PIM_0040","PIM_0046","PIM_0048","PIM_0053","PIM_0056","PIM_0058","PIM_0067","PIM_0072","PIM_0075","PIM_0085","PIM_0089",
  "PIM_0095","PIM_0102","PIM_0106","PIM_0117","PIM_0129","PIM_0135","PIM_0141","PIM_0145","PIM_0152","PIM_0159","33666664162_3ec4fefab3_o","33666670362_c3d33d6890_o","33666686942_19a686cd43_o","PIM_0177",
  "PIM_0182","PIM_0184","PIM_0190","PIM_0193","PIM_0197","PIM_0202","PIM_0205","PIM_0207"];
  var buildGallery=function(year, a){
    var g="";
    for (var i=0;i<a.length;i++){

      g+='<a href="dist/assets/images/nine/'+year+'/'+a[i]+'-320.jpg"'+
      'data-responsive="dist/assets/images/nine/'+year+'/'+a[i]+'-640.jpg 899, dist/assets/images/nine/'+year+'/'+a[i]+'-900.jpg 1199, dist/assets/images/nine/'+year+'/'+a[i]+'-1200.jpg 2000">'+
      '<img class="myThumb" src="dist/assets/images/nine/'+year+'/'+a[i]+'-320.jpg" /></a>';
    }
    $("#lightgallery"+year).append(g).lightGallery({
      "share": true,
      "googlePlus":false
    });

  };
  buildGallery("2016",gallery2016);
  buildGallery("2017",gallery2017);

};

    initTopSlider();
    initLightGalleries();
    initEvents();

  });
}(jQuery, window, undefined))
