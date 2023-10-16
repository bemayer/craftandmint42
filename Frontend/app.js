// @ts-check

/**
 * NAVIGATION
 */

/**
 * Add listeners to DOM elements.
 */
window.addEventListener("DOMContentLoaded", initializeMenu);

document.getElementById("api-form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  checkKeys();
});

document
  .getElementById("image-generator-form")
  ?.addEventListener("submit", async (e) => {
    e.preventDefault();
    generateImage();
  });

document
  .getElementById("close-error-api-key")
  ?.addEventListener("click", () => {
    updateDisplay("error-api-key", "none");
  });

/**
 * Initialize the menu.
 */
function initializeMenu() {
  const menuItems = document.querySelectorAll(".menu-item");
  menuItems.forEach((item, idx) => {
    if (idx === 0) displayContent(item.getAttribute("data-target"));
    item.addEventListener("click", (event) => {
      const targetContent = event.target;
      if (targetContent instanceof HTMLElement)
        displayContent(targetContent.getAttribute("data-target"));
    });
  });
}

/**
 * Display content based on the menu item clicked.
 * @param {string | null} contentID - The ID of the content to display.
 */
function displayContent(contentID) {
  if (!contentID) return;

  const allContent = document.querySelectorAll(".content");
  allContent.forEach((content) => {
    if (content instanceof HTMLElement) content.style.display = "none";
  });

  const selectedContent = document.getElementById(contentID);
  if (selectedContent) selectedContent.style.display = "block";
}

/**
 * IMAGE GENERATION WITH DREAMSTUDIO API
 */

/**
 * Check the validity of provided API keys and update UI elements accordingly.
 */
async function checkKeys() {
  const apiKeyInput = document.getElementById("api-key");
  if (!(apiKeyInput instanceof HTMLInputElement)) return;

  const credits = await checkDreamStudioBalance(apiKeyInput.value);
  if (!credits) {
    updateDisplay("error-api-key", "block");
    return;
  }

  apiKeyInput.style.display = "none";
  updateDisplay("api-key-submit", "none");
  updateCreditsDisplay(credits);
}

/**
 * Update and display DreamStudio credits.
 * @param {number} credits - The number of available credits.
 */
function updateCreditsDisplay(credits) {
  const creditsDisplay = document.getElementById("display-credits");
  if (creditsDisplay) {
    creditsDisplay.innerHTML = `Available DreamStudio credits: <strong>${credits.toFixed(
      2
    )}</strong>`;
    creditsDisplay.style.display = "block";
  }
}

/**
 * Check the balance of DreamStudio credits for a given API key.
 * @param {string} apiKey - The API key for DreamStudio.
 * @returns {Promise<number>} - Returns the number of credits available, or 0 if the request fails.
 */
async function checkDreamStudioBalance(apiKey) {
  const url = "https://api.stability.ai/v1/user/balance";
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const { credits } = await response.json();
    console.log("credits: ", credits);
    return credits;
  } catch (error) {
    console.error(error);
    return 0;
  }
}

/**
 * Fetch image from DreamStudio using the provided URL, API key, and text description.
 * @param {string} url - The API URL.
 * @param {string} apiKey - The API key for authentication.
 * @param {string} text - The text description for generating the image.
 * @returns {Promise<Blob>} - The generated image as a Blob.
 */
async function fetchImageFromDreamStudio(url, apiKey, text) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      text_prompts: [
        {
          text,
        },
      ],
      cfg_scale: 7,
      height: 512,
      width: 512,
      steps: 30,
      samples: 1,
    }),
  };

  const response = await fetch(url, requestOptions);

  if (!response.ok) {
    throw new Error(`Non-200 response: ${await response.text()}`);
  }

  const data = await response.json();
  const blobResponse = await fetch(
    `data:image/png;base64,${data.artifacts[0].base64}`
  );
  return blobResponse.blob();
}

/**
 * Make a request to DreamStudio API to generate an image based on the provided description.
 */
async function generateImage() {
  const url =
    "https://api.stability.ai/v1/generation/stable-diffusion-512-v2-1/text-to-image";
  const apiKeyInput = document.getElementById("api-key");
  if (!(apiKeyInput instanceof HTMLInputElement)) return;

  const promptInput = document.getElementById("image-description");
  if (!(promptInput instanceof HTMLInputElement) || !promptInput.value) return;

  const apiKey = apiKeyInput.value;
  const prompt = promptInput.value;

  try {
    const blob = await fetchImageFromDreamStudio(url, apiKey, prompt);
    const generatedImageURL = URL.createObjectURL(blob);
    localStorage.setItem("generatedImage", generatedImageURL);
  } catch (error) {
    console.error(error);
    return;
  }

  const fromLocalStorage = localStorage.getItem("generatedImage");

  updateProperty("generated-image", "src", fromLocalStorage);
  updateProperty("generated-image-title", "textContent", prompt);
  updateDisplay("generated-image", "block");
}

// UNTESTED CODE BELOW FOR LOADING TO IPFS VIA PINATA

/**
 * Uploads an image to IPFS via the Pinata service.
 * @param {File} imageFile - The image file to upload.
 * @return {Promise<Object>} - The Pinata response with the IPFS hash.
 */
async function uploadImageToIPFS(imageFile) {
  const pinataApiKey = "YourPinataAPIKeyHere";
  const pinataApiSecret = "YourPinataAPISecretHere";

  const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";

  const formData = new FormData();
  formData.append("file", imageFile);

  const headers = {
    pinata_api_key: pinataApiKey,
    pinata_secret_api_key: pinataApiSecret,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload image to IPFS via Pinata");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(`Failed to upload image: ${error}`);
  }
}

/**
 * HELPERS
 */

/**
 * Update display value for an HTML element identified by an ID.
 * @param {string} elementId - The ID of the HTML element.
 * @param {string} displayValue - The display value to set.
 */
function updateDisplay(elementId, displayValue) {
  const element = document.getElementById(elementId);
  if (element) {
    element.style.display = displayValue;
  }
}

/**
 * Update property for an HTML element identified by an ID.
 * @param {string} elementId - The ID of the HTML element.
 * @param {string} property - The property to update.
 * @param {any} value - The display value to set.
 */
function updateProperty(elementId, property, value) {
  const element = document.getElementById(elementId);
  if (element) {
    element[property] = value;
  }
}
