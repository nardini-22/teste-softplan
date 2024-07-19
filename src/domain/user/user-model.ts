import { z } from 'zod'

export interface User {
	email: string
	password: string
	role: string
}

export type EditUserType = Partial<User>

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

export const addUserSchema = loginSchema.extend({
	role: z.coerce.string().min(4, 'Esse não pode ficar vazio'),
})

export const editUserSchema = z.object({
	email: z.coerce
		.string({
			required_error: 'Esse campo não pode ficar vazio',
		})
		.email({ message: 'Insira um email válido' }),
	role: z.coerce.string().min(4, 'Esse não pode ficar vazio'),
})

export const changePasswordSchema = z
	.object({
		password: z.coerce
			.string({
				required_error: 'Esse campo não pode ficar vazio',
			})
			.min(6, 'Esse campo não pode ter menos que 6 caracteres'),
		confirm_password: z.coerce
			.string({
				required_error: 'Esse campo não pode ficar vazio',
			})
			.min(6, 'Esse campo não pode ter menos que 6 caracteres'),
	})
	.refine((data) => data.password === data.confirm_password, {
		path: ['confirm_password'],
		message: 'As senhas não são iguais',
	})

export type loginSchemaType = z.infer<typeof loginSchema>
export type addUserSchemaType = z.infer<typeof addUserSchema>
export type editUserSchemaType = z.infer<typeof editUserSchema>
export type changePasswordSchemaType = z.infer<typeof changePasswordSchema>
