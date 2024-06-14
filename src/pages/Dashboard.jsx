import { Box, Container, Heading, Tab, TabList, TabPanel, TabPanels, Tabs, VStack, FormControl, FormLabel, Input, Button, Textarea } from "@chakra-ui/react";
import { useState } from "react";

const Dashboard = () => {
  const [plans, setPlans] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [planInput, setPlanInput] = useState("");
  const [reviewInput, setReviewInput] = useState("");

  const handleAddPlan = () => {
    setPlans([...plans, { text: planInput, date: new Date().toLocaleString() }]);
    setPlanInput("");
  };

  const handleAddReview = () => {
    setReviews([...reviews, { text: reviewInput, date: new Date().toLocaleString() }]);
    setReviewInput("");
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