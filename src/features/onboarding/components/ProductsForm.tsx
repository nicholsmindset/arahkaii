import { useState } from 'react';
import { Product } from '../types';

interface ProductsFormProps {
  products: Product[];
  onChange: (products: Product[]) => void;
}

export const ProductsForm = ({ products, onChange }: ProductsFormProps) => {
  const [formProducts, setFormProducts] = useState(products);

  const handleChange = (index: number, field: keyof Product, value: any) => {
    const newProducts = [...formProducts];
    newProducts[index] = { ...newProducts[index], [field]: value };
    setFormProducts(newProducts);
    onChange(newProducts);
  };

  const handleAddProduct = () => {
    setFormProducts([...formProducts, { name: '', description: '', price: 0, category: '', images: [], stock: 0 }]);
    onChange([...formProducts, { name: '', description: '', price: 0, category: '', images: [], stock: 0 }]);
  };

  const handleRemoveProduct = (index: number) => {
    if (formProducts.length <= 3) return; // Minimum 3 products required
    const newProducts = [...formProducts];
    newProducts.splice(index, 1);
    setFormProducts(newProducts);
    onChange(newProducts);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-medium text-gray-700 mb-4">
          Add Your First 3 Products
        </h3>
        <p className="text-gray-600 mb-6">
          Please add at least 3 products to complete your onboarding
        </p>

        {formProducts.map((product, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-medium text-gray-700">
                Product {index + 1}
              </h4>
              {index >= 3 && (
                <button
                  onClick={() => handleRemoveProduct(index)}
                  className="text-red-500 hover:text-red-600"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product Name
                </label>
                <input
                  type="text"
                  value={product.name}
                  onChange={(e) => handleChange(index, 'name', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                  placeholder="Product name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={product.description}
                  onChange={(e) => handleChange(index, 'description', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                  placeholder="Product description"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  type="number"
                  value={product.price}
                  onChange={(e) => handleChange(index, 'price', parseFloat(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                  placeholder="Product price"
                  step="0.01"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  value={product.category}
                  onChange={(e) => handleChange(index, 'category', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                  required
                >
                  <option value="">Select category</option>
                  <option value="clothing">Clothing</option>
                  <option value="accessories">Accessories</option>
                  <option value="shoes">Shoes</option>
                  <option value="beauty">Beauty</option>
                  <option value="home">Home</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product Images (URLs)
                </label>
                <div className="mt-1 flex flex-col space-y-2">
                  {product.images.map((image, imgIndex) => (
                    <input
                      key={imgIndex}
                      type="url"
                      value={image}
                      onChange={(e) => {
                        const newImages = [...product.images];
                        newImages[imgIndex] = e.target.value;
                        handleChange(index, 'images', newImages);
                      }}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                      placeholder="Image URL"
                    />
                  ))}
                  <button
                    onClick={() =>
                      handleChange(index, 'images', [...product.images, ''])
                    }
                    className="mt-2 px-4 py-2 bg-pink-100 text-pink-600 rounded-md hover:bg-pink-200"
                  >
                    Add Image
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Stock
                </label>
                <input
                  type="number"
                  value={product.stock}
                  onChange={(e) => handleChange(index, 'stock', parseInt(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                  placeholder="Available stock"
                  required
                />
              </div>
            </div>
          </div>
        ))}

        {formProducts.length < 5 && (
          <button
            onClick={handleAddProduct}
            className="px-4 py-2 bg-pink-100 text-pink-600 rounded-md hover:bg-pink-200"
          >
            Add Another Product
          </button>
        )}
      </div>
    </div>
  );
};
