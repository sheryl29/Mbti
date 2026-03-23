export type PersonalityVisualTheme = "green" | "purple" | "yellow" | "blue";

export type OtherPatchMbtiCopy = {
  archetype: string;
  tagline: string;
  funFact: string;
  jobs: string;
  famous: string;
};

/** Map 4-letter type → same visual theme family as broad PersonalityResult. */
export function getMbtiVisualTheme(type: string): PersonalityVisualTheme {
  const purple = new Set(["INTJ", "INTP", "ENTJ", "ENTP"]);
  const yellow = new Set(["ISTP", "ISFP", "ESTP", "ESFP"]);
  const blue = new Set(["ISTJ", "ISFJ", "ESTJ", "ESFJ"]);
  const green = new Set(["INFJ", "INFP", "ENFJ", "ENFP"]);
  if (purple.has(type)) return "purple";
  if (yellow.has(type)) return "yellow";
  if (blue.has(type)) return "blue";
  if (green.has(type)) return "green";
  return "purple";
}

/**
 * Copy per MBTI type. INTJ matches the reference design; others are placeholders
 * you can replace when you have final descriptions.
 */
export const OTHER_PATCH_MBTI_COPY: Record<string, OtherPatchMbtiCopy> = {
  INTJ: {
    archetype: "ARCHITECT",
    tagline:
      "Strategic, independent thinkers who enjoy planning systems and solving complex problems",
    funFact:
      "Fun fact : INTJs often mentally map out future scenarios years ahead",
    jobs: "Job tendencies: Scientist, strategist, engineer, analyst, architect",
    famous: "Famous people: Elon Musk, Christopher Nolan",
  },
  INTP: {
    archetype: "LOGICIAN",
    tagline:
      "Curious and analytical personalities who love exploring theories and ideas",
    funFact:
      "Fun fact: INTPs can spend hours researching random topics purely out of curiosity",
    jobs: "Job tendencies: Researcher, programmer, mathematician, philosopher",
    famous: "Famous people: Albert Einstein, Bill Gates",
  },
  ENTJ: {
    archetype: "COMMANDER",
    tagline:
      "Confident leaders who enjoy organizing people and achieving ambitious goals",
    funFact:
      "Fun fact: ENTJs naturally take leadership roles even in casual group settings",
    jobs: "Job tendencies: CEO, entrepreneur, lawyer, manager",
    famous: "Famous people: Steve Jobs, Margaret Thatcher",
  },
  ENTP: {
    archetype: "DEBATER",
    tagline:
      "Energetic thinkers who enjoy exploring new ideas and challenging perspectives",
    funFact:
      "Fun fact: ENTPs sometimes debate just for fun, even when they agree with the other person",
    jobs: "Job tendencies: Entrepreneur, marketer, inventor, consultant",
    famous: "Famous people: Thomas Edison, Robert Downey Jr",
  },
  ISTP: {
    archetype: "VIRTUOSO",
    tagline:
      "Practical and independent personalities who enjoy solving real-world problems",
    funFact:
      "Fun fact: ISTPs often learn best through hands-on experiences",
    jobs: "Job tendencies: Mechanic, engineer, pilot, technician",
    famous: "Famous people: Clint Eastwood, Tom Cruise",
  },
  ISFP: {
    archetype: "ADVENTURER",
    tagline:
      "Gentle and artistic personalities who value freedom and creativity",
    funFact:
      "Fun fact: ISFPs often express themselves through fashion, art, or music",
    jobs: "Job tendencies: Designer, artist, musician, photographer",
    famous: "Famous people: Michael Jackson, Frida Kahlo",
  },
  ESTP: {
    archetype: "ENTREPRENEUR",
    tagline:
      "Bold, energetic personalities who love action and excitement",
    funFact:
      "Fun fact: ESTPs often thrive in fast-paced environments",
    jobs: "Job tendencies: Salesperson, entrepreneur, athlete",
    famous: "Famous people: Madonna, Ernest Hemingway",
  },
  ESFP: {
    archetype: "ENTERTAINER",
    tagline:
      "Spontaneous and lively personalities who enjoy entertaining and connecting with others",
    funFact:
      "Fun fact: ESFPs are often the life of the party.",
    jobs: "Job tendencies: Performer, entertainer, event host, influencer",
    famous: "Famous people: Elvis Presley, Jamie Foxx",
  },
  ISTJ: {
    archetype: "LOGISTICIAN",
    tagline:
      "Responsible and practical individuals who value structure and reliability",
    funFact:
      "Fun fact: ISTJs are known for being extremely dependable and organized",
    jobs: "Job tendencies: Accountant, engineer, military officer, auditor",
    famous: "Famous people: Angela Merkel, George Washington",
  },
  ISFJ: {
    archetype: "DEFENDER",
    tagline:
      "Caring and loyal personalities who enjoy supporting others quietly",
    funFact:
      "Fun fact: ISFJs often remember personal details about people",
    jobs: "Job tendencies: Nurse, teacher, social worker, administrator",
    famous: "Famous people: Beyoncé, Kate Middleton",
  },
  ESTJ: {
    archetype: "EXECUTIVE",
    tagline:
      "Organized leaders who like clear systems, rules, and efficiency",
    funFact:
      "Fun fact: ESTJs often become the person who organizes group plans",
    jobs: "Job tendencies: Manager, business executive, military leader",
    famous: "Famous people: Judge Judy, Frank Sinatra",
  },
  ESFJ: {
    archetype: "CONSUL",
    tagline:
      "Friendly and sociable personalities who enjoy helping people feel included",
    funFact:
      "Fun fact: ESFJs are often the social “connectors” in friend groups",
    jobs: "Job tendencies: Event planner, teacher, hospitality manager",
    famous: "Famous people: Taylor Swift, Jennifer Garner",
  },
  INFJ: {
    archetype: "ADVOCATE",
    tagline:
      "Thoughtful and idealistic people who want to help others",
    funFact:
      "Fun fact: One of the rarest personality types",
    jobs: "Job tendencies: Psychologist, counselor, writer",
    famous: "Famous people: Martin Luther King Jr., Lady Gaga",
  },
  INFP: {
    archetype: "MEDIATOR",
    tagline:
      "Quiet and creative individuals guided by strong values",
    funFact:
      "Fun fact: Often express themselves through art or writing",
    jobs: "Job tendencies: Author, artist, designer",
    famous: "Famous people: Johnny Depp, William Shakespeare",
  },
  ENFJ: {
    archetype: "PROTAGONIST",
    tagline:
      "Charismatic leaders who enjoy guiding and supporting others",
    funFact:
      "Fun fact: ENFJs are known for bringing people together and motivating their friends",
    jobs: "Job tendencies: Teacher, coach, public relations",
    famous: "Famous people: Barack Obama, Oprah Winfrey",
  },
  ENFP: {
    archetype: "CAMPAIGNER",
    tagline:
      "Energetic and creative personalities who love ideas and social connections",
    funFact:
      "Fun fact: ENFPs often turn everyday situations into exciting experiences",
    jobs: "Job tendencies: Journalist, marketer, actor",
    famous: "Famous people: Robin Williams, Ellen DeGeneres",
  },
};

export function getOtherPatchMbtiCopy(type: string): OtherPatchMbtiCopy {
  return (
    OTHER_PATCH_MBTI_COPY[type] ?? {
      archetype: "EXPLORER",
      tagline: "Your personalized summary for this type will go here.",
      funFact: "Fun fact : We’ll add your fun fact here soon.",
      jobs: "Job tendencies: Coming soon",
      famous: "Famous people: Coming soon",
    }
  );
}
