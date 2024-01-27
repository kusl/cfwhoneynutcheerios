import { Client } from "pg";
import { Env } from "./env";
import { Payload } from "./payload";

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    const client = new Client(env.DB_URL);
    await client.connect();

		const payload = await request.text();
		const parsed = JSON.parse(payload) as Payload;
		const ipaddress = parsed.ipaddress;
		const current_url = parsed.currentUrl;
		const referring_url = parsed.referringUrl;

    let sql = `INSERT INTO requests (payload, ipaddress, current_url, referring_url) VALUES ($1, $2, $3, $4) RETURNING *`;
    let values = [payload, ipaddress, current_url, referring_url];

    const db_response = await client.query(sql, values);

    // Return the result as JSON
    const resp = new Response(JSON.stringify(db_response.rows), {
      headers: { "Content-Type": "application/json" },
    });

    // Clean up the client
    ctx.waitUntil(client.end());
    return resp;
  }
};
