import { SearchResult } from "../types";

/** Parse the response from the fetch query into something we can display */
export async function parseResponse(response: Response) {
  const json = (await response.json()) as
    | {
        data: {
          name: string;
          character: string;
        }[];
      }
    | { code: string; message: string };

  if (!response.ok || "message" in json) {
    throw new Error("message" in json ? json.message : response.statusText);
  }

  return json.data.map((result) => {
    return {
      name: result.name,
      character: result.character,
    } as SearchResult;
  });
}
