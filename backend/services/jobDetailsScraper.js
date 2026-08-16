import axios from "axios";

const SECTION_HEADINGS = [
  "Important Dates",
  "Application Fee",
  "Age Limit",
  "Vacancy Details",
  "Eligibility",
  "Some Useful Important Links",
  "Official Website",
  "How to Fill",
  "Short Information",
];

function decodeHtml(value) {
  return value
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&#x2F;/gi, "/");
}

function stripHtml(html) {
  return decodeHtml(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/p>/gi, "\n")
      .replace(/<\/li>/gi, "\n")
      .replace(/<\/h[1-6]>/gi, "\n")
      .replace(/<[^>]+>/g, " ")
  )
    .replace(/\r/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{2,}/g, "\n")
    .trim();
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getSection(text, heading) {
  const startRegex = new RegExp(`${escapeRegex(heading)}\\s*`, "i");
  const startMatch = startRegex.exec(text);

  if (!startMatch) {
    return "";
  }

  const startIndex = startMatch.index + startMatch[0].length;
  const remaining = text.slice(startIndex);
  const otherHeadings = SECTION_HEADINGS.filter(
    (sectionHeading) => sectionHeading.toLowerCase() !== heading.toLowerCase()
  );

  let endIndex = remaining.length;

  for (const otherHeading of otherHeadings) {
    const endRegex = new RegExp(`\\n\\s*${escapeRegex(otherHeading)}\\s*`, "i");
    const endMatch = endRegex.exec(remaining);

    if (endMatch && endMatch.index < endIndex) {
      endIndex = endMatch.index;
    }
  }

  return remaining.slice(0, endIndex).trim();
}

function getBulletLines(sectionText) {
  return sectionText
    .split("\n")
    .map((line) => line.replace(/^[*\-\u2022]\s*/, "").trim())
    .filter(Boolean);
}

function findLine(lines, pattern) {
  return lines.find((line) => pattern.test(line)) || "";
}

function getFirstNumber(text) {
  const match = text.match(/\b\d[\d,]*\b/);
  return match ? match[0].replace(/,/g, "") : "";
}

function getAnchorMap(html) {
  const anchors = [
    ...html.matchAll(/<a[^>]+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi),
  ];

  return anchors.map(([, href, labelHtml]) => ({
    href: href.trim(),
    label: stripHtml(labelHtml).replace(/\s+/g, " ").trim(),
  }));
}

function pickLink(links, matcher) {
  return links.find(({ label }) => matcher.test(label))?.href || "";
}

function inferOrganization(title, shortInformation) {
  const sourceText = `${title}\n${shortInformation}`;
  const orgMatch = sourceText.match(
    /(Indian Railway|Railway Recruitment Board|State Bank of India|Union Public Service Commission|Staff Selection Commission|Bank of India|Indian Air Force|Bihar Police|UPSSSC|UPPSC|ISRO|DRDO|RRB|IBPS|SSC|UPSC|RBI|BSNL)/i
  );

  return orgMatch ? orgMatch[0] : "";
}

function collectTags(title, qualification, shortInformation) {
  const haystack = `${title} ${qualification.join(" ")} ${shortInformation}`.toLowerCase();
  const tagRules = [
    ["railway", /(railway|rrb|railways)/],
    ["banking", /(bank|ibps|rbi|sbi|boi|insurance)/],
    ["defence", /(air force|navy|army|agniveer|defence)/],
    ["teaching", /(teacher|lecturer|professor|tgt|pgt|education)/],
    ["engineering", /(engineer|engineering|b\.tech|be |diploma)/],
    ["graduate", /(bachelor|graduate|degree|b\.sc|b\.a|b\.com)/],
    ["10th-pass", /(10th|matric)/],
    ["12th-pass", /(12th|intermediate|senior secondary)/],
    ["iti", /\biti\b/],
    ["medical", /(nursing|medical|pharmacist|health)/],
  ];

  return tagRules
    .filter(([, pattern]) => pattern.test(haystack))
    .map(([tag]) => tag);
}

export async function scrapeJobDetails(url) {
  if (!url) {
    return {
      organization: "",
      postDate: "",
      shortInformation: "",
      importantDates: [],
      applicationFee: [],
      ageLimit: [],
      totalVacancies: "",
      qualification: [],
      officialWebsite: "",
      notificationLink: "",
      applyOnlineLink: "",
      tags: [],
      scrapedAt: null,
    };
  }

  const response = await axios.get(url, {
    timeout: 15000,
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
    },
  });

  const html = response.data;
  const text = stripHtml(html);
  const lines = text.split("\n").map((line) => line.trim()).filter(Boolean);
  const links = getAnchorMap(html);
  const importantDates = getBulletLines(getSection(text, "Important Dates"));
  const applicationFee = getBulletLines(getSection(text, "Application Fee"));
  const ageLimit = getBulletLines(getSection(text, "Age Limit"));
  const eligibilitySection =
    getSection(text, "Eligibility") || getSection(text, "Vacancy Details");
  const qualification = getBulletLines(eligibilitySection).filter((line) =>
    /(degree|b\.sc|bachelor|10th|12th|iti|diploma|graduate|qualification|certificate|engineering)/i.test(
      line
    )
  );
  const shortInformationMatch = text.match(
    /Short Information\s+([\s\S]*?)(?:\n\s*(?:Important Dates|Application Fee|Age Limit))/i
  );
  const shortInformation = shortInformationMatch
    ? shortInformationMatch[1].trim()
    : "";
  const vacancySection = getSection(text, "Vacancy Details");
  const totalVacancies =
    getFirstNumber(findLine(getBulletLines(vacancySection), /total/i)) ||
    getFirstNumber(vacancySection);
  const titleMatch = text.match(/Name Of Post\s*:?\s*([\s\S]*?)\n/i);
  const title = titleMatch ? titleMatch[1].trim() : "";
  const organization = inferOrganization(title, shortInformation);

  return {
    title,
    organization,
    postDate: findLine(lines, /Post Date/i).replace(
      /^Post Date\s*\/\s*Update\s*:?\s*/i,
      ""
    ),
    shortInformation,
    importantDates,
    applicationFee,
    ageLimit,
    totalVacancies,
    qualification,
    officialWebsite: pickLink(links, /official website/i),
    notificationLink: pickLink(links, /notification/i),
    applyOnlineLink: pickLink(links, /apply online/i),
    tags: collectTags(title, qualification, shortInformation),
    scrapedAt: new Date().toISOString(),
  };
}
