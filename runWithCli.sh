dagger -v -m=./hugo_dagger_module call hugo-build \
  --hugo-config-file=./hugoContent/config.toml \
  --hugo-content-directory=./hugoContent/content \
  --hugo-image-dir=./hugoContent/static \
  --hugo-theme-directory=./hugoContent/themes \
  -o ./html