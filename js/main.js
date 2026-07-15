// Dropdown menus + active link highlighting + image lightbox
document.addEventListener("DOMContentLoaded", function () {
  // --- Highlight current page in nav ---
  var path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".dropdown-menu a").forEach(function (a) {
    if (a.getAttribute("href") === path) {
      a.classList.add("active");
      var dd = a.closest(".dropdown");
      if (dd) dd.classList.add("active-parent");
    }
  });

  // --- Dropdowns (click to open/close; hover also works via CSS) ---
  var dropdowns = document.querySelectorAll(".dropdown");
  function closeAll() {
    dropdowns.forEach(function (d) {
      d.classList.remove("open");
      var t = d.querySelector(".dropdown-toggle");
      if (t) t.setAttribute("aria-expanded", "false");
    });
  }
  dropdowns.forEach(function (dropdown) {
    var ddToggle = dropdown.querySelector(".dropdown-toggle");
    if (!ddToggle) return;
    ddToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      var wasOpen = dropdown.classList.contains("open");
      closeAll();
      if (!wasOpen) {
        dropdown.classList.add("open");
        ddToggle.setAttribute("aria-expanded", "true");
      }
    });
  });
  document.addEventListener("click", function (e) {
    dropdowns.forEach(function (d) {
      if (!d.contains(e.target)) {
        d.classList.remove("open");
        var t = d.querySelector(".dropdown-toggle");
        if (t) t.setAttribute("aria-expanded", "false");
      }
    });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeAll();
  });

  // --- Lightbox: click any figure or poster image to expand ---
  var targets = document.querySelectorAll(".figure img, .poster img");
  if (targets.length) {
    var box = document.createElement("div");
    box.className = "lightbox";
    box.innerHTML =
      '<button class="lb-close" aria-label="Close">&times;</button>' +
      '<img alt="" />' +
      '<div class="lb-caption"></div>';
    document.body.appendChild(box);

    var lbImg = box.querySelector("img");
    var lbCap = box.querySelector(".lb-caption");

    function open(src, alt, caption) {
      lbImg.src = src;
      lbImg.alt = alt || "";
      lbCap.textContent = caption || "";
      box.classList.add("open");
      document.body.style.overflow = "hidden";
    }
    function close() {
      box.classList.remove("open");
      lbImg.src = "";
      document.body.style.overflow = "";
    }

    targets.forEach(function (img) {
      img.classList.add("zoomable");
      img.addEventListener("click", function () {
        var fig = img.closest("figure");
        var cap = fig && fig.querySelector("figcaption");
        open(img.src, img.alt, cap ? cap.textContent : img.alt);
      });
    });

    box.addEventListener("click", close);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && box.classList.contains("open")) close();
    });
  }
});
