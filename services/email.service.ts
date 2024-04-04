import { sleep } from "../utils";

export type SendEmailParam = {
  email: string;
  html: string;
  text: string;
};
export const sendEmail = async (data: SendEmailParam) => {
  await sleep(1000);
  console.log(`Email send to : ${data.email}`);
};

export type SendEmailBulkParam = {
  emails: string[];
  html: string;
  text: string;
};
export const sendEmailBulk = async (data: SendEmailBulkParam) => {
  await Promise.allSettled(
    data.emails.map(async (e) => {
      await sleep(1000);
      console.log(`Email send to : ${e}`);
    })
  );
};
