/*function doGet(e) {
  // ඔබට මෙතනින් API URL එක set කරන්න
  const apiKey = "AIzaSyDbqITHLeMX7XCenp5RGRV0CAlL_9_IfSk";
  var apiUrl = "https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=" + apiKey; // ← මෙය ඔබට වෙනස් කරන්න

  var output = { apiUrl: apiUrl };

  return ContentService
          .createTextOutput(JSON.stringify(output))
          .setMimeType(ContentService.MimeType.JSON);
}*/

  function getValue(e) {


    const apiKey = "123";
    var apiUrl = "https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=" + apiKey; // ← මෙය ඔබට වෙනස් කරන්න

  
  return apiUrl;
}


