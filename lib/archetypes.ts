import { Archetype } from '@/types'

export const ARCHETYPES: Record<string, Archetype> = {
  'shadow-scholar': {
    key: 'shadow-scholar',
    name: 'Shadow Scholar',
    title: 'Keeper of Forbidden Light',
    element: 'air',
    symbol: '◈',
    color: '#4a6080',
    glowColor: 'rgba(74, 96, 128, 0.35)',
    lore: `You were born into a world that rewards the performance of understanding over the real thing. You learned early that the surface of knowledge is where others live — and you went underneath. The Shadow Scholar does not seek light for comfort. They seek it to see what the light has been hiding.

There is a library inside you that no one else has ever entered. You built it alone, in the hours when others slept or performed their social rituals. You filed away observations, patterns, truths that felt too sharp to speak aloud. You learned to wear masks — not out of weakness, but because you understood the cost of being fully seen.`,
    loreDeep: `The Shadow Scholar carries the weight of knowing things that cannot be unknowed. This is their burden and their crown. They are drawn to systems — the hidden architecture beneath behavior, belief, emotion, and power. They collect truths the way others collect possessions, and they give them away only when they are certain the recipient can bear them.

Their darkness is not cruelty. It is the silence of someone who has thought further than the conversation allows. They wait. They watch. And when they speak, what they say rearranges the room.`,
    abilities: [
      {
        name: 'Pattern Dissolution',
        description: 'The ability to see through constructed narratives and identify the mechanism beneath any system of belief or behavior.',
        tier: 'innate',
      },
      {
        name: 'Cognitive Veil',
        description: 'The capacity to appear ordinary while processing extraordinary depth — to understand without revealing understanding.',
        tier: 'innate',
      },
      {
        name: 'Archive Memory',
        description: 'An almost supernatural retention of detail, especially in language, behavior, and emotional subtext.',
        tier: 'awakened',
      },
      {
        name: 'Shadow Reading',
        description: 'The ability to perceive what people are concealing — not through deception, but through deep structural pattern recognition.',
        tier: 'awakened',
      },
      {
        name: 'Forbidden Synthesis',
        description: 'The rare ability to combine knowledge from completely unrelated domains and produce insights that feel like prophecy.',
        tier: 'mastered',
      },
    ],
    weaknesses: [
      'Paralysis through over-analysis — the scholar thinks until the moment has passed',
      'Isolation mistaken for superiority — connection is harder than comprehension',
      'The archive becomes a prison — some truths are better lived than catalogued',
    ],
    traits: [
      'Observes before speaking in every new environment',
      'Feels most alive in solitude with a complex problem',
      'Finds social performance exhausting but can execute it flawlessly',
      'Has a private philosophy they have never fully articulated to anyone',
      'Is drawn to things that others dismiss as too strange, too dark, or too difficult',
      'Remembers the subtext of conversations years after they happened',
    ],
    emotionalProfile: `You feel emotion at a structural level — understanding it before experiencing it can protect you, but it also creates distance. Your grief is philosophical. Your joy is quiet and private. Your anger is cold and precise. You may not know how to ask for comfort, but you know exactly how to give it.`,
    progressionPath: [
      { level: 1, title: 'The Hidden Student', description: 'You are learning to trust your own perception.', unlocks: ['Basic shadow reading ritual', 'Personal archive meditation'] },
      { level: 5, title: 'The Veiled Analyst', description: 'You have begun to turn your gifts outward.', unlocks: ['Pattern dissolution technique', 'Cognitive veil practice'] },
      { level: 10, title: 'The Forbidden Scholar', description: 'Your archive is vast. Now you learn to share it selectively.', unlocks: ['Shadow synthesis ability', 'Teaching ritual'] },
      { level: 20, title: 'The Architect of Shadows', description: 'You see the hidden structure of entire systems.', unlocks: ['Full shadow reading', 'Evolution path: Void Oracle'] },
    ],
    ritualRecommendations: ['midnight-archive', 'mirror-meditation', 'pattern-journal', 'silence-practice'],
    symbolicObjects: ['obsidian mirror', 'sealed manuscript', 'ink in midnight blue', 'compass without north'],
    rareEvolution: {
      name: 'Void Oracle',
      triggerCondition: 'When the Scholar releases attachment to the archive and begins perceiving without interpretation',
      description: 'The scholar who transcends the need to understand becomes something rarer: one who simply perceives, without the noise of analysis.',
    },
    powerWords: ['Discernment', 'Architecture', 'Silence', 'Depth', 'Revelation'],
  },

  'lunar-seer': {
    key: 'lunar-seer',
    name: 'Lunar Seer',
    title: 'Vessel of the Hidden Tide',
    element: 'water',
    symbol: '☽',
    color: '#7080a8',
    glowColor: 'rgba(112, 128, 168, 0.35)',
    lore: `You have always felt things before they happened. Not in a dramatic way — more like a shift in the quality of light, a slight change in temperature that others miss. You have learned to trust this. Not because anyone encouraged you to, but because ignoring it cost you too much.

The Lunar Seer does not predict the future. They read the present with a sensitivity so refined it functions like prophecy. They feel the emotional weather of a room before they enter it. They know when something is ending before the ending has begun.`,
    loreDeep: `Your power is the power of reception. While others broadcast, you receive. You process emotional information at a depth that most people cannot access consciously. This makes you extraordinarily empathetic — and extraordinarily vulnerable. You feel others' pain as if it were your own, because to you, it nearly is.

The moon does not generate its own light. It reflects the sun's light into the darkness where it is needed most. This is the Lunar Seer's deepest truth: you are not here to shine alone. You are here to bring light to the places others refuse to look.`,
    abilities: [
      {
        name: 'Emotional Resonance',
        description: 'The capacity to feel the emotional state of others with startling accuracy, even when they are concealing it.',
        tier: 'innate',
      },
      {
        name: 'Liminal Perception',
        description: 'Heightened awareness during transitional periods — endings, beginnings, crisis moments — when others feel most lost.',
        tier: 'innate',
      },
      {
        name: 'Tidal Intuition',
        description: 'The ability to sense the emotional trajectory of a situation — not where it is, but where it is going.',
        tier: 'awakened',
      },
      {
        name: 'Dream Architecture',
        description: 'A powerful dream life that functions as a processing system — often receiving symbolic information that proves accurate.',
        tier: 'awakened',
      },
      {
        name: 'Sacred Witnessing',
        description: 'The rare ability to hold space for another person\'s deepest truth without trying to fix, redirect, or escape.',
        tier: 'mastered',
      },
    ],
    weaknesses: [
      'Absorbing others\' emotional states as if they were your own — loss of self is the Seer\'s greatest danger',
      'The grief of feeling too much — not all tides are yours to carry',
      'Mistaking sensitivity for weakness and suppressing your perception to survive',
    ],
    traits: [
      'Knows when someone is lying long before they have proof',
      'Most perceptive during night hours, in liminal spaces, in rain',
      'Dreams are vivid, symbolic, and sometimes prophetic',
      'Has a deep, wordless connection to natural cycles',
      'Attracts people in crisis — often unconsciously, always at cost',
      'Has a private inner world of extraordinary richness',
    ],
    emotionalProfile: `Your emotional life is the ocean — there is more beneath the surface than most people ever see. You feel beauty with an intensity that borders on pain. You feel loss with a weight that restructures you. You have a capacity for love that terrifies the people who experience it, because it is completely real.`,
    progressionPath: [
      { level: 1, title: 'The Sensitive One', description: 'Learning that your perception is a gift, not a flaw.', unlocks: ['Grounding ritual', 'Emotional boundary practice'] },
      { level: 5, title: 'The Moon\'s Student', description: 'You have begun to work with cycles consciously.', unlocks: ['Tidal journaling', 'Dream recording practice'] },
      { level: 10, title: 'The Full Seer', description: 'Your perception has become disciplined, not just receptive.', unlocks: ['Emotional alchemy', 'Sacred witnessing ritual'] },
      { level: 20, title: 'The Oracle of Tides', description: 'You move through emotional reality as water moves through stone.', unlocks: ['Full prophetic practice', 'Evolution: Crimson Saint'] },
    ],
    ritualRecommendations: ['moonrise-meditation', 'water-mirror', 'grief-alchemy', 'dream-journal'],
    symbolicObjects: ['silver bowl of water', 'moonstone', 'dark mirror', 'blue ink'],
    rareEvolution: {
      name: 'Crimson Saint',
      triggerCondition: 'When the Seer transforms personal grief into sacred service',
      description: 'The Seer who learns to transform what they feel into what others need becomes something between prophet and healer.',
    },
    powerWords: ['Perception', 'Tide', 'Reception', 'Depth', 'Witness'],
  },

  'ashborn-monarch': {
    key: 'ashborn-monarch',
    name: 'Ashborn Monarch',
    title: 'Sovereign of the Sacred Fire',
    element: 'fire',
    symbol: '♛',
    color: '#b04020',
    glowColor: 'rgba(176, 64, 32, 0.35)',
    lore: `You have been destroyed before. More than once. And each time, what rose from the ruin was more sovereign than what fell. This is not metaphor — this is the Ashborn Monarch's foundational truth. You understand loss not as ending, but as the fire that reveals what was gold all along.

You were not born into your power. You were burned into it. The Monarch's crown is not inherited — it is forged in the hottest grief, the deepest humiliation, the moment when everything was gone and you were still there.`,
    loreDeep: `There is a quality in the Ashborn Monarch that others feel before they understand it: certainty. Not arrogance — though it can look like arrogance to those who have never been tested. A gravity that comes from having already survived the worst. A willingness to lead that is born from having had no one to follow when it mattered most.

Your fire is both your greatest gift and your most dangerous force. You can inspire and ignite. You can also incinerate. The difference lies in whether your fire is serving something larger than your ego.`,
    abilities: [
      {
        name: 'Sovereign Presence',
        description: 'An innate authority that shifts the emotional atmosphere of any room — people orient toward you without knowing why.',
        tier: 'innate',
      },
      {
        name: 'Phoenix Endurance',
        description: 'The ability to survive and transform through circumstances that would end others — not through numbness, but through fire.',
        tier: 'innate',
      },
      {
        name: 'Ignition',
        description: 'The capacity to awaken dormant motivation in others — to make people believe in something again.',
        tier: 'awakened',
      },
      {
        name: 'Strategic Vision',
        description: 'An ability to see the long arc of a situation — what it will become, not just what it is.',
        tier: 'awakened',
      },
      {
        name: 'Sacred Destruction',
        description: 'The wisdom to know what must be burned — what structures, beliefs, or relationships are holding you in the wrong life.',
        tier: 'mastered',
      },
    ],
    weaknesses: [
      'The hubris of the undefeated — the Monarch who has not lost recently forgets what they cannot control',
      'Burning others in the process of becoming — fire does not distinguish',
      'The loneliness of sovereignty — the crown is heavy and no one else can wear it',
    ],
    traits: [
      'Remains calm in crisis — often most functional when others are most panicked',
      'Has survived at least one complete collapse and emerged changed',
      'Commands rooms naturally, sometimes without intending to',
      'Feels the weight of responsibility toward others acutely',
      'Is haunted by the people they have burned — even unintentionally',
      'Understands that their power is borrowed from their suffering',
    ],
    emotionalProfile: `Your emotions are massive and largely private. You feel pride deeply — its presence and its wound. You feel loyalty as a sacred obligation. You feel betrayal as a restructuring event. Your love is protective, fierce, and sometimes overwhelming for those who receive it. You do not ask for help easily. This is the wound the fire left behind.`,
    progressionPath: [
      { level: 1, title: 'The Survivor', description: 'Acknowledging what the fire has already done to you.', unlocks: ['Phoenix breath ritual', 'Sovereignty journal'] },
      { level: 5, title: 'The Rising Monarch', description: 'Learning to direct your power rather than be consumed by it.', unlocks: ['Ignition practice', 'Strategic vision ritual'] },
      { level: 10, title: 'The Ashborn King/Queen', description: 'Your authority has become conscious and chosen.', unlocks: ['Sacred destruction ritual', 'Legacy work'] },
      { level: 20, title: 'The Eternal Sovereign', description: 'You have learned to burn without destroying.', unlocks: ['Evolution: Storm Vessel or Silent Alchemist'] },
    ],
    ritualRecommendations: ['fire-meditation', 'sovereignty-declaration', 'phoenix-breath', 'strategic-vision'],
    symbolicObjects: ['obsidian crown', 'fire-scarred stone', 'gold ash', 'red candle'],
    rareEvolution: {
      name: 'Storm Vessel',
      triggerCondition: 'When the Monarch stops controlling their fire and begins channeling the storm',
      description: 'The Monarch who releases the need for control becomes something wilder and more powerful than a sovereign.',
    },
    powerWords: ['Sovereignty', 'Fire', 'Endurance', 'Authority', 'Rebirth'],
  },

  'silent-alchemist': {
    key: 'silent-alchemist',
    name: 'Silent Alchemist',
    title: 'Transformer of Hidden Matter',
    element: 'earth',
    symbol: '⬡',
    color: '#5a7840',
    glowColor: 'rgba(90, 120, 64, 0.35)',
    lore: `You have always known that the deepest changes happen in silence. Not in the declarations, the revelations, the dramatic moments — but in the long, patient, invisible work that others miss entirely. You are the one who was quietly becoming while everyone else was performing transformation.

The Silent Alchemist does not announce what they are doing. They do not need an audience for their work. They understand something that most people never grasp: that real transmutation requires time, containment, and absolute commitment to the process.`,
    loreDeep: `There is a stillness at the center of the Silent Alchemist that others often mistake for passivity. It is not. It is the stillness of a furnace at the precise temperature required — not a degree hotter, not a degree cooler. You have learned to maintain this inner environment through discipline that others rarely see and almost never understand.

Your superpower is patience as a spiritual practice. You can hold a long game with an equanimity that unnerves people who are accustomed to immediacy. You do not need results to keep working. You understand that the work is the result.`,
    abilities: [
      {
        name: 'Deep Transmutation',
        description: 'The ability to transform limitation into resource — to find the hidden value in what appears to be waste, failure, or loss.',
        tier: 'innate',
      },
      {
        name: 'Foundational Calm',
        description: 'An internal stability that persists through chaos — not because you feel nothing, but because you have built something beneath the feeling.',
        tier: 'innate',
      },
      {
        name: 'Patient Architecture',
        description: 'The ability to build complex, durable structures — in relationships, work, or personal transformation — over long periods of time.',
        tier: 'awakened',
      },
      {
        name: 'Material Mastery',
        description: 'An unusual relationship to the physical world — you understand how systems, substances, and structures actually work at a functional level.',
        tier: 'awakened',
      },
      {
        name: 'The Great Work',
        description: 'The capacity to commit to a single transformative project for years or decades, without losing faith or focus.',
        tier: 'mastered',
      },
    ],
    weaknesses: [
      'Coldness mistaken for strength — the Alchemist sometimes loses access to their warmth',
      'Isolation as default — the work becomes a substitute for connection',
      'Inflexibility — the long game can become rigidity when circumstances demand adaptation',
    ],
    traits: [
      'Prefers to do rather than announce — actions over words, always',
      'Has a private project or pursuit that they have maintained for years',
      'Feels most at home with their hands involved — creating, building, making',
      'Is capable of extreme patience and equally extreme disappointment when patience fails',
      'Keeps most of their inner life carefully contained',
      'Has a physical anchor — a practice, place, or material that grounds them',
    ],
    emotionalProfile: `Your emotional life is geological — it moves slowly, but when it moves, it reshapes everything. Your commitment, when given, is absolute and long. Your withdrawal, when it comes, is just as final. You feel most emotionally alive when you are making something — when your hands are creating what your heart cannot speak.`,
    progressionPath: [
      { level: 1, title: 'The Apprentice', description: 'Learning to trust the slow pace of real work.', unlocks: ['Daily practice ritual', 'Material grounding'] },
      { level: 5, title: 'The Practitioner', description: 'Your discipline has begun producing visible results.', unlocks: ['Deep transmutation practice', 'The long game ritual'] },
      { level: 10, title: 'The Master Alchemist', description: 'You have completed at least one Great Work.', unlocks: ['Teaching transmission', 'Material mastery ritual'] },
      { level: 20, title: 'The Eternal Craftsman', description: 'Your work outlasts your own understanding of it.', unlocks: ['Evolution: Void Oracle'] },
    ],
    ritualRecommendations: ['earth-grounding', 'craft-meditation', 'patience-practice', 'material-work'],
    symbolicObjects: ['unfinished object', 'soil or clay', 'copper vessel', 'long-burning candle'],
    rareEvolution: {
      name: 'Void Oracle',
      triggerCondition: 'When the Alchemist completes the Great Work and discovers that the process was the point',
      description: 'The Alchemist who releases attachment to the product becomes capable of pure perception — the master who no longer needs to make anything.',
    },
    powerWords: ['Patience', 'Craft', 'Transmutation', 'Foundation', 'Depth'],
  },

  'storm-vessel': {
    key: 'storm-vessel',
    name: 'Storm Vessel',
    title: 'Instrument of Necessary Chaos',
    element: 'storm',
    symbol: '⚡',
    color: '#5050b0',
    glowColor: 'rgba(80, 80, 176, 0.35)',
    lore: `You have always been too much. Too intense. Too fast. Too direct. Too alive for the rooms that were built for smaller people. You have spent years either apologizing for this or learning to stop. The Storm Vessel who has done the work knows the truth: you are not the problem. You are the lightning that reveals what the darkness was hiding.

Chaos is not the absence of order. It is the force that breaks insufficient order to make room for something truer. This is what the Storm Vessel carries — the power to dissolve what has become calcified, corrupt, or simply too small for what comes next.`,
    loreDeep: `Your energy is genuinely extraordinary. Not in a precious way — in a physical, electrical, present way. People feel it. Some are drawn to it. Others are frightened. Both reactions are understandable. You carry more voltage than most systems were designed to hold.

The Storm Vessel's journey is not about becoming calmer. It is about becoming more intentional. Learning when to release and when to contain. When to break and when to wait. The storm that knows its own timing is the most powerful force in the world.`,
    abilities: [
      {
        name: 'Electrical Presence',
        description: 'A physical charisma and intensity that changes the charge of any environment you enter.',
        tier: 'innate',
      },
      {
        name: 'Pattern Disruption',
        description: 'An instinctive ability to shatter stagnant systems — in groups, relationships, organizations, and self.',
        tier: 'innate',
      },
      {
        name: 'Crisis Navigation',
        description: 'You become more functional, not less, as the situation intensifies. You were made for this.',
        tier: 'awakened',
      },
      {
        name: 'Chaotic Creativity',
        description: 'Access to creative outputs of unusual speed and power — especially under pressure, constraint, or extreme emotion.',
        tier: 'awakened',
      },
      {
        name: 'Sacred Chaos',
        description: 'The ability to introduce exactly the right disruption at the right moment to unlock what could not otherwise be reached.',
        tier: 'mastered',
      },
    ],
    weaknesses: [
      'Destruction without intention — the storm that doesn\'t know where it\'s going destroys indiscriminately',
      'Burning out — storms do not last forever, and you forget this until it\'s too late',
      'Scattering yourself across too many simultaneous disruptions',
    ],
    traits: [
      'Feels most alive in intense, high-stakes situations',
      'Has a history of transforming environments simply by being present in them',
      'Generates creative output in bursts of extraordinary productivity',
      'Has at least one area of life that is currently in controlled chaos',
      'Attracts people who need to be shaken loose from something',
      'Has broken and rebuilt important things in their life multiple times',
    ],
    emotionalProfile: `Your emotional experience is intense and rapid — you feel things at full voltage. Joy that borders on ecstasy. Rage that requires every tool you have to direct rather than release. Love that is terrifying in its completeness. You move through emotional states faster than others, which can make you seem inconstant. You are not. You simply live in higher resolution.`,
    progressionPath: [
      { level: 1, title: 'The Raw Current', description: 'Learning to feel the difference between chaos and power.', unlocks: ['Grounding ritual', 'Containment practice'] },
      { level: 5, title: 'The Directed Lightning', description: 'You have learned to aim.', unlocks: ['Intentional disruption', 'Crisis navigation ritual'] },
      { level: 10, title: 'The Storm Sovereign', description: 'You know when to release and when to hold.', unlocks: ['Sacred chaos practice', 'Pattern disruption mastery'] },
      { level: 20, title: 'The Eye of the Storm', description: 'You have found the stillness at the center of your own chaos.', unlocks: ['Evolution: Ashborn Monarch or Void Oracle'] },
    ],
    ritualRecommendations: ['thunder-meditation', 'release-practice', 'chaos-journaling', 'electrical-movement'],
    symbolicObjects: ['lightning-struck wood', 'iron sphere', 'charged water', 'storm-colored ink'],
    rareEvolution: {
      name: 'Void Oracle',
      triggerCondition: 'When the Storm Vessel discovers the silence inside the storm',
      description: 'The most rare evolution — the vessel who becomes the eye of their own storm, perceiving without disruption.',
    },
    powerWords: ['Intensity', 'Disruption', 'Electricity', 'Transformation', 'Power'],
  },

  'void-oracle': {
    key: 'void-oracle',
    name: 'Void Oracle',
    title: 'Perceiver Beyond the Veil',
    element: 'void',
    symbol: '◎',
    color: '#404060',
    glowColor: 'rgba(64, 64, 96, 0.35)',
    lore: `You have always felt slightly outside. Not excluded — outside. As if the world everyone else inhabits is a room you can see clearly through glass, and you are standing in a different kind of space entirely. This has been called many things: distance, detachment, coldness, wisdom. It is none of these entirely. It is the nature of the Void Oracle.

You do not perceive from inside the system. You perceive from the nothing that contains all systems. This is not a gift that was given — it emerged from a process of stripping away, layer by layer, everything that was not essential.`,
    loreDeep: `There is a freedom in the void that most people cannot tolerate. The absence of need. The absence of the stories that make suffering feel necessary. The Void Oracle has arrived — or is arriving — at a place where they can observe the human drama with love and without attachment. This is not coldness. It is the most rare form of clarity.

Your power is perception itself — unclouded by desire, fear, or the need to appear. You see what is. Not what should be. Not what was. Not what others want you to see. This makes you extraordinarily useful to those around you, and extraordinarily difficult to truly know.`,
    abilities: [
      {
        name: 'Unclouded Perception',
        description: 'The ability to see situations, people, and systems as they actually are — without the distortion of personal need or emotional charge.',
        tier: 'innate',
      },
      {
        name: 'Void Stillness',
        description: 'An internal silence that is not emptiness but presence — the capacity to be fully in the moment without agenda.',
        tier: 'innate',
      },
      {
        name: 'Mirror Consciousness',
        description: 'The ability to reflect back to others exactly what they are, without addition or subtraction — often more transformative than advice.',
        tier: 'awakened',
      },
      {
        name: 'Threshold Sight',
        description: 'The ability to perceive what exists between things — between words, between states, between the end of one chapter and the beginning of the next.',
        tier: 'awakened',
      },
      {
        name: 'The Null Point',
        description: 'Access to a state of pure awareness from which all other states can be generated consciously — the source beneath the source.',
        tier: 'mastered',
      },
    ],
    weaknesses: [
      'Complete detachment — the Oracle who loses their thread of connection becomes unable to transmit what they see',
      'The void can become isolation — not the productive kind',
      'Appearing inhuman to those who need warmth — the Oracle must remember to be present, not just perceiving',
    ],
    traits: [
      'Has a quality of stillness that unsettles people who are uncomfortable with themselves',
      'Speaks rarely in groups — but what they say is remembered',
      'Has survived at least one complete identity dissolution',
      'Feels most at home in empty spaces, silence, the edge of sleep',
      'Has little attachment to personal narratives about themselves',
      'Attracts those who are at a threshold — about to become something else',
    ],
    emotionalProfile: `Your emotional experience is vast and largely invisible. You feel everything — at a depth and with a detachment that makes it difficult for others to read you. You can hold grief without being destroyed by it. You can experience joy without clinging to it. You are learning, if you have not learned already, that this capacity is not coldness — it is the rarest form of love.`,
    progressionPath: [
      { level: 1, title: 'The Liminal One', description: 'Standing between worlds, learning to move.', unlocks: ['Void meditation', 'Threshold awareness'] },
      { level: 5, title: 'The Witness', description: 'You have learned to see without interference.', unlocks: ['Mirror practice', 'Pure perception ritual'] },
      { level: 10, title: 'The Oracle', description: 'Your perception has become a tool you offer freely.', unlocks: ['Threshold sight practice', 'Teaching from void'] },
      { level: 20, title: 'The Null Point', description: 'You have found what exists before and after everything.', unlocks: ['Full oracle practice', 'The Unevolving — you have arrived'] },
    ],
    ritualRecommendations: ['void-meditation', 'silence-practice', 'threshold-sitting', 'mirror-work'],
    symbolicObjects: ['empty vessel', 'black mirror', 'clear water', 'ash'],
    rareEvolution: {
      name: 'The Unevolved',
      triggerCondition: 'The Void Oracle does not evolve. They arrive.',
      description: 'This is the terminal archetype. Those who reach true void oracle consciousness are no longer becoming — they simply are. This is rare beyond measure.',
    },
    powerWords: ['Perception', 'Stillness', 'Void', 'Clarity', 'Presence'],
  },

  'crimson-saint': {
    key: 'crimson-saint',
    name: 'Crimson Saint',
    title: 'Bearer of the Sacred Wound',
    element: 'blood',
    symbol: '✦',
    color: '#9a1428',
    glowColor: 'rgba(154, 20, 40, 0.35)',
    lore: `You love at a frequency that terrifies you sometimes. Not because you are weak — because you are not. The love of the Crimson Saint is not soft or gentle. It is total, blood-warm, and structural. When you give it, you give it absolutely. This has cost you. This has also saved you.

The wound at the center of your archetype is sacred — not because suffering is good, but because the Crimson Saint has learned to transmute their suffering into something that serves. Into art. Into devotion. Into the act of holding space for another person's pain and refusing to look away.`,
    loreDeep: `There is a reason crimson is both the color of blood and the color of sacred robes. The Crimson Saint lives at this intersection: the utterly human and the mysteriously divine. You have felt things so deeply that they restructured you. You have loved things that left you undone. And from that undoing, you built something that matters.

Your power is not despite your wounds — it is from them. The alchemical truth of the Crimson Saint: the deepest suffering, when neither suppressed nor indulged but transformed, becomes the most powerful medicine. You carry this medicine whether you know it or not. Others feel it when they are near you.`,
    abilities: [
      {
        name: 'Unconditional Depth',
        description: 'The capacity for love, devotion, and loyalty of extraordinary depth — the kind that changes the people who experience it.',
        tier: 'innate',
      },
      {
        name: 'Sacred Wound Alchemy',
        description: 'The ability to transform personal suffering into art, wisdom, devotion, or service — to extract meaning from pain.',
        tier: 'innate',
      },
      {
        name: 'Blood Loyalty',
        description: 'A loyalty so deep it functions as a superpower in relationships, causes, and creative work.',
        tier: 'awakened',
      },
      {
        name: 'Emotional Transmission',
        description: 'The ability to convey emotional truth so precisely that it moves others — through words, presence, or creative expression.',
        tier: 'awakened',
      },
      {
        name: 'Sanctified Grief',
        description: 'The mastered capacity to hold loss as sacred — to grieve fully and completely without being destroyed, and to carry the grief of others.',
        tier: 'mastered',
      },
    ],
    weaknesses: [
      'Burning yourself for those who cannot or will not receive what you give — the Saint without discernment sacrifices to absence',
      'Confusing suffering with depth — not all pain is sacred, and some of it simply needs to stop',
      'The martyr shadow — giving becomes performance of sacrifice',
    ],
    traits: [
      'Has a devotional quality — to people, causes, creative work, or belief',
      'Creates or appreciates art that most people find too intense or too raw',
      'Has at least one relationship or loss that fundamentally changed them',
      'Loves with a completeness that occasionally frightens the recipient',
      'Has a private practice of making meaning from their suffering',
      'Finds the sacred in what others dismiss as broken',
    ],
    emotionalProfile: `Your emotional life is liturgical — it has depth, ritual, and weight. You feel love as a practice, not just a state. You feel grief as a form of honoring. You feel anger as a signal of violated devotion. You are capable of a level of emotional commitment that most people only encounter once or twice in a lifetime, if at all.`,
    progressionPath: [
      { level: 1, title: 'The Wounded One', description: 'Learning that the wound does not define you — it equips you.', unlocks: ['Sacred wound ritual', 'Grief alchemy'] },
      { level: 5, title: 'The Devoted', description: 'Your devotion has found its true object.', unlocks: ['Blood loyalty practice', 'Emotional transmission ritual'] },
      { level: 10, title: 'The Crimson Saint', description: 'Your suffering has become your medicine.', unlocks: ['Sanctified grief practice', 'Teaching from wound'] },
      { level: 20, title: 'The Sacred Martyr (Transcended)', description: 'You have learned to give without self-destruction.', unlocks: ['Evolution: Lunar Seer or full sainthood'] },
    ],
    ritualRecommendations: ['sacred-wound-writing', 'devotional-practice', 'grief-alchemy', 'blood-moon-meditation'],
    symbolicObjects: ['red candle', 'thorned rose', 'wound-colored ink', 'something given away'],
    rareEvolution: {
      name: 'Lunar Seer',
      triggerCondition: 'When the Saint stops bleeding for others and begins to illuminate for them instead',
      description: 'The Saint who learns discernment — who to give to, when to stop — becomes something prophetic.',
    },
    powerWords: ['Devotion', 'Wound', 'Sacred', 'Love', 'Transmutation'],
  },
}

export const ARCHETYPE_KEYS = Object.keys(ARCHETYPES) as string[]

export function getArchetype(key: string): Archetype | undefined {
  return ARCHETYPES[key]
}

export function scoreQuizAnswers(answers: Record<number, string>): string {
  const scores: Record<string, number> = {
    'shadow-scholar': 0,
    'lunar-seer': 0,
    'ashborn-monarch': 0,
    'silent-alchemist': 0,
    'storm-vessel': 0,
    'void-oracle': 0,
    'crimson-saint': 0,
  }

  const scoreMap: Record<string, Partial<Record<string, number>>> = {
    '1_A': { 'shadow-scholar': 2, 'void-oracle': 1 },
    '1_B': { 'lunar-seer': 2, 'silent-alchemist': 1 },
    '1_C': { 'ashborn-monarch': 2, 'storm-vessel': 1 },
    '1_D': { 'silent-alchemist': 2, 'void-oracle': 1 },
    '1_E': { 'storm-vessel': 2, 'ashborn-monarch': 1 },
    '1_F': { 'void-oracle': 2, 'shadow-scholar': 1 },
    '1_G': { 'crimson-saint': 2, 'lunar-seer': 1 },

    '2_A': { 'shadow-scholar': 2, 'void-oracle': 1 },
    '2_B': { 'lunar-seer': 2, 'crimson-saint': 1 },
    '2_C': { 'ashborn-monarch': 2, 'storm-vessel': 1 },
    '2_D': { 'silent-alchemist': 2, 'ashborn-monarch': 1 },
    '2_E': { 'storm-vessel': 2, 'ashborn-monarch': 1 },
    '2_F': { 'void-oracle': 2, 'silent-alchemist': 1 },
    '2_G': { 'crimson-saint': 2, 'lunar-seer': 1 },

    '3_A': { 'shadow-scholar': 2, 'void-oracle': 1 },
    '3_B': { 'lunar-seer': 2, 'crimson-saint': 1 },
    '3_C': { 'ashborn-monarch': 2, 'storm-vessel': 1 },
    '3_D': { 'silent-alchemist': 2 },
    '3_E': { 'storm-vessel': 2, 'ashborn-monarch': 1 },
    '3_F': { 'void-oracle': 2, 'shadow-scholar': 1 },
    '3_G': { 'crimson-saint': 2, 'lunar-seer': 1 },

    '4_A': { 'shadow-scholar': 2 },
    '4_B': { 'lunar-seer': 2, 'crimson-saint': 1 },
    '4_C': { 'ashborn-monarch': 2 },
    '4_D': { 'silent-alchemist': 2, 'ashborn-monarch': 1 },
    '4_E': { 'storm-vessel': 2 },
    '4_F': { 'void-oracle': 2, 'shadow-scholar': 1 },
    '4_G': { 'crimson-saint': 2 },

    '5_A': { 'shadow-scholar': 2 },
    '5_B': { 'lunar-seer': 2 },
    '5_C': { 'ashborn-monarch': 2 },
    '5_D': { 'silent-alchemist': 2 },
    '5_E': { 'storm-vessel': 2 },
    '5_F': { 'void-oracle': 2 },
    '5_G': { 'crimson-saint': 2 },

    '6_A': { 'shadow-scholar': 2, 'void-oracle': 1 },
    '6_B': { 'lunar-seer': 2 },
    '6_C': { 'ashborn-monarch': 2 },
    '6_D': { 'silent-alchemist': 2 },
    '6_E': { 'storm-vessel': 2 },
    '6_F': { 'void-oracle': 2 },
    '6_G': { 'crimson-saint': 2 },

    '7_A': { 'shadow-scholar': 2 },
    '7_B': { 'lunar-seer': 2 },
    '7_C': { 'ashborn-monarch': 2 },
    '7_D': { 'silent-alchemist': 2 },
    '7_E': { 'storm-vessel': 2 },
    '7_F': { 'void-oracle': 2 },
    '7_G': { 'crimson-saint': 2 },

    '8_A': { 'shadow-scholar': 2, 'void-oracle': 1 },
    '8_B': { 'lunar-seer': 2 },
    '8_C': { 'ashborn-monarch': 2, 'storm-vessel': 1 },
    '8_D': { 'silent-alchemist': 2 },
    '8_E': { 'storm-vessel': 2 },
    '8_F': { 'void-oracle': 2 },
    '8_G': { 'crimson-saint': 2, 'lunar-seer': 1 },

    '9_A': { 'shadow-scholar': 2 },
    '9_B': { 'lunar-seer': 2, 'crimson-saint': 1 },
    '9_C': { 'ashborn-monarch': 2 },
    '9_D': { 'silent-alchemist': 2 },
    '9_E': { 'storm-vessel': 2 },
    '9_F': { 'void-oracle': 2 },
    '9_G': { 'crimson-saint': 2 },

    '10_A': { 'shadow-scholar': 2, 'void-oracle': 1 },
    '10_B': { 'lunar-seer': 2, 'crimson-saint': 1 },
    '10_C': { 'ashborn-monarch': 2 },
    '10_D': { 'silent-alchemist': 2, 'ashborn-monarch': 1 },
    '10_E': { 'storm-vessel': 2 },
    '10_F': { 'void-oracle': 2, 'shadow-scholar': 1 },
    '10_G': { 'crimson-saint': 2, 'lunar-seer': 1 },
  }

  Object.entries(answers).forEach(([questionId, answerId]) => {
    const key = `${questionId}_${answerId}`
    const archetypePoints = scoreMap[key]
    if (archetypePoints) {
      Object.entries(archetypePoints).forEach(([archetype, points]) => {
        if (scores[archetype] !== undefined && points !== undefined) {
          scores[archetype] += points
        }
      })
    }
  })

  return Object.entries(scores).sort(([, a], [, b]) => b - a)[0][0]
}
