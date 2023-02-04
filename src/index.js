const github = require('@actions/github');
const core = require('@actions/core');
const fs = require('fs');
const { graphql } = require("@octokit/graphql");
const project = require('./utils/project.js');
const { Octokit } = require("@octokit/rest");
const Projects = require('./utils/project.js');

async function run() {
    // Inputs
    const myToken = core.getInput('token');
    const org = core.getInput('org').toString();
    const projectId = parseInt(core.getInput('project_id'));

    console.log(org, typeof projectId)
    


    
    const orgProjects = new Projects();
    let something = await orgProjects.getId(org, myToken, projectId)
    console.log("something: ", something, typeof something)

    await orgProjects.getProject(org, myToken, projectId).then(data => {
        console.log("PROJ: ", data, typeof data)
    })
    
    


    
    
    
    // fs.appendFileSync(process.env.GITHUB_OUTPUT, "members=" + orgMembers);
    
}

run();