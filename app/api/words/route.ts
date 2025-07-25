import { synonymsMap } from "@/lib/synonymsMap";
import {
  addSynonym,
  handleTransitiveRule,
} from "@/utils/handleTranisitiveRule";
import { NextRequest, NextResponse } from "next/server";

/**
 * Add synonyms for a word.
 * Handles POST /api/words
 */
export async function POST(req: NextRequest) {
  const body = await req.json();

  const word: string = body.word?.toLowerCase();
  const synonyms: string[] = body.synonyms?.map((s: string) => s.toLowerCase());

  if (!word || !synonyms?.length) {
    return NextResponse.json(
      { success: false, error: "Invalid input." },
      { status: 400 }
    );
  }

  // Add relationships both ways
  for (const synonym of synonyms) {
    addSynonym(word, synonym);
    addSynonym(synonym, word);
  }

  // Optionally handle transitive synonyms
  handleTransitiveRule(word);

  return NextResponse.json({ success: true });
}

/**
 * Find synonyms for a given word.
 * Handles GET /api/words?query=...
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query")?.toLowerCase();

  if (!query) {
    return NextResponse.json(
      { error: "Query parameter is required." },
      { status: 400 }
    );
  }

  const visited = new Set<string>();
  const queue = [query];

  while (queue.length > 0) {
    const current = queue.shift()!;
    visited.add(current);

    const synonyms = synonymsMap.get(current);
    if (synonyms) {
      for (const syn of synonyms) {
        if (!visited.has(syn)) {
          queue.push(syn);
        }
      }
    }
  }

  const result = Array.from(visited).filter((w) => w !== query);

  return NextResponse.json({
    word: query,
    synonyms: result,
  });
}
