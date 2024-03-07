/**
 * A generated module for PngquantDaggerModule functions
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

import {dag, Client, Container, Directory, object, func, DirectoryID} from "@dagger.io/dagger"

@object()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class PngquantDaggerModule {

  /**
   * Optimizes the images in the given directory via pngquant
   * @param directoryArg
   */
  @func()
  getPngQuantImages(directoryArg: Directory): Directory {
    return pngQuantContainer(dag.pipeline("images"))
        .withDirectory("/workdir", directoryArg)
        .withExec(["bash", "-c", "find /workdir -name \"*.png\" -exec /usr/bin/pngquant --quality=65-80 -v --ext .png -f --speed 1 {} \\;"])
        .directory("/workdir");
  }
}

export interface AlpinePackage {
  name: string
}

export function alpineContainer(client: Client, packages: AlpinePackage[]): Container {
  let packagesString: string[] = packages.map(alpinePackage => alpinePackage.name)
  return client.pipeline("alpineBaseImage")
      .container().from("instrumentisto/rsync-ssh:alpine3.19")
      .withExec(["apk", "add", "-U", "--no-cache", ...packagesString])

}

export function pngQuantContainer(client: Client): Container {
  return alpineContainer(client, [{name: "bash"}, {name: "pngquant"}])
}


