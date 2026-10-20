
import React from 'react';
import { View, FlatList } from 'react-native';
import {
  Text,
  Button,
  Card,
  IconButton,
  Divider,
} from 'react-native-paper';

import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';

import {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} from '../store/cartSlice';

const PRODUCTS = [
  { id: 1, name: 'Laptop Dell', price: 1200 },
  { id: 2, name: 'Mouse Logitech', price: 45 },
  { id: 3, name: 'Keyboard', price: 120 },
];

export default function CartScreen() {
  const dispatch = useDispatch<AppDispatch>();

  const cartItems = useSelector(
    (state: RootState) => state.cart.items
  );

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleAdd = () => {
    const product =
      PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];

    dispatch(addToCart(product));
  };

  return (
    <View style={{ flex: 1, padding: 16, paddingTop: 50 }}>
      <Text variant="headlineMedium">
        🛒 Giỏ hàng
      </Text>

      <FlatList
        style={{ marginTop: 12 }}
        data={cartItems}
        keyExtractor={item => String(item.id)}
        ListEmptyComponent={
          <Text>Giỏ hàng đang trống!</Text>
        }
        renderItem={({ item }) => (
          <Card style={{ marginBottom: 10 }}>
            <Card.Content>
              <Text variant="titleMedium">
                {item.name}
              </Text>

              <Text>
                Giá: ${item.price}
              </Text>

              <Text>
                Thành tiền: $
                {item.price * item.quantity}
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <IconButton
                  icon="minus"
                  onPress={() =>
                    dispatch(
                      updateQuantity({
                        id: item.id,
                        quantity: item.quantity - 1,
                      })
                    )
                  }
                />

                <Text>{item.quantity}</Text>

                <IconButton
                  icon="plus"
                  onPress={() =>
                    dispatch(
                      updateQuantity({
                        id: item.id,
                        quantity: item.quantity + 1,
                      })
                    )
                  }
                />

                <IconButton
                  icon="delete"
                  iconColor="red"
                  onPress={() =>
                    dispatch(removeFromCart(item.id))
                  }
                />
              </View>
            </Card.Content>
          </Card>
        )}
      />

      <Divider />

      <Text variant="headlineSmall">
        Tổng tiền: ${total}
      </Text>

      <Button
        mode="contained"
        icon="cart-plus"
        onPress={handleAdd}
        style={{ marginTop: 10 }}
      >
        Thêm sản phẩm
      </Button>

      <Button
        mode="outlined"
        icon="delete-sweep"
        onPress={() => dispatch(clearCart())}
        style={{ marginTop: 8 }}
      >
        Xóa giỏ hàng
      </Button>
    </View>
  );
}
