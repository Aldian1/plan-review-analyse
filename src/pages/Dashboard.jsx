import { Box, Container, Heading, Tab, TabList, TabPanel, TabPanels, Tabs, VStack, FormControl, FormLabel, Textarea, Button, useToast } from "@chakra-ui/react";
import PlanTemplate from "../components/PlanTemplate.jsx";
import { useAddUserData, useUserData } from "../integrations/supabase/index.js";
import { useState, useEffect } from "react";
import { useSupabaseAuth } from "../integrations/supabase/auth.jsx";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../integrations/supabase/index.js';

const Dashboard = () => {
  const [plans, setPlans] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [planInput, setPlanInput] = useState("");
  const [reviewInput, setReviewInput] = useState("");

  const addUserData = useAddUserData();
  const { data: userData, isLoading } = useUserData();
  const { session } = useSupabaseAuth();
  const toast = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (userData && userData.length > 0) {
      const userPlans = userData.filter(item => item.user_id === session.user.id && item.user_data.type === "plan").map(item => item.user_data);
      const userReviews = userData.filter(item => item.user_id === session.user.id && item.user_data.type === "review").map(item => item.user_data);
      setPlans(userPlans);
      setReviews(userReviews);
    }
  }, [userData, session]);

  const handleAddPlan = async (newPlan) => {
    try {
      await addUserData.mutateAsync({ user_data: { ...newPlan, type: "plan" }, user_id: session.user.id });
      setPlans([...plans, newPlan]);
      
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

  const deletePlanMutation = useMutation(
    async (planId) => {
      const { error } = await supabase
        .from('user_data')
        .delete()
        .eq('id', planId);
      if (error) throw new Error(error.message);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('user_data');
        toast({
          title: 'Plan deleted.',
          description: 'Your plan has been deleted successfully.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      },
      onError: (error) => {
        toast({
          title: 'Error deleting plan.',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      },
    }
  );

  const handleDeletePlan = (planId) => {
    deletePlanMutation.mutate(planId);
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
              <PlanTemplate onSave={handleAddPlan} />
              <VStack mt={4} spacing={2} align="stretch">
                {plans.map((plan, index) => (
                  <Box key={index} p={4} borderWidth={1} borderRadius={8} boxShadow="sm">
                    <strong>{plan.date}</strong>
                    <p>{plan.text}</p>
                    <Button colorScheme="red" onClick={() => handleDeletePlan(plan.id)}>Delete</Button>
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