import Web3 from 'web3';
import { abi as Com_abi, contractAddress as Com_address } from './CommunityContract.js'
import { abi as Post_abi, contractAddress as Post_address } from './PostCommentContract.js'


// Create a Web3 instance
let web3 = new Web3(`http://localhost:8545`);

const communityContractABI = Com_abi; // your CommunityContract ABI
const communityContractAddress = Com_address; // your CommunityContract address
const CommunityContract = new web3.eth.Contract(communityContractABI, communityContractAddress);

const postCommentContractABI = Post_abi; // your PostCommentContract ABI
const postCommentContractAddress = Post_address; // your PostCommentContract address
const PostCommentContract = new web3.eth.Contract(postCommentContractABI, postCommentContractAddress);

export async function getPost(postId) {
    const post = await PostCommentContract.methods.getPost(postId).call();
    return post;
}

export async function getCommentsByPost(postId) {
    const comments = await PostCommentContract.methods.getCommentsByPost(postId).call();
    return comments;
}


export async function getCommunity(communityId) {
    const community = await CommunityContract.methods.getCommunity(communityId).call();
    return community;
}

export async function getCommunityId(name) {
    const communityId = await CommunityContract.methods.getCommunityId(name).call();
    return communityId;
}

export async function getAllCommunities() {
    // Get all community ids
    const ids = await CommunityContract.methods.getCommunityIds().call();

    // Get the community for each id
    const communities = await Promise.all(ids.map(id => CommunityContract.methods.getCommunity(id).call()));

    return communities;
}

// Check if a community is enabled
export async function isCommunityEnabled(communityId) {
    const isEnabled = await CommunityContract.methods.isCommunityEnabled(communityId).call();
    return isEnabled;
}