import { Ritual } from '@/types'

export const RITUALS: Ritual[] = [
  {
    key: 'midnight-archive',
    name: 'The Midnight Archive',
    duration: '20 min',
    category: 'reflection',
    description: 'A practice of deep documentation — not journaling as catharsis, but as archaeology. You are excavating the layers of a single thought, belief, or experience until you reach its bedrock truth.',
    intention: 'To understand what you actually think beneath what you have been told to think.',
    steps: [
      { order: 1, instruction: 'Choose a single belief you hold but have never examined. Write it at the top of a blank page.', duration: '2 min' },
      { order: 2, instruction: 'Ask: where did this come from? Write without editing until the page is full.', duration: '5 min' },
      { order: 3, instruction: 'Read what you wrote. Underline the sentence that feels most alive. Circle the one that frightens you.', duration: '3 min' },
      { order: 4, instruction: 'Sit in complete silence with both sentences. Do not resolve them. Let them coexist.', duration: '5 min' },
      { order: 5, instruction: 'Write the most honest thing you know about yourself, in one line.', duration: '5 min' },
    ],
    elements: ['paper', 'dark ink', 'single light source', 'silence'],
    archetype_affinities: ['shadow-scholar', 'void-oracle'],
  },
  {
    key: 'moonrise-meditation',
    name: 'Moonrise Listening',
    duration: '15 min',
    category: 'emotional',
    description: 'A practice of receptive attention — allowing the emotional body to report without interference. Most people never allow themselves to feel what they are actually feeling. This practice does.',
    intention: 'To receive your own emotional truth without interpretation or defense.',
    steps: [
      { order: 1, instruction: 'Sit in a position that feels both rooted and open. Close your eyes.', duration: '1 min' },
      { order: 2, instruction: 'Ask your body: what are you carrying right now? Do not answer with your mind. Wait.', duration: '3 min' },
      { order: 3, instruction: 'Whatever sensation or image arises — give it a color, a weight, a texture. Do not name the emotion yet.', duration: '4 min' },
      { order: 4, instruction: 'Breathe toward the sensation as if you could warm it. Not to dissolve it. To acknowledge it.', duration: '4 min' },
      { order: 5, instruction: 'Ask: what do you need from me right now? Sit with the answer, however unexpected.', duration: '3 min' },
    ],
    elements: ['candlelight or moonlight', 'stillness', 'no external sound'],
    archetype_affinities: ['lunar-seer', 'crimson-saint'],
  },
  {
    key: 'phoenix-breath',
    name: 'Phoenix Breath',
    duration: '10 min',
    category: 'power',
    description: 'A breathing practice designed to activate the body\'s own capacity for renewal. This is not relaxation — it is ignition. It is what you do before you walk into something that matters.',
    intention: 'To move from reactivity to sovereignty in the body before moving into the world.',
    steps: [
      { order: 1, instruction: 'Stand. Plant your feet. Feel your weight through the floor.', duration: '1 min' },
      { order: 2, instruction: 'Breathe in through the nose for 4 counts — full, to the base of the lungs.', duration: '2 min' },
      { order: 3, instruction: 'Hold for 7. In this space — name what you are walking toward.', duration: '2 min' },
      { order: 4, instruction: 'Release through the mouth for 8 — completely, audibly. Repeat this cycle 6 times.', duration: '4 min' },
      { order: 5, instruction: 'Return to normal breath. Notice what has changed. Name it.', duration: '1 min' },
    ],
    elements: ['open space', 'bare feet if possible', 'silence'],
    archetype_affinities: ['ashborn-monarch', 'storm-vessel'],
  },
  {
    key: 'earth-grounding',
    name: 'The Foundation Work',
    duration: '25 min',
    category: 'discipline',
    description: 'A practice of deliberate, physical engagement with the present moment. Not meditation in the classical sense — creation. Making something small and real with your hands, with complete attention.',
    intention: 'To return the scattered mind to the body and the body to the present.',
    steps: [
      { order: 1, instruction: 'Choose a physical task: writing by hand, drawing a single shape repeatedly, kneading, or working with any material.', duration: '2 min' },
      { order: 2, instruction: 'Begin the task. For the first five minutes, allow your mind to wander freely while your hands work.', duration: '5 min' },
      { order: 3, instruction: 'Gradually bring your attention to the physical sensations only — texture, pressure, temperature, movement.', duration: '8 min' },
      { order: 4, instruction: 'Complete the task. Do not evaluate the result. Simply finish it.', duration: '8 min' },
      { order: 5, instruction: 'Sit with what you made. Notice what it cost you and what it gave.', duration: '2 min' },
    ],
    elements: ['material', 'hands', 'uninterrupted time'],
    archetype_affinities: ['silent-alchemist', 'ashborn-monarch'],
  },
  {
    key: 'void-meditation',
    name: 'Into the Void',
    duration: '20 min',
    category: 'shadow',
    description: 'A practice of radical stillness — not the stillness of suppression, but of complete arrival. This practice asks you to release the story you are telling about yourself and simply be what remains.',
    intention: 'To access the awareness that exists beneath identity.',
    steps: [
      { order: 1, instruction: 'Find complete darkness, or close your eyes. Sit in a position you can hold without effort.', duration: '1 min' },
      { order: 2, instruction: 'For five minutes, observe every thought that arises without responding to it. Do not suppress. Do not follow. Only watch.', duration: '5 min' },
      { order: 3, instruction: 'Now release even the watching. Release the sense of being a watcher. Simply be the space the thoughts pass through.', duration: '7 min' },
      { order: 4, instruction: 'Ask from this space: who was here before I began?', duration: '5 min' },
      { order: 5, instruction: 'Return to normal awareness slowly. Write one word for what you found.', duration: '2 min' },
    ],
    elements: ['darkness', 'absolute silence', 'nothing'],
    archetype_affinities: ['void-oracle', 'shadow-scholar'],
  },
  {
    key: 'sacred-wound-writing',
    name: 'The Sacred Wound',
    duration: '30 min',
    category: 'shadow',
    description: 'A practice of transformative writing that uses the deepest wound as a doorway. This is not trauma processing — it is alchemy. The difference is intention: you are extracting the gold.',
    intention: 'To transform suffering into wisdom, art, or power.',
    steps: [
      { order: 1, instruction: 'Light a candle. This is a ritual. Name it as such in your own mind.', duration: '1 min' },
      { order: 2, instruction: 'Choose the wound you return to most. Write its name at the top of the page.', duration: '2 min' },
      { order: 3, instruction: 'Write the story of this wound — not to process it, but to honor it. Every detail. 10 minutes.', duration: '10 min' },
      { order: 4, instruction: 'Stop. Ask: what did this wound teach me that nothing else could have?', duration: '2 min' },
      { order: 5, instruction: 'Write the teaching. Not a lesson — a truth. Something you now know in your body that you could not have been told.', duration: '10 min' },
      { order: 6, instruction: 'Fold the page. Keep it, or burn it. The ritual is complete either way.', duration: '5 min' },
    ],
    elements: ['red or black candle', 'dark ink', 'unwitnessed solitude'],
    archetype_affinities: ['crimson-saint', 'ashborn-monarch', 'lunar-seer'],
  },
  {
    key: 'thunder-meditation',
    name: 'The Storm Practice',
    duration: '15 min',
    category: 'power',
    description: 'A practice of intentional intensity — using controlled physical and breath work to enter a state of heightened electrical presence. This is what you do when you need to access your full charge.',
    intention: 'To move from scattered energy to directed power.',
    steps: [
      { order: 1, instruction: 'Begin with intense breath — rapid, full, through the mouth. 30 breaths.', duration: '2 min' },
      { order: 2, instruction: 'Hold the exhale. In the stillness — name the single thing you are moving toward. Say it, out loud, once.', duration: '1 min' },
      { order: 3, instruction: 'Release. Breathe normally. Feel what the intensity created.', duration: '2 min' },
      { order: 4, instruction: 'Move — walk, stretch, shake — for 5 full minutes. No music. Only the body.', duration: '5 min' },
      { order: 5, instruction: 'Stop completely. Stand still. Feel the difference between who you were at the start and who you are now.', duration: '5 min' },
    ],
    elements: ['space to move', 'intention', 'intensity'],
    archetype_affinities: ['storm-vessel', 'ashborn-monarch'],
  },
  {
    key: 'mirror-meditation',
    name: 'The Mirror Rite',
    duration: '10 min',
    category: 'shadow',
    description: 'A practice of radical self-witness — looking without the usual narrative. Most people cannot look at themselves without immediately constructing a story. This practice interrupts that.',
    intention: 'To see yourself without the mediation of self-concept.',
    steps: [
      { order: 1, instruction: 'Stand before a mirror. Single light source only — candle preferred.', duration: '1 min' },
      { order: 2, instruction: 'Look at your own eyes. Do not blink more than necessary. Do not smile or arrange your face.', duration: '3 min' },
      { order: 3, instruction: 'Ask aloud: who are you? Do not answer. Simply hold the question and your own gaze simultaneously.', duration: '3 min' },
      { order: 4, instruction: 'Look for the part of your face that is not performing. It is there.', duration: '2 min' },
      { order: 5, instruction: 'Bow slightly to your reflection. You have seen something true.', duration: '1 min' },
    ],
    elements: ['mirror', 'single candle', 'complete silence'],
    archetype_affinities: ['shadow-scholar', 'void-oracle', 'crimson-saint'],
  },
]

export function getRitual(key: string): Ritual | undefined {
  return RITUALS.find((r) => r.key === key)
}

export function getRitualsForArchetype(archetypeKey: string): Ritual[] {
  return RITUALS.filter((r) => r.archetype_affinities.includes(archetypeKey as never))
}

export function getDailyRitual(archetypeKey: string, dayOffset = 0): Ritual {
  const archetypeRituals = getRitualsForArchetype(archetypeKey)
  const allRituals = archetypeRituals.length > 0 ? archetypeRituals : RITUALS
  const index = (Math.floor(Date.now() / 86400000) + dayOffset) % allRituals.length
  return allRituals[index]
}
