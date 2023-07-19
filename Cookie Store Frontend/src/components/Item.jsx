import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  IconButton,
  Box,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { addToCart } from "../state";
import { useNavigate } from "react-router-dom";

const Item = ({ item, width }) => {

const imageURL = process.env.REACT_APP_IMAGE_URL;
const baseURL = process.env.REACT_APP_IMAGE_URL
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  const { category, price, name, image } = item.attributes;
  const {
    data: {
      attributes: {
        formats: {
          medium: { url },
        },
      },
    },
  } = image;

  return (
    <Box>
      <Grid container>
        <Grid item>
          <Box
            position="relative"
            onMouseOver={() => setIsHovered(true)}
            onMouseOut={() => setIsHovered(false)}
          >
            <img
              alt={item.name}
              width="300px"
              height="400px"
              src={imageURL+url}
              onClick={() => navigate(`/item/${item.id}`)}
              style={{ cursor: "pointer" }}
            />
            <Box
              display={isHovered ? "block" : "none"}
              position="absolute"
              bottom="5%"
              left="0"
              width="100%"
              padding="0 5%"
            >
              <Box display="flex" justifyContent="space-between">
                <Box display="flex" alignItems="center" borderRadius="3px">
                  <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                    <RemoveIcon />
                  </IconButton>
                  <Typography>{count}</Typography>
                  <IconButton onClick={() => setCount(count + 1)}>
                    <AddIcon />
                  </IconButton>
                </Box>
                <Button
                  variant="filled"
                  onClick={() => {
                    dispatch(addToCart({ item: { ...item, count } }));
                  }}
                >
                  Add to Cart
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item>
          <Box mt="3px">
            <Typography variant="subtitle2">
              {category
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
            </Typography>
            <Typography>{name}</Typography>
            <Typography fontWeight="bold">${price}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Item;
