import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";

dotenv.config({path: "../../.env"});
console.log("MAILTRAP_TOKEN:", process.env.MAILTRAP_TOKEN); 

const TOKEN = process.env.MAILTRAP_TOKEN;

export const mailtrapClient = new MailtrapClient({
  token: TOKEN,
});

export const sender = {
  email: "hello@demomailtrap.co",
  name: "Mailtrap Test",
};