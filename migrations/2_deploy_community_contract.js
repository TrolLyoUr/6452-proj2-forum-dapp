const PostCommentContract = artifacts.require("PostCommentContract");
const CommunityContract = artifacts.require("CommunityContract");

module.exports = async function (deployer) {
    // Deploy the CommunityContract first
    await deployer.deploy(CommunityContract);
    const communityContract = await CommunityContract.deployed();

    // Then deploy the PostCommentContract with the address of the CommunityContract
    await deployer.deploy(PostCommentContract, communityContract.address);
};
