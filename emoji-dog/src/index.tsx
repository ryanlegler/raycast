import { popToRoot, Grid } from "@raycast/api";
import { useFetch } from "@raycast/utils";
import { useState } from "react";
import { PARAMS, ROOT_URL } from "./constants";
import { SearchGridItem } from "./GridItem";
import { parseResponse } from "./utils/parseResponse";

export default function EmojiDog() {
  const [searchText, setSearchText] = useState("");

  const { data, isLoading } = useFetch(`${ROOT_URL}${searchText || ""}${PARAMS}`, {
    parseResponse,
  });

  return (
    <Grid
      isLoading={isLoading}
      onSearchTextChange={setSearchText}
      searchBarPlaceholder="Search for the best fit Emoji"
      throttle
    >
      <Grid.Section title="Results" subtitle={`${data?.length} Matching Emoji`}>
        {data?.map((searchResult) => (
          <SearchGridItem
            key={searchResult.name}
            searchResult={searchResult}
            onPaste={() => {
              setSearchText("");
              popToRoot({ clearSearchBar: true });
            }}
          />
        ))}
      </Grid.Section>
    </Grid>
  );
}
