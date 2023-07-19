import React, { useEffect, useState } from "react";
import { Box,Grid, Tabs, Tab } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../../state";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import useMediaQuery from "@mui/material/useMediaQuery";
import Item from "../../components/Item";

const ItemList = () => {

const baseURL = process.env.REACT_APP_BASE_URL
  const items = useSelector((state) => state.cart.items);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortFilter, setSortFilter] = useState("");
  const [currentTab, setCurrentTab] = useState("all");
  const breakPoint = useMediaQuery("(min-width:600px)");
  const cookiesPerPage = 6;
  const pageNumbers = [];
  const dispatch = useDispatch();
  const handleChange = (event, newValue) => {
    setCurrentTab(newValue);
  };
  async function getItems() {
    const items = await fetch(
      baseURL+"items?populate=image&sort[0]=publishedAt%3Adesc",
      { method: "GET" }
    );
    const itemsJson = await items.json();
    dispatch(setItems(itemsJson.data));
  }
  // http://localhost:1337/api/recipes?populate=image
  // ?pagination[start]=0&pagination[limit]=10
  useEffect(() => {
    getItems();
// eslint-disable-line react-hooks/exhaustive-deps
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  for (let i = 1; i <= Math.ceil(totalItems / cookiesPerPage); i++) {
    pageNumbers.push(i);
  }
  const recipeData = React.useMemo(() => {
    let computedCookies = items;
    if (searchTerm) {
      computedCookies = computedCookies.filter((item) =>
        item.attributes.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (sortFilter === "newest") {
    }
    if (sortFilter === "oldest") {
    }
    if (currentTab === "all") {
      computedCookies = items;
    }
    if (currentTab === "newArrivals") {
      computedCookies = computedCookies.filter((item) =>
        item.attributes.category
          .toLowerCase()
          .includes(currentTab.toLowerCase())
      );

      setCurrentPage(1);
    }
    if (currentTab === "bestSellers") {
      computedCookies = computedCookies.filter((item) =>
        item.attributes.category
          .toLowerCase()
          .includes(currentTab.toLowerCase())
      );

      setCurrentPage(1);
    }
    if (currentTab === "topRated") {
      computedCookies = computedCookies.filter((item) =>
        item.attributes.category
          .toLowerCase()
          .includes(currentTab.toLowerCase())
      );

      setCurrentPage(1);
    }
    setTotalItems(computedCookies.length);

    //Current Page slice
    return computedCookies.slice(
      (currentPage - 1) * cookiesPerPage,
      (currentPage - 1) * cookiesPerPage + cookiesPerPage
    );
// eslint-disable-line react-hooks/exhaustive-deps
  }, [items, currentPage, searchTerm, currentTab]);// eslint-disable-line react-hooks/exhaustive-deps
  // Change page
  const paginate = (event, value) => setCurrentPage(value);


  return (
    <Box>
      <Box my="25px">
        <Grid container spacing={1}>
          <Grid item xs={12} md={5}>
            <Paper
              component="form"
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search Cookies"
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            {breakPoint ? (
              <Tabs
                textColor="primary"
                indicatorColor="secondary"
                value={currentTab}
                onChange={handleChange}
                centered
              >
                <Tab label="ALL" value="all" />
                <Tab label="New Arrivals" value="newArrivals" />
                <Tab label="Top Rated" value="topRated" />
                <Tab label="Best Seller" value="bestSellers" />
              </Tabs>
            ) : (
              <Tabs
                textColor="primary"
                indicatorColor="secondary"
                value={currentTab}
                onChange={handleChange}
                centered
                variant="fullWidth"
              >
                <Tab label="ALL" value="all" />
                <Tab label="New Arrivals" value="newArrivals" />
                <Tab label="Top Rated" value="topRated" />
                <Tab label="Best Seller" value="bestSellers" />
              </Tabs>
            )}
          </Grid>
        </Grid>
      </Box>

      <Grid
        container
        direction="column"
        justifyContent="center"
        spacing={2}
        alignItems="center"
      >
        <Grid item>
          <Grid
            container
            direction="row"
            spacing={3}
            justifyContent="flex-start"
            alignItems="center"
          >
            {recipeData.map((item, i) => (
              <Grid item xs={12} sm={12} md={4} key={i}>
                <Item item={item} key={`${item.name}-${item.id}`} />
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12}>
          {pageNumbers.length > 1 && (
            <Stack spacing={2}>
              <Pagination
                count={pageNumbers.length}
                page={currentPage}
                onChange={paginate}
              />
            </Stack>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ItemList;
