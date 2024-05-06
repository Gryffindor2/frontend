"use client"
import { Flex, Text} from '@radix-ui/themes';
export default function Home() {
  return (
    <Flex direction='column' className='h-full m-1'>
      <Text>
        FAQs
      </Text>
      <Text>
        1.How to reset my password?
      </Text>
      <Text>Please contact the admin.</Text>
    </Flex>
  );
}
