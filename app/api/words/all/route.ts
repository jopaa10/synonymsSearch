import { synonymsMap } from "@/lib/synonymsMap";
import { NextResponse } from "next/server";

//GET all words for dictionary
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
