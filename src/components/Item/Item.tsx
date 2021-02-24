import {
  Button,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CartItemType } from '../App/App';
import React from 'react';

type Props = {
  item: CartItemType;
  handleAddToCard(clickedItem: CartItemType): void;
};

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    height: 400
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  cardBody: {
    display: 'flex',
    flex: '1 0 auto',
    alignItems: 'flex-end',
    justifyContent: 'start',
    flexDirection: 'column'
  },
  cardBtn: {
    display: 'flex',
    justifyContent: 'flex-start'
  },

  MuiCardRoot: {
    display: 'flex',
    flexDirection: 'column',

    justifyContent: 'space-between'
  },
  MuiCardActionsRoot: {
    marginTop: 'auto'
  }
});

const Item: React.FC<Props> = ({ item, handleAddToCard }: Props) => {
  const classes = useStyles();
  const truncate = (str: string) =>
    str.length > 100 ? str.substring(0, 100) + '...' : str;

  return (
    <Card className={classes.card}>
      <CardActionArea className={classes.cardBody}>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={item.image}
          title={item.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
            {item.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {truncate(item.description)}
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => handleAddToCard(item)}
        >
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default Item;
