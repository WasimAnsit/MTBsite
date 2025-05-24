// ******  Backend Api  *******

// Live---------
// let apiUrl = 'https://dncrpropertyapi.azurewebsites.net/'

// Dev----------
// let apiUrl = 'https://devdncrbe.azurewebsites.net/'

// New
let apiUrl =
  // "https://dncrnewapi-bmbfb6f6awd8b0bd.westindia-01.azurewebsites.net";
  "https://mtestatesapi-f0bthnfwbtbxcecu.southindia-01.azurewebsites.net"
// *********************************************************
//

function urlRedirection(token) {
  // dev--------
  // window.location.href = `https://devdncrfe.azurewebsites.net/Redirecting/?tok=${token}`

    // New Dev
    // window.location.href=`https://dncrnewapi-bmbfb6f6awd8b0bd.westindia-01.azurewebsites.net/Redirecting/?tok=${token}`;
  // Live--------
  // window.location.href = `https://app.dncrproperty.com/Redirecting/?tok=${token}`

  // // Local--------
  // window.location.href = `http://localhost:4200/Redirecting/?tok=${token}`;

  // new 
  window.location.href=`https://mtmtestatesapp-cjcxafhrgnenbydc.centralindia-01.azurewebsites.net/Redirecting/?tok=${token}`;
}

function addRequired(id) {
  let data = document.getElementById(id);
  if (data?.value === "") {
    data.classList.add("required");
  }
}

function removeValidationo(isemailchanging) {
  let email = document.getElementById("email-logino").value;
  if (email !== "" && isemailchanging === true) {
    document.getElementById("email-req-logino").style.display = "none";
    document.getElementById("emaildoesnotexist-logino").style.display = "none"; // Reset error

    const reg = /\S+@\S+\.\S+/;
    var isvalid = reg.test(email);
    if (isvalid) {
      document.getElementById("notValidEmailLogino").style.display = "none";
    } else {
      document.getElementById("notValidEmailLogino").style.display = "block";
    }
  }
}

// function nextOrPreviousStepAdmin(step) {
//   if (step) {
//     var email = document.getElementById("email-logino").value;
//     const reg = /\S+@\S+\.\S+/;
//     var isvalid = reg.test(email);
//     if (email == '' || !isvalid) {
//       document.getElementById("email-logino").classList.add('required')
//       document.getElementById("email-logino").focus();
//     } else {
//       const val = document.getElementById("emaildoesnotexist-logino").style.display
//       setTimeout(function () {
//         document.getElementById("password-login").focus();
//       }, 100);
//       if (val !== 'block') {
//         document.getElementById("loginEmailo").style.display = "none";
//         document.getElementById("loginPasswordo").style.display = "block";
//       }
//     }
//   }
// }
async function nextOrPreviousStepAdmin(step, domain) {
  if (step) {
    var email = document.getElementById("email-logino").value;
    const reg = /\S+@\S+\.\S+/;
    var isValid = reg.test(email);

    if (email === "") {
      document.getElementById("email-logino").classList.add("required");
      document.getElementById("email-req-logino").style.display = "block";
      document.getElementById("notValidEmailLogino").style.display = "none";
      document.getElementById("email-logino").focus();
      return;

    } else if (!isValid) {
      document.getElementById("email-logino").classList.add("required");
      document.getElementById("email-req-logino").style.display = "none";
      document.getElementById("notValidEmailLogino").style.display = "block";
      document.getElementById("email-logino").focus();
      return;
    }

    // Reset error messages
    document.getElementById("email-req-logino").style.display = "none";
    document.getElementById("notValidEmailLogino").style.display = "none";
    document.getElementById("emaildoesnotexist-logino").style.display = "none";


    let emailSpinner = document.getElementById("emailSpinnero");
    let continueText = document.getElementById("continue_text");
    let continueButton = document.getElementById("adminControl");

    if (emailSpinner && continueText) {
      emailSpinner.style.display = "block";
      continueText.style.display = "none";
      continueButton.disabled = true;
    }

    try {
      let response = await fetch(
        `${apiUrl}/account/check-email?email=${email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json, text/plain, */*",
          },
        }
        // `https://dncrnewapi-bmbfb6f6awd8b0bd.westindia-01.azurewebsites.net/account/check-email?email=${email}`
      );
      let result = await response.json();

      document.getElementById("loginspinnero").style.display = "none";

      if (result.success && (result.data.userType === "Partner" || result.data.userType === "Admin")) {
        sendOTP(email, domain);
      } else {
        document.getElementById("emaildoesnotexist-logino").style.display =
          "block";
        document.getElementById("emaildoesnotexist-logino").innerText =
          "User does not exist!";
      }
    } catch (error) {
      console.error("Error checking email:", error);
      alert("Something went wrong! Please try again.");
    } finally {
      emailSpinner.style.display = "none";
      continueText.style.display = "block";
      continueButton.disabled = false;
    }
  }
}
function sendOTP(email, domain) {
  document.getElementById("loginspinnero").style.display = "inline-block";

  var mybody = {
    email: email,
    domain: domain,
  };

  var xhr = new XMLHttpRequest();
  xhr.open("POST", `${apiUrl}/account/otp-verification`);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("Accept", "application/json, text/plain, */*");
  xhr.send(JSON.stringify(mybody));

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      document.getElementById("loginspinnero").style.display = "none";

      if (xhr.status == 200) {
        var json_data = JSON.parse(xhr.responseText);
        if (json_data?.success) {
          // Store email for OTP verification
          sessionStorage.setItem("loginEmail", email);
          // Show OTP screen
          document.getElementById("loginEmailo").style.display = "none";
          document.getElementById("loginOTPo").style.display = "block";
          document.getElementById("invalidUser-logino").style.display = "none";
          // Focus OTP input
          setTimeout(function () {
            document.getElementById("otp-login").focus();
          }, 100);
        } else {
          document.getElementById("emaildoesnotexist-logino").style.display =
            "block";
        }
      } else {
        document.getElementById("invalidUser-logino").style.display = "block";
      }
    }
  };
}

// Function to verify OTP
async function verifyOTP() {
  var email = sessionStorage.getItem("loginEmail");
  var otp = document.getElementById("otp-login").value;

  if (otp == "") {
    document.getElementById("otp-req-logino").style.display = "block";
    document.getElementById("otp-login").focus();
    return;
  }

  document.getElementById("otp-req-logino").style.display = "none";
  document.getElementById("loginspinnero").style.display = "inline-block";

  var mybody = {
    email: email, // Changed from lowercase to uppercase to match other API calls
    otp: otp, // Changed from lowercase to uppercase to match other API calls
  };

  let otpText = document.getElementById("otp_text");
  let otpSpinner = document.getElementById("loginspinnero");
  let otpButton = document.getElementById("adminLogin");

  if(otpText && otpSpinner) {
    otpText.style.display = "none";
    otpSpinner.style.display = "block";
    otpButton.disabled = true;
  }

  try {
    const response = await fetch(`${apiUrl}/account/otp-verification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json, text/plain, */*'
      },
      body: JSON.stringify(mybody)
    });

    const json_data = await response.json();

    if (response.ok) {
      if (json_data?.success) {
        document.getElementById("invalidUser-logino").style.display = "none";
        // Clear stored email
        sessionStorage.removeItem("loginEmail");
        // Redirect to dashboard or appropriate page  
        urlRedirection(json_data.data);
      } else {
        document.getElementById("invalidUser-logino").textContent = "Invalid OTP!";
        document.getElementById("invalidUser-logino").style.display = "block";
      }
    } else {
      document.getElementById("invalidUser-logino").textContent = json_data.message;
      document.getElementById("invalidUser-logino").style.display = "block";
    }

  } catch (error) {
    console.error('Error:', error);
    document.getElementById("invalidUser-logino").textContent = "Verification failed!";
    document.getElementById("invalidUser-logino").style.display = "block";
    otpText.style.display = "block";
  } finally {
    otpSpinner.style.display = "none";
    otpText.style.display = "block";
    otpButton.disabled = false;
  }
}

function removeValidation(isemailchanging) {
  let email = document.forms["loginForm"]["Email"].value;
  if (email !== "" && isemailchanging === true) {
    document.getElementById("email-req-login").style.display = "none";
    const reg = /\S+@\S+\.\S+/;
    var isvalid = reg.test(email);
    if (isvalid) {
      emailCheck(email, true);
      document.getElementById("notValidEmailLogin").style.display = "none";
    } else {
      document.getElementById("notValidEmailLogin").style.display = "block";
    }
  }
  if (document.forms["loginForm"]["Password"].value) {
    document.getElementById("password-req-login").style.display = "none";
  }
}

// function loginonEnter() {
//   var paas = document.getElementById("password-login");
//   if (paas) {
//     paas.addEventListener("keyup", function (event) {
//       if (event.key === 'Enter') {
//         loginAdmin()
//       }
//     });
//   }
// }

// function login() {
//   var email = document.forms["loginForm"]["Email"].value;
//   var password = document.forms["loginForm"]["Password"].value;
//   if (email == "") {
//     document.getElementById("email-req-login").style.display = "block";
//   }
//   if (password == "") {
//     document.getElementById("password-login").classList.add("required");
//     document.getElementById("password-login").focus();
//   }

//   var mybody = {
//     Email: (String = email),
//     Password: (String = password),
//   };

//   if (email != "" && password != "") {
//     // document.getElementById("loginarrow").style.display = "none";
//     document.getElementById("loginspinner").style.display = "inline-block";
//     var xhr = new XMLHttpRequest();
//     xhr.open("POST", `${apiUrl}/api/v1/Account/loginUser`);
//     xhr.setRequestHeader("Content-Type", "application/json");
//     xhr.setRequestHeader("Accept", "application/json, text/plain, */*");
//     xhr.send(JSON.stringify(mybody));
//     xhr.onreadystatechange = function () {
//       if (xhr?.readyState == 4) {
//         if (xhr?.status == 200) {
//           var json_data = JSON.parse(xhr?.responseText);
//           if (json_data?.Success) {
//             document.getElementById("invalidUser-login").style.display = "none";
//             urlRedirection(json_data.data);
//           } else {
//             document.getElementById("invalidUser-login").style.display =
//               "block";
//             document.getElementById("loginspinner").style.display = "none";
//           }
//         }
//       }
//     };
//   }
// }

// function iconClick() {
//   const password = document.querySelector("#password-login");
//   const type =
//     password.getAttribute("type") === "password" ? "text" : "password";
//   password.setAttribute("type", type);
//   if (type == "password") {
//     document.getElementById("togglePassword").classList.add("fa-eye-slash");
//     document.getElementById("togglePassword").classList.remove("fa-eye");
//   } else {
//     document.getElementById("togglePassword").classList.remove("fa-eye-slash");
//     document.getElementById("togglePassword").classList.add("fa-eye");
//   }
// }

function loginAdmin() {
  var email = document.getElementById("email-logino").value;
  var password = document.getElementById("password-login").value;
  if (email == "") {
    document.getElementById("email-req-logino").classList.add("required");
    document.getElementById("email-req-logino").style.display = "block";
  }
  if (password == "") {
    document.getElementById("password-req-logino").classList.add("required");
    document.getElementById("password-req-logino").focus();
  }

  var mybody = {
    Email: (String = email),
    Password: (String = password),
  };

  if (email != "" && password != "") {
    // document.getElementById("loginarrow").style.display = "none";
    document.getElementById("loginspinnero").style.display = "inline-block";
    var xhr = new XMLHttpRequest();
    xhr.open("POST", `${apiUrl}/api/v1/Account/loginUser`);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accept", "application/json, text/plain, */*");
    xhr.send(JSON.stringify(mybody));
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4)
        if (xhr.status == 200) var json_data = JSON.parse(xhr.responseText);
      if (json_data?.Success) {
        document.getElementById("invalidUser-logino").style.display = "none";
        urlRedirection(json_data.data);
      } else {
        document.getElementById("invalidUser-logino").style.display = "block";
        document.getElementById("loginspinnero").style.display = "none";
      }
    };
  }
}
