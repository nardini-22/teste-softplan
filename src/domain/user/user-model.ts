import { z } from 'zod'

export const userSchema = z.object({
	email: z.coerce
		.string({
			required_error: 'Esse campo não pode ficar vazio',
		})
		.email({ message: 'Insira um email válido' }),
	password: z.coerce
		.string({
			required_error: 'Esse campo não pode ficar vazio',
		})
		.min(6, 'Esse campo não pode ter menos que 6 caracteres'),
})

export type userSchemaType = z.infer<typeof userSchema>
