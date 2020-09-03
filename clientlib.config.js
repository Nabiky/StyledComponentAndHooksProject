module.exports = {
    // default working directory (can be changed per 'cwd' in every asset option)
    context: __dirname,

    // path to the clientlib root folder (output)
    clientLibRoot: "../../../target/vault-work/jcr_root/etc/designs/mysparkdigital/manageddata",

    libs: {
        name: "clientlib-network-design",
        allowProxy: true,
        categories: ["network-design.react"],
        serializationFormat: "xml",
        jsProcessor: ["min:gcc"],
        assets: {
            js: ["build/static/**/*.js"],
        },
    },
};
