import "dotenv/config";

const query = (data: {
  inputs: string;
  parameters?: { negative_prompt?: string };
  options?: { use_cache?: boolean };
}): Promise<Blob> => {
  const model = "stabilityai/stable-diffusion-xl-base-1.0";
  return new Promise(async (resolve, reject) => {
    try {
      // @ts-ignore
      const response = await fetch(
        "https://api-inference.huggingface.co/models/" + model,
        {
          headers: {
            Authorization: "Bearer " + process.env.HF_TOKEN,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        throw new Error(
          "fetch error: " + response.status + " " + response.statusText
        );
      }
      const imageBlob = await response.blob();
      resolve(imageBlob);
    } catch (e) {
      console.error("Error while fetching model", e);
      console.error("next retry scheduled in 2 minutes");
      setTimeout(
        () => {
          reject("Model Query Error" + e);
        },
        2 * 1000 * 60
      );
    }
  });
};

const getImage = async (prompt: string, negativePrompt?: string) => {
  let results;
  const data = {
    inputs: prompt,
    parameters: {
      negative_prompt: negativePrompt,
    },
    options: {
      use_cache: false,
    },
  };
  try {
    results = await query(data);
  } catch (e) {
    console.error(e);
    console.error("retrying now");
    results = await query(data);
  }
  return results;
};

export { getImage };
