import { render, screen } from '@testing-library/react'
import { UserDropDown } from './UserDropDown.jsx'
import { test } from 'vitest'
import userEvent from '@testing-library/user-event'

test('UserDropDown is rendering', async () => {
  const userEmail = 'user'
  const isAuthenticated = true

  const component = render(<UserDropDown userEmail={userEmail} isAuthenticated={isAuthenticated} />)
  console.log(component)
}
)

test('after clicking the div is toggled', async () => {
  const userEmail = 'user'
  const isAuthenticated = true
  const component = render(<UserDropDown userEmail={userEmail} isAuthenticated={isAuthenticated} />).container
  console.log({component})
  const user = userEvent.setup()
  const div = component.querySelector('.username')
  await user.click(div)

}
)