let displayedImage = 0;

$(document).ready(function (event) {

  $(".close").click(function () {
    $(this).parents(".tile").addClass("hidden");
  });

  $(".editable p").dblclick(function () {
    $(this).siblings().children("textarea").html($(this).html());
    let outerForm = $(this).parents(".editable");
    outerForm.children("p").toggleClass("hidden");
    outerForm.children("div").toggleClass("hidden");
  });

  $(".editable button").click(function () {
    let outerForm = $(this).parents(".editable");
    outerForm.children("p").toggleClass("hidden");
    outerForm.children("div").toggleClass("hidden");
    let tarea = outerForm.find("textarea");
    let para  = outerForm.find("p");
    para.html(tarea.val());
  });

  let cycleImages = $(".count");

  cycleImages.click(function () {
    displayedImage++;
    displayedImage %= cycleImages.length;
    updateCycle(cycleImages);
  });

  updateCycle(cycleImages);
});

function updateCycle(cycleImages) {
  for (let i = 0; i < cycleImages.length; i++) {
    if (i == displayedImage) {
      cycleImages[i].style.display = "block";
    } else {
      cycleImages[i].style.display = "none";
    }
  }
}

function clearTiles() {
  $(".tile").addClass("hidden");
}

function resetTiles() {
  $(".tile").removeClass("hidden");
}
