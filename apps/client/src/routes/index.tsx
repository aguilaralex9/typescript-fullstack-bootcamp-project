import { createFileRoute } from '@tanstack/react-router'
import SearchPage from '../components/SearchPage/SearchPage'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return <SearchPage />
}
