/* JavaScript Media Queries */ ;
;
(function($, win) {
    $.fn.inViewport = function(cb) {
        return this.each(function(i, el) {
            function visPx() {
                var H = $(this).height(),
                    r = el.getBoundingClientRect(),
                    t = r.top,
                    b = r.bottom;
                return cb.call(el, Math.max(0, t > 0 ? H - t : (b < H ? b : H)));
            }
            visPx();
            $(win).on("resize scroll", visPx);
        });
    };
}(jQuery, window));

(function($, window) {
  /*
  window.addEventListener('load', function(){
      var allimages= document.getElementsByTagName('img');
      for (var i=0; i<allimages.length; i++) {
          if (allimages[i].getAttribute('data-src')) {
              allimages[i].setAttribute('src', allimages[i].getAttribute('data-src'));
          }
      }
  }, false)*/

var placeholder = "data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' viewBox%3D'0 0 200 150'%2F%3E";


console.log("blazy");
  if (matchMedia) {
    var mq = window.matchMedia("(min-width: 901px)");
    mq.addListener(widthChange);
    widthChange(mq);
  }

  // media query change
  function widthChange(mq) {
    console.log("width change");
    var msg = (mq.matches ? "more" : "less") + " than 901 pixels";
    if (mq.matches) {
      console.log("over 901 " + msg);
      /*
      $(document).ready(function(){
        $("#newsContainer").find(".item").off("click");
        $(document).on('click', '[data-lightbox]', lity);
      });
      */
    } else {
      console.log("under 901 " + msg);
      /*
      $(document).ready(function(){
        $(document).off('click', '[data-lightbox]');
        $(document).on('click', '[data-lightbox]', function() {
          console.log(".content");
        //  $(".content").not($(this).find(".content")).removeClass("long");
        //  $(this).find(".content").toggleClass("long");
        });

      });
*/
      console.log("no matches");
    }
  }

  var topSliderData = [{
      "id": 1,
      "imgSrc": "dist/assets/images/one/blinds",
      "imgOpacity":"0.8",
      "ext": ".png",
  //    "topMsg": "1 in 5 Canadians will experience mental illness in their lifetime. With your support, we can change that",
  //    "bottomMsg": "we can change that"
      "topMsg": "1 in 5 Canadians will experience mental illness",
      "bottomMsg": "We can change that"
    },
    {
      "id": 2,
      "imgSrc": "dist/assets/images/one/carolSophie",
      "imgOpacity":"0.8",
      "ext": ".jpg",
    //  "topMsg": "Since 2016, we’ve raised awareness of mental illness and over $1m to fund new research into its causes",
    //  "bottomMsg": "learn more below"
      "topMsg": "We’ve raised over $1m to fund new research",
      "bottomMsg": "Show your support"
    },
    {
      "id": 3,
      "imgSrc": "dist/assets/images/one/green",
      "imgOpacity":"1",
      "ext": ".png",
      //"topMsg": "Show your support by joining us on March 27, 2018 for the Miner’s Lamp Award Dinner",
    //  "bottomMsg": "event details below"
      "topMsg": "Join us March 27 for the Miner’s Lamp Award Dinner",
      "bottomMsg": "Event details below"
    }
  ];

  var newsData = [{
          "id": 1,
          "imgSrc": "dist/assets/images/six/aImage1",
          "title": "Announcing the 2018 Miner&#39;s Lamp Award Dinner!",
          "isMLArticle": true,
          "date": "October 1, 2017",
          "author": "",
          "content": "Mental illness touches us all. Fighting mental illness is a battle none of us can win alone, so"+
                      "IAMGOLD Corporation and the University of Toronto are seeking your support to raise funds for"+
                      "new research that will significantly advance prevention and early detection of mental illness for"+
                      "adolescents and young people.<br><br>"+
                      "THE THIRD ANNUAL MINER’S LAMP AWARD DINNER<br><br>"+
                      "<strong>TUESDAY MARCH 27, 2018 FROM 6:00 PM TO 10:00 PM</strong><br><br>"+
                      "The Carlu, 444 Yonge Street, 7th ﬂoor, Toronto<br><br>"+
                      "The Miner’s Lamp Award dinners in 2016 and 2017 have been tremendously successful, selling"+
                      "out annually and raising over $1 million for the Miner’s Lamp Innovation Fund. All proceeds are"+
                      "awarded to promising research studies at the University of Toronto. On March 27, 2018, we will"+
                      "host our third annual Miner’s Lamp Award dinner.<br><br>"+
                      "This memorable evening will include:<br><br>"+
                      "– Presentation of the Miner’s Lamp Award to <strong>George Cope, President &amp; CEO, BCE Inc. &amp;"+
                      "Bell Canada, Founder of Bell Let’s Talk</strong>, in honour of a lifetime of personal and"+
                      "professional commitment to mental health<br>"+
                      "– A performance and keynote address by special guests<br>"+
                      "– An exclusive gathering of 400 leaders from Canada’s business and academic communities<br>"+
                      "– Cocktails, networking reception, dinner and after-party<br>"+

                      "– An opportunity to meet and speak with world-class scientists and leading clinicians<br><br>"+
                      "<strong><i>One hundred percent of event proceeds will be invested in the Miner&#39;s Lamp Innovation"+
                      "Fund in the Prevention and Early Detection of Severe Mental Illness.</i></strong>"
          },
          {
          "id": 2,
          "imgSrc": "dist/assets/images/six/aImage2",
          "title": "Candour, courage, new hope: the 2017 Miner’s Lamp Award dinner",
          "isMLArticle": true,
          "date": "March 29, 2017",
          "author": "",
          "content": "At the Miner’s Lamp Award dinner on March 29, 2017 at The Carlu in Toronto, Miner’s Lamp Award founder, <strong>Carol Banducci</strong>, EVP and CFO, IAMGOLD Corporation, told 400 guests from Toronto’s business and academic communities: “Mental illness in youth can be devastating and touches us all. Thanks to your generosity in giving more than $1 million for research into its causes, we can now do more to give the young people it affects the hope they need and the help they deserve.”<br><br>"+
          "<strong>Trevor Young</strong>, Dean of Medicine, University of Toronto explained that as U of T is one of the world’s top research universities and the only faculty of medicine in the Greater Toronto Area, it is uniquely positioned to effect change in mental health. “Our researchers are improving understanding of the physiology of mental illness and finding new insights into how it can be treated. U of T is also integrating psychiatry with other areas of medicine, across its network of nine affiliated"+ "hospitals and 25 community sites, including the Centre for Addiction and Mental Health (CAMH) and Sick Kids.” <br><br>"+
          "In the spirit of fostering awareness and understanding, this year’s dinner featured inspiring speakers <strong>Sophie Grégoire Trudeau</strong> and Barenaked Ladies founder <strong>Steven Page</strong>, who talked candidly and courageously of their personal battles with mental illness, and <strong>Jamie and Patsy Anderson</strong>, recipients of the 2017 Miner’s Lamp Award for their lifelong dedication to mental health. The Andersons received their award from inaugural Miner’s Lamp Award winner, <strong>Paul Beeston</strong>, former President & CEO, Toronto"+ "Blue Jays & Rogers Centre.<br><br>"+
          "In accepting the award, Patsy Anderson said: “We are so proud to be part of a community that has chosen to learn about mental health and which advocates for those who are challenged by mental health issues.” Jamie Anderson added: “I like to remind people that our mind is far and away the most complicated part of us. Relative to other health issues, it has been under-resourced and under-researched.”<br><br>"+
          "Other inspiring mental health advocates <strong>George Cope</strong>, President & CEO, BCE (and founder of “Bell Let’s Talk”) and <strong>Michael Landsberg</strong> (host of “Landsberg in the Morning” and founder of SickNotWeak) also attended the dinner. <br><br>"+
          "Reflecting on the evening, Sophie Grégoire Trudeau summed up the renewed sense of hope generated by the academic and business and communities’ partnership: “It's my sincere wish that every person who struggles with mental health can find support, love and acceptance. It warmed my heart to see so many people come together to support the Miner’s Lamp Innovation Fund in Prevention & Early Detection of Severe Mental Illness. Thank you for taking mental illness seriously, and for dedicating the"+ "resources needed to build better and more effective treatments.”<br><br>"+
          "<strong><i>One hundred percent of event proceeds have been invested in the Miner's Lamp Innovation Fund in the Prevention and Early Detection of Severe Mental Illness.</i></strong>"
          },
          {
          "id": 3,
          "imgSrc": "dist/assets/images/six/aImage3",
          "title": "The 2017 Miner's Lamp Award - what's in a name?",
          "isMLArticle": true,
          "date": "May 1, 2016",
          "author": "",
          "content": "Fundamental to IAMGOLD’s work as a global mining company is its core purpose: <i>to enrich the lives of its stakeholders.</i>  In this spirit, IAMGOLD has built a partnership with the University of Toronto Department of Psychiatry to create the Miner’s Lamp Award."+
          "The Miner’s Lamp Award symbolizes the innovative work being done to shed light on mental illness and erode the stigma attached to it.  <br><br>"+
          "In the early days of industrial mining, many miners died when their lighting devices ignited invisible, unstable gases. These fatalities were devastating for communities whose continued prosperity depended on sending their young men to extract minerals from the earth and seeing them return safely.  <br><br>  "+
          "Over time, thanks to the courageous determination of many to improve perilous working conditions and protect the most vulnerable, safety lamps were introduced. Their flames changed colour when deadly gases were detected, helping save countless lives. <br><br> "+
          "Thankfully, today, we are spared the everyday challenges our mining ancestors faced. But with one in five Canadians likely to suffer mental illness at some point in their lifetime, we must remain vigilant about a disease that will touch us all, directly or indirectly, and affect the quality of our lives. <br><br>"+
          "We created the Miner’s Lamp Award to honour the achievements of today’s leaders in the field of mental health who are lighting the way forward for all of us - and encourage others to follow their lead. "

          },
          { "id": 4,
          "imgSrc": "dist/assets/images/six/aImage4",
          "title": "The 2018 Miner's Lamp Award winner: George Cope",
          "isMLArticle": true,
          "date": "October 1, 2017",
          "author": "",
          "content": "The Miner’s Lamp Award symbolizes the innovative work being done to shed light on mental illness and erode the stigma attached to it.  We created the Miner’s Lamp Award to honour the achievements of today’s leaders in the field of mental health who are lighting the way forward for all of us - and encourage others to follow their lead. <br><br> "+
          "We are proud to announce that the 2018 Miner’s Lamp Award winner is <strong>George Cope</strong>, President & CEO, BCE Inc. and Bell Canada. <br><br>"+
          "Mr. Cope is well known in the business world for his leadership in transforming Canada’s largest communications company into the nation’s broadband leader. Over the past 30 years, he has earned a reputation as a strategic leader and builder of high-performance teams.  <br><br>"+
          "On March 27, 2018, we are delighted to honour Mr. Cope for his extraordinary leadership and innovation in leading the launch of Bell Let’s Talk.  <br><br>"+
          "In a country where one in five Canadians will personally experience mental illness in their lifetime, Bell Let’s Talk has helped to shift public attitudes towards mental health, fostering a spirit of increased understanding and acceptance, while generating much-needed funds for projects targeting mental health across the country.  <br><br>"+
          "Bell Let’s Talk is the largest-ever corporate commitment to Canadian mental health and now one of the country’s most prominent community investment campaigns. <br><br>"+
          "For generations past, the shame of suffering mental illness prevented many people from seeking the help they needed to get better. Combined with a general lack of insight into the causes of mental illness, their reluctant silence reinforced the stifling stigma surrounding the disease. One of the crowning achievements of Bell Let’s Talk has been to help break the silence and move the conversation about mental health from the shadows into the light. <br><br>"+
          "We invite you to join us at the 2018 Miner’s Lamp Award Dinner to celebrate the inspiring leadership of George Cope. "
          }
      ];

  $(document).ready(function() {
var bLazy = new Blazy();
  /*
      $(".myThumb").inViewport(function(px) {
         if (px) {
console.log("trig");
           $(this).addClass("triggered");}
    });

    $('img').lazy({
        // your configuration goes here
        //scrollDirection: 'horizontal',
        effect: 'fadeIn',
        visibleOnly: true,
        onError: function(element) {
            console.log('error loading ' + element.data('src'));
        },
        beforeLoad: function(element) {
              console.log("beofre"+JSON.stringify(element));
          },
          afterLoad: function(element) {
              // called after an element was successfully handled
              console.log("after"+JSON.stringify(element));
          }
    });*/
    //  });

    function initEvents() {
      /*section nav and top slider*/  console.log("wtd");
      /*
      $(function(){
        console.log("lazy");
      $('.myThumb').lazy({ beforeLoad: function(element){
          console.log('image "' + stripTime(element.data('src')) + '" is about to be loaded');
        },
        afterLoad: function(element) {
          console.log('image "' + stripTime(element.data('src')) + '" was loaded successfully');
        },
        onError: function(element) {
          console.log('image "' + stripTime(element.data('src')) + '" could not be loaded');
        },
        onFinishedAll: function() {
          console.log('finished loading elements');
          console.log('lazy instance is about to be destroyed');
        }});
      });
      /*    /*section two*/
      $("#hamburger").on("click", function() {
        $(".navigation,.overlay").addClass("open");
      });


      $("#titleContainer").find("div").on("click", function() {
        var id = $(this).attr("data-id");
        $("#titleContainer").find("span").removeClass("showingChild");
        $(this).find("span").addClass("showingChild");
        $(".quote[data-id]").css("display", "none");
        $(".quote[data-id='" + id + "']").fadeIn("fast");
      });
$(document).on('click', '[data-lightbox]', lity);
      //$(document).on('click', '[data-lightbox]', function() {
      //  console.log(".content");
      // $(".content").not($(this).find(".content")).removeClass("long");
      //  $(this).find(".content").toggleClass("long");
    //  });
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
            console.log("button,a[href*");
          if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname
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
                }
              });
            }
          }
          //$(".overlay,.navigation").removeClass("open");
        });
        $(".overlay,.navigation").on("click", function() {
          console.log(".overlay,.navigation");
          $(".overlay,.navigation").removeClass("open");
        });
/*
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

      $("#newsContainer").find(".content").on("click", function() {
        console.log(".content");
        $(this).toggleClass("long");
      })
    */


      $(".logoCaretContainer").find(".more").on("click", function() {
        console.log(".logoListAllContainer");
        $(".logoListAllContainer").toggleClass("long");
        $(".more").toggleClass("long");
      });
      /*
      $("[data-ellipsis]").on("click", function() {
        var myClass = $(this).attr("class").split(' ')[0];
        var dataEllipsis = Number($(this).attr("data-ellipsis"));
        var dataEllipsisIndex = Number($(this).attr("data-ellipsisindex"));
        var isLong = $(this).hasClass("long");
        console.log(myClass +" dataEllipsis" + dataEllipsis+" dataEllipsisIndex "+dataEllipsisIndex + " isLong "+isLong);
        if (!isLong){
          var that = $(this);
          $(this).addClass("shortHeight").html(ellipsisFullText[dataEllipsisIndex]);


       setTimeout(function (){
         console.log("down");
         that.addClass("long");},1);
         that.closest(".contentContainer").find(".left,.right").show();
      }
        else{
        $("."+myClass).removeClass("long");
      //  setTimeout(function (){
          console.log("up");
          Ellipsis({class:"."+myClass,lines:dataEllipsis});
      //  },1);
        $("."+myClass).removeClass("shortHeight");
        }
      });
*/
    }

    function initTopSlider() {
      var topSliderHtml = "";
      for (var i = 0; i < topSliderData.length; i++) {
        topSliderHtml += "<div class='item' data-id='" + topSliderData[i].id + "'>";
        topSliderHtml += "<img style='opacity:"+topSliderData[i].imgOpacity+"' class='topSliderImg b-lazy' src='"+placeholder+"' data-src='" + topSliderData[i].imgSrc + "-320" + topSliderData[i].ext + "'" +
        " srcset='" + topSliderData[i].imgSrc + "-640" + topSliderData[i].ext + " 640w, " +
        topSliderData[i].imgSrc + "-900" + topSliderData[i].ext + " 900w, " +
        topSliderData[i].imgSrc + "-1200" + topSliderData[i].ext + " 1200w' alt='" + topSliderData[i].imgSrc + topSliderData[i].id + "'>";

        topSliderHtml += "<div class='topSliderTopMsg'>" + topSliderData[i].topMsg + "</div>";
        topSliderHtml += "<div class='topSliderBottomMsg'>" + topSliderData[i].bottomMsg + "</div>";
        topSliderHtml += "<span><a class='topSliderCaretContainer' href='#titleContainer'><img class='topSliderCaret' src='dist/assets/svg/OffWhiteCarat.svg'></a></span>";
      /*  topSliderHtml += "<img class='topSliderLogo' src='dist/assets/svg/HeadRecreationWhiteOutline.png'/></div>";*/
        topSliderHtml += "<img class='topSliderLogo b-lazy' src='"+placeholder+"' data-src='dist/assets/svg/HeadRecreationWhiteOutline-180.png'"+
        " srcset='dist/assets/svg/HeadRecreationWhiteOutline-360.png 640w, " +
        "dist/assets/svg/HeadRecreationWhiteOutline-506.png 900w, " +
        "dist/assets/svg/HeadRecreationWhiteOutline-675.png 1200w' alt='topLogo'></div>";
      }
      console.log(topSliderHtml);

      $('.owl-one').html(topSliderHtml).owlCarousel({
        loop: true,
        autoplay: true,
        dots: false,
        items: 1
      });
    }
    var initAwards = function(){
      var carouselChanged = function(event) {
      //  $(".content").removeClass("long");
      };

      var owlThree = $('.owl-three').owlCarousel({
        center: true,
        items: 1,
        loop: true,
        autoplay: true,
        margin: 10,
        nav: false,
        dots: false,
        onChanged: carouselChanged,
        responsive: {
          901: {
            items: 2,
            center: false,
          }
        }
      });
      $('.right').click(function() {
      owlThree.trigger('next.owl.carousel');
      });
  // Go to the previous item
    $('.left').click(function() {
        // With optional speed parameter
        // Parameters has to be in square bracket '[]'
        owlThree.trigger('prev.owl.carousel', [300]);
    });
    };


var initLightGalleries = function(){

  var gallery2016=["_MG_6530","_MG_6531","_MG_6536","_MG_6550","_MG_6558","_MG_6566","_MG_6577","_MG_6579","_MG_6605","_MG_6624","_MG_6636","_MG_6639","_MG_6643","_MG_6660","_MG_6689","_MG_6695","_MG_6702","_MG_6723","_MG_6724","_MG_6733","_MG_6740","_MG_6745","_MG_6748","_MG_6759",
  "_MG_6760","_MG_6762","_MG_6806","_MG_6810","_MG_6827","_MG_6842","_MG_6868","_MG_6956","_MG_7071","_MG_6568","_MG_6710","_MG_6924","_MG_6929","_MG_6951","_MG_6958","_MG_6963","_MG_6973","_MG_6988","_MG_7006","_MG_7007","_MG_7022","_MG_7035","_MG_7084","_MG_7093","_MG_7112",
  "_MG_7135","_MG_7136","_MG_7170","_MG_7179","_MG_7195","_MG_7202","_MG_7214","_MG_7238","_MG_7270","_MG_7344","_MG_7347","_MG_7350","_MG_7380","_MG_7389","_MG_7431","_MG_7484","_MG_7489","_MG_7493","_MG_7512","_MG_7524","_MG_7539","_MG_7541","_MG_7544","_MG_7558","_MG_7567",
  "_MG_7568","_MG_7596","_MG_7602","_MG_7624","_MG_7632","_MG_7635","_MG_7638","_MG_7644","_MG_7646","_MG_7650","_MG_7652","_MG_7653","_MG_7667","_MG_7673","_MG_7691","_MG_7692"];
  var gallery2017=["PIM_0012","PIM_0019","PIM_0024","PIM_0027","PIM_0031","PIM_0034","PIM_0040","PIM_0046","PIM_0048","PIM_0053","PIM_0056","PIM_0058","PIM_0067","PIM_0072","PIM_0075","PIM_0085","PIM_0089",
  "PIM_0095","PIM_0102","PIM_0106","PIM_0117","PIM_0129","PIM_0135","PIM_0141","PIM_0145","PIM_0152","PIM_0159","33666664162_3ec4fefab3_o","33666670362_c3d33d6890_o","33666686942_19a686cd43_o","PIM_0177",
  "PIM_0182","PIM_0184","PIM_0190","PIM_0193","PIM_0197","PIM_0202","PIM_0205","PIM_0207"];
  var buildGallery=function(year, a){
    var g="";
    for (var i=0;i<a.length;i++){

      g+='<a href="dist/assets/images/nine/'+year+'/'+a[i]+'-320.jpg"'+
      'data-responsive="dist/assets/images/nine/'+year+'/'+a[i]+'-640.jpg 899, dist/assets/images/nine/'+year+'/'+a[i]+'-900.jpg 1199, dist/assets/images/nine/'+year+'/'+a[i]+'-1200.jpg 2000">'+
    //  '<img class="myThumb '+(i < 6 ? 'triggered':'hiddenEl')+'" src="dist/assets/images/nine/'+year+'/'+a[i]+'-320.jpg" /></a>';
      '<img class="myThumb b-lazy" src="dist/assets/images/loading.gif" data-src="dist/assets/images/nine/'+year+'/'+a[i]+'-100.jpg" /></a>';
    }

    $("#lightgallery"+year).append(g).lightGallery({
      "share": true,
      "googlePlus":false
    });

  };
  buildGallery("2016",gallery2016);
  buildGallery("2017",gallery2017);
  /*$('.myThumb').lazy({
      // your configuration goes here
      //scrollDirection: 'horizontal',
      effect: 'fadeIn',
      visibleOnly: true,
      onError: function(element) {
          console.log('error loading ' + element.data('src'));
      },
      beforeLoad: function(element) {
            console.log("beofre"+JSON.stringify(element));
        },
        afterLoad: function(element) {
            // called after an element was successfully handled
            console.log("after"+JSON.stringify(element));
        }
  })*/
};
var initNews = function(){
var hiddenData = '';
var shownData = '';
var tempData, tempDataShown, tempDataHidden;
if (newsData && newsData.length > 0){
  for (var i=0;i<newsData.length;i++){
  //  tempData='<img class="full b-lazy" alt="itemPic"  src="dist/assets/images/loading.gif" data-src="'+newsData[i].imgSrc+'-320.jpg" ';

    tempData='<img class="full" alt="itemPic"  src="'+newsData[i].imgSrc+'-320.jpg" "';
    tempData+='srcset="'+newsData[i].imgSrc+'-320.jpg 640w, '+newsData[i].imgSrc+'-900.jpg 900w, '+newsData[i].imgSrc+'-1200.jpg 1200w">';
    tempData+='<div class="detailContainer"><div class="type">'+(newsData[i].isMLArticle ? 'Miner&#39;s Lamp Article':'News Article')+'</div>';
    tempData+='<div class=""><img src="'+(newsData[i].isMLArticle ? 'dist/assets/svg/Flame.svg':'dist/assets/svg/Newspaper.svg')+'" alt=""></div>';
    tempData+='<!--div class="pipe">|</div--><div class="date">'+newsData[i].date+'</div></div>';
    tempData+='<div class="title">'+newsData[i].title+'</div>';
    tempData+='<div class="content" data-ellipsis="3">'+newsData[i].content+'</div>';
    tempData+='<div class="author">'+(newsData[i].author ? newsData[i].author:'awards committee')+'</div>';

    hiddenData+='<div id="article'+newsData[i].id+'" class="item lityItem">'+tempData+'</div>';
    shownData+='<a href="#article'+newsData[i].id+'" class="newsAnchor" data-lightbox><div class="item">'+tempData+'</div></a>';
  }

//initTruncObjs();
$(".owl-two").append(shownData);
/*
Ellipsis({
          class: '.content',
          lines: 3
        }); //specific conf on titles
        */
$("#hiddenNews").append(hiddenData);
//truncateAllTheThings();
$(".owl-two").owlCarousel({
  center: true,
  items: 1.2,
  autoplay: true,
  loop: true,
  margin: 10,
  nav: false,
  dots: false,
  //onDragged: carouselChanged,
  responsive: {
    901: {
      items: 3
    }
  }
});
}
};
var ellipsisFullText = ["dummy"];


var initTruncObjs = function(){
  var truncatedClasses=[];
  var truncObjs=[];
  var truncateElements  = $("[data-ellipsis]");
console.log("truncateElements len "+truncateElements.length);
  truncateElements.each(function(){
    var len = ellipsisFullText.length;
    var numLines = Number($(this).attr("data-ellipsis"));
    var myClass = $(this).attr('class').split(' ')[0];
    $(this).attr("data-ellipsisIndex",len);
    console.log("numline "+numLines+" myclass "+myClass);
    ellipsisFullText[len] = $(this).html();
    if (truncatedClasses.indexOf(myClass)==-1){
      console.log("truncation "+myClass);
      truncatedClasses.push(myClass);
      truncObjs.push({
                class: '.'+myClass,
                lines: numLines,
                break_word: "false"
              });

    }

  });
console.log("truncatedClasses "+truncatedClasses);
console.log("ellipsisFullText "+ellipsisFullText);
console.dir(ellipsisFullText);
console.log("  truncObjs ");
console.dir(truncObjs);
  for (var i=0;i<truncObjs.length;i++){
    console.log(" doint truncObjs "+i);
    console.dir(truncObjs);
    Ellipsis(truncObjs[i]); //specific conf on titles
  }
  console.log("eliip");
  console.dir(Ellipsis);
};

    initTopSlider();
    initNews();
    initAwards();
    initLightGalleries();

    initEvents();

  });
}(jQuery, window, undefined))
