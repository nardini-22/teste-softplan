import { z } from 'zod'

export interface User {
	email: string
	password: string
	role: string
}

export type EditUser = Partial<User>

export type Login = Omit<User, 'role'>

export const loginSchema = z.object({
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

export const userSchema = loginSchema.extend({
	role: z.coerce.string().min(4, 'Esse não pode ficar vazio'),
})

export type loginSchemaType = z.infer<typeof loginSchema>
export type userSchemaType = z.infer<typeof userSchema>
