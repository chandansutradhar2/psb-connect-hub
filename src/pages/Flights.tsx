import { BankingLayout } from '@/components/BankingLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Calendar, MapPin, ArrowRight, Plane, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';

const Flights = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    departureDate: '',
  });
  const [filteredCities, setFilteredCities] = useState([]);
  const [activeField, setActiveField] = useState(null);

  const cities = [
    { name: 'Delhi', code: 'DEL' },
    { name: 'Mumbai', code: 'BOM' },
    { name: 'Bangalore', code: 'BLR' },
    { name: 'Hyderabad', code: 'HYD' },
    { name: 'Chennai', code: 'MAA' },
  ];

  useEffect(() => {
    if (activeField) {
      setFilteredCities(
        cities.filter((city) =>
          city.name.toLowerCase().includes(formData[activeField]?.toLowerCase() || '')
        )
      );
    }
  }, [formData.from, formData.to, activeField]);

  const handleSearch = () => {
    if (formData.from && formData.to && formData.departureDate) {
      navigate('/flight-results', { state: formData });
    }
  };

  const mockFlights = [
    { id: 1, airline: 'IndiGo', from: 'Delhi', to: 'Mumbai', price: 5500, departure: '10:00 AM', duration: '2h 10m' },
    { id: 2, airline: 'Air India', from: 'Delhi', to: 'Mumbai', price: 6200, departure: '12:30 PM', duration: '2h 15m' },
  ];

  return (
    <BankingLayout>
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-secondary/5  sm:p-6">
        {/* Header */}
        <header className="bg-gradient-to-r from-[#134e5e] to-[#71b280] text-white p-4 rounded-b-2xl shadow-md sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 rounded-full"
              onClick={() => navigate("/dashboard")}
              aria-label="Go back"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold">Book Your Flight</h1>
            <div className="w-10" /> {/* Spacer for alignment */}
          </div>
        </header>

        <Card className="rounded-2xl shadow-lg border-0 bg-white overflow-hidden mt-4">
          <CardContent className="p-6">
            {/* Flight Search Form */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                <Input
                  placeholder="From (e.g., Delhi)"
                  value={formData.from}
                  onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                  onFocus={() => setActiveField('from')}
                  className="pl-10 pr-4 py-2 rounded-lg border-gray-200 focus:ring-2 focus:ring-[#71b280] transition-all"
                  aria-label="Departure city"
                />
                <AnimatePresence>
                  {activeField === 'from' && formData.from && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-100 z-10"
                    >
                      {filteredCities.map((city) => (
                        <div
                          key={city.code}
                          className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                          onClick={() => {
                            setFormData({ ...formData, from: city.name });
                            setActiveField(null);
                          }}
                        >
                          {city.name} ({city.code})
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                <Input
                  placeholder="To (e.g., Mumbai)"
                  value={formData.to}
                  onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                  onFocus={() => setActiveField('to')}
                  className="pl-10 pr-4 py-2 rounded-lg border-gray-200 focus:ring-2 focus:ring-[#71b280] transition-all"
                  aria-label="Destination city"
                />
                <AnimatePresence>
                  {activeField === 'to' && formData.to && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-100 z-10"
                    >
                      {filteredCities.map((city) => (
                        <div
                          key={city.code}
                          className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                          onClick={() => {
                            setFormData({ ...formData, to: city.name });
                            setActiveField(null);
                          }}
                        >
                          {city.name} ({city.code})
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                <Input
                  type="date"
                  placeholder="Departure Date"
                  value={formData.departureDate}
                  onChange={(e) => setFormData({ ...formData, departureDate: e.target.value })}
                  className="pl-10 pr-4 py-2 rounded-lg border-gray-200 focus:ring-2 focus:ring-[#71b280] transition-all"
                  aria-label="Departure date"
                />
              </div>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} className="mb-6">
              <Button
                className="w-full rounded-lg bg-gradient-to-r from-[#134e5e] to-[#71b280] hover:from-[#0f3f4b] hover:to-[#5f9b6a] text-white"
                // onClick={handleSearch}
                disabled={!formData.from || !formData.to || !formData.departureDate}
                aria-label="Search flights"
              >
                Search Flights <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </motion.div>

            {/* Flight Results Preview */}
            {formData.from && formData.to && formData.departureDate && (
              <div className="mt-6">
                <h3 className="text-base font-bold mb-4 flex items-center">
                  <Plane className="h-4 w-4 text-[#71b280] mr-2" />
                  Available Flights
                </h3>
                <div className="space-y-4">
                  {mockFlights.map((flight) => (
                    <motion.div
                      key={flight.id}
                      whileHover={{ scale: 1.02 }}
                      className="rounded-xl border border-gray-100 shadow-sm hover:shadow-md p-4 bg-white cursor-pointer"
                    //   onClick={() => navigate(`/flight/${flight.id}`)}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-gray-900">{flight.airline}</p>
                          <p className="text-xs text-gray-500">
                            {flight.from} → {flight.to} | {flight.departure} | {flight.duration}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">₹{flight.price.toLocaleString('en-IN')}</p>
                          {/* <Button
                            variant="outline"
                            className="mt-2 rounded-lg border-[#71b280] text-[#71b280] hover:bg-[#71b280]/10"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/flight/${flight.id}`);
                            }}
                          >
                            Book Now
                          </Button> */}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </BankingLayout>
  );
};

export default Flights;