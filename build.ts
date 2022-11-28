import {Client, connect, Directory} from "@dagger.io/dagger"
import * as fs from "fs";


import {getPngQuantImages} from "./base";

fs.rmSync("./html", {force: true, recursive: true})

connect(async (client: Client) => {
    const contentDir: Directory = client.host().directory("./hugoContent/content")
    const themesDir = client.host().directory("./hugoContent/themes")
    const configFile = client.host().directory("./hugoContent").file("config.toml")
    const imageDir = client.host().directory("./hugoContent/static")



    const pngQuantImages =  getPngQuantImages(client, imageDir)



    const hugo = await client.pipeline("hugo")
        .container()
        .from("klakegg/hugo:0.111.3-ext")
        .withDirectory("/src/content", contentDir)
        .withDirectory("/src/themes", themesDir)
        .withDirectory("/src/static", pngQuantImages)
        .withWorkdir("/src")
        .withFile("/src/config.toml", configFile)
        .withExec(["-s",".","-d","/output"])
        .directory("/output")
        .export("./html");
},{ LogOutput: process.stderr })