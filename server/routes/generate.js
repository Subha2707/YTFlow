const express = require('express');
const Groq = require('groq-sdk');
const auth = require('../middleware/auth');
const router = express.Router();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Topic Extractor
async function extractCoreTopic(rawInput) {
  try {
    const res = await groq.chat.completions.create({
      model: 'mixtral-8x7b-32768',
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

// Safe JSON Extractor
function extractJSON(text) {
  try {
    const match = text.match(/\{[\s\S]*\}/);
    return match ? JSON.parse(match[0]) : null;
  } catch {
    return null;
  }
}

// Dynamic Fallback
function buildFallback(topic) {
  const t = topic.trim();
  const tLow = t.toLowerCase();
  const tTitle = t.replace(/\b\w/g, c => c.toUpperCase());
  const year = new Date().getFullYear();

  const hash = tLow.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);

  // Deterministic shuffle so same topic always gets same fallback, different topics get different picks
  const shuffle = (arr) => {
    const a = [...arr];
    let seed = hash;
    const rand = () => {
      seed = (seed * 1664525 + 1013904223) & 0xffffffff;
      return (seed >>> 0) / 0xffffffff;
    };
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  // 30-item Idea Pool
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

  // 30-item Title Pool
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

  // 40-item Tag Pool
  const tagPool = [
    tLow,
    `${tLow} tips`,
    `${tLow} for beginners`,
    `how to ${tLow}`,
    `${tLow} tutorial`,
    `best ${tLow}`,
    `${tLow} guide ${year}`,
    `${tLow} mistakes`,
    `${tLow} strategy`,
    `learn ${tLow}`,
    `${tLow} results`,
    `${tLow} secrets`,
    `${tLow} for intermediate`,
    `${tLow} tips and tricks`,
    `${tLow} step by step`,
    `${tLow} complete guide`,
    `${tLow} breakdown`,
    `${tLow} hacks`,
    `${tLow} basics`,
    `${tLow} advanced`,
    `${tLow} explained`,
    `${tLow} journey`,
    `start ${tLow}`,
    `${tLow} growth`,
    `${tLow} in ${year}`,
    `${tLow} for content creators`,
    `${tLow} challenge`,
    `${tLow} transformation`,
    `${tLow} from scratch`,
    `${tLow} experience`,
    `improve ${tLow}`,
    `${tLow} deep dive`,
    `${tLow} review`,
    `${tLow} truth`,
    `${tLow} motivation`,
    `${tLow} niche`,
    `${tLow} ideas`,
    `${tLow} planning`,
    `${tLow} workflow`,
    `${tLow} consistency`,
  ];

  // 12-item Description Pool
  const descPool = [
    `If you have been struggling with ${t}, this video is for you. I am skipping the recycled advice and sharing what I actually learned from doing it. The part most people skip is at the end — and it is the most important bit. Hit like if this helped and subscribe for more honest content about ${t}. Drop a comment with your biggest question right now.`,
    `Most ${t} content online skips the hard parts. Not this one. I walk you through everything — the wins, the failures, and what I would do differently. If you are serious about ${t}, bookmark this video. Subscribe to stay ahead and let me know in the comments where you are starting from.`,
    `${tTitle} does not have to be complicated — but most people make it harder than it needs to be. In this video I break down exactly what works and what does not. No sponsored opinions, no filler. Just real experience with ${t}. Like and subscribe if you want honest content like this every week.`,
    `Nobody talks about the real side of ${t}. I have been in the trenches, made the mistakes, and figured out what actually moves the needle. In this video I share it all — no gatekeeping. If this is the kind of honest ${t} content you have been looking for, hit subscribe and let's grow together.`,
    `You have probably seen a hundred ${t} videos that all say the same thing. This is not one of them. I tested the most popular approaches, tracked the results, and I am sharing everything — what worked, what flopped, and what I would do differently. Save this video because you will want to come back to it.`,
    `Starting with ${t} is overwhelming — I know because I was there. In this video I cut through the noise and give you only what matters. No fluff, no recycled tips from a Reddit thread. Just the stuff that made a real difference for me. Subscribe so you never miss an update as I document the whole journey.`,
    `What if everything you have been told about ${t} is slightly wrong? After months of experimenting I found a better way — and in this video I walk you through it step by step. Whether you are just starting with ${t} or have been at it for a while, there is something here for you. Comment your biggest struggle below.`,
    `I spent weeks researching the best way to approach ${t} so you do not have to. In this video I break down the exact framework I use, the mistakes I made early on, and the small changes that made the biggest difference. If ${t} is something you are serious about, this is the video to watch first.`,
    `${tTitle} looks easy from the outside. It is not — and anyone who says otherwise is selling something. I am here to give you the honest version: what it actually takes, what most guides leave out, and how to make real progress without burning out. Drop a comment if you want more real talk about ${t}.`,
    `The gap between people who succeed at ${t} and people who do not usually comes down to one or two key decisions. In this video I share what those are based on my own experience. If you are tired of generic ${t} advice that goes nowhere, this is the video you have been waiting for. Subscribe for more like this.`,
    `After everything I have tried with ${t}, here is my honest take: the basics matter more than any hack or shortcut. In this video I strip everything back and show you the fundamentals that actually compound over time. Less noise, more signal. If that sounds like what you need for ${t}, you are in the right place.`,
    `This video is for anyone who feels stuck with ${t}. I have been exactly where you are, and the thing that finally helped was not a new tool or strategy — it was a mindset shift. I break that down fully here. Let me know in the comments what part resonated most with you.`,
  ];

  return {
    ideas: shuffle(ideaPool).slice(0, 5),
    titles: shuffle(titlePool).slice(0, 5),
    tags: shuffle(tagPool).slice(0, 10),
    description: shuffle(descPool)[0],
  };
}

// Route
router.post('/', auth, async (req, res) => {
  const { topic: rawTopic } = req.body;
  if (!rawTopic) return res.status(400).json({ error: 'Topic is required' });

  const topic = await extractCoreTopic(rawTopic);

  try {
    const [ideasRes, titlesRes, tagsRes, descRes] = await Promise.all([

      groq.chat.completions.create({
        model: 'mixtral-8x7b-32768',
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
        model: 'mixtral-8x7b-32768',
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
        model: 'mixtral-8x7b-32768',
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
          { "tags": ["...", "...", "...", "...", "...", "...", "...", "...", "...", "..."] }`,
        }],
        temperature: 1.1,
        max_tokens: 300,
      }),

      groq.chat.completions.create({
        model: 'mixtral-8x7b-32768',
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
      ...buildFallback(topic),
      _resolvedTopic: topic,
    });
  }
});

module.exports = router;