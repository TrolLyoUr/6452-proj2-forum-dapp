import { Web3Storage } from 'web3.storage';
import Web3 from 'web3';
import { abi as Com_abi, contractAddress as Com_address } from './CommunityContract.js'
import { abi as Post_abi, contractAddress as Post_address } from './PostCommentContract.js'


// setup the web3.storage client
const storage = new Web3Storage({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEYzZTliZGZEQzNhMTM2NDFDYURCODU2MjE2MzA0RkQ0YzA2QzM1ZGUiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTAxNzQ3NTU5NjksIm5hbWUiOiJmb3J1bUxpa2VEYXBwIn0.C9ijCaCwH5sZpOekATc85cgGZGT56UoQbUM-DKvTx80' });

// setup web3.js
let web3 = new Web3(window.ethereum);

// User Login
export async function userLogin() {
    const accounts = await window.ethereum.enable();
    web3.eth.defaultAccount = accounts[0]; // Now web3.eth.defaultAccount is set to the user's first MetaMask account
}


const communityContractABI = Com_abi; // your CommunityContract ABI
const communityContractAddress = Com_address; // your CommunityContract address
const CommunityContract = new web3.eth.Contract(communityContractABI, communityContractAddress);

const postCommentContractABI = Post_abi; // your PostCommentContract ABI
const postCommentContractAddress = Post_address; // your PostCommentContract address
const PostCommentContract = new web3.eth.Contract(postCommentContractABI, postCommentContractAddress);

async function uploadToWeb3Storage(files) {
    const cid = await storage.put(files);
    return cid;
}

export async function createPost(communityId, filePath) {
    const cid = await uploadToWeb3Storage(filePath);
    const accounts = await web3.eth.getAccounts();
    await PostCommentContract.methods.createPost(communityId, cid.toString()).send({ from: accounts[0] });
}


export async function getPost(postId) {
    const post = await PostCommentContract.methods.getPost(postId).call();
    return post;
}

export async function updatePost(postId, filePath) {
    const cid = await uploadToWeb3Storage(filePath);
    const accounts = await web3.eth.getAccounts();
    await PostCommentContract.methods.updatePost(postId, cid.toString()).send({ from: accounts[0] });
}

export async function deletePost(postId) {
    const accounts = await web3.eth.getAccounts();
    await PostCommentContract.methods.deletePost(postId).send({ from: accounts[0] });
}

export async function createComment(postId, filePath) {
    const cid = await uploadToWeb3Storage(filePath);
    const accounts = await web3.eth.getAccounts();
    await PostCommentContract.methods.createComment(postId, cid.toString()).send({ from: accounts[0] });
}

export async function getCommentsByPost(postId) {
    const comments = await PostCommentContract.methods.getCommentsByPost(postId).call();
    return comments;
}

export async function updateComment(postId, commentIndex, filePath) {
    const cid = await uploadToWeb3Storage(filePath);
    const accounts = await web3.eth.getAccounts();
    await PostCommentContract.methods.updateComment(postId, commentIndex, cid.toString()).send({ from: accounts[0] });
}

export async function deleteComment(postId, commentIndex) {
    const accounts = await web3.eth.getAccounts();
    await PostCommentContract.methods.deleteComment(postId, commentIndex).send({ from: accounts[0] });
}

export async function createCommunity(name, description) {
    const accounts = await web3.eth.getAccounts();
    await CommunityContract.methods.createCommunity(name, description).send({ from: accounts[0] });
}

export async function getCommunity(communityId) {
    const community = await CommunityContract.methods.getCommunity(communityId).call();
    return community;
}

export async function updateCommunity(communityId, name, description) {
    const accounts = await web3.eth.getAccounts();
    await CommunityContract.methods.updateCommunity(communityId, name, description).send({ from: accounts[0] });
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

// Add a post ID to a community
export async function addPostIdToCommunity(communityId, postId) {
    const accounts = await web3.eth.getAccounts();
    await CommunityContract.methods.addPostIdToCommunity(communityId, postId).send({ from: accounts[0] });
}

// Remove a post ID from a community
export async function removePostIdFromCommunity(communityId, postId) {
    const accounts = await web3.eth.getAccounts();
    await CommunityContract.methods.removePostIdFromCommunity(communityId, postId).send({ from: accounts[0] });
}

// Check if a community is enabled
export async function isCommunityEnabled(communityId) {
    const isEnabled = await CommunityContract.methods.isCommunityEnabled(communityId).call();
    return isEnabled;
}

// Disable a community
export async function disableCommunity(communityId) {
    const accounts = await web3.eth.getAccounts();
    await CommunityContract.methods.disableCommunity(communityId).send({ from: accounts[0] });
}

// Enable a community
export async function enableCommunity(communityId) {
    const accounts = await web3.eth.getAccounts();
    await CommunityContract.methods.enableCommunity(communityId).send({ from: accounts[0] });
}

// createPost(0, path.resolve(__dirname, 'post.txt'));
// createCommunity('My first community', 'This is a description of my community');
