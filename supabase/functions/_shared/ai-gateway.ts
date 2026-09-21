import { createOpenAICompatible } from "npm:@ai-sdk/openai-compatible";

const RUN_ID_HEADER = "X-Lovable-AIG-Run-ID";

export function createLovableAiGatewayProvider(apiKey: string) {
  return createOpenAICompatible({
    name: "lovable",
    baseURL: "https://ai.gateway.lovable.dev/v1",
    headers: {
      "Lovable-API-Key": apiKey,
      "X-Lovable-AIG-SDK": "vercel-ai-sdk",
    },
  });
}

export function getLovableAiGatewayRunId(req: Request) {
  const runId = req.headers.get(RUN_ID_HEADER);
  return runId && runId.trim().length > 0 ? runId : undefined;
}

export function createLovableAiGatewayRunIdFetch(initialRunId?: string) {
  let runId = initialRunId;

  const runIdFetch: typeof fetch = async (input, init = {}) => {
    const headers = new Headers(init.headers);
    if (runId) headers.set(RUN_ID_HEADER, runId);

    const response = await fetch(input, { ...init, headers });
    const nextRunId = response.headers.get(RUN_ID_HEADER);
    if (nextRunId) runId = nextRunId;
    return response;
  };

  return {
    fetch: runIdFetch,
    getRunId: () => runId,
  };
}

export function getLovableAiGatewayResponseHeaders(
  _unused?: unknown,
  headers: HeadersInit = {},
) {
  return headers;
}

export function withLovableAiGatewayRunIdHeader(
  response: Response,
  runIdFetch: { getRunId: () => string | undefined },
  headers: HeadersInit = {},
) {
  const merged = new Headers(headers);
  response.headers.forEach((value, key) => merged.set(key, value));

  const runId = runIdFetch.getRunId();
  if (runId) merged.set(RUN_ID_HEADER, runId);

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: merged,
  });
}
