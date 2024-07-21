import { faker } from '@faker-js/faker'
import { fireEvent, render, screen } from '@testing-library/react'
import Cookies from 'js-cookie'
import jwtEncode from 'jwt-encode'
import React from 'react'
import { type Mock, beforeEach, describe, expect, it, vi } from 'vitest'
import { useFetchUsers } from '../src/hooks/useFetchUsers'
import { TableUsers } from '../src/pages/users/table-users'
import makeSut from './make-sut'

vi.mock('../src/hooks/useFetchUsers', () => {
	return {
		useFetchUsers: mocks.useFetchUsers,
	}
})

vi.mock('js-cookie')

const mocks = vi.hoisted(() => {
	return {
		useFetchUsers: vi.fn(),
	}
})

beforeEach(() => {
	mocks.useFetchUsers.mockImplementation(() => ({}))
	vi.clearAllMocks()
})

describe('Table Users', () => {
	it('Should fetch users from API', () => {
		makeSut(<TableUsers />)
		expect(useFetchUsers).toHaveBeenCalled()
	})

	it('should render loader if state = loading', () => {
		mocks.useFetchUsers.mockImplementation(() => ({
			isFetching: true,
		}))
		const { getByTestId } = render(<TableUsers />)
		expect(getByTestId('loader')).toBeTruthy()
	})

	it('should render add user button if cookie role = admin', () => {
		;(Cookies.get as Mock).mockReturnValue(
			'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiIsImtpZCI6IjVhYjMyNmI2MzU5NTFiZTdkZGJmZDYxNThlMGYxMjI5In0.eyJyb2xlIjoiYWRtaW4iLCJleHAiOjE3MjE1MzM1MzEsImlhdCI6MTcyMTUzMzIzMX0.LTcfbnUjzcX7CpjZbIFea98hm_mjFdKadXUtJa5JlsC2tbNt-DABxOh7X4OOwYxAZuw2HOjewP_n5rZ22wNSXA',
		)
		const { getAllByText } = makeSut(<TableUsers />)
		expect(getAllByText('Adicionar usuário')).toBeTruthy()
	})

	it("shouldn't render add user button if cookie role = user", () => {
		;(Cookies.get as Mock).mockReturnValue(
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIyQHVzZXIuY29tIiwiaWF0IjoxNzIxNTMzNzE1LCJleHAiOjE3MjE1MzczMTUsInN1YiI6IjIiLCJyb2xlIjoidXNlciJ9.dMgYMfvPKFEBYAStUw9vKtnFwQ1AYStNCUYXb5WhFQU',
		)
		const { queryByText } = makeSut(<TableUsers />)
		expect(queryByText('Adicionar usuário'))
	})

	it("shouldn't render action column if email = jwt email", () => {
		const jwtPayload = { sub: 1, email: faker.internet.email(), role: 'admin' }
		const jwt = jwtEncode(jwtPayload, 'token')
		;(Cookies.get as Mock).mockReturnValue(jwt)
		mocks.useFetchUsers.mockImplementation(() => ({
			data: [
				{
					...jwtPayload,
					id: jwtPayload.sub,
				},
			],
		}))
		const { queryByTestId } = makeSut(<TableUsers />)
		expect(queryByTestId('action')).toBeFalsy()
	})
})

it('should render action column if email != jwt email', () => {
	const jwtPayload = { sub: 1, email: faker.internet.email(), role: 'admin' }
	const jwt = jwtEncode(jwtPayload, 'token')
	;(Cookies.get as Mock).mockReturnValue(jwt)
	mocks.useFetchUsers.mockImplementation(() => ({
		data: [
			{
				...jwtPayload,
				email: 'teste@teste.com',
				id: 2,
			},
		],
	}))
	const { queryByTestId } = makeSut(<TableUsers />)
	expect(queryByTestId('action')).toBeTruthy()
})

it('should render exact number of rows depending on page, due to pagination', () => {
	const createMockUser = () => {
		return {
			id: faker.number.int(),
			email: faker.internet.email(),
			role: faker.helpers.arrayElement(['admin', 'user']),
		}
	}
	const users = faker.helpers.multiple(createMockUser, {
		count: 6,
	})
	mocks.useFetchUsers.mockImplementation(() => ({
		data: users,
	}))
	const { getAllByTestId } = makeSut(<TableUsers />)
	expect(getAllByTestId('table-body-row')).toHaveLength(5)

	const paginationNextButton = screen.getByTestId('pagination-next-button')
	fireEvent.click(paginationNextButton)

	expect(getAllByTestId('table-body-row')).toHaveLength(1)
})
