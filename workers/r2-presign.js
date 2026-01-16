/**
 * Cloudflare Worker for Presigned R2 URLs
 * 
 * SETUP INSTRUCTIONS:
 * 1. Create a new Worker in Cloudflare Dashboard.
 * 2. Copy this code into the Worker editor.
 * 3. Go to Settings -> Variables and add:
 *    - R2_BUCKET_NAME
 *    - R2_ACCOUNT_ID
 *    - R2_ACCESS_KEY_ID
 *    - R2_SECRET_ACCESS_KEY
 *    - ALLOWED_ORIGIN (e.g., https://dyzulk.github.io, or * for dev)
 * 4. Deploy!
 */

import { AwsClient } from 'aws4fetch'

export default {
  async fetch(request, env) {
    // 1. Handle CORS Preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": env.ALLOWED_ORIGIN || "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    try {
      // 2. Auth Check (Simple)
      // For production, verify Supabase JWT token here if needed.
      // For now, we trust the Client if it knows the endpoint (obscurity) or checking Origin.
      
      const body = await request.json();
      const { fileName, fileType } = body;

      if (!fileName || !fileType) {
        return new Response("Missing fileName or fileType", { status: 400 });
      }

      // 3. Initialize AWS Client (R2 S3-Compatible)
      const r2 = new AwsClient({
        accessKeyId: env.R2_ACCESS_KEY_ID,
        secretAccessKey: env.R2_SECRET_ACCESS_KEY,
        service: 's3',
        region: 'auto',
      });

      // 4. Generate Presigned URL
      const url = new URL(
        `https://${env.R2_BUCKET_NAME}.${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${fileName}`
      );
      
      // Sign the request
      // We sign a PUT request for the specific file
      const signed = await r2.sign(
        new Request(url, {
          method: 'PUT',
          headers: {
            'Content-Type': fileType
          }
        }),
        {
          aws: { signQuery: true }, // Create presigned URL with query params
        }
      );

      return new Response(JSON.stringify({ url: signed.url }), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": env.ALLOWED_ORIGIN || "*",
        },
      });

    } catch (e) {
      return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
  },
};
