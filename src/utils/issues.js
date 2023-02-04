'use strict';


const _ = require('lodash');
const { graphql } = require("@octokit/graphql");


module.exports = class Issues {

    constructor() {

    }
 
    
    

    async getId(org, myToken, projectNumber, issueNumber) {
        const graphqlWithAuth = graphql.defaults({
            headers: {
                authorization: `token ${myToken}`,
            },
        });
        return await graphqlWithAuth(
            `
            addProjectV2ItemById(input: {
                projectId: ${projectNumber}
                contentId: "${issueNumber}"
              }) {
                item {
                  id
                }
              }
            
            `
        );       
    }
}