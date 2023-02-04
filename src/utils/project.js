'use strict';


const _ = require('lodash');
const { graphql } = require("@octokit/graphql");


module.exports = class Projects {

    constructor() {

    }
 
    
    async getProject(org, myToken, projectNumber) {
        const graphqlWithAuth = graphql.defaults({
            headers: {
                authorization: `token ${myToken}`,
            },
        });
        
        
        return await graphqlWithAuth(
            `
            {
                organization(login: "${org}") {
                    projectV2(number: ${projectNumber}){
                        id
                    }
                }
            }
            
            `
        );    
    }

    async getId(org, myToken, projectNumber) {
        const graphqlWithAuth = graphql.defaults({
            headers: {
                authorization: `token ${myToken}`,
            },
        });
 
        return await graphqlWithAuth(
            `
            {
                organization(login: "${org}") {
                    projectV2(number: ${projectNumber}){
                        id
                    }
                }
            }
            `
        );       
    }
}