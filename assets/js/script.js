const nameRegEx = /^[A-z]+$/;
const phoneRegEx = /^\+?(?=.*?[1-9])[0-9()-]{1,13}$/;
// var usernameRegEx = /^[a-z0-9]+$/;
const emailRegEx = /^(.+)@(.+){2,}\.(.+){2,}$/;

window.onload = function() {
  const year = new Date().getFullYear();
  const countDownDate = new Date(`Dec 31, ${year} 23:59:59`).getTime();
  let showButtons = []

  document.querySelector("#signup-top-form").addEventListener("submit", function(e){
    e.preventDefault();
    let isValid = true;

     isValid *= validate('top-name');
     isValid *= validate('top-email');
     isValid *= validate('top-phone');

     if (isValid) {
      /*success*/
     }
  });

  const inputs = document.querySelectorAll('.input');
  Array.from(inputs).forEach((el) => {
    el.addEventListener('focus', (e) => {
      el.classList.remove('validation-error');
    })
  });

  setInterval(function() {
    const now = new Date().getTime();
    const distance = countDownDate - now;
    if (distance < 0) {
       document.getElementById("numbers").innerHTML = "Happy new Year !";
      return
    }

    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    days = days < 10 ? '0' + days : days
    hours = hours < 10 ? '0' + hours : hours
    minutes = minutes < 10 ? '0' + minutes : minutes
    seconds = seconds < 10 ? '0' + seconds : seconds

    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;
  }, 1000);

  showButtons = document.getElementsByClassName("show-btn")
  for (let i = showButtons.length - 1; i >= 0; i--) {
    showButtons[i].onclick = function () {
      if (this.classList.contains("opened")) {
        this.classList.remove("opened")
        // this.nextElementSibling.classList.remove("opened")
        collapse(this.nextElementSibling);
      } else {
        this.classList.add("opened")
        // this.nextElementSibling.classList.add("opened")
        expand(this.nextElementSibling);
      }
    }
  }
}

validate = (id) => {
  var elem = document.getElementById(id)
  var name = elem.getAttribute('name');

  if(!elem.value.match( eval(name + 'RegEx') )) {
    elem.classList.add('validation-error');
    return false;
  }

  elem.classList.remove('validation-error');
  return true;
};

function showButtonClick () {
  console.log(this)
}

collapse = (element) => {
  element.style.height = '0px';
  element.style.paddingBottom = '0px';
  // mark the section as "currently collapsed"
  element.setAttribute('data-collapsed', 'true');
}

expand = (element) => {
  const sectionHeight = element.scrollHeight;
  // have the element transition to the height of its inner content + padding
  element.style.height = (sectionHeight + 20) + 'px';
  element.style.paddingBottom = '20px';

  // mark the section as "currently not collapsed"
  element.setAttribute('data-collapsed', 'false');
}