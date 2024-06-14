import { Box, Container, Heading, Tab, TabList, TabPanel, TabPanels, Tabs, VStack, FormControl, FormLabel, Textarea, Button, Input, useToast } from "@chakra-ui/react";
import { useAddUserData, useUserData } from "../integrations/supabase/index.js";
import { useState, useEffect } from "react";
import { useSupabaseAuth } from "../integrations/supabase/auth.jsx";

const Dashboard = () => {
  const [plans, setPlans] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [planInput, setPlanInput] = useState("");
  const [reviewInput, setReviewInput] = useState("");
  const [objectives, setObjectives] = useState("");
  const [tasks, setTasks] = useState("");
  const [deadline, setDeadline] = useState("");
  const [progress, setProgress] = useState("");

  const addUserData = useAddUserData();
  const { data: userData, isLoading } = useUserData();
  const { session } = useSupabaseAuth();
  const toast = useToast();

  useEffect(() => {
    if (userData && userData.length > 0) {
      const userPlans = userData.filter(item => item.user_id === session.user.id && item.user_data.type === "plan").map(item => item.user_data);
      const userReviews = userData.filter(item => item.user_id === session.user.id && item.user_data.type === "review").map(item => item.user_data);
      setPlans(userPlans);
      setReviews(userReviews);
    }
  }, [userData, session]);

  const handleAddPlan = async () => {
    const newPlan = { text: planInput, date: new Date().toLocaleString(), type: "plan" };
    try {
      await addUserData.mutateAsync({ user_data: newPlan, user_id: session.user.id });
      setPlans([...plans, newPlan]);
      setPlanInput("");
      toast({
        title: "Plan added.",
        description: "Your plan has been added successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error adding plan.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleAddReview = async () => {
    const newReview = { text: reviewInput, date: new Date().toLocaleString(), type: "review" };
    try {
      await addUserData.mutateAsync({ user_data: newReview, user_id: session.user.id });
      setReviews([...reviews, newReview]);
      setReviewInput("");
      toast({
        title: "Review added.",
        description: "Your review has been added successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error adding review.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleCreatePlan = async () => {
    const newPlan = {
      objectives,
      tasks,
      deadline,
      progress,
      date: new Date().toLocaleString(),
      type: "plan"
    };
    try {
      await addUserData.mutateAsync({ user_data: newPlan, user_id: session.user.id });
      setPlans([...plans, newPlan]);
      setObjectives("");
      setTasks("");
      setDeadline("");
      setProgress("");
      toast({
        title: "Plan created.",
        description: "Your plan has been created successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error creating plan.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="container.lg">
      <VStack spacing={4} align="stretch">
        <Heading>Dashboard</Heading>
        <Tabs variant="enclosed">
          <TabList>
            <Tab>Plan</Tab>
            <Tab>Review</Tab>
            <Tab>Analyse</Tab>
            <Tab>Create Plan</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <FormControl>
                <FormLabel>New Plan</FormLabel>
                <Textarea value={planInput} onChange={(e) => setPlanInput(e.target.value)} />
                <Button mt={2} colorScheme="teal" onClick={handleAddPlan}>Add Plan</Button>
              </FormControl>
              <VStack mt={4} spacing={2} align="stretch">
                {plans.map((plan, index) => (
                  <Box key={index} p={4} borderWidth={1} borderRadius={8} boxShadow="sm">
                    <strong>{plan.date}</strong>
                    <p>{plan.text}</p>
                  </Box>
                ))}
              </VStack>
            </TabPanel>
            <TabPanel>
              <FormControl>
                <FormLabel>New Review</FormLabel>
                <Textarea value={reviewInput} onChange={(e) => setReviewInput(e.target.value)} />
                <Button mt={2} colorScheme="teal" onClick={handleAddReview}>Add Review</Button>
              </FormControl>
              <VStack mt={4} spacing={2} align="stretch">
                {reviews.map((review, index) => (
                  <Box key={index} p={4} borderWidth={1} borderRadius={8} boxShadow="sm">
                    <strong>{review.date}</strong>
                    <p>{review.text}</p>
                  </Box>
                ))}
              </VStack>
            </TabPanel>
            <TabPanel>
              <Heading size="md">Analysis Section</Heading>
              <p>Analysis content goes here...</p>
            </TabPanel>
            <TabPanel>
              <FormControl>
                <FormLabel>Objectives</FormLabel>
                <Textarea value={objectives} onChange={(e) => setObjectives(e.target.value)} />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Tasks</FormLabel>
                <Textarea value={tasks} onChange={(e) => setTasks(e.target.value)} />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Deadline</FormLabel>
                <Input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Progress</FormLabel>
                <Textarea value={progress} onChange={(e) => setProgress(e.target.value)} />
              </FormControl>
              <Button mt={4} colorScheme="teal" onClick={handleCreatePlan}>Create Plan</Button>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Container>
  );
};

export default Dashboard;