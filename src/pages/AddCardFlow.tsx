

import { useState, useEffect, useCallback } from "react";
import { ArrowLeft, CreditCard, Scan, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { BankingLayout } from "@/components/BankingLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const AddCardFlow = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [cardData, setCardData] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    name: "",
  });
  const [errors, setErrors] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    name: "",
  });
  const [touched, setTouched] = useState({
    cardNumber: false,
    expiry: false,
    cvv: false,
    name: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [cardBrand, setCardBrand] = useState("");

  // Card brand detection
  const detectCardBrand = useCallback((cardNumber: string) => {
    if (!cardNumber) {
      setCardBrand("");
      return;
    }
    if (/^4/.test(cardNumber)) setCardBrand("Visa");
    else if (/^5[1-5]/.test(cardNumber)) setCardBrand("Mastercard");
    else if (/^6/.test(cardNumber)) setCardBrand("RuPay");
    else setCardBrand("Unknown");
  }, []);

  // Validation functions
  const validateCardNumber = useCallback((cleanCardNumber: string) => {
    if (!cleanCardNumber) {
      return "Card number is required";
    }
    if (/[^0-9]/.test(cleanCardNumber)) {
      return "Card number must contain only digits";
    }
    if (cleanCardNumber.length !== 16) {
      return "Card number must be 16 digits";
    }
    return "";
  }, []);

  const validateExpiry = useCallback((expiry: string) => {
    if (!expiry) {
      return "Expiry date is required";
    }
    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      return "Enter valid expiry date (MM/YY)";
    }
    const [month, year] = expiry.split("/").map(Number);
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;
    const fullYear = 2000 + year;

    if (fullYear < currentDate.getFullYear() || (fullYear === currentDate.getFullYear() && month < currentMonth)) {
      return "Card is expired";
    }
    return "";
  }, []);

  const validateCvv = useCallback((cvv: string) => {
    if (!cvv) {
      return "CVV is required";
    }
    if (!/^\d{3}$/.test(cvv)) {
      return "Enter valid 3-digit CVV";
    }
    return "";
  }, []);

  const validateName = useCallback((name: string) => {
    if (!name) {
      return "Cardholder name is required";
    }
    if (name.length < 2) {
      return "Name must be at least 2 characters";
    }
    return "";
  }, []);

  // Real-time validation for touched fields
  useEffect(() => {
    const validateAll = () => {
      setErrors({
        cardNumber: touched.cardNumber ? validateCardNumber(cardData.cardNumber.replace(/\s/g, "")) : "",
        expiry: touched.expiry ? validateExpiry(cardData.expiry) : "",
        cvv: touched.cvv ? validateCvv(cardData.cvv) : "",
        name: touched.name ? validateName(cardData.name) : "",
      });
    };

    // Debounce validation to avoid excessive updates
    const timeout = setTimeout(validateAll, 300);
    return () => clearTimeout(timeout);
  }, [cardData, touched, validateCardNumber, validateExpiry, validateCvv, validateName]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    if (id === "cardNumber") {
      if (/[^0-9]/.test(value.replace(/\s/g, ""))) {
        setErrors((prev) => ({ ...prev, cardNumber: "Card number must contain only digits" }));
        return;
      }
      const cleanValue = value.replace(/\s/g, "");
      const formattedValue = cleanValue
        .replace(/(\d{4})/g, "$1 ")
        .trim()
        .slice(0, 19);
      setCardData((prev) => ({ ...prev, [id]: formattedValue }));
      detectCardBrand(cleanValue);
      return;
    }

    if (id === "expiry") {
      const formattedValue = value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .slice(0, 5);
      setCardData((prev) => ({ ...prev, [id]: formattedValue }));
      return;
    }

    setCardData((prev) => ({ ...prev, [id]: value }));
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      setTouched({ cardNumber: true, expiry: true, cvv: true, name: true }); // Mark all fields as touched

      const cleanCardNumber = cardData.cardNumber.replace(/\s/g, "");
      const newErrors = {
        cardNumber: validateCardNumber(cleanCardNumber),
        expiry: validateExpiry(cardData.expiry),
        cvv: validateCvv(cardData.cvv),
        name: validateName(cardData.name),
      };

      setErrors(newErrors);

      if (Object.values(newErrors).some((error) => error)) {
        throw new Error("Please correct the errors in the form");
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast({
        title: "Card Added Successfully",
        description: `Your ${cardBrand || "card"} has been added and is ready for use.`,
        className: "bg-green-50 border-green-200 text-green-800",
      });

      navigate("/cards-management");
    } catch (error) {
      toast({
        title: "Error Adding Card",
        description: error instanceof Error ? error.message : "Failed to add card. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleScanCard = () => {
    toast({
      title: "Card Scanning",
      description: "This feature will be available soon!",
    });
  };

  // Check if form is valid to enable submit button
  const isFormValid =
    cardData.cardNumber &&
    cardData.expiry &&
    cardData.cvv &&
    cardData.name &&
    !errors.cardNumber &&
    !errors.expiry &&
    !errors.cvv &&
    !errors.name;

  return (
    <BankingLayout>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Header */}
        <div className="bg-white sticky top-0 z-10 border-b">
          <div className="max-w-md mx-auto px-4 py-4">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(-1)}
                className="h-10 w-10 rounded-full"
                aria-label="Go back"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-semibold">Add New Card</h1>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4">
          <div className="max-w-md mx-auto">
            {/* Card Preview */}
            <Card className="mb-6 bg-gradient-to-br from-[#134e5e] to-[#71b280] text-white border-0 shadow-lg">
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-xs opacity-80 mb-1">Card Number</p>
                    <p className="text-lg font-mono tracking-wider">
                      {cardData.cardNumber || "•••• •••• •••• ••••"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {cardBrand && (
                      <p className="text-xs font-medium">{cardBrand}</p>
                    )}
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <CreditCard className="h-5 w-5" />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs opacity-80 mb-1">Cardholder Name</p>
                    <p className="text-sm font-medium">
                      {cardData.name || "YOUR NAME"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs opacity-80 mb-1">Expires</p>
                    <p className="text-sm font-medium">
                      {cardData.expiry || "••/••"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Form */}
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="cardNumber"
                    className="text-sm font-medium text-gray-700"
                  >
                    Card Number
                  </Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 text-xs text-[#134e5e] flex items-center gap-1"
                    onClick={handleScanCard}
                  >
                    <Scan className="h-3 w-3" />
                    Scan Card
                  </Button>
                </div>
                <Input
                  id="cardNumber"
                  placeholder="Enter 16-digit card number"
                  value={cardData.cardNumber}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur("cardNumber")}
                  className={`h-12 text-lg font-mono ${errors.cardNumber ? "border-red-500" : ""}`}
                  maxLength={19}
                  aria-invalid={!!errors.cardNumber}
                  aria-describedby="cardNumber-error"
                />
                {errors.cardNumber && touched.cardNumber && (
                  <p id="cardNumber-error" className="text-sm text-red-500">
                    {errors.cardNumber}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="expiry"
                    className="text-sm font-medium text-gray-700"
                  >
                    Expiry Date
                  </Label>
                  <Input
                    id="expiry"
                    placeholder="MM/YY"
                    value={cardData.expiry}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur("expiry")}
                    className={`h-12 ${errors.expiry ? "border-red-500" : ""}`}
                    maxLength={5}
                    aria-invalid={!!errors.expiry}
                    aria-describedby="expiry-error"
                  />
                  {errors.expiry && touched.expiry && (
                    <p id="expiry-error" className="text-sm text-red-500">
                      {errors.expiry}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-1">
                    <Label
                      htmlFor="cvv"
                      className="text-sm font-medium text-gray-700"
                    >
                      CVV
                    </Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-3 w-3 text-gray-500 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">
                            3-digit code on the back of your card
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Input
                    id="cvv"
                    placeholder="123"
                    type="password"
                    value={cardData.cvv}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur("cvv")}
                    className={`h-12 ${errors.cvv ? "border-red-500" : ""}`}
                    maxLength={3}
                    aria-invalid={!!errors.cvv}
                    aria-describedby="cvv-error"
                  />
                  {errors.cvv && touched.cvv && (
                    <p id="cvv-error" className="text-sm text-red-500">
                      {errors.cvv}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700"
                >
                  Cardholder Name
                </Label>
                <Input
                  id="name"
                  placeholder="As shown on your card"
                  value={cardData.name}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur("name")}
                  className={`h-12 ${errors.name ? "border-red-500" : ""}`}
                  aria-invalid={!!errors.name}
                  aria-describedby="name-error"
                />
                {errors.name && touched.name && (
                  <p id="name-error" className="text-sm text-red-500">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-blue-700">
                    Your card details are encrypted and securely stored as per RBI
                    guidelines. We never share your information with third
                    parties.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fixed bottom button */}
        <div className="bg-white border-t p-4 sticky bottom-0">
          <div className="max-w-md mx-auto">
            <Button
              className="w-full h-12 rounded-xl text-base bg-gradient-to-r from-[#134e5e] to-[#71b280] text-white"
              onClick={handleSubmit}
              disabled={isLoading || !isFormValid}
              aria-label="Add Card"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Adding Card...
                </>
              ) : (
                "Add Card"
              )}
            </Button>
          </div>
        </div>
      </div>
    </BankingLayout>
  );
};

export default AddCardFlow;