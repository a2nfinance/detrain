
export const makeStream = (generator: AsyncGenerator<string, void, unknown>) => {

    const encoder = new TextEncoder();
    return new ReadableStream<any>({
        async start(controller) {
            for await (let chunk of generator) {
                const chunkData = chunk;
                controller.enqueue(chunkData);
            }
            controller.close();
        }
    });
}