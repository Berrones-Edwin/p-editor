import SidebarWithHeader from './components/Sidebar'
import PostCard from './components/PostCard'
import NavBar from './components/NavBar'
import { useRef } from 'react'
import { Stack } from '@chakra-ui/react'

function App () {
  const postCard = useRef()

  return (
    <>

      <SidebarWithHeader>
        <NavBar postCard={postCard} />
        <Stack
          as="main"
          minH={'100vh'}
          minW={'100%'}
          direction={'row'}
          justifyContent={'center'}
          alignItems={'center'}

        >
          <PostCard postCard={postCard} />
        </Stack>
      </SidebarWithHeader>
    </>
  )
}

export default App
