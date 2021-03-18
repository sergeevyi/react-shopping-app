import React, { useEffect, useState } from 'react';
import Item from '../Item/Item';
import { useQuery } from 'react-query';
import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Badge from '@material-ui/core/Badge';

import {
  AppBar,
  IconButton,
  Typography,
  Button,
  Toolbar,
  Breadcrumbs,
  Link
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Cart from '../Cart/Cart';

import AccountCircle from '@material-ui/icons/AccountCircle';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import {
  getProductsList,
  productSelector,
  productsSlice
} from '../../features/products/productsSlice';
import { RootState } from '../../rootReducer';

export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    },
    category_list: {
      margin: 20,
      fontSize: 20,
      fontWeight: 'bold',
      fontFamily: 'Helvetica, "Trebuchet MS", Verdana, sans-serif',
      '& li :hover': {
        cursor: 'pointer',
        color: '#D70F64',
        transition: 'color .1s linear'
      }
    }
  })
);

const getCategories = async (): Promise<string[]> =>
  await (await fetch('https://fakestoreapi.com/products/categories')).json();

const App = () => {
  const dispatch = useDispatch();
  const { products, errors, loading } = useSelector(productSelector);

  useEffect(() => {
    dispatch(getProductsList());
  }, [dispatch]);

  const [category, setCategory] = useState<string | undefined>(undefined);
  const [cartOpen, setCardOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);

  const categories = useQuery<string[]>('categories', getCategories);
  const classes = useStyles();

  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems((prev) => {
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);
      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleCategory = (
    category: string,
    e: React.MouseEvent<HTMLElement>
  ) => {
    e.preventDefault();
    console.log(category);
    setCategory(category);
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    );
  };

  if (loading) return <LinearProgress />;
  if (errors) return <div>Something went wrong...</div>;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Online Store
          </Typography>
          <Button color="inherit">Login</Button>
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>

            <IconButton onClick={() => setCardOpen(true)} color="inherit">
              <Badge badgeContent={getTotalItems(cartItems)} color="error">
                <AddShoppingCartIcon />
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={cartOpen} onClose={() => setCardOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>

      <div style={{ padding: 20 }}>
        <Breadcrumbs aria-label="breadcrumb" className={classes.category_list}>
          {categories.data?.map((item) => (
            <Link
              key={item}
              color="inherit"
              onClick={(event: React.MouseEvent<HTMLElement>) => {
                handleCategory(item, event);
              }}
            >
              {item}
            </Link>
          ))}
        </Breadcrumbs>

        <Grid container spacing={2}>
          {products?.map((item) => (
            <Grid item key={item.id} xs={4} sm={2}>
              <Item item={item} handleAddToCard={handleAddToCart} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default App;
