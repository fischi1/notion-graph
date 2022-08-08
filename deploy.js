const ghpages = require("gh-pages")
const packagejson = require("./package.json")
const dotenv = require("dotenv")

console.log("deploying via gh-pages")

dotenv.config()

if (!process.env.DEPLOY_REPOSITORY || !process.env.DEPLOY_BRANCH) {
    console.error(
        "ERROR! env vars DEPLOY_REPOSITORY and DEPLOY_BRANCH have to be set"
    )
    process.exit(1)
}

ghpages.publish(
    "dist",
    {
        message: `Publishing v${packagejson.version}`,
        repo: process.env.DEPLOY_REPOSITORY,
        branch: process.env.DEPLOY_BRANCH
    },
    function (err) {
        if (err)
            console.error(
                `ERROR trying to publish v${packagejson.version}`,
                err
            )
        else console.log(`Published v${packagejson.version}`)
    }
)
