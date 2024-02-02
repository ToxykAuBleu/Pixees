const gitCommitInfo = require('git-commit-info');
const { writeFileSync } = require('fs');

const gitInfo = gitCommitInfo();
const infoJson = JSON.stringify(gitInfo, null, 2);

writeFileSync('git-version.json', infoJson);