/**
 *  Challenge 5: Get Departments with Product Count
 *
 * Create a function that takes an array of departments and products, and returns a new array of departments with the amount of products available in each department.
 *
 * Requirements:
 * - The function should accept an array of Department objects and an array of Product objects.
 * - Each department should include the quantity of products available in that department.
 * - The department should be idetified just by its name and id other properties should be excluded.
 * - In the information of the department, include the amount of products available in that department and just the name and id of the department.
 * - Add the name of the products in an array called productsNames inside the department object.
 */

import { Department, Product, DepartmentId } from './1-types';
export interface DepartmentWithProductCount {
  id : DepartmentId;
  name: string; 
  productCount: number;
  productNames: string[];
}
export function groupProductsByDepartment(products: Product[]): Map<DepartmentId, Product[]> {
  const map = new Map<DepartmentId, Product[]>();
  
  products.forEach(product => {
    const deptProducts = map.get(product.departmentId) || [];
    deptProducts.push(product);
    map.set(product.departmentId, deptProducts);
  });
  
  return map;
}
export async function getDepartmentsWithProductCount(
  departments: Department[],
  products: Product[],
): Promise<DepartmentWithProductCount[]> {

  const productsByDepartment = groupProductsByDepartment(products);

  const results : DepartmentWithProductCount[] = departments.map( department => {
    const deptProducts = productsByDepartment.get(department.id) || [];
    const productNames = deptProducts.map(product => product.name);
    return {
      id: department.id,
      name: department.name,
      productCount: deptProducts.length,
      productNames: productNames
    }
  })
  return results;
}