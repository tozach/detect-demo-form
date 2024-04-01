document
  .getElementById("infoForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Retrieve form data
    const formData = {
      customerId: document.getElementById("id").value,
      reason: document.getElementById("reason").value,
    };

    // URL of the backend endpoint
    const apiUrl = "http://localhost:3000/submit-info";

    try {
      const response = await fetch(apiUrl, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json(); // Assuming the server responds with JSON
      console.log("Success:", data);
      // Handle success response (e.g., showing a success message)
      // Show the modal
      showModal(data);
    } catch (error) {
      console.error("Error:", error);
      // Handle errors here (e.g., showing an error message)
    }
  });

function showModal(response) {
  const modal = document.getElementById("myModal");
  const modalContent = document.querySelector(".modal-content p");

  // Construct the response message
  let responseMessage = `${response.message}<br><ul>`;
  response.externalApiResponse.forEach((detail) => {
    responseMessage += `<li>${detail.best_label}: ${detail.original_text}</li>`;
  });
  responseMessage += `</ul>`;

  modalContent.innerHTML = responseMessage;
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
document.getElementsByClassName("close")[0].onclick = function () {
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
};

// Optional: Close the modal if the user clicks anywhere outside of it
window.onclick = function (event) {
  var modal = document.getElementById("myModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
