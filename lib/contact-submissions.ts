import { getMongoDb } from "@/lib/mongodb";

export type ContactSubmissionInput = {
  name: string;
  email: string;
  project: string;
  message: string;
};

function cleanString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function createContactSubmission(input: Partial<ContactSubmissionInput>) {
  const name = cleanString(input.name);
  const email = cleanString(input.email);
  const project = cleanString(input.project);
  const message = cleanString(input.message);

  if (!name || !email || !project || !message) {
    throw new Error("Name, email, project and message are required.");
  }

  const db = await getMongoDb();
  await db.collection("contactSubmissions").insertOne({
    name,
    email,
    project,
    message,
    createdAt: new Date()
  });
}
