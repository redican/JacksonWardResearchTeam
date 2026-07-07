// Mobile nav toggle + active link highlighting + image lightbox
document.addEventListener("DOMContentLoaded", function () {
  // --- Mobile nav toggle ---
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
    });
  }

  // --- Highlight current page in nav ---
  var path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(function (a) {
    if (a.getAttribute("href") === path) {
      a.classList.add("active");
      var dd = a.closest(".dropdown");
      if (dd) dd.classList.add("active-parent"); // highlight "Years" on year pages
    }
  });

  // --- Years dropdown toggle (click to open) ---
  var dropdown = document.querySelector(".dropdown");
  var ddToggle = dropdown && dropdown.querySelector(".dropdown-toggle");
  if (dropdown && ddToggle) {
    ddToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      var isOpen = dropdown.classList.toggle("open");
      ddToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    document.addEventListener("click", function (e) {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove("open");
        ddToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

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
