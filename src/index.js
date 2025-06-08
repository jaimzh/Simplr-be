import { Hono } from 'hono';
const app = new Hono();

app.use('*', async (c, next) => {
	c.header('Access-Control-Allow-Origin', '*');
	c.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
	c.header('Access-Control-Allow-Headers', 'Content-Type');
	if (c.req.method === 'OPTIONS') return c.body(null, 204);
	await next();
});

app.post('/simplify', async (c) => {
	const { text } = await c.req.json();
	if (!text) {
		return c.json({ error: 'Text is required' }, 400);
	}
	const prompt = `Simplify the following text:"${text}"`;
	const response = await c.env.AI.run('@cf/meta/llama-3.1-8b-instruct-fast', {
		messages: [
			{
				role: 'system',
				content: `You are a text simplification tool. Your job is to simplify complex or technical text into plain, easy-to-understand language.
					Instructions:
					- Respond ONLY with the simplified version.
					- Do NOT include phrases like "Here's the simplified text" or "Simplified version:".
					- Do NOT explain your reasoning.
					- Use short sentences and simple vocabulary.
					- Avoid any additional commentary or formatting.`,
			},
			{ role: 'user', content: prompt },
		],
	});
	return c.json(response);
});

export default app;
