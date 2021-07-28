import { App } from "./app";

const main = async () => {
    const app = new App( 8080 );
    await app.listen();
}

main();