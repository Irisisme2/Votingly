import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import Card from 'components/card/Card';
import BarChart from 'components/charts/BarChart';
import { MdBarChart } from 'react-icons/md';
import {
  barChartDataConsumption,
  barChartOptionsConsumption,
} from 'variables/charts';

const WeeklyRevenue = (props) => {
  const [createdPolls, setCreatedPolls] = useState([
    { id: 1, question: 'What is your favorite color?', options: ['Red', 'Blue', 'Green'], duration: '1 week', allowMultiple: false },
    { id: 2, question: 'How often do you exercise?', options: ['Every day', 'Once a week', 'Rarely'], duration: '2 weeks', allowMultiple: true },
  ]);
  const [participatedPolls, setParticipatedPolls] = useState([
    { id: 3, question: 'Favorite programming language?', options: ['JavaScript', 'Python', 'Java'], duration: '3 days', allowMultiple: false },
  ]);
  const [deletedPolls, setDeletedPolls] = useState([
    { id: 4, question: 'Best vacation destination?', options: ['Beach', 'Mountains', 'City'], duration: '1 month', allowMultiple: true },
  ]);

  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [duration, setDuration] = useState('');
  const [allowMultiple, setAllowMultiple] = useState(false);

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const iconColor = useColorModeValue('brand.500', 'white');
  const bgButton = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
  const bgHover = useColorModeValue({ bg: 'secondaryGray.400' }, { bg: 'whiteAlpha.50' });
  const bgFocus = useColorModeValue({ bg: 'secondaryGray.300' }, { bg: 'whiteAlpha.100' });

  const addCreatedPoll = (poll) => {
    setCreatedPolls([...createdPolls, poll]);
  };

  const addParticipatedPoll = (poll) => {
    setParticipatedPolls([...participatedPolls, poll]);
  };

  const addDeletedPoll = (poll) => {
    setDeletedPolls([...deletedPolls, poll]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPoll = { id: Math.random(), question, options, duration, allowMultiple };
    addCreatedPoll(newPoll);
    setQuestion('');
    setOptions(['', '']);
    setDuration('');
    setAllowMultiple(false);
  };

  return (
    <Card align='center' direction='column' w='100%' {...props}>
      <Flex align='center' w='100%' px='15px' py='10px'>
        <Text
          me='auto'
          color={textColor}
          fontSize='xl'
          fontWeight='700'
          lineHeight='100%'>
          Weekly Revenue
        </Text>
        <Button
          align='center'
          justifyContent='center'
          bg={bgButton}
          _hover={bgHover}
          _focus={bgFocus}
          _active={bgFocus}
          w='37px'
          h='37px'
          lineHeight='100%'
          borderRadius='10px'
          {...props}>
          <Icon as={MdBarChart} color={iconColor} w='24px' h='24px' />
        </Button>
      </Flex>

      <Box mt={8}>
        <Text fontWeight='bold' mb={2}>Created Polls:</Text>
        {createdPolls.map(poll => (
          <Box key={poll.id} p={2} mb={2} borderWidth='1px' borderRadius='md'>
            <Text>{poll.question}</Text>
            <Text>Options: {poll.options.join(', ')}</Text>
            <Text>Duration: {poll.duration}</Text>
            <Text>Allow multiple choices: {poll.allowMultiple ? 'Yes' : 'No'}</Text>
          </Box>
        ))}
      </Box>

      <Box mt={8}>
        <Text fontWeight='bold' mb={2}>Participated Polls:</Text>
        {participatedPolls.map(poll => (
          <Box key={poll.id} p={2} mb={2} borderWidth='1px' borderRadius='md'>
            <Text>{poll.question}</Text>
            <Text>Options: {poll.options.join(', ')}</Text>
            <Text>Duration: {poll.duration}</Text>
            <Text>Allow multiple choices: {poll.allowMultiple ? 'Yes' : 'No'}</Text>
          </Box>
        ))}
      </Box>

      <Box mt={8}>
        <Text fontWeight='bold' mb={2}>Deleted Polls:</Text>
        {deletedPolls.map(poll => (
          <Box key={poll.id} p={2} mb={2} borderWidth='1px' borderRadius='md'>
            <Text>{poll.question}</Text>
            <Text>Options: {poll.options.join(', ')}</Text>
            <Text>Duration: {poll.duration}</Text>
            <Text>Allow multiple choices: {poll.allowMultiple ? 'Yes' : 'No'}</Text>
          </Box>
        ))}
      </Box>
    </Card>
  );
};

export default WeeklyRevenue;
