import { faker } from '@faker-js/faker'
import Cookies from 'js-cookie'
import jwtEncode from 'jwt-encode'
import React from 'react'
import { type Mock, beforeEach, describe, expect, it, vi } from 'vitest'
import { MyAccountPage } from '../src/pages'
import makeSut from './make-sut'

vi.mock('js-cookie')

beforeEach(() => {
	vi.clearAllMocks()
})

describe('My account', () => {
	it('should render email ', () => {
		const jwtPayload = { email: faker.internet.email() }
		const jwt = jwtEncode(jwtPayload, 'token')
		;(Cookies.get as Mock).mockReturnValue(jwt)
		const { getByText } = makeSut(<MyAccountPage />)
		expect(getByText(jwtPayload.email)).toBeTruthy()
	})
})
