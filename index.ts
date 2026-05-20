/**
 * USTC LLM Platform Provider Extension
 *
 * Provides access to the University of Science and Technology of China's
 * LLM公共服务平台 (Public Service Platform) models through the
 * OpenAI-compatible API.
 *
 * Usage:
 *   pi -e ./index.ts
 *   # Or copy to ~/.pi/agent/extensions/ustc-provider/index.ts
 *
 * Then set your API key:
 *   export USTC_API_KEY="sk-your-api-key"
 *
 * Models are selected via /model:
 *   /model ustc/deepseek-v4-flash
 *   /model ustc/qwen3.6-35b-a3b
 *   /model ustc/qwen3.6-27b
 *   /model ustc/deepseek-v4-pro
 */

import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";

// =============================================================================
// Constants
// =============================================================================

const BASE_URL = "https://api.llm.ustc.edu.cn/v1";

// =============================================================================
// Model Definitions
// =============================================================================

/**
 * USTC model definitions.
 *
 * Per the platform docs, models are organized in three tiers:
 *   ① 高效通用层 (Efficient General) — daily Q&A, long text, high concurrency
 *   ② 能力增强层 (Capability Enhanced) — teaching, coding, complex V+L analysis
 *   ③ 高阶推理层 (Advanced Reasoning) — research, complex reasoning, high quality output
 */
const MODELS = [
  {
    id: "deepseek-v4-flash-ascend",
    name: "DeepSeek V4 Flash (USTC)",
    reasoning: true,
    input: ["text"],
    cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
    contextWindow: 1_000_000,
    maxTokens: 8192,
    compat: {
      thinkingFormat: "deepseek" as const,
    },
  },
];

// =============================================================================
// Extension Entry Point
// =============================================================================

export default function (pi: ExtensionAPI) {
  pi.registerProvider("ustc", {
    name: "USTC 大模型公共服务平台",
    baseUrl: BASE_URL,
    apiKey: "USTC_API_KEY",
    api: "openai-completions",
    models: MODELS,
  });
}
