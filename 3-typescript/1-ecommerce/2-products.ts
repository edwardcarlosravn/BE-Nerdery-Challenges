/**
 * Products - Challenge 1: Product Price Analysis
 *
 * Create a function that analyzes pricing information from an array of products.
 *
 * Requirements:
 * - Create a function called `analyzeProductPrices` that accepts an array of Product objects
 * - The function should return an object containing:
 *   - totalPrice: The sum of all product prices
 *   - averagePrice: The average price of all products (rounded to 2 decimal places)
 *   - mostExpensiveProduct: The complete Product object with the highest price
 *   - cheapestProduct: The complete Product object with the lowest price
 *   - onSaleCount: The number of products that are currently on sale
 *   - averageDiscount: The average discount percentage for products on sale (rounded to 2 decimal places)
 * - Prices should be manage in regular prices and not in sale prices
 * - Use proper TypeScript typing for parameters and return values
 * - Implement the function using efficient array methods
 *
 *
 **/
import { Product, Nullable, Brand } from "./1-types";
interface PriceAnalysis{
  totalPrice: number;
  averagePrice: number;
  mostExpensiveProduct: Nullable<Product>;
  cheapestProduct : Nullable<Product>;
  onSaleCount: number;
  averageDiscount: number; 
}
export async function analyzeProductPrices(products: Product[]): Promise<PriceAnalysis> {
  if(products.length === 0){
    return {
      totalPrice: 0,
      averagePrice: 0,
      mostExpensiveProduct: null,
      cheapestProduct: null,
      onSaleCount: 0,
      averageDiscount: 0
    }
  }
  let totalPrice = 0;
  let mostExpensiveProduct = products[0];
  let cheapestProduct = products[0];
  let onSaleCount = 0;
  let totalDiscount = 0;
  
  for(const product of products) {
    totalPrice += product.price;
    if(product.price > mostExpensiveProduct.price){
      mostExpensiveProduct = product;
    }
    if(product.price < cheapestProduct.price){
      cheapestProduct = product;
    }
    if(product.onSale){
      onSaleCount++;
      if(product.salePrice !== null) {
        const discount = ((product.price - product.salePrice) / product.price) * 100;
        totalDiscount += discount;
      }
    }
  }

  const averagePrice = Number((totalPrice / products.length).toFixed(2));

  let averageDiscount = onSaleCount > 0 ? Number((totalDiscount/onSaleCount).toFixed(2)) : 0;

  return {
    totalPrice,
    averagePrice,
    mostExpensiveProduct,
    cheapestProduct,
    onSaleCount,
    averageDiscount
  }

}
/**
 *  Challenge 2: Build a Product Catalog with Brand Metadata
 *
 * Create a function that takes arrays of Product and Brand, and returns a new array of enriched product entries. Each entry should include brand details embedded into the product, under a new brandInfo property (excluding the id and isActive fields).
 *  e.g
 *  buildProductCatalog(products: Product[], brands: Brand[]): EnrichedProduct[]

  Requirements:
  - it should return an array of enriched product entries with brand details
  - Only include products where isActive is true and their corresponding brand is also active.
  - If a product’s brandId does not match any active brand, it should be excluded.
  - The brandInfo field should include the rest of the brand metadata (name, logo, description, etc.).
 */
interface EnrichedProduct extends Omit<Product, 'brandId'>{
  brandInfo: Omit<Brand, 'id' | 'isActive'>;
}
export async function buildProductCatalog(
  products: Product[],
  brands: Brand[],
): Promise<EnrichedProduct[]> {

  const ActivebrandsMap = new Map<string | number, Omit<Brand, 'id' | 'isActive'>>();

  for(const brand of brands){ 
    if(brand.isActive){
      const {id, isActive, ...brandInfo} = brand;
      ActivebrandsMap.set(String(id),brandInfo);
    }
  }

  const enrichedProduct:  EnrichedProduct [] = []

  for(const product of products){
    if(product.isActive){
      const brandInfo = ActivebrandsMap.get(String(product.brandId));
      if(brandInfo){
        const {brandId, ...productWithoutBrandId} = product;
        enrichedProduct.push({
          ...productWithoutBrandId,
          brandInfo
        })
      }
    }
  }
  return enrichedProduct;
}

/**
 * Challenge 3: One image per product
 *
 * Create a function that takes an array of products and returns a new array of products, each with only one image.
 *
 * Requirements:
 * - The function should accept an array of Product objects.
 * - Each product should have only one image in the images array.
 * - The image should be the first one in the images array.
 * - If a product has no images, it should be excluded from the result.
 * - The function should return an array of Product objects with the modified images array.
 * - Use proper TypeScript typing for parameters and return values.
 */
// Fix 
export async function filterProductsWithOneImage(
  products: Product[],
): Promise<Product[]> {
  const productsWithImages = products.filter(product => Array.isArray(product.images) && product.images.length > 0);
  
  return productsWithImages.map(product => {
    const productWithOneImage = {
      ...product,
      images: [product.images[0]]
    }
    return productWithOneImage;
  })
}
