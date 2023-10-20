import { execSync } from "child_process";
import { writeFileSync, readdirSync } from "fs";
import { getImage } from "./model";

(async () => {
  const folder = "./output/";
  const folderContent = readdirSync(folder);
  const prompt = process.argv[2];
  const negative = process.argv[3] || "";
  console.log("---- generating image ----");
  const imageFiles = folderContent.filter((file) => file.endsWith(".jpg"));
  const targetFileName =
    folder +
    (Math.max(0, ...imageFiles.map((e) => parseInt(e.split("_")[0]))) + 1) +
    ".jpg";
  const blob = await getImage(prompt, negative);
  const buffer = Buffer.from(await blob.arrayBuffer());
  writeFileSync(targetFileName, buffer);
  console.log("---- saved to " + targetFileName + " ----");
  const output = `file: ${targetFileName.split(folder)[1]}
  prompt: ${prompt}
  negative: ${negative}
____
`;
  writeFileSync(folder + "prompts.txt", output, {
    flag: "a",
    encoding: "utf-8",
  });
  execSync("imv " + targetFileName);
})();
