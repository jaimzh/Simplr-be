# Simplr API – Text Simplification Backend

This is the backend API for the Simplr Chrome Extension. It provides an endpoint that simplifies complex or technical text using Cloudflare’s AI platform (LLaMA 3.1 model) and the Hono web framework.

**Frontend for Simplr Chrome Extension Repo:** [Simplr Frontend](https://github.com/jaimzh/Simplr-fe)

---

##  Endpoint

### `POST /simplify`

Simplifies user-provided text using an AI model hosted on Cloudflare.

#### Request
```json
{
  "text": "Input text to be simplified."
}
````

#### Response

```json
{
  "response": "Simplified version of the input text."
}
```

If the request is missing the `text` field, the server returns:

```json
{
  "error": "Text is required"
}
```

---

## Technology

* [Hono](https://hono.dev/) – Lightweight web framework for Cloudflare Workers
* [Cloudflare AI](https://developers.cloudflare.com/workers-ai/) – For LLM-powered text generation
* LLaMA 3.1 8B Instruct (fast) model

---

##  Deployment

This API is designed to run on [Cloudflare Workers](https://developers.cloudflare.com/workers/). You must have:

* A Cloudflare account
* Workers & AI enabled
* The environment variable `AI` configured in `wrangler.toml`

---

## 🔐 License

This project is licensed under the [MIT License](./LICENSE).

