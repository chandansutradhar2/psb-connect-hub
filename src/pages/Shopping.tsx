import { BankingLayout } from '@/components/BankingLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, ShoppingCart, Filter, Star, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

const Shopping = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const products = [
    { id: 1, name: 'Smartphone Pro', price: 29999, category: 'Electronics', rating: 4.5, image: 'images/phone.jpeg' },
    { id: 2, name: 'Wireless Headphones', price: 4999, category: 'Accessories', rating: 4.0, image: 'images/headphone.jpeg' },
      { id: 3, name: 'Smartphone Pro', price: 29999, category: 'Electronics', rating: 4.5, image: 'images/phone.jpeg' },
    { id: 4, name: 'Wireless Headphones', price: 4999, category: 'Accessories', rating: 4.0, image: 'images/headphone.jpeg' },
    // { id: 3, name: 'UltraBook Laptop', price: 79999, category: 'Electronics', rating: 4.8, image: '/images/laptop.jpg' },
    // { id: 4, name: 'Smart Watch', price: 14999, category: 'Accessories', rating: 4.2, image: '/images/watch.jpg' },
  ];

  useEffect(() => {
    setFilteredProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery]);

  const toggleFilters = () => setShowFilters(!showFilters);

  return (
    <BankingLayout>
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-secondary/5 sm:p-6">
        {/* Header */}
        <header className="bg-gradient-to-r from-[#134e5e] to-[#71b280] text-white p-4 rounded-b-2xl shadow-md sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 rounded-full"
              onClick={() => navigate(-1)}
              aria-label="Go back"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold">Shopping Hub</h1>
            <div className="w-10" /> {/* Spacer for alignment */}
          </div>
        </header>

        <Card className="rounded-2xl shadow-lg border-0 bg-white overflow-hidden mt-4">
          <CardContent className="p-6">
            {/* Search Bar */}
            {/* <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
              <Input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-lg border-gray-200 focus:ring-2 focus:ring-[#71b280] transition-all"
                aria-label="Search products"
              />
              {searchQuery && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-100 z-10"
                >
                  {filteredProducts.slice(0, 3).map((product) => (
                    <div
                      key={product.id}
                      className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      {product.name} ({product.category})
                    </div>
                  ))}
                </motion.div>
              )}
            </div> */}

            {/* Filters */}
            {/* <div className="flex justify-between items-center mb-4">
              <Button
                variant="outline"
                className="flex items-center rounded-lg hover:bg-gray-50"
                onClick={toggleFilters}
                aria-label="Toggle filters"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Badge className="bg-[#71b280] text-white">{filteredProducts.length} Products</Badge>
            </div>
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mb-4 grid grid-cols-2 sm:grid-cols-4 gap-2"
                >
                  <Button variant="outline" className="text-xs">Electronics</Button>
                  <Button variant="outline" className="text-xs">Accessories</Button>
                  <Button variant="outline" className="text-xs">Price: Low to High</Button>
                  <Button variant="outline" className="text-xs">Price: High to Low</Button>
                </motion.div>
              )}
            </AnimatePresence> */}

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-xl border border-gray-100 shadow-sm hover:shadow-md cursor-pointer overflow-hidden bg-white"
                //   onClick={() => navigate(`/product/${product.id}`)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-cover"
                    onError={(e) => (e.currentTarget.src = '/images/placeholder.jpg')}
                  />
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-xs text-gray-600 ml-1">{product.rating}</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">{product.category}</p>
                    <p className="font-bold text-gray-900">
                      ₹{product.price.toLocaleString('en-IN')}
                    </p>
                    <Button
                      className="w-full mt-3 bg-gradient-to-r from-[#134e5e] to-[#71b280] hover:from-[#0f3f4b] hover:to-[#5f9b6a] text-white rounded-lg"
                    //   onClick={(e) => {
                    //     e.stopPropagation();
                    //     navigate('/cart', { state: { product } });
                    //   }}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Cart Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="mt-6"
            >
              <Button
                className="w-full rounded-lg bg-gradient-to-r from-[#134e5e] to-[#71b280] hover:from-[#0f3f4b] hover:to-[#5f9b6a] text-white"
                // onClick={() => navigate('/cart')}
                aria-label="View cart"
              >
                View Cart <ShoppingCart className="h-4 w-4 ml-2" />
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </BankingLayout>
  );
};

export default Shopping;