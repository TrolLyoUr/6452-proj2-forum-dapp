# 6452-proj2-forum-dapp
1. To setup the test network:
    requirements: truffle, ganache
 
    1. Navigate within the terminal to the root folder of the project
    2. Run `truffle compile`
 
2. Run ganache and add the truffle project by importing the `truffle-config.js` file in the project root folder
 
3. Deploy using `truffle deploy`
 
4. Navigate to the files React/src/contracts/CommunityContract.js and React/src/contracts/PostCommentContract.js, and replace the contract addresses within those two files with their respect contract addresses from your local ganache instance
 
5. To run the React gui app:
    1. Navigate to the "React" folder
    2. Run `npm install`
    3. Run `npm start`
