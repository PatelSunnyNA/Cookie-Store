import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";

export default function Footer() {
  const theme = useTheme();
  return (
    <Box
      backgroundColor={theme.palette.background.default}
      paddingTop="1px"
      paddingBottom="1px"
      // sticky footer - see four values below
      bottom="0"
      left="0"
      width="100%"
      height="25px"
      position="absolute"
    >
      <Box
        backgroundColor={theme.palette.background.paper}
        position="relative"
        padding={theme.spacing(0.25)}
      >
        <Grid container item justifyContent="center">
          <List>
            <ListItemButton>
              <ListItemText
                primary={
                  <Typography
                    variant="body2"
                    color={theme.palette.text.secondary}
                  >
                    Made with &#9829; by Sunny Patel
                  </Typography>
                }
              />
            </ListItemButton>
          </List>
        </Grid>
      </Box>
    </Box>
  );
}
