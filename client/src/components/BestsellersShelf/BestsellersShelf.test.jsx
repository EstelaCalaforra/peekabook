import { render, screen } from '@testing-library/react'
import { BestsellersShelf } from './BestsellersShelf'
import { test } from 'vitest'
import userEvent from '@testing-library/user-event'

test('BestsellersShelf is rendering', async () => {
  const loadingBestsellersData = false
  const bestsellersData = [
    {
      book_image: 'https://storage.googleapis.com/du-prd/books/images/9780385550369.jpg',
      title: 'JAMES',
      buy_links: 
            [{
              'name': 'Amazon',
              'url': 'https://www.amazon.com/dp/0385550367?tag=thenewyorktim-20'
            }],
    }
  ]

  const component = render(<BestsellersShelf bestsellersData={bestsellersData} loadingBestsellersData={loadingBestsellersData} />)
  const element = component.getByText('Buy')
  expect(element).toBeDefined()
})

test('clicking the anchor redirects to buy link', async () => {
  const loadingBestsellersData = false
  const bestsellersData = [
    {
      book_image: 'https://storage.googleapis.com/du-prd/books/images/9780385550369.jpg',
      title: 'JAMES',
      buy_links: 
            [{
              'name': 'Amazon',
              'url': 'https://www.amazon.com/dp/0385550367?tag=thenewyorktim-20'
            }],
    }
  ]

  // const mockWindowOpen = vi.spyOn(window, 'open').mockImplementation(() => {})

  const component = render(<BestsellersShelf bestsellersData={bestsellersData} loadingBestsellersData={loadingBestsellersData} />)

  const anchor = component.getByText('Buy')
  expect(anchor).toHaveAttribute('href', 'https://www.amazon.com/dp/0385550367?tag=thenewyorktim-20')
}
)