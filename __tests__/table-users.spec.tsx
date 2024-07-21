import { render } from '@testing-library/react'
import React from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useFetchUsers } from '../src/hooks/useFetchUsers'
import { TableUsers } from '../src/pages/users/table-users'

const mocks = vi.hoisted(() => {
	return {
		useFetchUsers: vi.fn(),
	}
})

vi.mock('../src/hooks/useFetchUsers', () => {
	return {
		useFetchUsers: mocks.useFetchUsers,
	}
})

beforeEach(() => {
	mocks.useFetchUsers.mockImplementation(() => ({}))
})

describe('Table Users', () => {
	it('Should fetch users from API', () => {
		render(<TableUsers />)
		expect(useFetchUsers).toHaveBeenCalled()
	})

	it('should render loader if state = loading', () => {
		mocks.useFetchUsers.mockImplementation(() => ({
			isFetching: true,
		}))
		const { getByTestId } = render(<TableUsers />)
		expect(getByTestId('loader')).toBeTruthy()
	})
})
