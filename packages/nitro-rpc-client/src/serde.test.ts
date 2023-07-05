import { getAndValidateResult } from "./serde";

const getLedgerChannelResponse = {
  jsonrpc: "2.0",
  id: 168513765,
  result: {
    ID: "0x586d127530f69177d790bb940eae132922e7648c29264648af5375de2c19e270",
    Status: "Open",
    Balance: {
      AssetAddress: "0x0000000000000000000000000000000000000000",
      Them: "0x111a00868581f73ab42feef67d235ca09ca1e8db",
      Me: "0xaaa6628ec44a8a742987ef3a114ddfe2d4f7adce",
      TheirBalance: "0xf368a",
      MyBalance: "0xf3686",
    },
  },
};

const validatedGetLedgerChannelResponse = {
  ID: "0x586d127530f69177d790bb940eae132922e7648c29264648af5375de2c19e270",
  Status: "Open",
  Balance: {
    AssetAddress: "0x0000000000000000000000000000000000000000",
    Them: "0x111a00868581f73ab42feef67d235ca09ca1e8db",
    Me: "0xaaa6628ec44a8a742987ef3a114ddfe2d4f7adce",
    TheirBalance: 997002n,
    MyBalance: 996998n,
  },
};

it("validate ledger details", () => {
  const validatedResponse = getAndValidateResult(
    getLedgerChannelResponse,
    "get_ledger_channel"
  );
  expect(validatedResponse).toEqual(validatedGetLedgerChannelResponse);
});
