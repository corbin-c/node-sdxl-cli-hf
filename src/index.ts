import { spawn } from "child_process";
import { writeFileSync, readdirSync } from "fs";
import { getImage } from "./model";

(async () => {
  const folder = "./output/";
  const folderContent = readdirSync(folder);
  const prompt = process.argv[2];
  if (!prompt?.length) {
    console.error("prompt is mandatory");
    process.exit(1);
  }
  const negative =
    process.argv.indexOf("-n") > 2
      ? process.argv[process.argv.indexOf("-n") + 1]
      : "";
  const exec =
    process.argv.indexOf("-x") > 2
      ? process.argv[process.argv.indexOf("-x") + 1]
      : "";
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
  `;
  console.log(output);
  writeFileSync(folder + "prompts.txt", output, {
    flag: "a",
    encoding: "utf-8",
  });
  if (exec.length) {
    console.log("---- opening image using " + exec + " ----");
    spawn(exec, [targetFileName]);
  }
  process.exit();
})();
