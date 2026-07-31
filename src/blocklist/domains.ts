import type { BlocklistEntry } from "@/types/blocklist";

/**
 * Local AI domain blocklist, organized by category. Keep entries as precise
 * hostnames (not bare registrable domains shared with non-AI products) so a
 * rule never blocks more than intended — e.g. "gemini.google.com" rather
 * than "google.com".
 */
export const BLOCKLIST: BlocklistEntry[] = [
  // AI Chatbots
  { domain: "chatgpt.com", name: "ChatGPT", category: "ai-chatbots" },
  { domain: "chat.openai.com", name: "ChatGPT (legacy)", category: "ai-chatbots" },
  { domain: "claude.ai", name: "Claude", category: "ai-chatbots" },
  { domain: "gemini.google.com", name: "Gemini", category: "ai-chatbots" },
  { domain: "copilot.microsoft.com", name: "Microsoft Copilot", category: "ai-chatbots" },
  { domain: "character.ai", name: "Character.AI", category: "ai-chatbots" },
  { domain: "poe.com", name: "Poe", category: "ai-chatbots" },
  { domain: "grok.com", name: "Grok", category: "ai-chatbots" },
  { domain: "meta.ai", name: "Meta AI", category: "ai-chatbots" },
  { domain: "pi.ai", name: "Pi", category: "ai-chatbots" },
  { domain: "chat.deepseek.com", name: "DeepSeek Chat", category: "ai-chatbots" },
  { domain: "chat.mistral.ai", name: "Le Chat", category: "ai-chatbots" },
  { domain: "chat.qwen.ai", name: "Qwen Chat", category: "ai-chatbots" },
  { domain: "huggingface.co", path: "/chat", name: "HuggingChat", category: "ai-chatbots" },

  // AI Search
  { domain: "perplexity.ai", name: "Perplexity", category: "ai-search" },
  { domain: "you.com", name: "You.com", category: "ai-search" },
  { domain: "phind.com", name: "Phind", category: "ai-search" },
  { domain: "andisearch.com", name: "Andi", category: "ai-search" },

  // AI Writing
  { domain: "jasper.ai", name: "Jasper", category: "ai-writing" },
  { domain: "copy.ai", name: "Copy.ai", category: "ai-writing" },
  { domain: "writesonic.com", name: "Writesonic", category: "ai-writing" },
  { domain: "quillbot.com", name: "QuillBot", category: "ai-writing" },
  { domain: "writer.com", name: "Writer", category: "ai-writing" },
  { domain: "grammarly.com", name: "Grammarly", category: "ai-writing" },
  { domain: "rytr.me", name: "Rytr", category: "ai-writing" },

  // AI Coding
  { domain: "cursor.com", name: "Cursor", category: "ai-coding" },
  { domain: "codeium.com", name: "Codeium", category: "ai-coding" },
  { domain: "tabnine.com", name: "Tabnine", category: "ai-coding" },
  { domain: "bolt.new", name: "Bolt", category: "ai-coding" },
  { domain: "v0.app", name: "v0", category: "ai-coding" },
  { domain: "v0.dev", name: "v0 (legacy)", category: "ai-coding" },
  { domain: "lovable.dev", name: "Lovable", category: "ai-coding" },
  { domain: "devin.ai", name: "Devin", category: "ai-coding" },

  // AI Image Generation
  { domain: "midjourney.com", name: "Midjourney", category: "ai-image-generation" },
  { domain: "leonardo.ai", name: "Leonardo AI", category: "ai-image-generation" },
  { domain: "playgroundai.com", name: "Playground AI", category: "ai-image-generation" },
  { domain: "ideogram.ai", name: "Ideogram", category: "ai-image-generation" },
  { domain: "dreamstudio.ai", name: "DreamStudio", category: "ai-image-generation" },
  { domain: "firefly.adobe.com", name: "Adobe Firefly", category: "ai-image-generation" },
  { domain: "civitai.com", name: "Civitai", category: "ai-image-generation" },
  { domain: "nightcafe.studio", name: "NightCafe", category: "ai-image-generation" },

  // AI Video Generation
  { domain: "runwayml.com", name: "Runway", category: "ai-video-generation" },
  { domain: "pika.art", name: "Pika", category: "ai-video-generation" },
  { domain: "synthesia.io", name: "Synthesia", category: "ai-video-generation" },
  { domain: "heygen.com", name: "HeyGen", category: "ai-video-generation" },
  { domain: "klingai.com", name: "Kling AI", category: "ai-video-generation" },
  { domain: "lumalabs.ai", name: "Luma AI", category: "ai-video-generation" },
  { domain: "sora.com", name: "Sora", category: "ai-video-generation" },
  { domain: "ai.invideo.io", name: "InVideo AI", category: "ai-video-generation" },
];
