"use client"
import { Flex, Box, Button, Text, Card, TextField, Link } from '@radix-ui/themes';
export default function Home() {
    return (
        <Flex direction='column' className='h-full'>
          <Box flexBasis='100%'></Box>
          <Box flexShrink='0'>
            <Flex direction='row'>
              <Box flexBasis='100%'></Box>
              <Box flexShrink='0'>
                <Card className='bg-gray-200'>
                  <Flex direction='column' gap='2' className='mx-8 my-5'>
                    <Text size='6' weight='bold'>登录</Text>
                    <Text>用户名</Text>
                    <TextField.Root className='w-72' size="2" />
                    <Flex direction='row'>
                      <Box flexShrink='0'>
                        <Text>密码</Text>
                      </Box>
                      <Box flexBasis='100%'></Box>
                      <Box flexShrink='0'>
                        <Link href='/help'>忘记密码？</Link>
                      </Box>
                    </Flex>
                    <TextField.Root className='w-72' size="2"/>
                    <Box className='h-2'></Box>
                    <Flex direction='row' gap='2'>
                      <Box flexBasis='100%'></Box>
                      <Button onClick={(envent)=>{window.location.href="/register";}} variant='outline' size='3'>注册</Button>
                      <Button size='3'>登录</Button>
                    </Flex>
                  </Flex>
                </Card>
              </Box>
              <Box flexBasis='100%'></Box>
            </Flex>
          </Box>
    
    
          <Box flexBasis='100%'></Box>
        </Flex>
      );
}