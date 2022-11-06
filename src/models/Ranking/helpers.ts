export const GENRE = {
  unspecified: "unspecified",
  entertainment: "entertainment",
  music: "music",
  nature: "nature",
  society: "society",
  political_economy: "political_economy",
  animal: "animal",
  fashion: "fashion",
  lifestyle: "lifestyle",
  sport: "sport",
  vehicle: "vehicle",
  beauty_health: "beauty_health",
  family: "family",
  cooking: "cooking",
  gourmet: "gourmet",
  business: "business",
  it: "it",
  travel: "travel",
  education: "education",
} as const;
export type Genre = typeof GENRE[keyof typeof GENRE];

export const GENRES = [
  "unspecified",
  "entertainment",
  "music",
  "nature",
  "society",
  "political_economy",
  "animal",
  "fashion",
  "lifestyle",
  "sport",
  "vehicle",
  "beauty_health",
  "family",
  "cooking",
  "gourmet",
  "business",
  "it",
  "travel",
  "education",
] as const;
export type Genres = typeof GENRES[number];

export const GenreObjects = [
  { value: "unspecified", label: "指定なし" },
  { value: "entertainment", label: "エンタメ・趣味" },
  { value: "music", label: "音楽" },
  { value: "nature", label: "自然" },
  { value: "society", label: "社会・時事" },
  { value: "political_economy", label: "政治・経済" },
  { value: "animal", label: "動物" },
  { value: "fashion", label: "ファッション" },
  { value: "lifestyle", label: "ライフスタイル" },
  { value: "sport", label: "スポーツ" },
  { value: "vehicle", label: "乗り物" },
  { value: "beauty_health", label: "美容・健康" },
  { value: "family", label: "ファミリー・キッズ" },
  { value: "cooking", label: "料理" },
  { value: "gourmet", label: "グルメ" },
  { value: "business", label: "ビジネス・教養" },
  { value: "it", label: "IT" },
  { value: "travel", label: "旅行・お出かけ" },
  { value: "education", label: "教育" },
];

export function genreLabelFor(genre?: Genre) {
  switch (genre) {
    case "unspecified":
      return "指定なし";
    case "entertainment":
      return "エンタメ・趣味";
    case "music":
      return "音楽";
    case "nature":
      return "自然";
    case "society":
      return "社会・時事";
    case "political_economy":
      return "政治・経済";
    case "animal":
      return "動物";
    case "fashion":
      return "ファッション";
    case "lifestyle":
      return "ライフスタイル";
    case "sport":
      return "スポーツ";
    case "vehicle":
      return "乗り物";
    case "beauty_health":
      return "美容・健康";
    case "family":
      return "ファミリー・キッズ";
    case "cooking":
      return "料理";
    case "gourmet":
      return "グルメ";
    case "business":
      return "ビジネス・教養";
    case "it":
      return "IT";
    case "travel":
      return "旅行・お出かけ";
    case "education":
      return "教育";
    default:
      throw new Error("予期しない値です");
  }
}
