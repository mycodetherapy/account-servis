import fs from "fs";

export const readAndConvertFileToBuffer = async (
  filePath: string
): Promise<Buffer> => {
  try {
    const fileData = await fs.promises.readFile(filePath);
    const buffer = Buffer.from(fileData);
    return buffer;
  } catch (error) {
    throw new Error(`Ошибка при чтении файла: ${""}`);
  }
};
