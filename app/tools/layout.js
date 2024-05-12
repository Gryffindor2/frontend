'use client'
import { 
  Flex, 
  DropdownMenu, 
  Box, 
  Separator, 
  Button, 
  Link, 
  Text,
  Avatar,
  Popover} from "@radix-ui/themes";
import { logout } from '@/app/public/auth';
import { useEffect, useState } from "react";

function UserMenu({username, acro}){
  if(username == null){
    return (
      <> 
        <Box flexShrink='0'>
          <Button onClick={()=>{
            window.location.href = '/login';
          }} >登录</Button>
        </Box>
      </>)
  }
  else{
    return (
      <>
      
        <Box flexShrink='0'>
          <Link href='/tools/history'>历史记录</Link>
        </Box>
        <Popover.Root>
          <Popover.Trigger>
            <Box className="ml-1.5"><Avatar fallback={acro} radius='full' size='2'/></Box>
          </Popover.Trigger>
          <Popover.Content>
            <Flex direction='column' gap='3'>
              <Box>
                <Flex direction='row' gap='5' align='end'>
                  <Avatar fallback={acro} radius='full' size='2'/>
                  <Text>{username}</Text>
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
      </>
    )
  }
}

export default function LoginLayout({ children }) {
  const [username, setUsername] = useState('');
  const [acro, setAcro] = useState('');
  useEffect(()=>{
    setUsername(localStorage.getItem('username'));
    setAcro(username[0]);
  })
  return (
  <Flex direction="column" className='h-full' gap='2'>
    <Flex direction="row" align='end'className='mx-1.5 mt-1.5'>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant='solid'>
            工具
          <DropdownMenu.TriggerIcon />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item onClick={()=>{
            window.location.href = '/tools/classification'
          }}>新闻分类</DropdownMenu.Item>
          <DropdownMenu.Item>开发中...</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      <Box flexBasis='100%'></Box>
      <UserMenu username={username} acro={acro}/>
    </Flex>
    <Separator size="4" />
    <>{children}</>
  </Flex>
  )
}
