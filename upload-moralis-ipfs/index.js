const fs = require('fs/promises');
/* import moralis */
const Moralis = require("moralis/node");

/* Moralis init code */
const serverUrl = "https://yskrqry6xyd0.usemoralis.com:2053/server";
const appId = "qhiFopxemxXLKR0q1TGdIF9cJhfojkhjsLHfhNuH";
const masterKey = "MASTER_KEY";

Moralis.start({serverUrl, appId, masterKey}).then(async () => {
    /**
     * {
     *     path: string,
     *     content: string,
     * }
     */
    const uploadFiles = [];

    async function readDir(base, relative) {
        const files = await fs.opendir(base + relative)

        for await (const dirent of files) {
            if (dirent.isDirectory()) {
                await readDir(base, relative + dirent.name + '/')
            } else {
                const path = base + relative + dirent.name
                const file = await fs.open(path)
                const data = await file.readFile()
                const content = data.toString('base64')
                uploadFiles.push({
                    path: relative.slice(1) + dirent.name,
                    content
                })
                await file.close()
            }
        }

    }

    await readDir('../mint-landing/build', '/')

    const result = await Moralis.Web3API.storage.uploadFolder({
        abi: uploadFiles
    })
    console.log(JSON.stringify(result))
});
