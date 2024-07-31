# retroame-server

## Usage

### Requirement
- [docker](https://www.docker.com/)

## Development

### Requirement

- [Visual Studio Code](https://code.visualstudio.com/)
    - Extension
        - [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
- [Tiled](https://www.mapeditor.org/)

### Start

```shell
$ ./bin/dev/start

# When running for the first time or changing the schema.
$ ./bin/dev/run yarn run prisma migrate dev
```

### Command

- File Owner Chnager (for Linux)
  - `$ ./bin/dev/chown`
- Command Runner
  - `$ ./bin/dev/run [command]`
- Debug Console (REPL)
  - `$ ./bin/dev/console`
