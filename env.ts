import { z } from "zod";

const envSchema = z.object({
	DATABASE_URL: z.string().min(1, "Missing Database URL"),
	DATABASE_PASSWORD: z.string().min(1, "Missing Database Password"),
	DIRECT_URL: z.string().min(1, "Missing Direct URL"),
});

export const parsedEnv = envSchema.parse(process.env);
