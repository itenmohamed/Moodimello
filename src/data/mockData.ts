export const mockChildrenData = [
  {
    id: 'child-1',
    name: 'Emma',
    age: 8,
    avatar: 'https://www.pngitem.com/pimgs/m/581-5814816_riley-inside-out-characters-hd-png-download.png',
    totalSessions: 24,
    totalMinutes: 680,
    currentStreak: 5,
    overallProgress: 68,
    badges: 12,
    emotionData: [
      { emotion: 'Joy', count: 15, color: '#FCD34D' },
      { emotion: 'Sadness', count: 8, color: '#60A5FA' },
      { emotion: 'Anger', count: 5, color: '#F87171' },
      { emotion: 'Fear', count: 6, color: '#A78BFA' },
    ],
    focusData: [
      { day: 'Mon', attention: 65, impulseControl: 60 },
      { day: 'Tue', attention: 70, impulseControl: 68 },
      { day: 'Wed', attention: 72, impulseControl: 70 },
      { day: 'Thu', attention: 75, impulseControl: 73 },
      { day: 'Fri', attention: 78, impulseControl: 76 },
      { day: 'Sat', attention: 82, impulseControl: 80 },
      { day: 'Sun', attention: 85, impulseControl: 83 },
    ],
    weeklyReport: {
      summary: "Emma had a wonderful week! She's showing consistent improvement in recognizing and naming her emotions, especially during Joy-themed activities. Her attention scores have steadily increased, suggesting better focus during tasks. She particularly enjoyed the Breathing Dragon mini-game and used it independently when feeling frustrated.",
      highlights: [
        "Successfully completed all Joy World activities with high engagement",
        "Improved attention score by 20 points over the week",
        "Used calming strategies independently 3 times"
      ],
      concerns: [
        "Showed slight reluctance when entering Fear World - may need gentler introduction",
        "Attention tends to dip in late afternoon sessions"
      ],
      recommendations: [
        "Continue reinforcing breathing exercises during daily routines",
        "Try Fear World activities earlier in the day when energy is higher",
        "Celebrate her growing emotional vocabulary during conversations"
      ]
    },
    conversationPrompts: [
      {
        id: 'prompt-1',
        category: 'Joy',
        prompt: "What made you feel happiest when you were playing in Joy's World today?",
        context: "Emma completed Joy World activities 3 times this week"
      },
      {
        id: 'prompt-2',
        category: 'Sadness',
        prompt: "I noticed you spent some time in the Blue World. Can you tell me about what happened there?",
        context: "Emma engaged with Sadness content after school on Tuesday"
      },
      {
        id: 'prompt-3',
        category: 'General',
        prompt: "You've been using the breathing exercises a lot! When do you find them most helpful?",
        context: "Emma used Breathing Dragon independently 3 times"
      },
      {
        id: 'prompt-4',
        category: 'Fear',
        prompt: "Sometimes trying new things can feel a little scary. What's one thing that felt brave for you this week?",
        context: "Emma showed hesitation with Fear World activities"
      }
    ]
  },
  {
    id: 'child-2',
    name: 'Lucas',
    age: 10,
    avatar: 'https://t3.ftcdn.net/jpg/12/73/97/74/360_F_1273977489_BSi3GP9finxxEtiBFrP2cuvpuxdpWLxL.jpg',
    totalSessions: 18,
    totalMinutes: 520,
    currentStreak: 3,
    overallProgress: 52,
    badges: 8,
    emotionData: [
      { emotion: 'Joy', count: 10, color: '#FCD34D' },
      { emotion: 'Sadness', count: 4, color: '#60A5FA' },
      { emotion: 'Anger', count: 9, color: '#F87171' },
      { emotion: 'Fear', count: 5, color: '#A78BFA' },
    ],
    focusData: [
      { day: 'Mon', attention: 55, impulseControl: 50 },
      { day: 'Tue', attention: 58, impulseControl: 54 },
      { day: 'Wed', attention: 60, impulseControl: 57 },
      { day: 'Thu', attention: 62, impulseControl: 60 },
      { day: 'Fri', attention: 65, impulseControl: 62 },
      { day: 'Sat', attention: 68, impulseControl: 65 },
      { day: 'Sun', attention: 70, impulseControl: 68 },
    ],
    weeklyReport: {
      summary: "Lucas is making steady progress with impulse control and emotional regulation. He's particularly drawn to Anger World activities and has started recognizing his triggers better. The Go/No-Go Space Adventure game has been effective in building his attention skills, with noticeable improvement in his ability to pause before reacting.",
      highlights: [
        "Improved impulse control scores by 18 points",
        "Successfully identified 3 personal anger triggers",
        "Completed Space Adventure level 5 (requires sustained attention)"
      ],
      concerns: [
        "Still working on expressing sadness - tends to avoid Blue World",
        "Gets frustrated when games become challenging"
      ],
      recommendations: [
        "Praise his progress in recognizing anger triggers during real-life situations",
        "Gently introduce Sadness World through shorter, less intense activities",
        "Use 'challenge mode' as a reward to maintain motivation"
      ]
    },
    conversationPrompts: [
      {
        id: 'prompt-5',
        category: 'Anger',
        prompt: "You've been really great at noticing when you're starting to feel angry. What helps you most when that happens?",
        context: "Lucas identified 3 anger triggers this week"
      },
      {
        id: 'prompt-6',
        category: 'General',
        prompt: "I saw you reached level 5 in Space Adventure! That takes a lot of focus. How did you do it?",
        context: "Lucas achieved a new milestone in attention games"
      },
      {
        id: 'prompt-7',
        category: 'Sadness',
        prompt: "Everyone feels sad sometimes, even when things are going well. What does sadness feel like for you?",
        context: "Lucas has avoided Sadness World activities"
      }
    ]
  }
];
