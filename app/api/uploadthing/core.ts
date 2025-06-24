import { createUploadthing, type FileRouter } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("File uploaded", file);
      // You can store `file.url` in your DB here
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
