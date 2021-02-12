import React from "react";
import { Grid, Card, CardContent } from "@material-ui/core";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

function News({ data }) {
  return (
    <Grid container spacing={5} justify="center">
      {data.items &&
        !!data.items.length &&
        data.items.map((article, i) => (
          <Grid item xs={10} md={11}>
            <Card className="article" style={{ padding: "unset" }}>
              <CardActionArea>
                <CardMedia
                  className="article__image"
                  image={article.urlToImage}
                  title="Contemplative Reptile"
                />
                <CardContent style={{ textAlign: "left" }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {article.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {article.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  href={article.url}
                  target="_blank"
                  variant="outlined"
                  size="small"
                  color="primary"
                >
                  Read More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
    </Grid>
  );
}

export default News;
