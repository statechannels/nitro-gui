import { EventEmitter } from "eventemitter3";

import {
  NotificationMethod,
  NotificationPayload,
  RequestMethod,
  RPCNotification,
  RPCRequestAndResponses,
} from "../types";

export { HttpTransport } from "./http";

export { NatsTransport } from "./nats";

/**
 * NotificationHandler is a function that takes a notification and does something with it.
 */
export type NotificationHandler<T extends RPCNotification> = (notif: T) => void;

/**
 * Transport is an interface for some kind of RPC transport.
 */
export type Transport = {
  Notifications: EventEmitter<NotificationMethod, NotificationPayload>;

  /**
   * Send the JSON-RPC request and returns the response.
   *
   * @param req - The request to send
   */
  sendRequest<K extends RequestMethod>(
    req: RPCRequestAndResponses[K][0]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<any>;

  Close(): Promise<void>;
};
