import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const API_URL = "http://localhost:3000/wishlist";

const useWishList = () => {
  const { token } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const headers = { accesstoken: `accesstoken_${token}` };

  const { data: wishlist = [], isLoading } = useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      try {
        const { data } = await axios.get(API_URL, {
          headers,
          withCredentials: true,
        });
        return data?.wishlist?.products || [];
      } catch (err) {
        throw new Error(`Failed to fetch wishlist : ${err}`);
      }
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    retry: 2,
  });

  const addToWishlist = useMutation({
    mutationFn: async (product) => {
      return axios.post(
        API_URL,
        { productId: product._id },
        { headers, withCredentials: true }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["wishlist"]);
    },
  });

  const removeFromWishlist = useMutation({
    mutationFn: async (productId) => {
      return axios.delete(`${API_URL}/${productId}`, {
        headers,
        withCredentials: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["wishlist"]);
    },
  });

  return { wishlist, isLoading, addToWishlist, removeFromWishlist };
};

export default useWishList;
