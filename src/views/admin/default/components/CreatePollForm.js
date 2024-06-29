import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Checkbox,
  VStack,
  HStack,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import Card from 'components/card/Card'; // Adjust the import path as needed

const CreatePollForm = ({ onCreatePoll }) => {
  const toast = useToast();

  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [duration, setDuration] = useState('');
  const [allowMultiple, setAllowMultiple] = useState(false);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleRemoveOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Wysyłanie zapytania do API bota Telegram za pomocą axios
      const response = await axios.post(
        `https://api.telegram.org/bot7107880418:AAGhelxZA92UuiQp2e55OYs5jXt_gF_2ekU/sendMessage`,
        {
          chat_id: '5855626746',
          text: `New Poll: ${question}\nOptions: ${options.join(', ')}\nDuration: ${duration} hours\nAllow multiple choices: ${allowMultiple}`,
        }
      );

      if (response.data.ok) {
        toast({
          title: 'Poll created successfully.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });

        const newPoll = {
          question,
          options,
          duration,
          allowMultiple,
        };

        // Przekaż nowo utworzone dane ankiety do komponentu nadrzędnego
        onCreatePoll(newPoll);
      } else {
        throw new Error('Failed to create poll.');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }

    // Resetowanie formularza po wysłaniu
    setQuestion('');
    setOptions(['', '']);
    setDuration('');
    setAllowMultiple(false);
  };

  return (
    <Card>
      <Box p={4}>
        <form onSubmit={handleSubmit}>
          <FormControl id="question" isRequired>
            <FormLabel>Question</FormLabel>
            <Textarea
              placeholder="Enter your question..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </FormControl>

          <FormControl id="options" mt={4} isRequired>
            <FormLabel>Options</FormLabel>
            <VStack spacing={2} align="start">
              {options.map((option, index) => (
                <HStack key={index}>
                  <Input
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                  />
                  <Button
                    size="sm"
                    colorScheme="red"
                    variant="ghost"
                    onClick={() => handleRemoveOption(index)}
                  >
                    Remove
                  </Button>
                </HStack>
              ))}
              <Button size="sm" onClick={handleAddOption}>
                Add Option
              </Button>
            </VStack>
          </FormControl>

          <FormControl id="duration" mt={4} isRequired>
            <FormLabel>Duration (in hours)</FormLabel>
            <Input
              type="number"
              placeholder="Enter duration..."
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </FormControl>

          <FormControl id="allowMultiple" mt={4}>
            <Checkbox
              isChecked={allowMultiple}
              onChange={(e) => setAllowMultiple(e.target.checked)}
            >
              Allow multiple choices
            </Checkbox>
          </FormControl>

          <Button mt={4} colorScheme="blue" type="submit">
            Create Poll
          </Button>
        </form>
      </Box>
    </Card>
  );
};

export default CreatePollForm;
