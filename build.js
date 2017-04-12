/**
 * node build.js
 */

const packager = require("electron-packager");
const info = require("./src/package.json");

packager({
    name: info["name"],
    dir: "./src",
    out: "./dist",
    icon: "./satoyama-editor.ico",
    platform: "win32",
    arch: "x64",
    electronVersion: "1.4.3",
    overwrite: true,
    asar: false,
    "app-version": info["version"],
    "app-copyright": "Copyright (C) 2017 " + info["author"] + ".",
    
    "version-string": {
        CompanyName: "nalulabo",
        FileDescription: info["name"],
        OriginalFilename: info["name"] + ".exe",
        ProductName: info["name"],
        InternalName: info["name"]
    }
    
}, function (err, appPaths) {
    if (err) console.log(err);
    console.log("done. ==> " + appPaths);
});