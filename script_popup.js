// register.js

document.addEventListener("DOMContentLoaded", function() {

  const CURRENT_VERSION = "Version 1.3"; // <-- නව version එකක් දාන්න
  const ACCESS_CODE = "123"; // <-- ඔබගේ නව code එක
  
  const registeredOnce = localStorage.getItem("gkict_registered_once");
  const savedVersion = localStorage.getItem("gkict_version");

  // version mismatch නම් access recheck කරන්න
  if (savedVersion !== CURRENT_VERSION) {
    localStorage.removeItem("gkict_registered");
  }

  // ✅ Access Code එක හෝ Version එක වෙනස් උනොත් popup එක පමණක් පෙන්වන්න
  if (!localStorage.getItem("gkict_registered")) {

    Swal.fire({
      title: "🔑 Access Code Required",
      html: "Chatbot security update එකක් සිදුවිය. කරුණාකර නව Access Code එක ඇතුළත් කරන්න.",
      input: "text",
      inputPlaceholder: "Enter your new code (e.g. GKICT2025)",
      confirmButtonText: "Verify",
      icon: "warning",
      allowOutsideClick: false
    }).then((result) => {
      if (result.value === ACCESS_CODE) {
        localStorage.setItem("gkict_registered", "true");
        localStorage.setItem("gkict_registered_once", "true");
        localStorage.setItem("gkict_version", CURRENT_VERSION);
        Swal.fire("✅ Verified!", "ඔබට දැන් Chatbot භාවිතා කළ හැක.", "success");
      } else {
        Swal.fire("❌ වැරදි Access Code එකක්!", "Access Denied.", "error");
        setTimeout(function() { location.reload(); }, 1500);
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



