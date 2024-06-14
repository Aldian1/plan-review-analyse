import { Box, Container, Heading, Tab, TabList, TabPanel, TabPanels, Tabs, VStack, FormControl, FormLabel, Textarea, Button, useToast } from "@chakra-ui/react";
import { useAddUserData, useUserData } from "../integrations/supabase/index.js";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const [plans, setPlans] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [planInput, setPlanInput] = useState("");
  const [reviewInput, setReviewInput] = useState("");

  const addUserData = useAddUserData();
  const { data: userData, isLoading } = useUserData();
  const toast = useToast();

  useEffect(() => {
    if (userData && userData.length > 0) {
      const userPlans = userData.filter(item => item.user_data.type === "plan").map(item => item.user_data);
      const userReviews = userData.filter(item => item.user_data.type === "review").map(item => item.user_data);
      setPlans(userPlans);
      setReviews(userReviews);
    }
  }, [userData]);

  const handleAddPlan = async () => {
    const newPlan = { text: planInput, date: new Date().toLocaleString(), type: "plan" };
    try {
      await addUserData.mutateAsync({ user_data: newPlan });
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
      await addUserData.mutateAsync({ user_data: newReview });
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

  return (
    <Container maxW="container.lg">
      <VStack spacing={4} align="stretch">
        <Heading>Dashboard</Heading>
        <Tabs variant="enclosed">
          <TabList>
            <Tab>Plan</Tab>
            <Tab>Review</Tab>
            <Tab>Analyse</Tab>
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
          </TabPanels>
        </Tabs>
      </VStack>
    </Container>
  );
};

export default Dashboard;