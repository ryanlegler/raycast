import { ActionPanel, Action, Grid } from "@raycast/api";
import { SearchResult } from "./types";

export function SearchGridItem({ searchResult, onPaste }: { searchResult: SearchResult; onPaste: () => void }) {
  return (
    <Grid.Item
      subtitle={searchResult.name}
      content={searchResult.character}
      actions={
        <ActionPanel>
          <Action.Paste onPaste={onPaste} title="Paste Emoji" content={searchResult.character} />
          <Action.CopyToClipboard
            title="emoji"
            content={searchResult.character}
            shortcut={{ modifiers: ["cmd"], key: "c" }}
          />
        </ActionPanel>
      }
    />
  );
}
