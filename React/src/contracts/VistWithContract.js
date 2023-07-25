import Web3 from 'web3';
import { Web3Storage } from 'web3.storage'
import { abi as Com_abi, contractAddress as Com_address } from './CommunityContract.js'
import { abi as Post_abi, contractAddress as Post_address } from './PostCommentContract.js'


const client = new Web3Storage({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEYzZTliZGZEQzNhMTM2NDFDYURCODU2MjE2MzA0RkQ0YzA2QzM1ZGUiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTAxNzQ3NTU5NjksIm5hbWUiOiJmb3J1bUxpa2VEYXBwIn0.C9ijCaCwH5sZpOekATc85cgGZGT56UoQbUM-DKvTx80' });

// Create a Web3 instance
let web3 = new Web3(`http://localhost:8545`);

const communityContractABI = Com_abi; // your CommunityContract ABI
const communityContractAddress = Com_address; // your CommunityContract address
const CommunityContract = new web3.eth.Contract(communityContractABI, communityContractAddress);

const postCommentContractABI = Post_abi; // your PostCommentContract ABI
const postCommentContractAddress = Post_address; // your PostCommentContract address
const PostCommentContract = new web3.eth.Contract(postCommentContractABI, postCommentContractAddress);

export async function getFileByCid(cid) {
    const res = await client.get(cid)
    if (!res.ok) {
        throw new Error(`failed to get cid ${cid}`)
    }

    const files = await res.files()
    if (files.length === 0) {
        throw new Error(`No file found for cid ${cid}`)
    }

    const file = files[0]
    const arrayBuffer = await file.arrayBuffer()

    // Convert the ArrayBuffer to a string
    const decoder = new TextDecoder('utf-8');
    const text = decoder.decode(arrayBuffer);

    // If the file contains JSON data, parse it
    const data = JSON.parse(text);

    return data;
}


export async function getPost(postId) {
    const post = await PostCommentContract.methods.getPost(postId).call();
    return post;
}

async function getPostReserveId(postId) {
    const post = await PostCommentContract.methods.getPost(postId).call();
    const reserveId = { ...post, id: postId };
    return reserveId;
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

export async function fetchPostsByCommunity(communityId) {
    const community = await getCommunity(communityId);

    // Get all posts in the community and reserve their ids
    const postsPromises = community.ids.map(id => getPostReserveId(id));
    const postsData = await Promise.all(postsPromises);


    const postsContentPromises = postsData.map(post => getFileByCid(post.cid));
    const contents = await Promise.all(postsContentPromises);

    // Add owner to each post content
    const contentsWithOwner = contents.map((content, index) => ({ ...content, owner: postsData[index].owner, id: postsData[index].id }));

    return contentsWithOwner;
}


export async function fetchCommentsByPost(postId) {

    const commentsData = await getCommentsByPost(postId);
    console.log(commentsData);

    const commentsContentPromises = commentsData.map(comment => getFileByCid(comment.cid));
    console.log(commentsContentPromises);
    const comments = await Promise.all(commentsContentPromises);
    console.log(comments);

    // Add owner to each comments content
    const contentsWithOwner = comments.map((commentContent, index) => ({ ...commentContent, owner: commentsData[index].owner }));

    return contentsWithOwner;
}


// Check if a community is enabled
export async function isCommunityEnabled(communityId) {
    const isEnabled = await CommunityContract.methods.isCommunityEnabled(communityId).call();
    return isEnabled;
}