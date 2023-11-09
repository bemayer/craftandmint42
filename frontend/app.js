/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * NAVIGATION
 */

/**
 * Display content based on the menu item clicked.
 *
 * @param {string | null} contentID - The ID of the content to display.
 */
function displayContent(contentID) {
  if (!contentID) return;

  const allContent = document.querySelectorAll(".content");
  allContent.forEach((content) => {
    // eslint-disable-next-line no-param-reassign
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
async function checkDreamstudioAPIKey() {
  try {
    const apiKeyButton = document.getElementById("dreamstudio-api-key-submit");
    apiKeyButton.disabled = true;
    const apiKeyInput = document.getElementById("dreamstudio-api-key");
    const credits = await checkDreamStudioBalance(apiKeyInput.value);
    if (!credits) throw new Error("Invalid API key");
    apiKeyInput.style.display = "none";
    updateDisplay("dreamstudio-api-key-submit", "none");
    updateDisplay("menu-item-set-up", "block");
    updateDisplay("menu-item-generate-image", "block");
    apiKeyInput.disabled = true;
    updateMessage(
      "display-credits",
      `Available DreamStudio credits: <strong>${credits.toFixed(2)}</strong>`
    );
  } catch (error) {
    console.error(error);
    updateDisplay("error-dreamstudio-api-key", "block");
    const apiKeyButton = document.getElementById("dreamstudio-api-key-submit");
    apiKeyButton.disabled = false;
  }
}

/**
 * Check the balance of DreamStudio credits for a given API key.
 *
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
    return credits;
  } catch (error) {
    console.error(error);
    return 0;
  }
}

/**
 * Fetch image from DreamStudio using the provided URL, API key, and text description.
 *
 * @param {string} apiKey - The API key for authentication.
 * @param {string} text - The text description for generating the image.
 * @returns {Promise<Blob>} - The generated image as a Blob.
 */
async function fetchImageFromDreamStudio(apiKey, text) {
  const url =
    "https://api.stability.ai/v1/generation/stable-diffusion-512-v2-1/text-to-image";
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
      steps: 50,
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
  try {
    const apiKeyInput = document.getElementById("dreamstudio-api-key");
    const promptInput = document.getElementById("image-description");
    const apiKey = apiKeyInput.value;
    const title = promptInput.value;
    const generateImageButton = document.getElementById(
      "generate-image-button"
    );
    generateImageButton.disabled = true;
    const blob = await fetchImageFromDreamStudio(apiKey, title);
    const generatedImageURL = URL.createObjectURL(blob);
    localStorage.setItem("generatedImage", generatedImageURL);
    const image = localStorage.getItem("generatedImage");
    updateProperty("generated-image", "src", image);
    updateProperty("generated-image-title", "textContent", title);
    updateDisplay("generated-image", "block");
    updateDisplay("store-image-form", "block");
  } catch (error) {
    console.error(error);
    const generateImageButton = document.getElementById(
      "generate-image-button"
    );
    generateImageButton.disabled = false;
  }
}

/**
 * LOAD IMAGE TO IPFS VIA PINATA
 */

/**
 * Checks the credentials for Pinata API.
 */
async function checkPinataCredentials() {
  try {
    const apiKeyInput = document.getElementById("pinata-api-key");

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${apiKeyInput.value}`,
      },
    };

    const response = await fetch(
      "https://api.pinata.cloud/data/testAuthentication",
      options
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${errorData.error}`);
    }

    const data = await response.json();
    updateDisplay("pinata-credentials-submit", "none");
    apiKeyInput.disabled = true;
    updateMessage(
      "display-pinata-credentials",
      "Pinata authentication successful !"
    );
    const storeImageButton = document.getElementById("store-image-button");
    storeImageButton.disabled = false;
  } catch (error) {
    console.error("Pinata authentication failed:", error.message);
    updateDisplay("error-pinata-credentials", "block");
  }
}

/**
 * Stores an image on IPFS using the Pinata API.
 */
async function storeImageOnIPFS() {
  try {
    const storeImageButton = document.getElementById("store-image-button");
    storeImageButton.disabled = true;
    const file = await getFile();
    const body = createFormData(file);
    const apiKey = document.getElementById("pinata-api-key").value;

    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${apiKey}`,
      },
      body,
    };

    const response = await fetch(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      options
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${errorData.error}`);
    }

    const data = await response.json();
    const ipfsHash = data.IpfsHash;
    updateDisplay("store-image-button", "none");
    updateDisplay("mint-form", "block");
    const ipfsHashDisplay = document.getElementById("ipfs-hash");
    ipfsHashDisplay.setAttribute("ipfs-hash", ipfsHash);
    updateMessage(
      "ipfs-hash",
      `Image stored on IPFS with hash: <strong><a href="https://ipfs.io/ipfs/${ipfsHash}">${ipfsHash}</strong>`
    );
  } catch (error) {
    const storeImageButton = document.getElementById("store-image-button");
    storeImageButton.disabled = false;
    console.error(`Failed to store image on IPFS: ${error.message}`);
  }
}

/**
 * Generates file object for the image.
 *
 * @returns {File} An object containing the file.
 */
async function getFile() {
  const filename = document
    .getElementById("generated-image-title")
    .textContent.replace(/\s+/g, "")
    .toLowerCase();
  const blobUrl = localStorage.getItem("generatedImage");
  const blobResponse = await fetch(blobUrl);
  const blob = await blobResponse.blob();
  const file = new File([blob], `${filename}.jpg`, { type: blob.type });
  return file;
}

/**
 * Creates a FormData object with the file.
 *
 * @param {File} file - The file to append to FormData.
 * @returns {FormData} The FormData object.
 */
function createFormData(file) {
  const body = new FormData();
  body.append("file", file);
  return body;
}

/**
 * INTERACT WITH SMART CONTRACT
 */

/**
 * Interacts with the smart contract to verify the private key.
 */
async function checkPrivateKey() {
  try {
    const privateKeyButton = document.getElementById("private-key-submit");
    privateKeyButton.disabled = true;
    const privateKeyInput = document.getElementById("private-key");
    const privateKey = privateKeyInput.value;
    const provider = new ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545/");
    const wallet = new ethers.Wallet(privateKey, provider);
    const balanceWei = await wallet.getBalance();
    const balanceEther = ethers.utils.formatEther(balanceWei);
    privateKeyInput.disabled = true;
    updateDisplay("private-key-submit", "none");
    updateDisplay("contract-abi-file", "block");
    updateMessage(
      "display-balance",
      `Wallet balance: <strong>${balanceEther} ETH</strong>`
    );
  } catch (error) {
    updateDisplay("error-dreamstudio-api-key", "block");
    const privateKeyButton = document.getElementById("private-key-submit");
    privateKeyButton.disabled = false;
  }
}

/**
 * Reads the ABI file and stores its content in local storage.
 */
async function readABIFile() {
  const abiInput = document.getElementById("abi-file");
  const abi = await abiInput.files[0].text();
  localStorage.setItem("abi", abi);
  updateDisplay("abi-file", "none");
  updateDisplay("abi-file-submit", "none");
  updateMessage("display-abi-file", "ABI file uploaded");
  updateDisplay("contract-address-form", "block");
}

/**
 * Checks the contract address and updates the UI accordingly.
 */
async function checkContractAddress() {
  try {
    const contractAddressButton = document.getElementById(
      "contract-address-submit"
    );
    contractAddressButton.disabled = true;
    const contractAddressInput = document.getElementById("contract-address");
    const abi = localStorage.getItem("abi");

    const contractAddress = contractAddressInput.value;
    const provider = new ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545/");
    const contract = new ethers.Contract(contractAddress, abi, provider);
    const contractName = await contract.name();
    contractAddressInput.disabled = true;
    updateDisplay("contract-address-submit", "none");
    updateDisplay("menu-item-set-up", "block");
    updateDisplay("menu-item-show-nfts", "block");
    updateDisplay("generate-wallet-form", "block");
    updateMessage(
      "display-contract-name",
      `Contract name: <strong>${contractName}</strong>`
    );
  } catch (error) {
    console.error(`Error checking contract address: ${error.message}`);
    updateDisplay("error-contract-address", "block");
    const contractAddressButton = document.getElementById(
      "contract-address-submit"
    );
    contractAddressButton.disabled = false;
  }
}

/**
 * Generates a new wallet and updates the UI.
 */
function generateWallet() {
  const wallet = ethers.Wallet.createRandom();
  const generatedWallet = document.getElementById("generated-wallet");
  generatedWallet.setAttribute("wallet-address", wallet.address);
  updateMessage(
    "generated-wallet",
    `Address: <strong>${wallet.address}</strong><br>Private Key: <strong>${wallet.privateKey}</strong>`
  );
  updateDisplay("generate-wallet-button", "none");
  const mintButton = document.getElementById("mint-button");
  mintButton.disabled = false;
}

/**
 * Initiates the minting process for a new NFT.
 */
async function mintNFT() {
  try {
    const mintButton = document.getElementById("mint-button");
    mintButton.disabled = true;
    const { contract, toAddress, title, ipfsHash } = getContractDetails();

    const tx = await contract.mint(toAddress, title, ipfsHash);
    await tx.wait();
    updateMessage("display-mint", "Mint successful!");
    updateDisplay("mint-button", "none");
  } catch (error) {
    console.error(`Error minting NFT: ${error.message}`);
    const mintButton = document.getElementById("mint-button");
    mintButton.disabled = false;
  }
}

/**
 * Fetches all NFTs from the smart contract.
 */
async function loadNFTs() {
  try {
    const { contract } = getContractDetails();
    const totalNFTs = await contract.getTotalNFTs();
    const galleryElement = document.getElementById("nft-gallery");
    galleryElement.innerHTML = "";
    const loadAndAppendNFT = async (tokenId) => {
      const nftInfo = await contract.getNFTInfo(tokenId);
      const nftCard = document.createElement("div");
      nftCard.className = "nft-card";
      nftCard.innerHTML = `
          <article>
          <h2>${nftInfo.title}</h2>
          <figure>
          <img src="${nftInfo.uri}" alt="${nftInfo.title}">
          <figcaption><i>Token Id: ${tokenId} - Owner: ${nftInfo.owner}</i></figcaption>
          </figure>
          </article>
          <hr>
      `;
      galleryElement.appendChild(nftCard);
    };

    const tokenIds = Array.from({ length: totalNFTs }, (_, index) => index);
    await Promise.all(tokenIds.map(loadAndAppendNFT));
  } catch (error) {
    console.error(`Error loading NFTs: ${error.message}`);
  }
}

/**
 * Gathers the necessary details for interacting with the smart contract
 *
 * @typedef {object} ContractDetails
 * @property {object} contract - The smart contract instance.
 * @property {string} toAddress - The Ethereum address to which the NFT will be minted.
 * @property {string} title - The title of the NFT, extracted from a DOM element.
 * @property {string} ipfsHash - The IPFS hash of the NFT's metadata, extracted from a DOM element.
 *
 * @returns {ContractDetails} mintingDetails An object containing the necessary details for minting.
 */
function getContractDetails() {
  const provider = new ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545/");
  const privateKey = document.getElementById("private-key").value;
  const admin = new ethers.Wallet(privateKey, provider);
  const contractAddress = document.getElementById("contract-address").value;
  const abi = localStorage.getItem("abi");
  const toAddress = document
    .getElementById("generated-wallet")
    .getAttribute("wallet-address");
  const title = document.getElementById("generated-image-title").textContent;
  const ipfsHash = document
    .getElementById("ipfs-hash")
    .getAttribute("ipfs-hash");
  const contract = new ethers.Contract(contractAddress, abi, admin);

  return { contract, toAddress, title, ipfsHash };
}

/**
 * HELPERS
 */

/**
 * Update display value for an HTML element identified by an ID.
 *
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
 *
 * @param {string} elementId - The ID of the HTML element.
 * @param {string} property - The property to update.
 * @param {any} value - The display value to set.
 */
function updateProperty(elementId, property, value) {
  const element = document.getElementById(elementId);
  if (element) {
    // @ts-ignore
    element[property] = value;
  }
}

/**
 * Update the inner HTML and display property for an HTML element identified by an ID.
 *
 * @param {string} elementId - The ID of the HTML element.
 * @param {string} message - The message to display inside the HTML element.
 */
function updateMessage(elementId, message) {
  updateProperty(elementId, "innerHTML", message);
  updateDisplay(elementId, "block");
}
