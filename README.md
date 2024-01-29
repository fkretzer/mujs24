# Publishing a static website with goHugo.io and dagger.io

Example project demonstrating [Dagger.io](https://dagger.io) CI/CD pipelines by building
and optimizing a website with the [Hugo](https://gohugo.io) static site generator and
optimizing PNG images via pngquant.

This example was used for the introductory talk on dagger.io at the
[Code Days 2024](https://www.code-days.de/code-days-2024/programm/programm)

## Preparation

- Clone this repository
- Install a docker compatible engine (I successfully used
  [Rancher Desktop](https://rancherdesktop.io/))
- Install a Java 17 sdk
- clone official dagger repo and do a `mvn install` for the java-sdk to publish it to your local maven repository
- see ./run.sh and ./runWithCli.sh


