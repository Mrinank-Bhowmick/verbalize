# Verbalize

A Chatbot-as-a-Service platform that allows users to create, deploy, and embed AI-powered chatbots on any website.

## Features

- Create and customize AI chatbots with custom system instructions
- Deploy chatbots with one click
- Embed chatbots on any website using a simple iframe code
- Real-time AI streaming responses powered by Google Gemini
- User authentication with Clerk
- Manage multiple chatbots from a centralized dashboard

## Tech Stack

### Frontend

- Next.js
- TypeScript
- Tailwind CSS
- Shadcn/ui components
- Clerk for authentication
- AI SDK for chat functionality

### Backend

- Hono.js (Cloudflare Workers)
- Drizzle ORM
- Cloudflare D1 (SQLite database)
- Google Gemini API

## Usage

1. Sign up and create an account
2. Navigate to the Agents Arena
3. Create a new chatbot agent
4. Configure the chatbot settings:
   - Name
   - Description
   - First message
   - System instructions (optional)
5. Click "Deploy" to make the chatbot live
6. Copy the embed code and paste it into your website

## Embedding the Chatbot

After deploying a chatbot, you'll receive an iframe embed code:

```html
<!-- Verbalize Chatbot Embed Code -->
<iframe 
  id="verbalize-chatbot-mrinank-1761511071866"
  src="https://verbalize.mrinank-ai.tech/chatbot?agentId=[your_agent_id]&clientId=[your_client_id]"
  style="position: fixed; bottom: 20px; right: 20px; width: 400px; height: 500px; border: none; z-index: 9999;"
  allow="clipboard-read; clipboard-write"
  sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
></iframe>
```

Paste this code before the closing `</body>` tag in your HTML.

## License

This project is licensed under the MIT License.

## Contact

Mrinank Bhowmick - [@Mrinank-Bhowmick](https://github.com/Mrinank-Bhowmick)
