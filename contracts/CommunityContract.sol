/// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract CommunityContract is Ownable, Pausable {
    struct Community {
        string name;
        string description;
        address owner;
        bool isEnabled; // Add this to enable/disable community
        uint256[] postIds; // Add this to keep track of posts in community
    }

    mapping(uint256 => Community) public communities;
    mapping(string => uint256) public nameToId; // Additional mapping
    uint256 public communityCounter = 0;
    uint256[] public communityIds = new uint256[](0);

    event CommunityCreated(
        uint256 indexed communityId,
        address indexed owner,
        string name,
        string description
    );
    event CommunityUpdated(
        uint256 indexed communityId,
        address indexed owner,
        string name,
        string description
    );

    // address public postCommentContractAddress; //

    // // Only allow the PostCommentContract instance to call certain functions
    // modifier onlyPostCommentContract() {
    //     require(
    //         msg.sender == postCommentContractAddress,
    //         "Caller is not the PostCommentContract"
    //     );
    //     _;
    // }

    // function setPostCommentContractAddress(
    //     address _postCommentContractAddress
    // ) public onlyOwner {
    //     postCommentContractAddress = _postCommentContractAddress;
    // }

    function createCommunity(
        string memory _name,
        string memory _description
    ) public whenNotPaused {
        communities[communityCounter] = Community(
            _name,
            _description,
            msg.sender,
            true, // Enable the community by default
            new uint256[](0) // Initialize postIds as an empty array
        );
        nameToId[_name] = communityCounter; // Store the new mapping
        emit CommunityCreated(
            communityCounter,
            msg.sender,
            _name,
            _description
        );
        communityIds.push(communityCounter);
        communityCounter++;
    }

    function getCommunityId(string memory _name) public view returns (uint256) {
        return nameToId[_name]; // Return the community ID by name
    }

    function getCommunity(
        uint256 _communityId
    )
        public
        view
        returns (string memory, string memory, address, bool, uint256[] memory)
    {
        return (
            communities[_communityId].name,
            communities[_communityId].description,
            communities[_communityId].owner,
            communities[_communityId].isEnabled,
            communities[_communityId].postIds // Return postIds
        );
    }

    function getCommunityIds() public view returns (uint256[] memory) {
        return communityIds;
    }

    function updateCommunity(
        uint256 _communityId,
        string memory _name,
        string memory _description
    ) public whenNotPaused {
        require(msg.sender == communities[_communityId].owner, "Not the owner");
        communities[_communityId].name = _name;
        communities[_communityId].description = _description;
        emit CommunityUpdated(_communityId, msg.sender, _name, _description);
    }

    function isCommunityEnabled(
        uint256 _communityId
    ) public view returns (bool) {
        return communities[_communityId].isEnabled;
    }

    function enableCommunity(uint256 _communityId) public whenNotPaused {
        require(msg.sender == communities[_communityId].owner, "Not the owner");
        communities[_communityId].isEnabled = true;
    }

    function disableCommunity(uint256 _communityId) public whenNotPaused {
        require(msg.sender == communities[_communityId].owner, "Not the owner");
        communities[_communityId].isEnabled = false;
    }

    function addPostIdToCommunity(
        uint256 _communityId,
        uint256 _postId
    ) public {
        // Let's assume this function can be called by anyone for this demo
        communities[_communityId].postIds.push(_postId);
    }

    function removePostIdFromCommunity(
        uint256 _communityId,
        uint256 _postId
    ) public {
        uint256 postCount = communities[_communityId].postIds.length;
        for (uint256 i = 0; i < postCount; i++) {
            if (communities[_communityId].postIds[i] == _postId) {
                communities[_communityId].postIds[i] = communities[_communityId]
                    .postIds[postCount - 1];
                communities[_communityId].postIds.pop();
                break;
            }
        }
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }
}
