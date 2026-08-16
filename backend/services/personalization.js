function normalizeValue(value) {
  return String(value || "")
    .trim()
    .toLowerCase();
}

function includesAny(text, candidates) {
  const normalizedText = normalizeValue(text);
  return candidates.some((candidate) =>
    normalizedText.includes(normalizeValue(candidate))
  );
}

function getQualificationTokens(qualification) {
  const normalized = normalizeValue(qualification);
  const tokens = normalized ? [normalized] : [];

  if (/(b\.?tech|be|engineering|engineer)/.test(normalized)) {
    tokens.push("engineering", "b.tech", "be", "diploma");
  }

  if (/(graduate|b\.a|b\.com|b\.sc|bachelor|degree)/.test(normalized)) {
    tokens.push("graduate", "degree", "bachelor");
  }

  if (/(12|intermediate|senior secondary)/.test(normalized)) {
    tokens.push("12th", "intermediate", "senior secondary");
  }

  if (/(10|matric)/.test(normalized)) {
    tokens.push("10th", "matric");
  }

  return [...new Set(tokens.filter(Boolean))];
}

export function personalizeJobs(jobs, user) {
  if (!user?.profile) {
    return jobs.map((job) => ({
      ...job,
      personalizationScore: 0,
      personalizationReasons: [],
    }));
  }

  const qualificationTokens = getQualificationTokens(
    user.profile.qualification
  );
  const state = normalizeValue(user.profile.state);
  const category = normalizeValue(user.profile.category);

  return jobs
    .map((job) => {
      let score = 0;
      const reasons = [];
      const qualificationText = (job.qualification || []).join(" ");
      const searchableText = [
        job.title,
        job.organization,
        job.shortInformation,
        qualificationText,
        ...(job.tags || []),
      ].join(" ");

      if (
        qualificationTokens.length > 0 &&
        includesAny(searchableText, qualificationTokens)
      ) {
        score += 5;
        reasons.push("Matches your qualification");
      }

      if (state && includesAny(searchableText, [state])) {
        score += 3;
        reasons.push("Mentions your preferred state");
      }

      if (category && includesAny(searchableText, [category])) {
        score += 2;
        reasons.push("Mentions your category");
      }

      if ((job.tags || []).length > 0) {
        score += 1;
      }

      return {
        ...job,
        personalizationScore: score,
        personalizationReasons: reasons,
      };
    })
    .sort((firstJob, secondJob) => {
      if (
        secondJob.personalizationScore !== firstJob.personalizationScore
      ) {
        return secondJob.personalizationScore - firstJob.personalizationScore;
      }

      return firstJob.title.localeCompare(secondJob.title);
    });
}
