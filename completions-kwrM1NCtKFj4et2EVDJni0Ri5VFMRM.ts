import { sheikhModels } from "../../../../models/registry";
import { loadPrompt } from "../../../../utils/loadPrompt";
import { callGemini } from "../../../../utils/callGemini";

export default async function handler(req, res) {
  const { model, messages, stream = false } = req.body;
  const config = sheikhModels[model];
  if (!config) return res.status(400).json({ error: "Invalid model ID." });

  const systemPrompt = await loadPrompt(config.promptFile);
  const payload = {
    model: config.model,
    messages: [{ role: "system", content: systemPrompt }, ...messages],
    stream
  };

  const geminiResponse = await callGemini(payload, stream);
  return geminiResponse.pipeTo(res);
}
