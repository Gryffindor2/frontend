"use client"
import { Flex, Box, Button, Text, Card, TextField, Link } from '@radix-ui/themes';
import { useState } from 'react';
import axios from 'axios';
import { Message } from '../public/info';
import { Hidable_spinner } from '../public/wait';

export default function Home() {
  const [username, set_username] = useState('');
  const [password, set_password] = useState('');
  const [login_failed, set_login_failed] = useState(false);
  const [network_error, set_network_error] = useState(false);
  const [waiting_for_login, set_waiting_for_login] = useState(false);

  function username_changed(e) {
    var username = e.target.value;
    set_username(username);
  }
  function password_changed(e) {
    var password = e.target.value;
    set_password(password);
  }
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
                    <TextField.Root onChange={username_changed} className='w-72' size="2" />
                    <Flex direction='row'>
                      <Box flexShrink='0'>
                        <Text>密码</Text>
                      </Box>
                      <Box flexBasis='100%'></Box>
                      <Box flexShrink='0'>
                        <Link href='/help'>忘记密码？</Link>
                      </Box>
                    </Flex>
                    <TextField.Root onChange={password_changed} className='w-72' size="2"/>
                    <Message visiblity={login_failed} color={'red'} message='用户名或密码错误'></Message>
                    <Message visiblity={network_error} color={'red'} message='网络错误'></Message>
                    <Box className='h-2'></Box>
                    <Flex direction='row' gap='2'>
                      <Box flexBasis='100%'></Box>
                      <Button onClick={()=>{window.location.href="/register";}} variant='outline' size='3'>注册</Button>
                      <Button size='3' onClick={()=>{
                        const formData = new FormData();
                        formData.append('username', username);
                        formData.append('password', password);
                        set_waiting_for_login(true);
                        set_network_error(false);
                        axios.post('http://api.news-toolbox.secretqsan.top/login', formData)
                        .then((response)=>{
                          console.log(response.data); 
                          if(response.data.tocken != ''){
                            localStorage.setItem("tocken", response.data.tocken);
                            window.location.href="/";
                            set_login_failed(false);
                          }
                          else{
                            set_login_failed(true);
                          }
                        }).catch((error)=>{
                          console.log(error);
                          set_network_error(true);
                        }).then(()=>{
                          set_waiting_for_login(false);
                        })
                        
                      }}><Hidable_spinner waiting={waiting_for_login}></Hidable_spinner>登录</Button>
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