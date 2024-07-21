import { z } from 'zod'

export interface UserDTO {
	email: string
	password: string
	role: string
	id: number
}

export type AddUserDto = Omit<UserDTO, 'id'>

export type EditUserDTO = Partial<UserDTO>

export type SignInDTO = Omit<UserDTO, 'role' | 'id'>

export const addUserSchema = z.object({
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
	role: z.coerce.string().min(4, 'Esse não pode ficar vazio'),
})

export const signInSchema = addUserSchema.omit({ role: true })

export const editUserSchema = addUserSchema.omit({ password: true })

export const changePasswordSchema = addUserSchema
	.pick({ password: true })
	.extend({
		confirm_password: z.coerce.string(),
	})
	.refine((data) => data.password === data.confirm_password, {
		path: ['confirm_password'],
		message: 'As senhas não são iguais',
	})

export type signInSchemaType = z.infer<typeof signInSchema>
export type addUserSchemaType = z.infer<typeof addUserSchema>
export type editUserSchemaType = z.infer<typeof editUserSchema>
export type changePasswordSchemaType = z.infer<typeof changePasswordSchema>
