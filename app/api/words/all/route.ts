import { NextResponse } from "next/server";
import { synonymsMap } from "../route";

export async function GET() {
  const result = [];

  for (const [word, synonymsSet] of synonymsMap.entries()) {
    result.push({
      word,
      synonyms: Array.from(synonymsSet),
    });
  }

  return NextResponse.json({ words: result });
}
