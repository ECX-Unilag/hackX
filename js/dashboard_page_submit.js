const formElement = document.querySelector('#formElement');
let finishBtn = document.querySelector('#finish');
let sureToSubmit = document.querySelector('#submit_popup');
let closeSubmitPopUp = document.querySelector('#close_popup');
let loader = document.querySelector('.loadCont');
//let Submit = document.querySelector('#submit_popup__btn');
finishBtn.onclick = () => {
    sureToSubmit.style.display = "block";
    // console.log("opened submit popup");
}
closeSubmitPopUp.onclick = () => {
    sureToSubmit.style.display = "none";
    // console.log('closed submit popup');
}
// // Submit question
// var submitPopup = document.querySelector('#submit_popup');
// var closePopup = document.querySelector('#close_popup');
// finishBtn.onclick = () => {
//   submitPopup.style.display = "block";
//   document.querySelector('.dashboard_all__opacity').style.height = "100%";
//   document.querySelector('.dashboard_all__opacity').style.overflow = "hidden";
// };
// let reDo = () => {
//     submitPopup.style.display = "none";
//     document.querySelector('.dashboard_all__opacity').style.height = "100%";
//     document.querySelector('.dashboard_all__opacity').style.overflow = "auto";
// }
// closePopup.addEventListener('click', () => {
//     submitPopup.style.display = "none";
//     document.querySelector('.dashboard_all__opacity').style.height = "100%";
//     document.querySelector('.dashboard_all__opacity').style.overflow = "auto";
// });

// const popUp = document.querySelector(".response-bar");
// const Submit = document.querySelector(".submit_popup__btn");

// const showLoginAlert = (message, className) => {
//   const div = document.createElement("div");
//   div.className = `alert ${className}`;
//   div.appendChild(document.createTextNode(message));
//   const container = document.querySelector(".participant-info");
//   container.insertBefore(div, popUp);

//   setTimeout(function () {
//     document.querySelector(".alert").remove();
//   }, 12000);
// };

const formEvent = Submit.addEventListener("click", async (event) => {
    event.preventDefault();
    document.querySelector('#submit_popup').style.display = "none";
    loader.style.display = 'block';
    dashboardInfo();
  });

const headers = {
  'Content-Type': 'application/json',
  'Authorization': "Bearer" + ' ' + localStorage.getItem("pass"),
  'withCredentials': true, 
}
const id = window.localStorage.getItem("id");
var headApp = document.querySelector('.header_one__app');
var headTime = document.querySelector('.header_two__time');
var headPrize = document.querySelector('.header_two__prize');
var headOver = document.querySelector('.header_two__over');

const dashboardInfo = async () => {
  const institution = document.querySelector("#institution").value;
  const department = document.querySelector("#department").value;
  const linkooo = [];
  let linko = document.querySelector('#link');
  var addedLink = "";
  let newProfile = document.querySelector(".new-profile");
  newProfile.addEventListener('click', () => {
    if (linko.innerHTML.length > 0) {
      addedLink = linko.value;
      linkooo.push(addedLink);
      linko.innerHTML = "";
    }
  });
  var formData = new FormData(formElement);
  formData.append("institution", institution);
  formData.append("department", department);
  formData.append("link", linkooo);
  axios
    .post("https://hackxbackend.herokuapp.com/dashboard/"+ id, formData, { headers: headers})
    .then((response) => {
      loader.style.display = 'none';
      // console.log(response)
      if (response.status == "200") {
        if (response.data == "Too many files to upload.") {
          showLoginAlert("Too many files to upload.", "error");
        } else if (response.data == "Error when trying to upload files.") {
          showLoginAlert("Error when trying to upload biodata.", "error");
        }else if (response.data == "Files have been uploaded.") {
          showLoginAlert("Submitted Successfully.", "success");
          document.querySelector('.dashboard_submissionSuccessful').style.display = "block";
          document.querySelector('.dashboard_all__opacity').classList.add('stop_scroll');
          headApp.addEventListener('click', ()=> {
          	document.querySelector('.dashboard_submissionSuccessful').style.display = "block";
          	document.querySelector('.dashboard_all__opacity').style.display = "none";
            document.querySelector('#displayy_mobile').style.display = "none";
            window.location.href = "https://hackx.netlify.app/index.html";
          });
          function clicks() {
          	document.querySelector('.dashboard_submissionSuccessful').style.display = 'none';
          }
          headTime.addEventListener('click', ()=> {
         	clicks();
          });
          headPrize.addEventListener('click', ()=> {
         	clicks();
          });
          headOver.addEventListener('click', ()=> {
         	clicks();
          });
          localStorage.setItem("submission", true);
        } else if (response.data == "Dashboard Submission Failed") {
          showLoginAlert("Unable to submit files.", "error");
        }else if (response.data == 'Invalid Token') {
          showLoginAlert("Unable to submit files.", "error");
        }else if (response.data == 'You are not allowed to access this page.') {
          showLoginAlert('You are not allowed to access this page.', "error");
        } else { 
          showLoginAlert(response.data, "error");
        }
      } else {
        showLoginAlert("Something Went Wrong. Try Again Later", "error");
      }
    })
    .catch((error) => console.error(error.message));
};

var uusername = localStorage.getItem('username');
axios.get("https://hackxbackend.herokuapp.com/getuser?username=" + uusername, {headers: headers})
.then((response) => {
  let docu = response.data;
	// console.log(docu);
  // console.log(docu.dashboard[0]);
  // console.log(uusername);
	if (docu.dashboard[0].bio !== null) {
		document.querySelector('.dashboard_submissionSuccessful').style.display = "block";
		document.querySelector('.participant-info').classList.add('stop_scroll');
		headApp.addEventListener('click', ()=> {
			document.querySelector('.dashboard_submissionSuccessful').style.display = "block";
			document.querySelector('.dashboard_all__opacity').style.display = "none";
			document.querySelector('#displayy_mobile').style.display = "none";
		});
		function clicks() {
			document.querySelector('.dashboard_submissionSuccessful').style.display = 'none';
		}
		headTime.addEventListener('click', ()=> {
			clicks();
		});
		headPrize.addEventListener('click', ()=> {
			clicks();
		});
		headOver.addEventListener('click', ()=> {
			clicks();
		});
	}
})
.catch((err) => {console.error(err.message)});