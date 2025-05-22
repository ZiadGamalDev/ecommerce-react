import axios from 'axios';

const transformProductData = (product) => {
  return {
    id: product._id,
    title: product.title,
    description: product.description,
    slug: product.slug,
    status: product.status,
    folderId: product.folderId,
    basePrice: product.basePrice,
    discount: product.discount,
    appliedPrice: product.appliedPrice,
    finalPrice: product.finalPrice,
    stock: product.stock,
    rate: product.rate,
    images: product.images.map((image) => image.secure_url),
    specs: product.specs,
    metadata: product.metadata,
    version: product.version,
    isDeleted: product.isDeleted,
    addedBy: product.addedBy,
    updatedBy: product.updatedBy,
    category: product.category.name,
    brand: product.brand.name,
  };
};

const transformCategoryData = (category) => {
  return {
    id: category._id,
    name: category.name,
    slug: category.slug,
    image: category.image.secure_url,
    isActive: category.isActive,
    addedBy: category.addedBy.username,
    brands: category.brands.map((brand) => ({
      id: brand._id,
      name: brand.name,
      logo: brand.logo.secure_url,
    })),
    createdAt: category.createdAt,
    updatedAt: category.updatedAt,
  };
};

const fetchProducts = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}product`);
    const productsArray = response.data.data;

    const transformedProducts = productsArray.map(transformProductData);
    return transformedProducts;
  } catch (error) {
    console.error('Error fetching products:', error.message);
    throw error;
  }
};

const fetchCategories = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}category`);
    const categoriesArray = response.data.data;

    const transformedCategories = categoriesArray.map(transformCategoryData);
    return transformedCategories;
  } catch (error) {
    console.error('Error fetching categories:', error.message);
    throw error;
  }
};

export { fetchProducts, fetchCategories };