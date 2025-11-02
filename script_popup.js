// register.js

document.addEventListener("DOMContentLoaded", function() {

  // පරිශීලකයා register වී නැත්ද කියා පරික්ෂා කිරීම
  if (!localStorage.getItem("gkict_registered")) {

    // පළමුව popup එක පෙන්වන්න — Register වෙන්න කියලා
    Swal.fire({
      title: "📝 Register Before Using Chatbot",
      html: "ඔබට GKICT AI Chatbot භාවිතා කිරීමට පෙර Register විය යුතුය.<br><br>කරුණාකර ඔබගේ විස්තර Google Form එකේ පුරවන්න.",
      icon: "info",
      confirmButtonText: "Go to Form",
      allowOutsideClick: false
    }).then(() => {

      // ඔබේ Google Form link එක මෙතැන දාන්න 👇
      const formLink = "https://docs.google.com/forms/d/e/1FAIpQLScwdxdJOQCqtN4sL_YczCPymKoBzi3NDHFXrNuM080qSF5DrA/viewform";
      window.open(formLink, "_blank");

      // Access code verify කිරීම
      Swal.fire({
        title: "🔐 Access Code Required",
        html: "ඔබ Form එක submit කළාට පස්සේ ලැබෙන Access Code එක මෙතැන ඇතුළත් කරන්න:",
        input: "text",
        inputPlaceholder: "Enter your code (e.g. ABC123)",
        confirmButtonText: "Confirm",
        allowOutsideClick: false
      }).then((result) => {
        if (result.value === "3sf8GK@") {
          localStorage.setItem("gkict_registered", "true");
          Swal.fire("✅ Registration Complete!", "ඔබට දැන් Chatbot භාවිතා කළ හැක.", "success");
        } else {
          Swal.fire("❌ වැරදි Access Code එකක්!", "Access Denied.", "error");
          setTimeout(function() {location.reload(); }, 1700);
          /*const formLink = "404.html";
          window.open(formLink, "_blank");*/
        }
      });

    });
  }
});

