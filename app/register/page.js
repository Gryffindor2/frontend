'use client'
import { Flex, Box, Button, Text, Card, TextField, Link} from '@radix-ui/themes';

import { Hidable_spinner } from '../public/wait';
import { Message } from '../public/info';
import { useState } from 'react';
import axios from 'axios';


export default function Home() {
  const [username, set_username] = useState('');
  const [password, set_password] = useState('');
  const [repeat_password, set_repeat_password] = useState('');
  const [username_empty, set_username_empty] = useState(false);
  const [password_unsame, set_password_unsame] = useState(false);
  const [username_exist, set_username_exist] = useState(false);
  const [waiting_for_register, set_waiting_for_register] = useState(false);
  const [network_error, set_network_error] = useState(false);
  const [register_success, set_register_success] = useState(false);
  
  function username_changed(e) {
    var username = e.target.value;
    set_username(username);
    if(username != ''){
      set_username_empty(false);
    }
  }
  function password_changed(e) {
    var password = e.target.value;
    set_password(password);
    if(repeat_password!=password){
      set_password_unsame(true);
    }
    else{
      set_password_unsame(false);
    }
  }
  function repeat_password_changed(e) {
    var repeat_password = e.target.value;
    set_repeat_password(repeat_password);
    if(password!=repeat_password){
      set_password_unsame(true);
    }
    else{
      set_password_unsame(false);
    }
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
                <Text size='6' weight='bold'>注册</Text>
                <Text>用户名</Text>
                <TextField.Root onChange={username_changed} className='w-72' size="2"></TextField.Root>
                <Message message='用户名不可为空' visiblity={username_empty} color="red"></Message>
                <Message message='用户名已存在' visiblity={username_exist} color="red"></Message>
                <Text>密码</Text>
                <TextField.Root onChange={password_changed} className='w-72' size="2"/>
                <Text>重复密码</Text>
                <TextField.Root onChange={repeat_password_changed} className='w-72' size="2"/>
                <Message message='请输入相同的密码' visiblity={password_unsame} color='red'></Message>
                <Message message='网络错误' visiblity={network_error} color='red'></Message>
                <Message message='注册成功，即将跳转至登录页' visiblity={register_success} color='green'></Message>
                <Flex direction='row'>
                  <Box flexBasis='100%'></Box>
                  <Box flexShrink='0'><Link href='/login'>已有账户？登录</Link></Box>
                  
                </Flex>
                <Box className='h-2'></Box>
                <Flex direction='row' gap='2'>
                  <Box flexBasis='100%'></Box>
                  <Button size='3' onClick={
                    ()=>{
                      set_network_error(false);
                      if(password_unsame){
                        return;
                      }
                      if(username == ''){
                        set_username_empty(true);
                        return;
                      }
                      set_waiting_for_register(true);
                      const formData = new FormData();
                      formData.append('username', username);
                      formData.append('password', password);
                      axios.post('http://api.news-toolbox.secretqsan.top/register', formData)
                      .then((response)=>{
                        if(response.data.result == 0){
                          set_register_success(true);
                          set_username_exist(false);
                          setTimeout(()=>{
                            document.location.href = '/login';
                          }, 1500);
                        }
                        else{
                          set_username_exist(true);
                        }
                      }).catch((error)=>{
                        console.log(error);
                        set_network_error(true);
                      }).then(()=>{
                        set_waiting_for_register(false);
                      })
                      }}><Hidable_spinner waiting={waiting_for_register}/>创建账户</Button>
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
