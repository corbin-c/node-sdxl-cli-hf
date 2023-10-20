# node-sdxl-cli-hf

CLI utility script to generate images using SDXL 1.0 model. It uses the [free inference API](https://huggingface.co/docs/api-inference/quicktour) from Hugging Face.

This is for demonstration and individual use only.

## Installation

```bash
git clone git@github.com:corbin-c/node-sdxl-cli-hf.git
cd node-sdxl-cli-hf
npm i
echo "your hugging face token" > .env
```

## Usage

Images will be saved in the `output` directory, along with a `prompts.txt` file keeping trace of your prompting history.

Simple prompting:

```bash
npm run start "your prompt goes here"
```

Using a negative prompt:

```bash
npm run start "your prompt goes here" "negative prompt here"
```
