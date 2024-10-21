import React, { useCallback, useEffect, useMemo, useState } from "react";
import { resturantData } from "../demoData/resturantdata";
import { useParams } from "react-router-dom";
import nonvegimg from "../assets/non_veg.png";
import vegimg from "../assets/veg.png";
import { useDispatch, useSelector } from "react-redux";

import { assets } from "../assets/assets";
import axios from "axios";
import { setCartCount, setCartItems } from "../feature/CartSlice";
import { Box, Button, debounce, IconButton, Paper, Typography } from "@mui/material";
import { handleAddToCart } from "../utility/apiServices";
import { Add, Fastfood, Grass, Image, LocalDining, Remove, RemoveCircle } from "@mui/icons-material";
import GoBackButton from "../components/Common/Buttons/GoBackButton";

const ProductDetail = () => {
  const outletData = useSelector((state) => state?.resturant?.outletData);
  const resturantdata = useSelector((state) => state?.resturant?.resturantdata);
  const cartitems = useSelector((state) => state?.cart?.cartItems);

  const dispatch = useDispatch();

  const { cartId, cartItems: cartitem } = cartitems || {};

  const { menuid, productid } = useParams();
  const [productQuantity, setProductQuantity] = useState(0);

  const filteredbycategoryid = useMemo(() => {
    const filteredbycategoryid = outletData?.menuCategories?.filter((item) => {
      return item.menuCategoryId.toString() === menuid.toString();
    });

    return filteredbycategoryid;
  }, [outletData]);

  const filteredbyproductid = useMemo(() => {
    const filteredbyproductid = filteredbycategoryid[0]?.menuItems?.filter(
      (item) => {
        return item?.menuItemId?.toString() === productid?.toString();
      }
    );

    return filteredbyproductid;
  }, [filteredbycategoryid]);

  const product = filteredbyproductid?.[0] || [];

  const item = cartitem?.find((item) => {
    return item?.cartMenuItemId === parseFloat(productid);
  });

  useEffect(() => {
    setProductQuantity(product?.cartQuantity);
  }, [product]);

  useEffect(() => {
    if (item !== undefined) {
      setProductQuantity(item?.quantity);
    } else {
      setProductQuantity(0);
    }
  }, [item]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const addToCart = async (payload) => {
    const response = await handleAddToCart(payload);
    dispatch(setCartItems(response?.data?.result));
  };

  const debouncedAddToCart = useCallback(
    debounce(async (type) => {
      let latestQuantity = productQuantity;
      latestQuantity =
        type === "increment" ? productQuantity + 1 : productQuantity - 1;
      setProductQuantity(latestQuantity);

      if (latestQuantity >= 0) {
        try {
          await addToCart({
            cartId: cartId,
            menuItemId: productid,
            quantity: latestQuantity,
          });
        } catch (error) {
          console.error("Error updating cart:", error);
        }
      }
    }, 30),
    [productQuantity]
  );

  return (
    <Box sx={{ height: "100%",  }}>
    <GoBackButton />
    <Box sx={{ borderRadius: '1rm', overflow: 'hidden' }}>
      <img
        src={product?.menuItemImageUrl}
        alt={product.name}
        style={{
          width: '', 
          height: '50vh',
          objectFit: 'cover',
          borderRadius: '1rem',
          margin:"auto"
        }}
      />
    </Box>
    
    <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center'}}>
    <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 1,
          maxWidth: '85%',
          mx: 'auto',
          
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>${product.price}</Typography>
        {product.mealType === "non-veg" ? (
          <Fastfood sx={{ width: '40px', height: '40px', color: 'red' }} />
        ) : (
          <Grass sx={{ width: '40px', height: '40px', color: 'green' }} />
        )}
      </Box>
      <Typography variant="h5" component="h2" gutterBottom>
        {product.name}
      </Typography>
      {product.description && (
        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
          {product.description}
        </Typography>
      )}
      <Box sx={{ display: 'flex', justifyContent: 'center',  }}>
        {productQuantity === 0 ? (
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              debouncedAddToCart("increment");
            }}
          
          >
            Add to Cart
          </Button>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton onClick={() => debouncedAddToCart("decrement")}>
              <Remove sx={{ color: 'white' }} />
            </IconButton>
            <Typography
              variant="body2"
              sx={{
                fontWeight: '600',
                color: 'green',
                fontSize: '1.5rem',
              }}
            >
              {productQuantity}
            </Typography>
            <IconButton onClick={() => debouncedAddToCart("increment")}>
              <Add sx={{ color: 'white' }} />
            </IconButton>
          </Box>
        )}
      </Box>
  
     
    </Box>
  </Box>
  
  );
};

export default ProductDetail;
