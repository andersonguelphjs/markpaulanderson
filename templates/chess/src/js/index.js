var chess = (function($, window, undefined) {

  var emptyBoardConfig = {
    "bR": ["A8", "H8"],
    "bN": ["B8", "G8"],
    "bB": ["C8", "F8"],
    "bQ": ["D8"],
    "bK": ["E8"],
    "bP": ["A7", "B7", "C7", "D7", "E7", "F7", "G7", "H7"],
    "wR": ["A1", "H1"],
    "wN": ["B1", "G1"],
    "wB": ["C1", "F1"],
    "wQ": ["D1"],
    "wK": ["E1"],
    "wP": ["A2", "B2", "C2", "D2", "E2", "F2", "G2", "H2"],
  };
  var dataGrid;

  function getNewDataGrid() {

    var board = new Array(8);
    for (var i = 0; i < 8; i++) {
      if (i === 0) {
        board[i] = ["wR", "wN", "wB", "wQ", "wK", "wB", "wN", "wR"];
      } else if (i === 1) {
        board[i] = ["wP", "wP", "wP", "wP", "wP", "wP", "wP", "wP"];
      } else if (i === 6) {
        board[i] = ["bP", "bP", "bP", "bP", "bP", "bP", "bP", "bP"];
      } else if (i === 7) {
        board[i] = ["bR", "bN", "bB", "bQ", "bK", "bB", "bN", "bR"];
      } else {
        board[i] = new Array(8);
      }
    }
    console.log("getNewDataGrid");
    console.dir(board);

  }


  function initMoveType() {
    var moveType = $("input[name='moveType']:checked").index();

    console.log("moveType " + moveType);
    if (moveType===1){
      $("img").draggable();
      $(".square").droppable({
        tolerance: 'intersect',
        drop: function(event, ui) {
          var drop_p = $(this).offset();
          var drag_p = ui.draggable.offset();
          var left_end = drop_p.left - drag_p.left + 1;
          var top_end = drop_p.top - drag_p.top + 1;
          ui.draggable.animate({
            top: '+=' + top_end,
            left: '+=' + left_end
          });
          
        }
      });
      $(".square").droppable( "option", "disabled",false );
      return false;
    }
    if (moveType === 2) {
      $("img").draggable({
        start: function() {
          $(".boardContainer").find(".E4").attr("data-valid-drop", "true");
          determineValidSquares($(this));
        },
        revert: 'invalid',
        scroll: false,
        stack: ".boxArt"
      });
      $(".square").droppable({
        tolerance: 'intersect',
        accept: function() {
          return $(this).attr("data-valid-drop") === "true";
        },
        drop: function(event, ui) {
          var drop_p = $(this).offset();
          var drag_p = ui.draggable.offset();
          var left_end = drop_p.left - drag_p.left + 1;
          var top_end = drop_p.top - drag_p.top + 1;
          ui.draggable.animate({
            top: '+=' + top_end,
            left: '+=' + left_end
          });
        }
      });
      $(".square").droppable( "option", "disabled",false );
      return false;
    }
    console.log("default draggable");
    $("img").draggable();


    /*

    */
  }

  function init() {
    dataGrid = getNewDataGrid();
    drawHTMLBoard();
    initEvents();
  }

  function initEvents() {


    $("input[name='moveType']").on("change", function() {
      $("img").off("draggable");
      try{
        $(".square").droppable( "option", "disabled", true );
      }
      catch(e){
        console.log("eror!");
      }

      initMoveType();
    });
  }

  function determineValidSquares(el) {
    var piece = el.attr("data-piece");
    var color = piece.charAt(0);
    var type = piece.charAt(1);
    var currentSquare = el.closest(".square").attr("data-square");
    console.log("piece : " + piece + " color: " + color + " type: " + type + " currentSquare: " + currentSquare);
    $("[data-valid-drop]").removeAttr("data-valid-drop");
  }

  function drawHTMLBoard() {
    console.log("drawHTMLBoard");
    $(".boardContainer").html("");
    var html = "";
    var white = "<div class='whiteSquare'></div>";
    var black = "<div class='blackSquare'></div>";
    var alpha = ["A", "B", "C", "D", "E", "F", "G", "H"];
    var blank = "<img src='data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=' alt='' />";
    for (var i = 7; i >= 0; i--) {
      html += "<div class='clear'>";
      for (var j = 0; j < 8; j++) {
        if ((j + i) % 2 === 0) {
          html += "<div class='white square' data-square='" + alpha[j] + (i + 1) + "' data-x='" + (j + 1) + "' data-y='" + (i + 1) + "'>" + blank + "</div>";
        } else {
          html += "<div class='black square' data-square='" + alpha[j] + (i + 1) + "' data-x='" + (j + 1) + "' data-y='" + (i + 1) + "'>" + blank + "</div>";
        }
      }
      html += "</div>";
    }

    $(document).ready(function() {

      $(".boardContainer").html(html);
      for (var key in emptyBoardConfig) {
        for (var k = 0; k < emptyBoardConfig[key].length; k++) {
          $("[data-square='" + emptyBoardConfig[key][k] + "']").find("img").attr("src", "src/img/" + key + ".png").attr("data-piece", key);
        }

      }



      initMoveType();

    });

  }
  init();


}(jQuery, window));
