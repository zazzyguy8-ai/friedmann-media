import type { BlocklistCategory } from "@/types/blocklist";

export const BLOCKLIST_CATEGORIES: BlocklistCategory[] = [
  {
    id: "ai-chatbots",
    label: "AI Chatbots",
    description: "General-purpose conversational AI assistants.",
  },
  {
    id: "ai-search",
    label: "AI Search",
    description: "Search engines and answer engines built around AI.",
  },
  {
    id: "ai-writing",
    label: "AI Writing",
    description: "AI writing, editing, and copywriting assistants.",
  },
  {
    id: "ai-coding",
    label: "AI Coding",
    description: "AI pair-programming and code-generation tools.",
  },
  {
    id: "ai-image-generation",
    label: "AI Image Generation",
    description: "Text-to-image and AI image editing tools.",
  },
  {
    id: "ai-video-generation",
    label: "AI Video Generation",
    description: "Text-to-video and AI video editing tools.",
  },
];
