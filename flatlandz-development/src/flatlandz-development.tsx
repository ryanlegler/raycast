import { Action, ActionPanel, List, useNavigation } from "@raycast/api";
const scripts = {
  brendonFarrell: [
    {
      name: "Develop",
      value: "cd /Users/ryanlegler/projects/brendon-farrell && yarn gatsby develop",
    },
  ],
  emojiDog: [
    {
      name: "Frontend Dev",
      value: "cd /Users/ryanlegler/projects/emoji-dog && yarn dev",
    },
    {
      name: "API BUILD Dictionary",
      value: "cd /Users/ryanlegler/projects/emoji-dog && yarn api-build-dictionary",
    },
    // {
    //   name: "Frontend Dev",
    //   value: "cd /Users/ryanlegler/projects/emoji-dog && pnpm --filter frontend dev",
    // },
    // {
    //   name: "API BUILD",
    //   value: "cd /Users/ryanlegler/projects/emoji-dog && pnpm --filter emoji-api watch",
    // },
  ],
};

export default function ScriptManager() {
  const { push } = useNavigation();
  return (
    <List>
      {Object.keys(scripts).map((key) => (
        <List.Item
          key={key}
          title={key}
          actions={
            <ActionPanel>
              <Action title="Select" onAction={() => push(<Launch category={key as any} />)} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}

function Launch({ category }: { category: keyof typeof scripts }) {
  const project = scripts[category];
  return (
    <List>
      {project?.map((item) => (
        <List.Item
          key={item.name}
          title={item.name}
          
          actions={
            <ActionPanel title="Launch">
              {/* TODO Add preview launcher */}
              {/* TODO Add VSCode Launcher */}
              <Action.Paste title="Copy Pull Request Number" content={item.value} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
