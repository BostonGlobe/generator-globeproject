// from https://github.com/nodegit/nodegit#emulating-git-log

var open = require("nodegit").Repo.open;

// Open the repository directory.
module.exports = function(done) {

	open("./", function(err, repo) {
		if (err) throw err;

		// Open the master branch.
		repo.getMaster(function(err, branch) {
			if (err) throw err;

			// Create a new history event emitter.
			var history = branch.history();

			// Create a counter to only show up to 9 entries.
			var count = 0;

			// Listen for commit events from the history.
			history.on("commit", function(commit) {
				count++;
				if (count <= 1) {
					// Show the commit sha.
					done({
						commit: commit.sha(),
						author: commit.author().name(),
						date: commit.date(),
						message: commit.message()
					});
				}
			});

			// Start emitting events.
			history.start();
		});
	});

};