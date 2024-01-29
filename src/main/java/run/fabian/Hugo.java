package run.fabian;

import io.dagger.client.Client;
import io.dagger.client.Dagger;

import java.util.List;

import static run.fabian.Base.getPngQuantImages;

public class Hugo {
    public static void main(String[] args) throws Exception {
        try(Client client = Dagger.connect()){
            var contentDir = client.host().directory("./hugoContent/content");
            var themesDir = client.host().directory("./hugoContent/themes");
            var configFile = client.host().directory("./hugoContent").file("config.toml");
            var imageDir = client.host().directory("./hugoContent/static");

            var pngQuantImages = getPngQuantImages(client, imageDir);

            var hugo = client.pipeline("hugo")
                    .container()
                    .from("klakegg/hugo:0.111.3-ext")
                    .withDirectory("/src/content", contentDir)
                    .withDirectory("/src/themes", themesDir)
                    .withDirectory("/src/static", pngQuantImages)
                    .withWorkdir("/src")
                    .withFile("/src/config.toml", configFile)
                    .withExec(List.of("-s",".","-d","/output"))
                    .directory("/output")
                    .export("./html");

        }
    }
}
