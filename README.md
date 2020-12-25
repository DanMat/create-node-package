# create-deploy-node-packages

Generates a node module template with CHANGELOG, build, deployment, jest, linter and more. All configured and ready to use.

# Developer notes for local development
- Run `npm run dev` to keep monitoring for local changes.
- Run `npm link` in the root of your project root. This will create a symlink in the global folder to run our package.
- Run `create-deploy-node-packages` to run your cli. But, make sure that you are in the same version of node where you ran your `npm link`
- Once, done remeber to run `npm unlink`
