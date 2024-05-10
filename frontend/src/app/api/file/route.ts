import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    if (req.method === "POST") {
        const data = await req.json();
        const { remoteHostIP, filePath, agentPort } = data
        if (remoteHostIP && filePath) {
            let url = `http://${remoteHostIP}:${agentPort}/download/`;

            let options = {
                method: 'POST',
                body: filePath
            }

            let response = await fetch(url, options)
            let blob = await response.blob();
            console.log(blob)
            const headers = new Headers();
            headers.set("Content-Type", "application/octet-stream");
            return new NextResponse(blob, { status: 200, statusText: "OK", headers });

        }

    }
}