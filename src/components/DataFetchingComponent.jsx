import React, { useState, useEffect } from "react";
import {
  // Importing necessary components from Material-UI
  Container,
  CssBaseline,
  Toolbar,
  AppBar,
  TextField,
  Typography,
  Card,
  CardContent,
} from "@mui/material";

// SearchBar component that takes user input and triggers a search
const SearchBar = ({ onSearch }) => {
  // State to keep track of the search term
  const [searchTerm, setSearchTerm] = useState("");

  // Function to handle search input changes
  const handleSearch = (event) => {
    // Update the search term state with the new value
    setSearchTerm(event.target.value);
    // Call the onSearch function passed as a prop with the new search term
    onSearch(event.target.value);
  };

  // Render a text field for the search bar
  return (
    <TextField
      className="search-bar"
      fullWidth
      label="Search Todos"
      variant="outlined"
      value={searchTerm}
      onChange={handleSearch}
    />
  );
};

// Main component that fetches data and displays it
const DataFetchingComponent = () => {
  // State to keep track of the fetched data and the filtered data for display
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  // Effect hook to fetch data on component mount
  useEffect(() => {
    // Async function to fetch data from the API
    const fetchData = async () => {
      // Fetching data from the JSONPlaceholder API
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );
      // Parsing the JSON response
      const jsonData = await response.json();
      // Setting the fetched data to state
      setData(jsonData);
      // Initially setting filtered data to all fetched data
      setFilteredData(jsonData);
    };

    // Calling the fetchData function
    fetchData();
  }, []);

  // Function to handle search functionality
  const handleSearch = (searchTerm) => {
    // Filtering the data based on the search term
    const filtered = data.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // Updating the filtered data state with the filtered results
    setFilteredData(filtered);
  };

  // Render the main component
  return (
    <div className="container-class">
      <Container>
        <CssBaseline />
        <AppBar position="static" sx={{ marginBottom: "2rem" }}>
          <Toolbar>
            <Typography variant="h6" align="center" style={{ width: "100%" }}>
              Todos List
            </Typography>
          </Toolbar>
        </AppBar>
        {/* Including the SearchBar component and passing the handleSearch function */}
        <SearchBar onSearch={handleSearch} />
        {/* Mapping over the filtered data to display each todo item */}
        {filteredData.map((item) => (
          <Card key={item.id} style={{ marginBottom: "1rem" }}>
            <CardContent>
              <Typography variant="h5" component="h2">
                {item.title}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Container>
    </div>
  );
};

// Exporting the DataFetchingComponent as the default export
export default DataFetchingComponent;
