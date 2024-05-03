export type Inputs = {
  method: string;
  url: string;
  body: any;
  headers: any;
  auth: any;
  example: string;
  exampleRequired: string
}

export type ResponseData = {
  status: number;
  size: string;
  time: string;
  response: any;
  headers: {};
  cookies: any;
}

export type RequestHeader = {
  [key: string]: string
}
