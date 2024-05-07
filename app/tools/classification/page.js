'use client'
import { Separator, 
  Box, 
  Flex, 
  Button, 
  Link, 
  DropdownMenu, 
  TextArea,
  SegmentedControl,
  Card,
  Text,
  Popover,Avatar} from '@radix-ui/themes';
import { logout } from '@/app/public/auth';
function UserAvatar(){
  return (
    <Avatar fallback='A' radius='full' size='2'/>
  )
}

function Head() {
  return (
    <Flex direction="row" align='end'className='m-1.5'>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant='solid'>
            工具
          <DropdownMenu.TriggerIcon />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item>新闻分类</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      <Box flexBasis='100%'></Box>
      <Box flexShrink='0'>
        <Link href='/history'>历史记录</Link>
      </Box>
      

      <Popover.Root>
        <Popover.Trigger>
          <Box className='ml-1.5'><UserAvatar/></Box>
        </Popover.Trigger>
        <Popover.Content>
          <Flex direction='column' gap='3'>
            <Box>
              <Flex direction='row' gap='5' align='end'>
                <UserAvatar/>
                <Text>Admin</Text>
              </Flex>
            </Box>
            <Box>
              <Flex direction='row'>
                <Box flexBasis='100%'></Box>
                <Button onClick={()=>{
                  logout();
                  window.location.href = '/'
                  }}>退出</Button>
              </Flex>
              
            </Box>
          </Flex>
        </Popover.Content>
      </Popover.Root>
    </Flex>
  )
}

function Info({value}) {
  return (
    <>
      <Box flexBasis='100%'></Box>
      <Flex direction='row'>
        <Box flexBasis='100%'></Box>
        <Box flexShrink='0'>

          <Text size="7" color='gray'>{value}</Text>
        </Box>
        <Box flexBasis='100%'></Box>
      </Flex>
      <Box flexBasis='100%'></Box>
    </>)
}

function Body() {
  return (
      <Flex direction='row' className='m-1.5 h-full'>
        <Box flexBasis='100%'>
          <TextArea placeholder="在这里输入新闻文本" className='h-full'/>
        </Box>
        <Box className='w-2.5'>

        </Box>
        <Box flexBasis='100%'>
          <Flex className='h-full' direction='column'>
            <Flex direction='row'>
              <SegmentedControl.Root defaultValue="inbox">
                <SegmentedControl.Item value="a1">算法1</SegmentedControl.Item>
                <SegmentedControl.Item value="a2">算法2</SegmentedControl.Item>
                <SegmentedControl.Item value="a3">算法3</SegmentedControl.Item>
              </SegmentedControl.Root>
              <Box flexBasis='100%'/>
              <Button>分类</Button>
            </Flex>

            <Card className='h-full mt-1 bg-gray-200'>
              <Flex direction='column' className='h-full'>
                <Info value={'未分类'}/>
              </Flex>
            </Card>
          </Flex>
        </Box>
      </Flex>
  )
}

export default function Home() {
  return (
    <Flex direction="column" className='h-full' >
      <Head />
      <Separator size="4" />
      <Body />
    </Flex>
  );
}
