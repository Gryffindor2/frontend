'use client'
import { Flex, Table, Button, Box, Text } from '@radix-ui/themes';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { Message } from '@/app/public/info';
import { Hidable_spinner } from '@/app/public/wait';

function PageButton({n_pages, current_page, setCurrentPage}){
  var range = []
  for(let i = 1; i <= n_pages; i++){
    range.push(i)
  }
  return (
    <>
      {Object.entries(range).map(([index, value]) => {
        if(value == current_page){
          return (
            <Button key={index} radius='full'>{value}</Button>
          ) 
        }
        else{
          return (
            <Button key={index} variant='outline' radius='full' onClick={() => {
                setCurrentPage(value)
              }
            }>{value}</Button>
          )
        }
      })}
    </>
  )
}

function HistoryArea({current_page, setHistoryWaiting, setNetworkError}){
  const [history_data, setHistoryData] = useState([]);
  useEffect(() => {
    setHistoryWaiting(true);
    var token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('token', token);
    formData.append('page', current_page);
    axios.post('http://api.news-toolbox.secretqsan.top/history', formData)
    .then((response) => {
      if(response.data.auth == false){
        window.location.href = "/login";
      }
      else{
        setHistoryData(response.data.history);
        console.log(response.data.history);
        setHistoryWaiting(false);
      }
    })
    .catch((error) => {
      setNetworkError(true);
      console.log(error);
    })
    .finally(() => {
      setHistoryWaiting(false);
    })
  }, [current_page])
  return (
    <>
      {Object.entries(history_data).map(([index, value]) => {
        return (
          <Table.Row key={index}>
            <Row input={value.input} type={value.type} output={value.output}/>
          </Table.Row>
        )
      })}

    </>
  )
}

function Row({input, type, output}){
  const [colapsed, setColapsed] = useState(true);
  return (
      <>
        <Table.RowHeaderCell>
          <Flex maxWidth="600px">
            <Text truncate={colapsed}>
              {input}
            </Text>
          </Flex>

        </Table.RowHeaderCell>
        <Table.Cell>{type==1?"分类":"未知"}</Table.Cell>
        <Table.Cell>
          <Flex maxWidth="200px">
            <Text truncate={colapsed}>
              {output}
            </Text>
          </Flex>  
        </Table.Cell>
        <Table.Cell>
          <Button onClick={() => {
            setColapsed(!colapsed)
          }}>{colapsed ? "展开" : "收起"}</Button>
        </Table.Cell>
      </>
  )
}

export default function Home() {
  const [history_waiting, setHistoryWaiting] = useState(true);
  const [n_pages, setNPages] = useState(1);
  const [current_page, setCurrentPage] = useState(1);
  const [network_error, setNetworkError] = useState(false);
  useEffect(() => {
    var token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('token', token);
    axios.post('http://api.news-toolbox.secretqsan.top/historynum', formData)
    .then((response) => {
      if(response.data.auth == false){
        window.location.href = "/login";
      }
      else{
        var n_history = response.data.num;
        if(n_history == 0){
          setNPages(1);
        }
        else{
          setNPages(Math.ceil(n_history/10));
        }
      }
    })
    .catch((error) => {
      setNetworkError(true);
      console.log(error);
    })
  }, [])
  return (
    <Flex direction='column' gap='2'>
      <Box className='mx-2'>
        <Message message={"网络错误"} color='red' visiblity={network_error} className='mx-2'/>
      </Box>
      
      <Table.Root variant='surface' className='mx-2'>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>输入</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>操作类型</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>输出</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>操作</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <HistoryArea current_page={current_page} setHistoryWaiting={setHistoryWaiting} setNetworkError={setNetworkError}/>
        </Table.Body>
      </Table.Root>

      <Flex className='mx-2' direction='row'>
        <Box flexBasis='100%'></Box>
        <Hidable_spinner waiting={history_waiting}></Hidable_spinner>
        <Box flexBasis='100%'></Box>
      </Flex>
      <Flex direction='row' gap='2'>
        <Box flexBasis='100%'></Box>
          <PageButton n_pages={n_pages} current_page={current_page} setCurrentPage={setCurrentPage}/>
        <Box flexBasis='100%'></Box>
      </Flex>
    </Flex>
  );
}
