import React, { useState } from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';
import Card from 'components/card/Card'; // Adjust the import path as needed
import CreatePollForm from "views/admin/default/components/CreatePollForm";
const PollManagement = () => {
  const [createdPolls, setCreatedPolls] = useState([]);
  const [participatedPolls, setParticipatedPolls] = useState([]);
  const [deletedPolls, setDeletedPolls] = useState([]);

  const handleAddCreatedPoll = (poll) => {
    setCreatedPolls([...createdPolls, poll]);
  };

  return (
    <Box p={4}>
      <Card mb={4}>
        <Text fontSize='2xl' fontWeight='bold'>Create a New Poll</Text>
        <CreatePollForm onCreatePoll={handleAddCreatedPoll} />
      </Card>

      <Card mb={4}>
        <Text fontSize='2xl' fontWeight='bold'>Created Polls</Text>
        <VStack spacing={2} align='start'>
          {createdPolls.length > 0 ? (
            createdPolls.map((poll, index) => (
              <Box key={index} p={2} borderWidth='1px' borderRadius='md'>
                <Text fontWeight='bold'>{poll.question}</Text>
                <Text>Options: {poll.options.join(', ')}</Text>
                <Text>Duration: {poll.duration} hours</Text>
                <Text>Allow multiple choices: {poll.allowMultiple ? 'Yes' : 'No'}</Text>
              </Box>
            ))
          ) : (
            <Text>No created polls yet.</Text>
          )}
        </VStack>
      </Card>

      <Card mb={4}>
        <Text fontSize='2xl' fontWeight='bold'>Participated Polls</Text>
        <VStack spacing={2} align='start'>
          {participatedPolls.length > 0 ? (
            participatedPolls.map((poll, index) => (
              <Box key={index} p={2} borderWidth='1px' borderRadius='md'>
                <Text fontWeight='bold'>{poll.question}</Text>
                <Text>Options: {poll.options.join(', ')}</Text>
                <Text>Duration: {poll.duration} hours</Text>
                <Text>Allow multiple choices: {poll.allowMultiple ? 'Yes' : 'No'}</Text>
              </Box>
            ))
          ) : (
            <Text>No participated polls yet.</Text>
          )}
        </VStack>
      </Card>

      <Card>
        <Text fontSize='2xl' fontWeight='bold'>Deleted Polls</Text>
        <VStack spacing={2} align='start'>
          {deletedPolls.length > 0 ? (
            deletedPolls.map((poll, index) => (
              <Box key={index} p={2} borderWidth='1px' borderRadius='md'>
                <Text fontWeight='bold'>{poll.question}</Text>
                <Text>Options: {poll.options.join(', ')}</Text>
                <Text>Duration: {poll.duration} hours</Text>
                <Text>Allow multiple choices: {poll.allowMultiple ? 'Yes' : 'No'}</Text>
              </Box>
            ))
          ) : (
            <Text>No deleted polls yet.</Text>
          )}
        </VStack>
      </Card>
    </Box>
  );
};

export default PollManagement;
