var validate;

(function () {
  validate = function () {
    var inputs = ["user", "course", "title", "author", "edition", "price", "condition", "loc", "time"];
    for (var i = 0; i < inputs.length; i++) {
      var input = $("#" + inputs[i] + "-input");
      var control = input.parent().parent();
      if (inputs[i] === "price") {
        control = control.parent();
      }
      if (input.val() === "") {
        control.addClass("error");
        return false;
      } else {
        control.removeClass("error");
      }
    }

    return true;
  };
})();
