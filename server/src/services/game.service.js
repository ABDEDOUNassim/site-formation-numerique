import { Badge, CardQuestion, GameProgress, UserBadge } from "../models/index.js";
import { ApiError } from "../utils/ApiError.js";

export async function evaluateReflexAnswers(userId, answers) {
  const ids = answers.map((a) => a.questionId);
  const questions = await CardQuestion.findAll({ where: { id: ids } });
  const map = new Map(questions.map((q) => [q.id, q]));

  let score = 0;
  const details = answers.map((item) => {
    const q = map.get(item.questionId);
    if (!q) {
      throw new ApiError(400, `Question inconnue: ${item.questionId}`);
    }

    const isCorrect = q.correctOption === item.selectedOption;
    if (isCorrect) score += 1;

    return {
      questionId: q.id,
      isCorrect,
      explanation: q.explanation,
      correctOption: q.correctOption
    };
  });

  const percent = Math.round((score / answers.length) * 100);
  await saveProgress({ userId, gameKey: "reflex_cards", score: percent, progressPercent: percent });
  await tryUnlockBadge(userId, "reflex_start", "reflex_cards", percent >= 60);

  return { score, total: answers.length, percent, details };
}

export async function saveProgress({ userId, gameKey, score, progressPercent }) {
  const [progress] = await GameProgress.findOrCreate({
    where: { userId, gameKey },
    defaults: {
      userId,
      gameKey,
      attempts: 0,
      bestScore: score,
      lastScore: score,
      progressPercent,
      lastPlayedAt: new Date()
    }
  });

  progress.attempts += 1;
  progress.lastScore = score;
  progress.bestScore = Math.max(progress.bestScore, score);
  progress.progressPercent = progressPercent;
  progress.lastPlayedAt = new Date();
  await progress.save();

  return progress;
}

export async function getUserProgress(userId) {
  return GameProgress.findAll({ where: { userId }, order: [["updatedAt", "DESC"]] });
}

async function tryUnlockBadge(userId, code, sourceGameKey, condition) {
  if (!condition) return;
  const badge = await Badge.findOne({ where: { code, is_active: true } });
  if (!badge) return;

  await UserBadge.findOrCreate({
    where: { userId, badgeId: badge.id },
    defaults: { userId, badgeId: badge.id, sourceGameKey }
  });
}

export async function getUserBadges(userId) {
  return UserBadge.findAll({
    where: { userId },
    include: [{ model: Badge }],
    order: [["earnedAt", "DESC"]]
  });
}
