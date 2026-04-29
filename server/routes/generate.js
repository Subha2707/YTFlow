const express = require('express');
const Groq = require('groq-sdk');
const auth = require('../middleware/auth');
const router = express.Router();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// ---------- Helpers ----------
async function extractCoreTopic(rawInput) {
  try {
    const res = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [
        {
          role: 'system',
          content:
            'You extract the core YouTube niche topic from a user sentence. ' +
            'Strip ALL meta-instructions like "give me ideas for", "generate plans for", "suggest content about", "create a plan for", "what should I post about". ' +
            'Return ONLY the clean short topic phrase. No punctuation. No explanation. No quotes.',
        },
        { role: 'user', content: rawInput.trim() },
      ],
      temperature: 0,
      max_tokens: 50,
    });
    return res.choices[0]?.message?.content?.trim() || rawInput.trim();
  } catch {
    return rawInput.trim();
  }
}

function extractJSON(text) {
  try {
    const match = text.match(/\{[\s\S]*\}/);
    return match ? JSON.parse(match[0]) : null;
  } catch {
    return null;
  }
}

// Fallback for single idea generation (deterministic based on topic)
function buildSingleFallback(topic) {
  const t = topic.trim();
  const tLow = t.toLowerCase();
  const tTitle = t.replace(/\b\w/g, c => c.toUpperCase());
  const year = new Date().getFullYear();
  const hash = tLow.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);

  const shuffle = (arr, seed) => {
    const a = [...arr];
    let s = seed;
    const rand = () => { s = (s * 1664525 + 1013904223) & 0xffffffff; return (s >>> 0) / 0xffffffff; };
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  };

  const ideaPool = [
    `I did ${t} every single day for 30 days — here is what nobody tells you`,
    `The biggest lie people believe about ${t} and what is actually true`,
    `Watching the most viral ${t} videos so you do not have to`,
    `${tTitle} from scratch with zero experience — a full honest journey`,
    `The hidden side of ${t} that creators never talk about`,
    `I asked 100 strangers about ${t} and their answers shocked me`,
    `${tTitle} vs reality: what YouTube never shows you`,
    `Why most people quit ${t} in the first month and exactly how to avoid that`,
    `I spent a week studying the top ${t} creators — this is what separates them`,
    `Ranking every ${t} approach from absolute worst to best`,
    `What I wish someone had told me before starting ${t}`,
    `The ${t} advice that almost everyone gets completely wrong`,
    `I followed a ${t} expert for a week — here is what I actually learned`,
    `${tTitle} myths debunked: what the internet keeps getting wrong`,
    `The one thing holding most ${t} creators back and how to fix it`,
    `I tested the most controversial ${t} methods — here are the real results`,
    `What happens when a complete beginner tries ${t} for the very first time`,
    `How I went from zero to real results with ${t} in under 60 days`,
    `Behind the scenes of a successful ${t} creator — what they never post`,
    `The ${t} strategy that took me from stuck to growing fast`,
    `Reacting to the worst ${t} advice I have ever seen online`,
    `${tTitle} Q and A — answering the questions everyone is afraid to ask`,
    `The uncomfortable truth about making money through ${t}`,
    `I tried every popular ${t} method so you do not waste your time`,
    `${tTitle} for introverts — how to thrive without being loud or flashy`,
    `What the algorithm actually rewards in ${t} backed by real data`,
    `The ${t} blueprint I would follow if I had to start completely over today`,
    `Day in the life of someone genuinely crushing it at ${t}`,
    `${tTitle} — the beginner mistakes that kill growth before it even starts`,
    `How ${t} has changed in the last year and what it means for you right now`,
  ];

  const titlePool = [
    `The ${tTitle} Truth Nobody Wants to Hear`,
    `I Tried ${tTitle} for 30 Days (Honest Results)`,
    `Stop Getting ${tTitle} Wrong — Watch This First`,
    `${tTitle}: What They Do Not Show You Online`,
    `Is ${tTitle} Actually Worth It in ${year}?`,
    `The ${tTitle} Mistake That Changed Everything`,
    `How I Finally Figured Out ${tTitle} (No Fluff)`,
    `${tTitle} Ranked From Worst to Best`,
    `This ${tTitle} Strategy Changed My Results Overnight`,
    `I Tested Every ${tTitle} Method So You Do Not Have To`,
    `The Beginner's Honest Guide to ${tTitle}`,
    `Why Everything You Know About ${tTitle} Is Wrong`,
    `${tTitle} in ${year}: What Actually Works Now`,
    `I Went From Zero to Results With ${tTitle} — Here Is How`,
    `The ${tTitle} Secret Nobody Is Talking About`,
    `What I Wish I Knew Before Starting ${tTitle}`,
    `${tTitle} Exposed — The Raw Unfiltered Truth`,
    `Do This Every Day and ${tTitle} Gets Easy`,
    `The Fastest Way to See Results With ${tTitle}`,
    `${tTitle} Is Harder Than They Say (But Worth It)`,
    `I Asked Experts About ${tTitle} — Here Is What They Said`,
    `${tTitle} for Beginners: Skip the Mistakes I Made`,
    `The Only ${tTitle} Video You Will Ever Need`,
    `How Top Creators Approach ${tTitle} Differently`,
    `${tTitle} Myths That Are Holding You Back`,
    `Everything I Got Wrong About ${tTitle} (And What Fixed It)`,
    `${tTitle} in 7 Days — Real Progress, No Shortcuts`,
    `The ${tTitle} Playbook Nobody Is Sharing`,
    `Here Is Why Your ${tTitle} Is Not Working`,
    `${tTitle} Deep Dive — Everything You Need in One Video`,
  ];

  const tagPool = [
    tLow, `${tLow} tips`, `${tLow} for beginners`, `how to ${tLow}`, `${tLow} tutorial`, `best ${tLow}`,
    `${tLow} guide ${year}`, `${tLow} mistakes`, `${tLow} strategy`, `learn ${tLow}`, `${tLow} results`,
    `${tLow} secrets`, `${tLow} hacks`, `${tLow} explained`, `${tLow} advanced`, `${tLow} deep dive`,
    `${tLow} challenge`, `${tLow} from scratch`, `${tLow} motivation`, `${tLow} ideas`,
  ];

  const descPool = [
    `If you have been struggling with ${t}, this video is for you. I am skipping the recycled advice and sharing what I actually learned from doing it. The part most people skip is at the end — and it is the most important bit. Hit like if this helped and subscribe for more honest content about ${t}. Drop a comment with your biggest question right now.`,
    `Most ${t} content online skips the hard parts. Not this one. I walk you through everything — the wins, the failures, and what I would do differently. If you are serious about ${t}, bookmark this video. Subscribe to stay ahead and let me know in the comments where you are starting from.`,
    `${tTitle} does not have to be complicated — but most people make it harder than it needs to be. In this video I break down exactly what works and what does not. No sponsored opinions, no filler. Just real experience with ${t}. Like and subscribe if you want honest content like this every week.`,
    `Nobody talks about the real side of ${t}. I have been in the trenches, made the mistakes, and figured out what actually moves the needle. In this video I share it all — no gatekeeping. If this is the kind of honest ${t} content you have been looking for, hit subscribe and let's grow together.`,
  ];

  return {
    ideas: shuffle(ideaPool, hash).slice(0, 5),
    titles: shuffle(titlePool, hash).slice(0, 5),
    tags: shuffle(tagPool, hash).slice(0, 10),
    description: shuffle(descPool, hash)[0],
  };
}

function buildCalendarFallback(topic) {
  const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
  const formats = ['Tutorial','Vlog','Challenge','Review','Listicle','Q&A','Shorts'];
  const tagSets = [
    [topic.toLowerCase(), `${topic.toLowerCase()} tips`, 'how to', 'beginner guide', 'top ways'],
    [`${topic.toLowerCase()} results`, 'my experience', 'honest review', 'truth about', 'no filter'],
    [`${topic.toLowerCase()} mistakes`, 'what i learned', 'day in life', 'behind the scenes', 'raw footage'],
    [`${topic.toLowerCase()} secrets`, 'expert advice', 'pro tips', 'advanced guide', 'strategy'],
    [`${topic.toLowerCase()} challenge`, 'trying for 7 days', 'real results', 'what happened', 'honest'],
    [`${topic.toLowerCase()} q&a`, 'answering questions', 'live chat', 'community', 'ask me'],
    [`${topic.toLowerCase()} shorts`, 'viral clip', 'quick tip', '60 second guide', 'must watch'],
  ];
  const hash = topic.toLowerCase().split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const shuffle = (arr, seed) => {
    const a = [...arr];
    let s = seed;
    const rand = () => { s = (s * 1664525 + 1013904223) & 0xffffffff; return (s >>> 0) / 0xffffffff; };
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  };
  const t = topic.trim();
  return days.map((day, i) => {
    const idx = (hash + i) % formats.length;
    return {
      day,
      topic: t + (i === 0 ? ' – The Honest Start' : i === 1 ? ' – Behind the Scenes' : i === 2 ? ' – Testing the Hype' : i === 3 ? ' – Expert Breakdown' : i === 4 ? ' – Real Results' : i === 5 ? ' – Live Q&A' : ' – Quick Hit'),
      title: `${i+1}. ${t} ${['Secrets Nobody Talks About','Myths Busted','Step‑by‑Step Guide','Honest Review','7‑Day Experiment','Your Questions Answered','Fast Challenge'][i]}`,
      format: formats[idx],
      description: `Day ${i+1} of ${t}. We dive into something new and actionable. Don't miss the twist at the end. Hit subscribe for daily drops.`,
      tags: tagSets[i % tagSets.length],
      thumbnailConcept: i % 2 === 0 ? 'Shocked face + red arrow' : 'Calm thumb + neon text overlay',
    };
  });
}

// ---------- Route ----------
router.post('/', auth, async (req, res) => {
  const { topic: rawTopic, type } = req.body;
  if (!rawTopic) return res.status(400).json({ error: 'Topic is required' });

  const topic = await extractCoreTopic(rawTopic);

  // ---------- Calendar mode ----------
  if (type === 'calendar') {
    const calendarPrompt = `
Act as a senior YouTube content strategist and world-class social media marketer.
Your task is to create a **7‑day YouTube content calendar** for the niche: "${topic}".

Requirements:
- The calendar must cover one week (Monday to Sunday). Provide a plan for each day.
- For each day, generate:
  1. **Video Topic / Idea** – A clear, creative video concept that fits the niche.
  2. **Video Title** – SEO‑optimised, clickable, and different from any other day.
  3. **Format** – e.g., Tutorial, Vlog, Challenge, Review, Listicle, Behind‑the‑Scenes, Q&A, Reaction, Shorts / Vertical.
  4. **Description** – A short description (2-3 lines) that includes a hook, what the viewer will learn, and a natural call‑to‑action.
  5. **Tags** – 5 specific, niche‑relevant tags.
  6. **Thumbnail Concept** – A short idea for the thumbnail (text overlay, facial expression, props, colours) that would attract clicks.

- The tone and style should feel fresh, native to YouTube, and specific to the "${topic}" audience.
- Use very simple, commonly used English. No marketing fluff.

Return ONLY a raw JSON object (no Markdown) with the following structure:
{
  "calendar": [
    {
      "day": "Monday",
      "topic": "...",
      "title": "...",
      "format": "...",
      "description": "...",
      "tags": ["...","..."],
      "thumbnailConcept": "..."
    },
    ... (repeat for all 7 days)
  ]
}
`.trim();

    try {
      const completion = await groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: calendarPrompt }],
        temperature: 1.0,
        max_tokens: 1500,
      });
      const parsed = extractJSON(completion.choices[0]?.message?.content);
      if (parsed?.calendar && parsed.calendar.length === 7) {
        return res.json({ calendar: parsed.calendar, _resolvedTopic: topic });
      }
      throw new Error('Calendar parse failed');
    } catch (err) {
      console.error('Calendar generation failed, using fallback:', err);
      const fallbackCalendar = buildCalendarFallback(topic);
      return res.json({ calendar: fallbackCalendar, _resolvedTopic: topic });
    }
  }

  // ---------- Original single generation ----------
  try {
    const [ideasRes, titlesRes, tagsRes, descRes] = await Promise.all([
      groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: [{
          role: 'user',
          content: `You are a YouTube strategist. The niche is: "${topic}"

          Think deeply about who watches this content, what they care about, what they search for, what frustrates them, and what they celebrate. Consider the sub-communities, inside jokes, and recurring debates specific to this niche.

          Generate 5 video ideas that feel completely native to "${topic}". Each idea must:
          - Come from a genuinely different angle — pick angles that make sense for THIS niche, do not force generic formats
          - Use emotional hooks that resonate specifically with the "${topic}" audience
          - Sound like something a real creator in this exact space would make
          - Be distinct from each other in format and emotional tone

          Return ONLY this JSON with no extra text:
          { "ideas": ["...", "...", "...", "...", "..."] }`,
        }],
        temperature: 1.3,
        max_tokens: 500,
      }),
      groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: [{
          role: 'user',
          content: `You are a YouTube SEO expert. The niche is: "${topic}"

          Write 5 YouTube titles. Rules:
          - Each title must use a completely different structure — vary between bold claims, personal stories, questions, vs comparisons, number-based, and unexpected angles. Choose what fits naturally for "${topic}", do not force a structure.
          - Every title must feel written specifically for the "${topic}" audience — not interchangeable with a different niche
          - Be click-worthy without being misleading
          - Vary in length: some short and punchy (under 8 words), some longer and detailed
          - Do NOT repeat the same opening word or phrase across titles

          Return ONLY this JSON with no extra text:
          { "titles": ["...", "...", "...", "...", "..."] }`,
        }],
        temperature: 1.3,
        max_tokens: 400,
      }),
      groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: [{
          role: 'user',
          content: `You are a YouTube SEO specialist. The niche is: "${topic}"

          Generate exactly 10 tags that a real viewer would search for. Mix:
          - The exact niche keyword
          - Long-tail phrases specific to "${topic}" that real people type
          - Common questions the "${topic}" audience asks
          - Sub-topics and related terms unique to this niche
          - Trending search terms for this niche in ${new Date().getFullYear()}

          No generic tags like "youtube", "video", "viral", "content". Every tag must be meaningful for "${topic}" specifically.

          Return ONLY this JSON with no extra text:
          { "tags": ["...", "...", ...] }`,
        }],
        temperature: 1.1,
        max_tokens: 300,
      }),
      groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: [{
          role: 'user',
          content: `Write a YouTube video description for a video about "${topic}".

          Requirements:
          - Open with a hook that speaks directly to what the "${topic}" audience struggles with or deeply wants
          - Sound like it was written by a real human creator in this niche, not a marketing template
          - Be between 80 and 120 words
          - End with a call-to-action that feels natural and specific to the "${topic}" community — not just "like and subscribe"
          - Match the tone and culture of people who love "${topic}"

          Return ONLY this JSON with no extra text:
          { "description": "..." }`,
        }],
        temperature: 1.2,
        max_tokens: 300,
      }),
    ]);

    const ideas = extractJSON(ideasRes.choices[0]?.message?.content);
    const titles = extractJSON(titlesRes.choices[0]?.message?.content);
    const tags = extractJSON(tagsRes.choices[0]?.message?.content);
    const desc = extractJSON(descRes.choices[0]?.message?.content);

    if (!ideas?.ideas || !titles?.titles || !tags?.tags || !desc?.description) {
      throw new Error('One or more fields failed to parse — falling back');
    }

    return res.json({
      ideas: ideas.ideas,
      titles: titles.titles,
      tags: tags.tags,
      description: desc.description,
      _resolvedTopic: topic,
    });
  } catch (err) {
    console.error('Groq error — using dynamic fallback:', err.message);
    return res.json({
      ...buildSingleFallback(topic),
      _resolvedTopic: topic,
    });
  }
});

module.exports = router;