import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

type LedgerChannel = {
  ID: string;
};

export type LedgerChannelListProps = {
  ledgerChannels: LedgerChannel[];
  focusedLedgerChannel: string;
  setFocusedLedgerChannel: (id: string) => void;
};

function formatId(id: string): string {
  return id.slice(0, 8);
}

function focusedIndex(id: string, ids: LedgerChannel[]): number {
  return ids.findIndex((c) => c.ID === id);
}

function handleChange(
  ledgerChannels: LedgerChannel[],
  setter: (id: string) => void
) {
  return (_: React.SyntheticEvent, newValue: number) => {
    setter(ledgerChannels[newValue].ID);
  };
}

export default function LedgerChannelList(props: LedgerChannelListProps) {
  return (
    <Tabs
      value={focusedIndex(props.focusedLedgerChannel, props.ledgerChannels)}
      onChange={handleChange(
        props.ledgerChannels,
        props.setFocusedLedgerChannel
      )}
    >
      {props.ledgerChannels.map((ledgerChannel) => (
        <Tab key={ledgerChannel.ID} label={formatId(ledgerChannel.ID)} />
      ))}
    </Tabs>
  );
}
