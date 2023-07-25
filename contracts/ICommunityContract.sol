/// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.6;

interface ICommunityContract {
    function isCommunityEnabled(
        uint256 _communityId
    ) external view returns (bool);

    function addPostIdToCommunity(
        uint256 _communityId,
        uint256 _postId
    ) external;

    function removePostIdFromCommunity(
        uint256 _communityId,
        uint256 _postId
    ) external;
}
