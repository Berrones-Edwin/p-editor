import SidebarWithHeader from './components/Sidebar'
import { Stack } from '@chakra-ui/react'
import PostCard from './components/PostCard'

function App () {
  return (
    <>
      <SidebarWithHeader>
      <Stack
        as="main"
        minH={'100vh'}
        direction={'row'}
        justifyContent={'center'}
        alignItems={'center'}

      >
        <PostCard />
      </Stack>
    </SidebarWithHeader>
    </>
  )
}

export default App
