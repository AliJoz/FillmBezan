// btn them 
let togglebtn = document.querySelectorAll(".btnThem");

togglebtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    let changeIcons = document.querySelectorAll(".icon-light");
    let c = document.querySelector(".changeName"); 

    
    if (localStorage.theme === "dark") {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light"); 
      changeIcons.forEach(function (icon) {
        icon.setAttribute("href", "#sun"); 
      });
      c.innerHTML = "تم روشن"; 
    } else {
      
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark"); 
      changeIcons.forEach(function (icon) {
        icon.setAttribute("href", "#moon"); 
      });
      c.innerHTML = "تم تیره"; 
    }
  });
});


window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.theme === "dark") {
    document.documentElement.classList.add("dark");
    document.querySelectorAll(".icon-light").forEach((icon) => {
      icon.setAttribute("href", "#moon");
    });
    document.querySelector(".changeName").innerHTML = "تم تیره";
  } else {
    document.documentElement.classList.remove("dark");
    document.querySelectorAll(".icon-light").forEach((icon) => {
      icon.setAttribute("href", "#sun");
    });
    document.querySelector(".changeName").innerHTML = "تم روشن";
  }
});