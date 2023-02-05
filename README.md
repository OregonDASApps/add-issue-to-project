# Add an issue to a project

This action can add an issue to a project by passing either `issue ID` or `issue number`. This action can be added to a workflow in a repoistory to add an issue automatically or manually.

## Giving permission to the action via `token`
To grant access to projects and issues you need to pass either a `Personal Access Token (PAT)` or an `APP Token`. At the moment `fine grained tokens` are not supported.



## Action Parameters
```YAML
- name: 'Add issue to a project'
  id: added
  uses: "snsinahub-org/add-issue-to-project@v1.0.0"
  with:
  
    # Name of organization   
    # If you don't pass value it will 
    # Required: false
    # Default: ${{ github.repository_owner }}
    org: ${{ github.repository_owner }}
    
    # APP_TOKEN or PAT 
    # Required: true
    # Default: ${{ github.token }}
    token: ${{ github.token }}
    
    # Description: issue node_id
    # Required: false
    # Default: ''
    issue-id: ''
    
    # Description: issue project number.
    # Required: false
    # Default: ''
    issue-number: 5
    
    # Description:  Project number in the organization such as 1 2 3
    # Required: true
    # Default: ''
    pid: ''
```

## Output
N/A

## Examples

### Add a project automatically - passing issue-id
In this example a workflow is triggered automatically and get `issue-id` and pass it to the action alongside `token` and `project id`. 

#### Passing PAT

```YAML
name: Add issue automatically with APP token

on:
  issues:
    types:
      - opened
      
jobs:
  add-to-project:
    runs-on: ubuntu-latest
    
    steps:
      - name: add-issue-to-project
        uses: snsinahub-org/add-issue-to-project@v1.0.0
        with:
          token: ${{ secrets.PAT }}
          pid: 4
          issue-id: ${{ github.event.issue.node_id }}          
```


#### Obtaining and passing APP Token 
```YAML
name: Add issue automatically with PAT

on:
  issues:
    types:
      - opened
      
jobs:
  add-to-project:
    runs-on: ubuntu-latest
    
    steps:
      - name: Get token
        id: get_token
        uses: tibdex/github-app-token@v1
        with:
          private_key: ${{ secrets.PROJECT_PEM }}
          app_id: ${{ secrets.PROJECT_ID }}  
      - name: add-issue-to-project
        uses: snsinahub-org/add-issue-to-project@v1.0.0
        with:
          token: ${{ steps.get_token.outputs.token }}
          pid: 4
          issue-id: ${{ github.event.issue.node_id }}          
```
### Triggering workflow manually - passing issue-number

#### Passing PAT

```YAML
name: Add issue automatically with APP token

on:
  workflow_dispatch:
    inputs:
      issue_no:
        description: issue number
      
jobs:
  add-to-project:
    runs-on: ubuntu-latest
    
    steps:
      - name: add-issue-to-project
        uses: snsinahub-org/add-issue-to-project@v1.0.0
        with:
          token: ${{ secrets.PAT }}
          pid: 4
          issue-number: ${{ github.event.inputs.issue_no }}        
```


#### Obtaining and passing APP Token 
```YAML
name: Add issue automatically with APP token

on:
  workflow_dispatch:
    inputs:
      issue_no:
        description: issue number
      
jobs:
  add-to-project:
    runs-on: ubuntu-latest
    
    steps:
      - name: Get token
        id: get_token
        uses: tibdex/github-app-token@v1
        with:
          private_key: ${{ secrets.PROJECT_PEM }}
          app_id: ${{ secrets.PROJECT_ID }}  
      - name: add-issue-to-project
        uses: snsinahub-org/add-issue-to-project@v1.0.0
        with:
          token: ${{ steps.get_token.outputs.token }}
          pid: 4
          issue-number: ${{ github.event.inputs.issue_no }}            
```