const mockResponses = [
  "Based on your productivity trends, I suggest focusing on deep work in the morning hours when your concentration peaks.",
  "Your completion rate has improved by 15% this week. Keep up the momentum by maintaining your current workflow.",
  "I notice you tend to be most productive on Thursdays. Consider scheduling important tasks for that day.",
  "Your focus sessions average 23 minutes. Try extending them gradually to 30 minutes for better flow states.",
  "Looking at your heatmap, weekends show lower activity. Consider scheduling light review tasks for weekends.",
  "Your task distribution shows 35% development work. Consider batching similar tasks to reduce context switching.",
  "Based on your daily logs, your mood correlates with productivity. Prioritize well-being for sustainable performance.",
  "You've maintained a 12-day activity streak! Consistency is the key to long-term productivity gains.",
  "I recommend the Pomodoro technique for your current project. Your data shows improved focus in 25-minute blocks.",
  "Your burnout risk is low at 32%. Maintain your current work-life balance to keep it that way.",
];

export const sendMessageToAI = async (message: string): Promise<string> => {
  return new Promise((resolve) => {
    const delay = 1000 + Math.random() * 1500;
    setTimeout(() => {
      // Pick a response that somewhat relates to keywords in the message
      const lower = message.toLowerCase();
      if (lower.includes('task') || lower.includes('todo')) {
        resolve("I see you have 15 pending tasks. Based on priority, I recommend focusing on 'Build authentication flow' first, followed by 'Implement user dashboard'. Breaking these into smaller subtasks could improve your completion rate by 20%.");
      } else if (lower.includes('focus') || lower.includes('timer')) {
        resolve("Your average focus session is 23 minutes. Research shows that gradually increasing to 45-minute sessions can boost deep work output by 35%. Try adding 5 minutes each week.");
      } else if (lower.includes('analytics') || lower.includes('data')) {
        resolve("Your productivity has trended upward 12% over the past month. Key drivers: consistent morning routines and reduced meeting time on Thursdays. I recommend protecting more deep work blocks.");
      } else {
        resolve(mockResponses[Math.floor(Math.random() * mockResponses.length)]);
      }
    }, delay);
  });
};
