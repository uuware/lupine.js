import { IncomingMessage } from 'http';
import { HostToPathProps } from './host-to-path-props';
import { JsonObject } from './json-object';
import { ISimpleStorage } from './simple-storage-props';
import { ParsedFormData } from '../lib/utils/form-data-parser';
export type SetCookieProps = {
  expireDays: number;
  path?: string;
  domain?: string;
  secure?: boolean;
  httpOnly?: boolean;
  Partitioned?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
};
export type LocalsProps = {
  uuid: string;
  host: string;
  url: string;
  hostPath: HostToPathProps;
  // urlSections: string[];
  query: URLSearchParams;
  urlWithoutQuery: string;
  urlParameters: ISimpleStorage;
  body: Buffer | undefined;
  json: () => JsonObject | undefined;
  text: () => Promise<string>;
  formData: () => Promise<ParsedFormData>;
  cookies: () => ISimpleStorage;
  setCookie: (name: string, value: string, options: SetCookieProps) => void;
  clearCookie: (name: string) => void;
  [key: string]: string | object | undefined | any;
};

export interface ServerRequest extends IncomingMessage {
  // This property is useful for exposing request-level information such as the request path name,
  // authenticated user, user settings, and so on to templates rendered within the application.
  locals: LocalsProps;
}
