/**
 * A generated module for HugoDaggerModule functions
 *
 * This module has been generated via dagger init and serves as a reference to
 * basic module structure as you get started with Dagger.
 *
 * Two functions have been pre-created. You can modify, delete, or add to them,
 * as needed. They demonstrate usage of arguments and return types using simple
 * echo and grep commands. The functions can be called from the dagger CLI or
 * from one of the SDKs.
 *
 * The first line in this comment block is a short description line and the
 * rest is a long description with more detail on the module's purpose or usage,
 * if appropriate. All modules should have a short description.
 */

import {Container, dag, Directory, File, func, object} from "@dagger.io/dagger"

@object()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
    /**
     * Module to build a static site with goHugo
     */
class HugoDaggerModule {

    /**
     * Builds a static site with goHugo
     * @param hugoContentDirectory Static content to genererate site from
     * @param hugoThemeDirectory goHugo theme to use
     * @param hugoConfigFile config.toml to use
     * @param hugoImageDir static image files directory
     */
    @func()
    hugoBuild(hugoContentDirectory: Directory, hugoThemeDirectory: Directory, hugoConfigFile: File, hugoImageDir: Directory): Directory {


        const pngQuantImages = dag.pngquantDaggerModule().getPngQuantImages(hugoImageDir);


        return dag.pipeline("hugo")
            .container()
            .from("klakegg/hugo:0.111.3-ext")
            .withDirectory("/src/content", hugoContentDirectory)
            .withDirectory("/src/themes", hugoThemeDirectory)
            .withDirectory("/src/static", pngQuantImages)
            .withWorkdir("/src")
            .withFile("/src/config.toml", hugoConfigFile)
            .withExec(["-s", ".", "-d", "/output"])
            .directory("/output");
    }
}
