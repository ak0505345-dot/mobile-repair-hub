const resetBtn = document.getElementById("resetBtn");

resetBtn.addEventListener("click", () => {

  const email = document.getElementById("email").value.trim();

  if (!email) {
    alert("⚠️ Please enter your email address.");
    return;
  }

  alert(
    "📩 Request Submitted!\n\nPlease contact the administrator to reset your password.\n\nAdmin will verify your account and help you regain access."
  );

  window.location.href = "login.html";

});