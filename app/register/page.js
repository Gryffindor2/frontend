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
                <Text size='6' weight='bold'>注册</Text>
                <Text>用户名</Text>
                <TextField.Root className='w-72' size="2" />
                <Text>密码</Text>
                <TextField.Root className='w-72' size="2"/>
                <Text>重复密码</Text>
                <TextField.Root className='w-72' size="2"/>
                <Flex direction='row'>
                  <Box flexBasis='100%'></Box>
                  <Box flexShrink='0'><Link href='/login'>已有账户？登录</Link></Box>
                  
                </Flex>
                <Box className='h-2'></Box>
                <Flex direction='row' gap='2'>
                  <Box flexBasis='100%'></Box>
                  <Button size='3'>创建账户</Button>
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
