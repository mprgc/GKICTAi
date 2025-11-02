// register.js

document.addEventListener("DOMContentLoaded", function() {

  const CURRENT_VERSION = "Version 1.0"; // <-- නව version එකක් දාන්න
  const ACCESS_CODE = "GKICT@j5"; // <-- ඔබගේ නව code එක
  const FORM_LINK = "https://docs.google.com/forms/d/e/1FAIpQLScwdxdJOQCqtN4sL_YczCPymKoBzi3NDHFXrNuM080qSF5DrA/viewform?usp=sharing&ouid=114444653573004614970";

  const registeredOnce = localStorage.getItem("gkict_registered_once");
  const savedVersion = localStorage.getItem("gkict_version");

  // version mismatch නම් access recheck කරන්න
  if (savedVersion !== CURRENT_VERSION) {
    localStorage.removeItem("gkict_registered");
  }

  // පරිශීලකයා පූර්වයේම register වී නැත්නම් — form + code verify
  if (!registeredOnce) {

    Swal.fire({
      title: "📝 Register Before Using Chatbot",
      html: "ඔබට GKICT AI Assistant භාවිතා කිරීමට පෙර Register විය යුතුය.<br><br>කරුණාකර ඔබගේ විස්තර Google Form එකේ පුරවන්න.",
      icon: "info",
      confirmButtonText: "Go to Form",
      allowOutsideClick: false
    }).then(() => {
      window.open(FORM_LINK, "_blank");

      Swal.fire({
        title: "🔐 Access Code Required",
        html: "ඔබ Form එක submit කළාට පස්සේ ලැබෙන Access Code එක මෙතැන ඇතුළත් කරන්න:",
        input: "text",
        inputPlaceholder: "Enter your code (e.g. GKICT2025)",
        confirmButtonText: "Confirm",
        allowOutsideClick: false
      }).then((result) => {
        if (result.value === ACCESS_CODE) {
          localStorage.setItem("gkict_registered", "true");
          localStorage.setItem("gkict_registered_once", "true"); // once-registered flag
          localStorage.setItem("gkict_version", CURRENT_VERSION);
          Swal.fire("✅ Registration Complete!", "ඔබට දැන් Chatbot භාවිතා කළ හැක.", "success");
        } else {
          Swal.fire("❌ වැරදි Access Code එකක්!", "Access Denied.", "error");
          setTimeout(function() {location.reload(); }, 1500);
        }
      });
    });

  } 
  // පූර්වයේම register වී ඇති නමුත් version mismatch නම් — code recheck පමණක්
  else if (!localStorage.getItem("gkict_registered")) {

    Swal.fire({
      title: "🔑 Access Code Updated",
      html: "GKICT AI Assistantහි security update එකක් සිදුවිය. කරුණාකර නව Access Code එක ඇතුළත් කරන්න.",
      input: "text",
      inputPlaceholder: "Enter your new code (e.g. GKICT2025)",
      confirmButtonText: "Verify",
      icon: "warning",
      allowOutsideClick: false
    }).then((result) => {
      if (result.value === ACCESS_CODE) {
        localStorage.setItem("gkict_registered", "true");
        localStorage.setItem("gkict_version", CURRENT_VERSION);
        Swal.fire("✅ Verified!", "ඔබට නැවත chatbot භාවිතා කළ හැක.", "success");
      } else {
        Swal.fire("❌ වැරදි Access Code එකක්!", "Access Denied.", "error");
        setTimeout(function() {location.reload(); }, 1500);
      }
    });
  }
});



 function resetGKICTData() {
      localStorage.removeItem('gkict_registered');
      localStorage.removeItem('gkict_registered_once');
      localStorage.removeItem('gkict_version');
      alert('✅ All GKICT registration data has been cleared!');
    }
