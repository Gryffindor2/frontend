'use client'
import { 
  Box, 
  Flex, 
  Button, 
  TextArea,
  SegmentedControl,
  Card,
  Text,} from '@radix-ui/themes';
import { useState, useEffect } from 'react';
import axios from 'axios';

function ClassificationResult({result, message}) {
  if (result.length === 0) {
    return (
      <>
        <Box flexBasis='100%'></Box>
        <Flex direction='row'>
          <Box flexBasis='100%'></Box>
          <Box flexShrink='0'>
            <Text size="7" color='gray'>{message}</Text>
          </Box>
          <Box flexBasis='100%'></Box>
        </Flex>
        <Box flexBasis='100%'></Box>
      </>
    )
  }
  else{
    return (
      <>
      {Object.entries(result).map(([key, value]) => {
        return (
          <Card id='{key}' className={value>0.6?'bg-green-400':'bg-red-300'}>
            <Text size="7" color='gray'>{key}: </Text>
            <Text size="7" color='gray'>{value * 100}%</Text>
          </Card>
        )
          
      })}
      </>
    )
  }
}

function Body() {
  const [message, setMessage] = useState('未分类');
  const [newsText, setNewsText] = useState('');
  const [algorithm, setAlgorithm] = useState('a1');
  const [token, settoken] = useState('');
  const [result, setResult] = useState([]);
  useEffect(() => {
    settoken(localStorage.getItem("token"));
  })
  return (
      <Flex direction='row' className='m-1.5 h-full'>
        <Box flexBasis='100%'>
          <TextArea onChange={(e) => {
            var value = e.target.value;
            setNewsText(value);
          }
          } placeholder="在这里输入新闻文本" className='h-full'/>
        </Box>
        <Box className='w-2.5'>

        </Box>
        <Box flexBasis='100%'>
          <Flex className='h-full' direction='column'>
            <Flex direction='row'>
              <SegmentedControl.Root defaultValue="a1" onValueChange={(value) => {
                setAlgorithm(value);
              }}>
                <SegmentedControl.Item value="a1">算法1</SegmentedControl.Item>
                <SegmentedControl.Item value="a2">算法2</SegmentedControl.Item>
                <SegmentedControl.Item value="a3">算法3</SegmentedControl.Item>
              </SegmentedControl.Root>
              <Box flexBasis='100%'/>
              <Button onClick={() => {
                const formData = new FormData();
                formData.append('text', newsText);
                formData.append('algorithm', algorithm);
                formData.append('token', token);
                setMessage('分类中');
                setResult([]);
                axios.post('http://api.news-toolbox.secretqsan.top/classify', formData)
                .then((response) => {
                  if(response.data.auth == false){
                    window.location.href = "/login";
                  }
                  else{
                    setResult(response.data.result);
                  }
                })
                .catch((error) => {
                  console.log(error);
                  setMessage("网络错误");
                })
              }}
              >分类</Button>
            </Flex>

            <Card className='h-full mt-1 bg-gray-200'>
              <Flex direction='column' className='h-full' gap='2'>
                <ClassificationResult result={result} message={message}></ClassificationResult>
              </Flex>
            </Card>
          </Flex>
        </Box>
      </Flex>
  )
}

export default function Home() {
  return (
    <Body></Body>
  );
}
