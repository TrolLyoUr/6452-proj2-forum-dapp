/// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "./ICommunityContract.sol"; // Import the interface

contract PostCommentContract is Ownable, Pausable {
    ICommunityContract public communityContract; // Declare a state variable of type ICommunityContract

    constructor(ICommunityContract _communityContract) {
        communityContract = _communityContract; // Initialize the ICommunityContract in the constructor
    }

    struct Post {
        string ipfsHash;
        uint256 communityId;
        address owner;
    }

    struct Comment {
        string ipfsHash;
        uint256 postId;
        address owner;
    }

    mapping(uint256 => Post) public posts;
    uint256 public postCounter = 0;

    mapping(uint256 => Comment[]) public comments;

    event PostCreated(
        uint256 indexed postId,
        uint256 indexed communityId,
        address indexed owner,
        string ipfsHash
    );
    event PostUpdated(
        uint256 indexed postId,
        address indexed owner,
        string ipfsHash
    );
    event CommentCreated(
        uint256 indexed postId,
        address indexed owner,
        string ipfsHash
    );

    function createPost(
        uint256 _communityId,
        string memory _ipfsHash
    ) public whenNotPaused {
        require(
            communityContract.isCommunityEnabled(_communityId),
            "Community is not enabled"
        ); // Require that the community is enabled
        posts[postCounter] = Post(_ipfsHash, _communityId, msg.sender);
        communityContract.addPostIdToCommunity(_communityId, postCounter); // Call the new function to add post ID to community
        emit PostCreated(postCounter, _communityId, msg.sender, _ipfsHash);
        postCounter++;
    }

    function getPost(
        uint256 _postId
    ) public view returns (string memory, uint256, address) {
        return (
            posts[_postId].ipfsHash,
            posts[_postId].communityId,
            posts[_postId].owner
        );
    }

    function updatePost(
        uint256 _postId,
        string memory _ipfsHash
    ) public whenNotPaused {
        require(msg.sender == posts[_postId].owner, "Not the owner");
        posts[_postId].ipfsHash = _ipfsHash;
        emit PostUpdated(_postId, msg.sender, _ipfsHash);
    }

    function deletePost(uint256 _postId) public whenNotPaused {
        require(msg.sender == posts[_postId].owner, "Not the owner");
        communityContract.removePostIdFromCommunity(
            posts[_postId].communityId,
            _postId
        ); // Call the new function to remove post ID from community
        delete posts[_postId];
    }

    function createComment(
        uint256 _postId,
        string memory _ipfsHash
    ) public whenNotPaused {
        comments[_postId].push(Comment(_ipfsHash, _postId, msg.sender));
        emit CommentCreated(_postId, msg.sender, _ipfsHash);
    }

    function getCommentsByPost(
        uint256 _postId
    ) public view returns (Comment[] memory) {
        return comments[_postId];
    }

    function updateComment(
        uint256 _postId,
        uint256 _commentIndex,
        string memory _ipfsHash
    ) public whenNotPaused {
        require(
            msg.sender == comments[_postId][_commentIndex].owner,
            "Not the owner"
        );
        comments[_postId][_commentIndex].ipfsHash = _ipfsHash;
        // Consider emitting an event here
    }

    function deleteComment(
        uint256 _postId,
        uint256 _commentIndex
    ) public whenNotPaused {
        require(
            msg.sender == comments[_postId][_commentIndex].owner,
            "Not the owner"
        );
        delete comments[_postId][_commentIndex];
        // Consider emitting an event here
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }
}
