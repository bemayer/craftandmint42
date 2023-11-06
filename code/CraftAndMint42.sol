// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

/// @title CraftAndMint42
/// @dev This contract allows for the minting, and ownership management of unique digital assets represented as non-fungible tokens (NFTs).
contract CraftAndMint42 is ERC721URIStorage {
    uint _nextTokenId;
    address public admin;

    /// @dev Struct to store metadata of each NFT.
    struct NftInfo {
        address owner;
        string title;
        string uri;
    }

    /// @dev Mapping from token ID to NftInfos.
    mapping(uint => NftInfo) _nftInfos;

    /// @dev Contract constructor initializes the contract with a name and symbol for the NFT.
    constructor() ERC721("CraftAndMint42", "CM42") {
        admin = msg.sender;
    }

    /// @dev Modifier to check if the function caller is the admin.
    modifier onlyAdmin() {
        require(msg.sender == admin, "Not admin");
        _;
    }

    /// @dev Modifier to check if the function caller is the owner of the token.
    modifier onlyOwner(uint tokenId) {
        require(_nftInfos[tokenId].owner == msg.sender, "Not token owner");
        _;
    }

    /// @notice Allows the admin to mint new tokens.
    /// @param to The address to mint the new token to.
    /// @param title The title of the artwork.
    /// @param ipfsHash The IPFS hash of the artwork.
    function mint(
        address to,
        string memory title,
        string memory ipfsHash
    ) external onlyAdmin {
        uint tokenId = _nextTokenId;
        _nextTokenId++;
        _mint(to, tokenId);
        string memory uri = string(
            abi.encodePacked("https://gateway.ipfs.io/ipfs/", ipfsHash)
        );
        _setTokenURI(tokenId, uri);
        _nftInfos[tokenId] = NftInfo({owner: to, title: title, uri: uri});
    }

    /// @notice Allows a token owner or an approved address to transfer the token.
    /// @param to The address to transfer the token to.
    /// @param tokenId The ID of the token to transfer.
    function transfer(address to, uint tokenId) external onlyOwner(tokenId) {
        _transfer(msg.sender, to, tokenId);
        _nftInfos[tokenId].owner = to;
    }

    /// @notice Returns the total number of NFTs minted.
    /// @return The total number of NFTs minted.
    function getTotalNFTs() external view returns (uint) {
        return _nextTokenId;
    }

    /// @notice Retrieves the info of a specific NFT.
    /// @param tokenId The ID of the NFT.
    /// @return A struct containing the info of the specified NFT.
    function getNFTInfo(uint tokenId) external view returns (NftInfo memory) {
        require(tokenId < _nextTokenId, "Token ID does not exist");
        return _nftInfos[tokenId];
    }
}
