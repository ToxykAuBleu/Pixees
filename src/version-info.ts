export const gitRepoInfo = (() => {
    try {
        return require('../git-version.json');
    } catch {
        return {};
    }
})();