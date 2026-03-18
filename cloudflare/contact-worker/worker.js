const worker = {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const allowedOrigins = getAllowedOrigins(env);
    const allowOrigin = allowedOrigins.has(origin) ? origin : allowedOrigins.values().next().value || "*";

    const corsHeaders = {
      "Access-Control-Allow-Origin": allowOrigin,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      Vary: "Origin",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== "POST") {
      return json({ error: "Method not allowed" }, 405, corsHeaders);
    }

    if (origin && !allowedOrigins.has(origin)) {
      return json({ error: "Origin not allowed" }, 403, corsHeaders);
    }

    try {
      const body = await request.json();
      const name = String(body.name ?? "").trim();
      const email = String(body.email ?? "").trim();
      const projectType = String(body.projectType ?? "").trim();
      const context = String(body.context ?? "").trim();

      if (!name || !email || !projectType || !context) {
        return json({ error: "Missing required fields" }, 400, corsHeaders);
      }

      if (!/^\S+@\S+\.\S+$/.test(email)) {
        return json({ error: "Invalid email" }, 400, corsHeaders);
      }

      const resendResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: env.MAIL_FROM,
          to: [env.MAIL_TO],
          reply_to: email,
          subject: `Kestrel Labs inquiry — ${projectType}`,
          text: [
            `Name: ${name}`,
            `Email: ${email}`,
            `Project type: ${projectType}`,
            "",
            "Project context:",
            context,
          ].join("\n"),
        }),
      });

      if (!resendResponse.ok) {
        const errorText = await resendResponse.text();
        return json({ error: "Email send failed", details: errorText }, 502, corsHeaders);
      }

      return json({ ok: true }, 200, corsHeaders);
    } catch (error) {
      return json(
        {
          error: "Unexpected error",
          details: error instanceof Error ? error.message : "Unknown error",
        },
        500,
        corsHeaders,
      );
    }
  },
};

function getAllowedOrigins(env) {
  const raw = env.ALLOWED_ORIGINS || env.ALLOWED_ORIGIN || "*";
  return new Set(
    raw
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean),
  );
}

function json(payload, status = 200, headers = {}) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });
}

export default worker;
