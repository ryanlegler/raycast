import { Form, ActionPanel, Action, showToast, List, useNavigation, Detail, popToRoot, Clipboard } from "@raycast/api";

// https://conventionalcomments.org/
// https://developers.raycast.com/api-reference/user-interface

const labels = [
  {
    name: "👏 praise",
    value: "👏 praise",
    description:
      "Praises highlight something positive. Try to leave at least one of these comments per review. Do not leave false praise (which can actually be damaging). Do look for something to sincerely praise.",
  },
  {
    name: "⛏️ nitpick",
    value: "⛏️ nitpick",
    description: "Nitpicks are trivial preference-based requests. These should be non-blocking by nature.",
  },
  {
    name: "🤔 suggestion",
    value: "🤔 suggestion",
    description:
      "Suggestions propose improvements to the current subject. It's important to be explicit and clear on what is being suggested and why it is an improvement. Consider using patches and the blocking or non-blocking decorations to further communicate your intent.",
  },
  {
    name: "🚫 issue",
    value: "🚫 issue",
    description:
      "Issues highlight specific problems with the subject under review. These problems can be user-facing or behind the scenes. It is strongly recommended to pair this comment with a suggestion. If you are not sure if a problem exists or not, consider leaving a question.",
  },
  {
    name: "✅ todo",
    value: "✅ todo",
    description:
      "TODO's are small, trivial, but necessary changes. Distinguishing todo comments from issues: or suggestions: helps direct the reader's attention to comments requiring more involvement.",
  },
  {
    name: "❔ question",
    value: "❔ question",
    description:
      "Questions are appropriate if you have a potential concern but are not quite sure if it's relevant or not. Asking the author for clarification or investigation can lead to a quick resolution.",
  },
  {
    name: "💭 thought",
    value: "💭 thought",
    description:
      "Thoughts represent an idea that popped up from reviewing. These comments are non-blocking by nature, but they are extremely valuable and can lead to more focused initiatives and mentoring opportunities.",
  },
  {
    name: "🧹 chore",
    value: "🧹 chore",
    description:
      "Chores are simple tasks that must be done before the subject can be “officially” accepted. Usually, these comments reference some common process. Try to leave a link to the process description so that the reader knows how to resolve the chore.",
  },
];

const decorations = [
  {
    name: "N/A",
    value: "",
    description:
      "Without a decoration each comment the developer must defer to whether the organization consider comments blocking - this may not be known or explicitly defined to the developer so and explicit decoration is preferable.",
  },
  {
    name: "non-blocking",
    value: "non-blocking",
    description:
      "A comment with this decoration should not prevent the subject under review from being accepted. This is helpful for organizations that consider comments blocking by default.",
  },
  {
    name: "blocking",
    value: "blocking",
    description:
      "A comment with this decoration should prevent the subject under review from being accepted, until it is resolved. This is helpful for organizations that consider comments non-blocking by default.",
  },
  {
    name: "if-minor",
    value: "if-minor",
    description:
      "This decoration gives some freedom to the author that they should resolve the comment only if the changes ends up being minor or trivial.",
  },
];

// TODO - make a better version of this where we actually combine the steps and show a preview

export default function PickLabel() {
  const { push } = useNavigation();
  return (
    <List>
      {labels.map((label) => (
        <List.Item
          key={label.name}
          title={label.name}
          actions={
            <ActionPanel>
              <Action title="Select" onAction={() => push(<PickDecorations label={label} />)} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
function PickDecorations({ label }: any) {
  const { push } = useNavigation();
  return (
    <List>
      {decorations.map((decoration) => (
        <List.Item
          key={decoration.name}
          title={decoration.name}
          actions={
            <ActionPanel>
              <Action title="Select" onAction={() => push(<PickSubject label={label} decoration={decoration} />)} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}

type Values = {
  subject: string;
};

function PickSubject({ decoration, label }: any) {
  function handleSubmit(values: Values) {
    const resolvedDecoration = decoration.value ? ` (${decoration.value})` : "";
    Clipboard.paste(`**${label.value}${resolvedDecoration}:** ${values?.subject}`);
  }

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm onSubmit={(values: Values) => handleSubmit(values)} />
        </ActionPanel>
      }
    >
      <Form.Description text="This is the main message of the comment." />
      <Form.TextArea
        id="subject"
        title="Comment Message"
        placeholder="Enter a helpful comment message here"
        defaultValue=""
      />
    </Form>
  );
}
