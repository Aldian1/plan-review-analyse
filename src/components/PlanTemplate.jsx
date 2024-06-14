import { Box, Button, FormControl, FormLabel, Input, Textarea, VStack } from "@chakra-ui/react";
import { useState } from "react";

const PlanTemplate = ({ onSave }) => {
  const [title, setTitle] = useState("");
  const [goals, setGoals] = useState("");
  const [tasks, setTasks] = useState("");
  const [deadlines, setDeadlines] = useState("");
  const [notes, setNotes] = useState("");

  const handleSave = () => {
    const newPlan = {
      title,
      goals,
      tasks,
      deadlines,
      notes,
    };
    onSave(newPlan);
  };

  return (
    <Box p={4} borderWidth={1} borderRadius={8} boxShadow="sm">
      <VStack spacing={4} align="stretch">
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Goals</FormLabel>
          <Textarea value={goals} onChange={(e) => setGoals(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Tasks</FormLabel>
          <Textarea value={tasks} onChange={(e) => setTasks(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Deadlines</FormLabel>
          <Textarea value={deadlines} onChange={(e) => setDeadlines(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Notes</FormLabel>
          <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
        </FormControl>
        <Button colorScheme="teal" onClick={handleSave}>Save Plan</Button>
      </VStack>
    </Box>
  );
};

export default PlanTemplate;