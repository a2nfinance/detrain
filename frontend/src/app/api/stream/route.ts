import { NextRequest } from "next/server";
import { makeStream } from "./makestream";
import { NextApiRequest } from "next";

class StreamingResponse extends Response {

    constructor(res: ReadableStream<any>, init?: ResponseInit) {
        super(res as any, {
            ...init,
            status: 200,
            headers: {
                ...init?.headers,
            },
        });
    }
}

/**
 * async generator that simulate a data fetch from external resource and
 * return chunck of data every second
 */
async function* doExecute(body): AsyncGenerator<string, void, unknown> {
        let { remoteHostIP, command, agentPort } = body;
        let url = `http://${remoteHostIP}:${agentPort}/execute/`;

        let options = {
            method: 'POST',
            body: command,
            keepalive: true,
        }

        const response = await fetch(url, options)
        const reader = response.body?.getReader();
        const decoder = new TextDecoder('utf-8');
        if (reader) {
            for (; ;) {
                const { done, value } = await reader.read()
                if (done) break;

                try {
                    let log = decoder.decode(value)
                    console.log(log)
                    yield log
                }
                catch (e: any) {
                    console.warn(e.message)
                }

            }
        }
}

/**
 * Next.js Route Handler that returns a Response object 
 * that stream data from the async generator.
 * 
 */

export async function POST(req: NextRequest) {
    try {
        if (req.method === "POST") {
            const data = await req.json();
            const stream = makeStream(doExecute(data))
            const response = new StreamingResponse(stream)
            return response
        }
    } catch (e) {
        console.log(e)
    }


}