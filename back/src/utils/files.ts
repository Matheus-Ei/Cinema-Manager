import path from "path";
import fs from "fs/promises";

interface UploadedFile {
  name: string;
  mv: (path: string) => Promise<void>;
}

interface SaveParams {
  type: string;
  table: string;
  id: string | number;
}

export class Files {
  static save = async (
    file: UploadedFile,
    params: SaveParams,
  ): Promise<string> => {
    if (!file || !file.mv) throw new Error("Invalid file object provided.");

    if (!params || !params.type || !params.table || !params.id)
      throw new Error("Invalid parameters provided.");

    try {
      const extension = path.extname(file.name);
      const relativeFilePath = path.join(
        "public",
        params.type,
        params.table,
        `${params.id}${extension}`,
      );

      const uploadPath = path.join(__dirname, "..", "..", relativeFilePath);

      const dirPath = path.dirname(uploadPath);
      await fs.mkdir(dirPath, { recursive: true });

      await file.mv(uploadPath);

      return relativeFilePath;
    } catch (error) {
      throw new Error(
        `Failed to save file: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  };

  static delete = async (relativeFilePath: string): Promise<void> => {
    if (!relativeFilePath) {
      throw new Error("Invalid relative file path provided.");
    }

    try {
      const absoluteFilePath = path.join(
        __dirname,
        "..",
        "..",
        relativeFilePath,
      );

      await fs.unlink(absoluteFilePath);
    } catch (error) {
      if (
        error instanceof Error &&
        (error as NodeJS.ErrnoException).code === "ENOENT"
      )
        return;
      throw new Error(
        `Failed to delete file: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  };
}
