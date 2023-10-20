# node-sdxl-cli-hf

CLI utility script to generate images using [SDXL 1.0 model](https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0). It uses the [free inference API](https://huggingface.co/docs/api-inference/quicktour) from Hugging Face.

This is for demonstration and individual use only.

## Installation

```bash
git clone git@github.com:corbin-c/node-sdxl-cli-hf.git
cd node-sdxl-cli-hf
npm i
echo "HF_TOKEN=your hugging face token" > .env
```

## Usage

Images will be saved in the `output` directory, along with a `prompts.txt` file keeping trace of your prompting history.

Simple prompting:

```bash
npm run start "your prompt goes here"
```

Using a negative prompt with `-n`:

```bash
npm run start "your prompt goes here" -- -n "negative prompt here"
```

You can display the generated image after it's been saved using the `-x` option. Pass it the image viewer of your choice, for example [`imv`](https://sr.ht/~exec64/imv/):

```bash
npm run start "your prompt goes here" -- -n "negative prompt here" -x imv
```

## Screenshot

 ![screenshot of the script in use](./screenshot.jpg)
