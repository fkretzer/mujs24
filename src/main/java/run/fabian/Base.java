package run.fabian;

import io.dagger.client.Client;
import io.dagger.client.Container;
import io.dagger.client.Directory;

import java.util.List;
import java.util.stream.Stream;


public class Base {

    static Directory getPngQuantImages(Client client, Directory directory) {
        return pngQuantContainer(client.pipeline("optimizeImages", new Client.PipelineArguments()
                .withDescription("Optimize images in Directory with pngquant")))
                .withDirectory("/workdir", directory)
                .withExec(List.of("bash", "-c", "find /workdir -name \"*.png\" -exec /usr/bin/pngquant --quality=65-80 -v --ext .png -f --speed 1 {} \\;"))
                .directory("/workdir");
    }


    static Container pngQuantContainer(Client client) {
        return alpineContainer(client, List.of(
                new AlpinePackage("bash"),
                new AlpinePackage("pngquant")
                ));
    }

    static Container alpineContainer(Client client, List<AlpinePackage> alpinePackages) {
        return client.pipeline("alpineContainer", new Client.PipelineArguments()
                .withDescription("Build a base alpine container"))
                .container().from("instrumentisto/rsync-ssh:alpine3.19")
                .withExec(Stream.concat(
                        Stream.of("apk", "add", "-U", "--no-cache"),
                        alpinePackages.stream().map(AlpinePackage::name)).toList());
    }

    record AlpinePackage(String name) {
    }
}
