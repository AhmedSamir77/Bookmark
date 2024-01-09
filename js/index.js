var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");

var siteList;

if (localStorage.getItem("siteList") === null) {
  siteList = [];
} else {
  siteList = JSON.parse(localStorage.getItem("siteList"));
  display(siteList);
}

function createSite() {
  if (validateSiteName() === true) {
    var site = {
      name: siteName.value,
      url: siteUrl.value,
    };

    siteList.push(site);
    console.log(siteList);

    display(siteList);
    localStorage.setItem("siteList", JSON.stringify(siteList));
    clearForm();
  } else {
    displayError();
  }
}

function displayError() {
  //display error message
  var error=document.getElementById("error");
  error.classList.replace("d-none", "d-block");

}

function display(list) {
  console.log(list);
  cartona = "";

  for (var i = 0; i < list.length; i++) {
    console.log(list[i].url);
    cartona += `<tr>
        <td>${i + 1}</td>
        <td>${list[i].name}</td>
        <td>
        <button class="visit-btn " onclick="visit('${list[i].url}')"><i class="fa-solid fa-eye pe-2"></i> Visit</button></td>
        <td><button class="btn btn-danger " onclick="deleteSite(${i})"><i class="fa-solid fa-trash-can"></i> Delete</button></td>

        </tr>`;
  }
  
  document.getElementById("data").innerHTML = cartona;
}

function visit(url) {
 window.open(url);
}

function deleteSite(index) {
  siteList.splice(index, 1);
  display(siteList);
  localStorage.setItem("siteList", JSON.stringify(siteList));
}

function clearForm() {
  siteName.value = "";
  siteUrl.value = "";

  siteName.classList.remove("is-valid");
  siteUrl.classList.remove("is-valid");
}

function validateSiteName() {
  var regex = /^[A-Z]{0,1}[a-z]{3,15}$/;

  if (regex.test(siteName.value)) {
    siteName.classList.replace("is-invalid", "is-valid");
    return true;
  } else {
    siteName.classList.add("is-invalid");
    return false;
  }
}

function validateSiteUrl() {
  var regex = /^\w{1,}\.\w{2,}$/;

  if (regex.test(siteUrl.value)) {
    siteUrl.classList.replace("is-invalid", "is-valid");
    return true;
  } else {
    siteUrl.classList.add("is-invalid");
    return false;
  }
}
