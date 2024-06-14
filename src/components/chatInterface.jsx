// ChatInterface.js
import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Input,
  Button,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';

const ChatInterface = () => {
  const { toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue('gray.800', 'gray.800');
  const inputBgColor = useColorModeValue('gray.700', 'gray.700');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }]);
      setInput('');
      // Here you would typically also send the message to the backend or process it.
    }
  };

  return (
    <Box bg={bgColor} color="white" p={5} rounded="md" w="400px" h="500px">
      <VStack spacing={4} align="stretch" h="100%">
        <Box flex={1} overflowY="auto">
          {messages.map((msg, index) => (
            <HStack
              key={index}
              justify={msg.sender === 'user' ? 'flex-end' : 'flex-start'}
            >
              <Box
                bg={msg.sender === 'user' ? 'blue.500' : 'gray.600'}
                color="white"
                p={3}
                rounded="md"
                maxW="80%"
              >
                <Text>{msg.text}</Text>
              </Box>
            </HStack>
          ))}
        </Box>
        <HStack>
          <Input
            bg={inputBgColor}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            color="white"
          />
          <Button colorScheme="blue" onClick={handleSend}>
            Send
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default ChatInterface;