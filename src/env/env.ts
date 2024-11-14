import 'dotenv/config'

import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'prod', 'test']).default('dev'),
  PORT: z.number().default(3333),
})

const _env = envSchema.parse(process.env)

export const env = _env
