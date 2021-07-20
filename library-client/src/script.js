// const { timeStamp } = include("console");
// const { endianness } = include("os");

//moreCategories
var num = 2;

function showMore() {
  if (num % 2 == 0) {
    document.getElementById("filterMenu").style.marginLeft = "0px";
    num++;
  } else {
    document.getElementById("filterMenu").style.marginLeft = "-300px";
    num++;
  }
}

//sticky header

function bookStickyHeader() {
  var filters = document.getElementById("tags");
  sticky2 = filters.offsetTop;

  stickTo2();

  function stickTo2() {
    if (window.pageYOffset > sticky2) {
      filters.classList.add("sticky");
    }

    if (175 > window.pageYOffset) {
      filters.classList.remove("sticky");
    }
  }
}

function stickyHeader() {
  var sticky, funnel, header, tag1, filterMenu, filters;

  funnel = document.getElementById("funnel");
  header = document.getElementById("tags");
  tag1 = document.getElementById("tag1");
  filterMenu = document.getElementById("filterMenu");

  sticky = header.offsetTop;

  stickTo();

  function stickTo() {
    if (window.pageYOffset > sticky) {
      header.classList.add("sticky");
      tag1.style.position = "fixed";
      tag1.style.top = "28px";
      funnel.style.position = "fixed";
      funnel.style.top = "30px";
      filterMenu.style.position = "fixed";
      filterMenu.style.top = "76px";
    }

    if (175 > window.pageYOffset) {
      header.classList.remove("sticky");
      tag1.style.position = "absolute";
      tag1.style.top = "202px";
      funnel.style.position = "absolute";
      funnel.style.top = "204px";
      filterMenu.style.position = "absolute";
      filterMenu.style.top = "251px";
    }
  }
}

//sticky header 2

//magnifier to X
var num2 = 2;

function transform() {
  if (num2 % 2 == 0) {
    document.getElementById("X").style.display = "inline";
    document.getElementById("loupe").style.display = "none";

    num2++;
  } else {
    document.getElementById("X").style.display = "none";
    document.getElementById("loupe").style.display = "inline";

    num2++;
  }
}

//mobile menu

var num3 = 2;
function showMenu() {
  if (num3 % 2 == 0) {
    document.getElementById("menuTrueCont").style.height = "247.5px";
    document.getElementById("closeMenuTrue").style.zIndex = "4";
    document.getElementById("menuTrue").style.color = "#a50505";
    num3++;
  } else {
    document.getElementById("menuTrueCont").style.height = "0px";
    document.getElementById("closeMenuTrue").style.zIndex = "-2";
    document.getElementById("menuTrue").style.color = "rgba(255, 255, 255)";
    num3++;
  }
}

function idCheck(clicked_id) {
  var id = clicked_id;
  if (id == "closeMenuTrue") {
    document.getElementById("menuTrueCont").style.height = "0px";
    document.getElementById("closeMenuTrue").style.zIndex = "-2";
    num3++;
  }
}

// back to top

document.addEventListener("scroll", function () {
  btnGoTop();
});

function btnGoTop() {
  if (document.documentElement.scrollTop < 300) {
    if (document.getElementById("topBtn")) {
      document.getElementById("topBtn").style.pointerEvents = "none";
      document.getElementById("topBtn").style.opacity = "0";
    }
  } else {
    document.getElementById("topBtn").style.pointerEvents = "all";
    document.getElementById("topBtn").style.opacity = "1";
  }
}
function goTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

//header bug prevention

// window.addEventListener(
//   "popstate",
//   function () {
//     history.back();
//   },
//   false
// );

function bookSlide() {
  document.getElementById("bInfoMain").style.marginRight = "0px";
}

function borrowCheck() {
  document.getElementById("borrowCheck").style.zIndex = 101;
  document.getElementById("curtain2").style.zIndex = 100;

  var body = document.body,
    html = document.documentElement;

  var height = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  );

  document.getElementById("curtain2").style.height = height + "px";
}

function returnCheck() {
  document.getElementById("returnCheck").style.zIndex = 101;
  document.getElementById("curtain3").style.zIndex = 100;

  var body = document.body,
    html = document.documentElement;

  var height = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  );

  document.getElementById("curtain3").style.height = height + "px";
}

function closeCheck2() {
  document.getElementById("borrowCheck").style.zIndex = -101;
  document.getElementById("curtain2").style.zIndex = -100;
}

function closeCheck3() {
  document.getElementById("returnCheck").style.zIndex = -101;
  document.getElementById("curtain3").style.zIndex = -100;
}

function checkAvai() {
  var stylish = document.getElementById("avaiChoose");

  if (stylish.style.display == "none") {
    stylish.style.display = "initial";
  } else if (stylish.style.display == "initial") {
    stylish.style.display = "none";
  }

  var stylish2 = document.getElementById("avaiChoose2");

  if (stylish2.style.display == "none") {
    stylish2.style.display = "initial";
  } else if (stylish2.style.display == "initial") {
    stylish2.style.display = "none";
  }
}
