import { useState, useEffect } from "react";
import { CreditCard, User, FileText, MapPin, CheckCircle, Check, ArrowRight, Loader2, Shield, Lock, Clock, Calendar, Mail, Phone, Building, IndianRupee, Truck, Home, Building2, ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { BankingLayout } from "@/components/BankingLayout";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// Application steps
type ApplicationStep = "card-selection" | "personal-info" | "employment-details" | "delivery" | "review" | "confirmation";

const ApplyNowFlow = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { toast } = useToast();
  const [applicationStep, setApplicationStep] = useState<ApplicationStep>("card-selection");
  const [applicationProgress, setApplicationProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [cardTypeFilter, setCardTypeFilter] = useState<"all" | "credit" | "debit">("all");

  // New card application state
  const [newCardApplication, setNewCardApplication] = useState({
    type: "",
    variant: "",
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    dob: "",
    pan: "",
    aadhaar: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    employmentStatus: "",
    monthlyIncome: "",
    deliveryAddress: "",
    deliveryOption: "home",
    termsAccepted: false,
  });

  useEffect(() => {
    // Update progress based on current step
    const progressValues = {
      "card-selection": 20,
      "personal-info": 40,
      "employment-details": 60,
      "delivery": 80,
      "review": 90,
      "confirmation": 100,
    };
    setApplicationProgress(progressValues[applicationStep]);
  }, [applicationStep]);

  useEffect(() => {
    // If a card is pre-selected via navigation state, skip the card selection step
    if (state?.selectedCard) {
      setNewCardApplication({
        ...newCardApplication,
        type: state.selectedCard.type,
        variant: state.selectedCard.variant,
      });
      setApplicationStep("personal-info");
    }
  }, [state]);

  const cardApplications = [
    {
      id: "premium",
      title: "SBI Elite Credit Card",
      description: "Premium lifestyle card with exclusive rewards",
      features: ["5% cashback on dining", "Free airport lounge access", "Travel insurance up to ₹1 crore"],
      fee: "₹4,999",
      color: "bg-gradient-to-br from-purple-600 to-purple-700",
      eligibility: "Min. ₹1,00,000 monthly income",
      processingTime: "7-10 working days",
      type: "Credit Card",
      variant: "Elite",
      popularity: "popular",
      rewards: "5X Rewards"
    },
    {
      id: "business",
      title: "SBI Business Credit Card",
      description: "Ideal for business expenses and GST benefits",
      features: ["Business expense tracking", "Higher credit limits", "GST input credit"],
      fee: "₹2,999",
      color: "bg-gradient-to-br from-green-600 to-green-700",
      eligibility: "Registered business with GSTIN",
      processingTime: "7-14 working days",
      type: "Credit Card",
      variant: "Business",
      popularity: "new",
      rewards: "3X Rewards"
    },
    {
      id: "travel",
      title: "SBI Yatra Credit Card",
      description: "Best for frequent travelers and forex transactions",
      features: ["Zero forex markup", "Travel rewards points", "Emergency travel assistance"],
      fee: "₹1,499",
      color: "bg-gradient-to-br from-blue-600 to-blue-700",
      eligibility: "Min. ₹50,000 monthly income",
      processingTime: "7-10 working days",
      type: "Credit Card",
      variant: "Yatra",
      popularity: "recommended",
      rewards: "4X Rewards"
    },
    {
      id: "gold-debit",
      title: "SBI Gold Debit Card",
      description: "Premium debit card with exclusive benefits",
      features: ["1% cashback on POS transactions", "Zero liability protection", "Personal accident insurance"],
      fee: "₹499",
      color: "bg-gradient-to-br from-yellow-600 to-yellow-700",
      eligibility: "Min. ₹25,000 average quarterly balance",
      processingTime: "5-7 working days",
      type: "Debit Card",
      variant: "Gold",
      rewards: "1% Cashback"
    },
    {
      id: "classic-debit",
      title: "SBI Classic Debit Card",
      description: "Everyday debit card for seamless transactions",
      features: ["Wide acceptance in India", "Secure online payments", "ATM cash withdrawal"],
      fee: "₹199",
      color: "bg-gradient-to-br from-blue-600 to-blue-700",
      eligibility: "Zero balance savings account",
      processingTime: "5-7 working days",
      type: "Debit Card",
      variant: "Classic",
      rewards: "Zero Liability"
    },
  ];

  const filteredCards = cardApplications.filter(card => {
    if (cardTypeFilter === "all") return true;
    if (cardTypeFilter === "credit") return card.type === "Credit Card";
    if (cardTypeFilter === "debit") return card.type === "Debit Card";
    return true;
  });

  const validateStep = (step: ApplicationStep): boolean => {
    const newErrors: { [key: string]: string } = {};
    if (step === "personal-info") {
      if (!newCardApplication.firstName) newErrors.firstName = "First name is required";
      if (!newCardApplication.lastName) newErrors.lastName = "Last name is required";
      if (!newCardApplication.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newCardApplication.email))
        newErrors.email = "Valid email is required";
      if (!newCardApplication.mobile || !/^[6-9]\d{9}$/.test(newCardApplication.mobile))
        newErrors.mobile = "Valid 10-digit mobile number is required";
      if (!newCardApplication.dob) newErrors.dob = "Date of birth is required";
      if (newCardApplication.pan && !/^[A-Z]{5}\d{4}[A-Z]{1}$/.test(newCardApplication.pan))
        newErrors.pan = "Valid PAN number is required (e.g., ABCDE1234F)";
      if (newCardApplication.aadhaar && !/^\d{12}$/.test(newCardApplication.aadhaar))
        newErrors.aadhaar = "Valid 12-digit Aadhaar number is required";
    } else if (step === "employment-details") {
      if (!newCardApplication.employmentStatus) newErrors.employmentStatus = "Employment status is required";
      if (!newCardApplication.monthlyIncome) newErrors.monthlyIncome = "Monthly income is required";
    } else if (step === "delivery") {
      if (newCardApplication.deliveryOption === "home" && !newCardApplication.deliveryAddress)
        newErrors.deliveryAddress = "Delivery address is required";
      if (newCardApplication.deliveryOption === "home" && !newCardApplication.city)
        newErrors.city = "City is required";
      if (newCardApplication.deliveryOption === "home" && !newCardApplication.state)
        newErrors.state = "State is required";
      if (newCardApplication.deliveryOption === "home" && (!newCardApplication.pincode || !/^\d{6}$/.test(newCardApplication.pincode)))
        newErrors.pincode = "Valid 6-digit pincode is required";
    } else if (step === "review") {
      if (!newCardApplication.termsAccepted) newErrors.termsAccepted = "You must accept the terms and conditions";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setNewCardApplication({
      ...newCardApplication,
      [field]: value,
    });
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const goToNextStep = () => {
    if (validateStep(applicationStep)) {
      const steps: ApplicationStep[] = ["card-selection", "personal-info", "employment-details", "delivery", "review", "confirmation"];
      const currentIndex = steps.indexOf(applicationStep);
      if (currentIndex < steps.length - 1) {
        setApplicationStep(steps[currentIndex + 1]);
      }
    }
  };

  const resetApplication = () => {
    setNewCardApplication({
      type: "",
      variant: "",
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      dob: "",
      pan: "",
      aadhaar: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      employmentStatus: "",
      monthlyIncome: "",
      deliveryAddress: "",
      deliveryOption: "home",
      termsAccepted: false,
    });
    setApplicationStep("card-selection");
    setErrors({});
  };

  const handleApplicationSubmit = async () => {
    if (validateStep("review")) {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        toast({
          title: "Application submitted successfully",
          description: `Your ${newCardApplication.variant} ${newCardApplication.type} application is being processed.`,
          className: "bg-green-50 border-green-200 text-green-800",
        });
        setApplicationStep("confirmation");
      } catch (error) {
        toast({
          title: "Application failed",
          description: "There was an error submitting your application. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const startNewApplication = (cardType: string, cardVariant: string) => {
    setNewCardApplication({
      ...newCardApplication,
      type: cardType,
      variant: cardVariant,
    });
    setApplicationStep("personal-info");
  };

  const renderApplicationStep = () => {
    switch (applicationStep) {
      case "card-selection":
        return (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <CreditCard className="h-12 w-12 text-primary mx-auto mb-2" />
              <h3 className="text-xl font-semibold">Select a Card</h3>
              <p className="text-sm text-muted-foreground">Choose from our range of SBI credit and debit cards</p>
            </div>
            
            <Tabs defaultValue="all" className="w-full" onValueChange={(value) => setCardTypeFilter(value as "all" | "credit" | "debit")}>
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="all">All Cards</TabsTrigger>
                <TabsTrigger value="credit">Credit Cards</TabsTrigger>
                <TabsTrigger value="debit">Debit Cards</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
              {filteredCards.map((application) => (
                <Card
                  key={application.id}
                  className="cursor-pointer transition-all hover:shadow-md border overflow-hidden"
                  onClick={() => startNewApplication(application.type, application.variant)}
                >
                  <CardContent className="p-0">
                    <div className={`${application.color} p-4 text-white`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-lg">{application.title}</h4>
                          <p className="text-sm opacity-90">{application.description}</p>
                        </div>
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                          <CreditCard className="h-5 w-5" />
                        </div>
                      </div>
                      {application.popularity && (
                        <Badge variant="secondary" className="mt-2 bg-white text-gray-800">
                          {application.popularity === "popular" && "🔥 Popular"}
                          {application.popularity === "new" && "🆕 New"}
                          {application.popularity === "recommended" && "⭐ Recommended"}
                        </Badge>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="text-xs text-muted-foreground">Annual Fee</p>
                          <p className="font-semibold">{application.fee}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Rewards</p>
                          <p className="font-semibold text-sm">{application.rewards}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Processing</p>
                          <p className="text-sm">{application.processingTime}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                          {application.type}
                        </span>
                        <Button size="sm" variant="outline" className="h-8 text-xs">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case "personal-info":
        return (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <User className="h-12 w-12 text-primary mx-auto mb-2" />
              <h3 className="text-xl font-semibold">Personal Information</h3>
              <p className="text-sm text-muted-foreground">Please provide your personal details</p>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-medium">First Name *</Label>
                  <Input
                    id="firstName"
                    value={newCardApplication.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    className="h-12"
                  />
                  {errors.firstName && <p className="text-xs text-red-600">{errors.firstName}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-medium">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={newCardApplication.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    className="h-12"
                  />
                  {errors.lastName && <p className="text-xs text-red-600">{errors.lastName}</p>}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium flex items-center gap-1">
                  <Mail className="h-4 w-4" /> Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={newCardApplication.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="h-12"
                />
                {errors.email && <p className="text-xs text-red-600">{errors.email}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="mobile" className="text-sm font-medium flex items-center gap-1">
                  <Phone className="h-4 w-4" /> Mobile Number *
                </Label>
                <Input
                  id="mobile"
                  type="tel"
                  value={newCardApplication.mobile}
                  onChange={(e) => handleInputChange("mobile", e.target.value)}
                  className="h-12"
                  placeholder="e.g., 9876543210"
                />
                {errors.mobile && <p className="text-xs text-red-600">{errors.mobile}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dob" className="text-sm font-medium flex items-center gap-1">
                  <Calendar className="h-4 w-4" /> Date of Birth *
                </Label>
                <Input
                  id="dob"
                  type="date"
                  value={newCardApplication.dob}
                  onChange={(e) => handleInputChange("dob", e.target.value)}
                  className="h-12"
                />
                {errors.dob && <p className="text-xs text-red-600">{errors.dob}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="pan" className="text-sm font-medium">PAN Number (Optional)</Label>
                <Input
                  id="pan"
                  value={newCardApplication.pan}
                  onChange={(e) => handleInputChange("pan", e.target.value.toUpperCase())}
                  className="h-12"
                  placeholder="e.g., ABCDE1234F"
                />
                {errors.pan && <p className="text-xs text-red-600">{errors.pan}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="aadhaar" className="text-sm font-medium">Aadhaar Number (Optional)</Label>
                <Input
                  id="aadhaar"
                  value={newCardApplication.aadhaar}
                  onChange={(e) => handleInputChange("aadhaar", e.target.value)}
                  className="h-12"
                  placeholder="e.g., 123456789012"
                />
                {errors.aadhaar && <p className="text-xs text-red-600">{errors.aadhaar}</p>}
              </div>
            </div>
          </div>
        );

      case "employment-details":
        return (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <Building className="h-12 w-12 text-primary mx-auto mb-2" />
              <h3 className="text-xl font-semibold">Employment Details</h3>
              <p className="text-sm text-muted-foreground">Tell us about your employment status</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="employmentStatus" className="text-sm font-medium flex items-center gap-1">
                  <User className="h-4 w-4" /> Employment Status *
                </Label>
                <Select
                  value={newCardApplication.employmentStatus}
                  onValueChange={(value) => handleInputChange("employmentStatus", value)}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select employment status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="salaried">Sal Bucuresti</SelectItem>
                    <SelectItem value="self-employed">Self-Employed</SelectItem>
                    <SelectItem value="business">Business Owner</SelectItem>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="retired">Retired</SelectItem>
                    <SelectItem value="unemployed">Not Employed</SelectItem>
                  </SelectContent>
                </Select>
                {errors.employmentStatus && <p className="text-xs text-red-600">{errors.employmentStatus}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="monthlyIncome" className="text-sm font-medium flex items-center gap-1">
                  <IndianRupee className="h-4 w-4" /> Monthly Income (₹) *
                </Label>
                <Select
                  value={newCardApplication.monthlyIncome}
                  onValueChange={(value) => handleInputChange("monthlyIncome", value)}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select income range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-20000">Up to ₹20,000</SelectItem>
                    <SelectItem value="20000-50000">₹20,000 - ₹50,000</SelectItem>
                    <SelectItem value="50000-100000">₹50,000 - ₹1,00,000</SelectItem>
                    <SelectItem value="100000-200000">₹1,00,000 - ₹2,00,000</SelectItem>
                    <SelectItem value="200000-500000">₹2,00,000 - ₹5,00,000</SelectItem>
                    <SelectItem value="500000+">Above ₹5,00,000</SelectItem>
                  </SelectContent>
                </Select>
                {errors.monthlyIncome && <p className="text-xs text-red-600">{errors.monthlyIncome}</p>}
              </div>
            </div>
          </div>
        );

      case "delivery":
        return (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <MapPin className="h-12 w-12 text-primary mx-auto mb-2" />
              <h3 className="text-xl font-semibold">Delivery Options</h3>
              <p className="text-sm text-muted-foreground">How would you like to receive your card?</p>
            </div>
            <div className="space-y-4">
              <RadioGroup
                value={newCardApplication.deliveryOption}
                onValueChange={(value) => handleInputChange("deliveryOption", value)}
                className="space-y-3"
              >
                <div className="flex items-center space-x-3 rounded-xl border p-4 hover:border-primary transition-colors">
                  <RadioGroupItem value="home" id="home-delivery" className="h-5 w-5" />
                  <Label htmlFor="home-delivery" className="flex-1 cursor-pointer">
                    <div className="flex justify-between items-center">
                      <span className="font-medium flex items-center gap-2">
                        <Home className="h-4 w-4" /> Home Delivery
                      </span>
                      <span className="text-sm text-primary font-medium">Free</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Delivered to your address in 7-10 working days</p>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 rounded-xl border p-4 hover:border-primary transition-colors">
                  <RadioGroupItem value="branch" id="branch-pickup" className="h-5 w-5" />
                  <Label htmlFor="branch-pickup" className="flex-1 cursor-pointer">
                    <div className="flex justify-between items-center">
                      <span className="font-medium flex items-center gap-2">
                        <Building2 className="h-4 w-4" /> Branch Pickup
                      </span>
                      <span className="text-sm text-primary font-medium">Free</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Collect from your nearest SBI branch in 5-7 working days</p>
                  </Label>
                </div>
              </RadioGroup>
              {newCardApplication.deliveryOption === "home" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="deliveryAddress" className="text-sm font-medium">Delivery Address *</Label>
                    <Input
                      id="deliveryAddress"
                      placeholder="House/Flat No., Street, Locality"
                      value={newCardApplication.deliveryAddress}
                      onChange={(e) => handleInputChange("deliveryAddress", e.target.value)}
                      className="h-12"
                    />
                    {errors.deliveryAddress && <p className="text-xs text-red-600">{errors.deliveryAddress}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-sm font-medium">City *</Label>
                    <Input
                      id="city"
                      value={newCardApplication.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      className="h-12"
                    />
                    {errors.city && <p className="text-xs text-red-600">{errors.city}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state" className="text-sm font-medium">State *</Label>
                    <Select
                      value={newCardApplication.state}
                      onValueChange={(value) => handleInputChange("state", value)}
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Andhra Pradesh">Andhra Pradesh</SelectItem>
                        <SelectItem value="Telangana">Telangana</SelectItem>
                        <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                        <SelectItem value="Karnataka">Karnataka</SelectItem>
                        <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
                        <SelectItem value="Delhi">Delhi</SelectItem>
                        <SelectItem value="West Bengal">West Bengal</SelectItem>
                        <SelectItem value="Uttar Pradesh">Uttar Pradesh</SelectItem>
                        {/* Add more Indian states as needed */}
                      </SelectContent>
                    </Select>
                    {errors.state && <p className="text-xs text-red-600">{errors.state}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pincode" className="text-sm font-medium">Pincode *</Label>
                    <Input
                      id="pincode"
                      value={newCardApplication.pincode}
                      onChange={(e) => handleInputChange("pincode", e.target.value)}
                      className="h-12"
                      placeholder="e.g., 400001"
                    />
                    {errors.pincode && <p className="text-xs text-red-600">{errors.pincode}</p>}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case "review":
        return (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <CheckCircle className="h-12 w-12 text-primary mx-auto mb-2" />
              <h3 className="text-xl font-semibold">Review Application</h3>
              <p className="text-sm text-muted-foreground">Please review your information before submitting</p>
            </div>
            <div className="space-y-4">
              <div className="bg-primary/5 p-4 rounded-xl border border-primary/10">
                <h4 className="font-medium mb-2">Card Details</h4>
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-lg ${
                      newCardApplication.type === "Credit Card" ? "bg-purple-600" : "bg-blue-600"
                    } flex items-center justify-center`}
                  >
                    <CreditCard className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold">SBI {newCardApplication.variant} {newCardApplication.type}</p>
                    <p className="text-sm text-muted-foreground">{newCardApplication.type}</p>
                  </div>
                </div>
              </div>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <User className="h-4 w-4" /> Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Name</p>
                      <p className="font-medium">
                        {newCardApplication.firstName} {newCardApplication.lastName}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Email</p>
                      <p className="font-medium">{newCardApplication.email}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Mobile Number</p>
                      <p className="font-medium">{newCardApplication.mobile}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Date of Birth</p>
                      <p className="font-medium">{newCardApplication.dob}</p>
                    </div>
                    {newCardApplication.pan && (
                      <div>
                        <p className="text-muted-foreground">PAN Number</p>
                        <p className="font-medium">{newCardApplication.pan.replace(/(.{5})(.{4})(.)/, "*****$2*")}</p>
                      </div>
                    )}
                    {newCardApplication.aadhaar && (
                      <div>
                        <p className="text-muted-foreground">Aadhaar Number</p>
                        <p className="font-medium">********{newCardApplication.aadhaar.slice(-4)}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Building className="h-4 w-4" /> Employment Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Employment Status</p>
                      <p className="font-medium capitalize">{newCardApplication.employmentStatus}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Monthly Income</p>
                      <p className="font-medium">{newCardApplication.monthlyIncome}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Truck className="h-4 w-4" /> Delivery Method
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm">
                    <p className="text-muted-foreground">Option</p>
                    <p className="font-medium capitalize">{newCardApplication.deliveryOption} {newCardApplication.deliveryOption === "home" ? "Delivery" : "Pickup"}</p>
                    {newCardApplication.deliveryOption === "home" && newCardApplication.deliveryAddress && (
                      <>
                        <p className="text-muted-foreground mt-2">Address</p>
                        <p className="font-medium">
                          {newCardApplication.deliveryAddress}, {newCardApplication.city}, {newCardApplication.state} - {newCardApplication.pincode}
                        </p>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex items-start space-x-3 pt-2 p-4 bg-muted rounded-xl">
                <Checkbox
                  id="terms"
                  checked={newCardApplication.termsAccepted}
                  onCheckedChange={(checked) => handleInputChange("termsAccepted", checked)}
                  className="h-5 w-5 mt-0.5"
                />
                <Label htmlFor="terms" className="text-sm leading-tight cursor-pointer">
                  I agree to the <span className="text-primary underline">terms and conditions</span> of SBI and confirm that all information provided is accurate.
                </Label>
              </div>
              {errors.termsAccepted && <p className="text-xs text-red-600">{errors.termsAccepted}</p>}
            </div>
          </div>
        );

      case "confirmation":
        return (
          <div className="space-y-6 text-center py-4">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Application Submitted!</h3>
              <p className="text-muted-foreground mt-2">
                Your SBI {newCardApplication.variant} {newCardApplication.type} application is being processed.
              </p>
            </div>
            
            <Card className="bg-muted border-0">
              <CardHeader>
                <CardTitle className="text-base flex items-center justify-center gap-2">
                  <Clock className="h-4 w-4" /> What happens next?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-left">
                  <li className="flex items-start gap-3">
                    <div className="bg-primary/10 rounded-full p-1 mt-0.5">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <span>You'll receive an SMS and email confirmation within 24 hours</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-primary/10 rounded-full p-1 mt-0.5">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <span>KYC verification will be completed in 2-3 working days</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-primary/10 rounded-full p-1 mt-0.5">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <span>Your card will be dispatched within 7-10 working days</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <div className="pt-4">
              <p className="text-sm text-muted-foreground mb-4">
                Track your application status in the SBI Card Management portal.
              </p>
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={resetApplication} 
                  className="flex-1 h-12 rounded-xl"
                >
                  Apply for Another Card
                </Button>
                <Button 
                  onClick={() => navigate("/card-management")} 
                  className="flex-1 h-12 rounded-xl bg-gradient-to-r from-[#134e5e] to-[#71b280]"
                >
                  Done
                </Button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <BankingLayout>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="sticky top-0 z-10 bg-white border-b shadow-sm">
          <div className="flex items-center gap-4 p-4 max-w-md mx-auto w-full">
            <Button variant="ghost" size="icon" onClick={() => navigate("/cards-management")} className="h-9 w-9 rounded-full">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold">
              {applicationStep === "confirmation" ? "Application Complete" : "Apply for New SBI Card"}
            </h1>
          </div>
        </div>
        <div className="flex-1 p-4 pb-20">
          {applicationStep !== "confirmation" && (
            <div className="max-w-md mx-auto w-full">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium">Step {["card-selection", "personal-info", "employment-details", "delivery", "review"].indexOf(applicationStep) + 1} of 5</span>
                <span className="text-sm text-muted-foreground">{applicationProgress}%</span>
              </div>
              <Progress value={applicationProgress} className="mb-6 h-2" />
            </div>
          )}
          <div className="max-w-md mx-auto w-full">{renderApplicationStep()}</div>
        </div>
        {applicationStep !== "confirmation" && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-20">
            <div className="max-w-md mx-auto w-full">
              {applicationStep === "review" ? (
                <Button
                  onClick={handleApplicationSubmit}
                  disabled={!newCardApplication.termsAccepted || isLoading}
                  className="w-full h-12 rounded-xl text-base bg-gradient-to-r from-[#134e5e] to-[#71b280] text-white"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Application
                      <ArrowRight className="h-4 w-4 ml-5" />
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  onClick={goToNextStep}
                  className="w-full h-12 rounded-xl text-base bg-gradient-to-r from-[#134e5e] to-[#71b280] text-white"
                >
                  Continue
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </BankingLayout>
  );
};

export default ApplyNowFlow;

// import { useState, useEffect } from "react";
// import { CreditCard, User, FileText, MapPin, CheckCircle, Check, ArrowRight, ArrowLeft, Loader2, Shield, Lock, Clock, Calendar, Mail, Phone, Building, IndianRupee, Truck, Home, Building2 } from "lucide-react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Progress } from "@/components/ui/progress";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { useToast } from "@/hooks/use-toast";
// import { BankingLayout } from "@/components/BankingLayout";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Badge } from "@/components/ui/badge";

// // Application steps
// type ApplicationStep = "card-selection" | "personal-info" | "employment-details" | "delivery" | "review" | "confirmation";

// const ApplyNowFlow = () => {
//   const navigate = useNavigate();
//   const { state } = useLocation();
//   const { toast } = useToast();
//   const [applicationStep, setApplicationStep] = useState<ApplicationStep>("card-selection");
//   const [applicationProgress, setApplicationProgress] = useState(0);
//   const [isLoading, setIsLoading] = useState(false);
//   const [errors, setErrors] = useState<{ [key: string]: string }>({});
//   const [cardTypeFilter, setCardTypeFilter] = useState<"all" | "credit" | "debit">("all");

//   // New card application state
//   const [newCardApplication, setNewCardApplication] = useState({
//     type: "",
//     variant: "",
//     firstName: "",
//     lastName: "",
//     email: "",
//     mobile: "",
//     dob: "",
//     pan: "",
//     aadhaar: "",
//     address: "",
//     city: "",
//     state: "",
//     pincode: "",
//     employmentStatus: "",
//     monthlyIncome: "",
//     deliveryAddress: "",
//     deliveryOption: "home",
//     termsAccepted: false,
//   });

//   useEffect(() => {
//     // Update progress based on current step
//     const progressValues = {
//       "card-selection": 20,
//       "personal-info": 40,
//       "employment-details": 60,
//       "delivery": 80,
//       "review": 90,
//       "confirmation": 100,
//     };
//     setApplicationProgress(progressValues[applicationStep]);
//   }, [applicationStep]);

//   useEffect(() => {
//     // If a card is pre-selected via navigation state, skip the card selection step
//     if (state?.selectedCard) {
//       setNewCardApplication({
//         ...newCardApplication,
//         type: state.selectedCard.type,
//         variant: state.selectedCard.variant,
//       });
//       setApplicationStep("personal-info");
//     }
//   }, [state]);

//   const cardApplications = [
//     {
//       id: "premium",
//       title: "SBI Elite Credit Card",
//       description: "Premium lifestyle card with exclusive rewards",
//       features: ["5% cashback on dining", "Free airport lounge access", "Travel insurance up to ₹1 crore"],
//       fee: "₹4,999",
//       color: "bg-gradient-to-br from-purple-600 to-purple-700",
//       eligibility: "Min. ₹1,00,000 monthly income",
//       processingTime: "7-10 working days",
//       type: "Credit Card",
//       variant: "Elite",
//       popularity: "popular",
//       rewards: "5X Rewards"
//     },
//     {
//       id: "business",
//       title: "SBI Business Credit Card",
//       description: "Ideal for business expenses and GST benefits",
//       features: ["Business expense tracking", "Higher credit limits", "GST input credit"],
//       fee: "₹2,999",
//       color: "bg-gradient-to-br from-green-600 to-green-700",
//       eligibility: "Registered business with GSTIN",
//       processingTime: "7-14 working days",
//       type: "Credit Card",
//       variant: "Business",
//       popularity: "new",
//       rewards: "3X Rewards"
//     },
//     {
//       id: "travel",
//       title: "SBI Yatra Credit Card",
//       description: "Best for frequent travelers and forex transactions",
//       features: ["Zero forex markup", "Travel rewards points", "Emergency travel assistance"],
//       fee: "₹1,499",
//       color: "bg-gradient-to-br from-blue-600 to-blue-700",
//       eligibility: "Min. ₹50,000 monthly income",
//       processingTime: "7-10 working days",
//       type: "Credit Card",
//       variant: "Yatra",
//       popularity: "recommended",
//       rewards: "4X Rewards"
//     },
//     {
//       id: "gold-debit",
//       title: "SBI Gold Debit Card",
//       description: "Premium debit card with exclusive benefits",
//       features: ["1% cashback on POS transactions", "Zero liability protection", "Personal accident insurance"],
//       fee: "₹499",
//       color: "bg-gradient-to-br from-yellow-600 to-yellow-700",
//       eligibility: "Min. ₹25,000 average quarterly balance",
//       processingTime: "5-7 working days",
//       type: "Debit Card",
//       variant: "Gold",
//       rewards: "1% Cashback"
//     },
//     {
//       id: "classic-debit",
//       title: "SBI Classic Debit Card",
//       description: "Everyday debit card for seamless transactions",
//       features: ["Wide acceptance in India", "Secure online payments", "ATM cash withdrawal"],
//       fee: "₹199",
//       color: "bg-gradient-to-br from-blue-600 to-blue-700",
//       eligibility: "Zero balance savings account",
//       processingTime: "5-7 working days",
//       type: "Debit Card",
//       variant: "Classic",
//       rewards: "Zero Liability"
//     },
//   ];

//   const filteredCards = cardApplications.filter(card => {
//     if (cardTypeFilter === "all") return true;
//     if (cardTypeFilter === "credit") return card.type === "Credit Card";
//     if (cardTypeFilter === "debit") return card.type === "Debit Card";
//     return true;
//   });

//   const validateStep = (step: ApplicationStep): boolean => {
//     const newErrors: { [key: string]: string } = {};
//     if (step === "personal-info") {
//       if (!newCardApplication.firstName) newErrors.firstName = "First name is required";
//       if (!newCardApplication.lastName) newErrors.lastName = "Last name is required";
//       if (!newCardApplication.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newCardApplication.email))
//         newErrors.email = "Valid email is required";
//       if (!newCardApplication.mobile || !/^[6-9]\d{9}$/.test(newCardApplication.mobile))
//         newErrors.mobile = "Valid 10-digit mobile number is required";
//       if (!newCardApplication.dob) newErrors.dob = "Date of birth is required";
//       if (newCardApplication.pan && !/^[A-Z]{5}\d{4}[A-Z]{1}$/.test(newCardApplication.pan))
//         newErrors.pan = "Valid PAN number is required (e.g., ABCDE1234F)";
//       if (newCardApplication.aadhaar && !/^\d{12}$/.test(newCardApplication.aadhaar))
//         newErrors.aadhaar = "Valid 12-digit Aadhaar number is required";
//     } else if (step === "employment-details") {
//       if (!newCardApplication.employmentStatus) newErrors.employmentStatus = "Employment status is required";
//       if (!newCardApplication.monthlyIncome) newErrors.monthlyIncome = "Monthly income is required";
//     } else if (step === "delivery") {
//       if (newCardApplication.deliveryOption === "home" && !newCardApplication.deliveryAddress)
//         newErrors.deliveryAddress = "Delivery address is required";
//       if (newCardApplication.deliveryOption === "home" && !newCardApplication.city)
//         newErrors.city = "City is required";
//       if (newCardApplication.deliveryOption === "home" && !newCardApplication.state)
//         newErrors.state = "State is required";
//       if (newCardApplication.deliveryOption === "home" && (!newCardApplication.pincode || !/^\d{6}$/.test(newCardApplication.pincode)))
//         newErrors.pincode = "Valid 6-digit pincode is required";
//     } else if (step === "review") {
//       if (!newCardApplication.termsAccepted) newErrors.termsAccepted = "You must accept the terms and conditions";
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleInputChange = (field: string, value: string | boolean) => {
//     setNewCardApplication({
//       ...newCardApplication,
//       [field]: value,
//     });
//     setErrors((prev) => ({ ...prev, [field]: "" }));
//   };

//   const goToNextStep = () => {
//     if (validateStep(applicationStep)) {
//       const steps: ApplicationStep[] = ["card-selection", "personal-info", "employment-details", "delivery", "review", "confirmation"];
//       const currentIndex = steps.indexOf(applicationStep);
//       if (currentIndex < steps.length - 1) {
//         setApplicationStep(steps[currentIndex + 1]);
//       }
//     }
//   };

//   const goToPreviousStep = () => {
//     const steps: ApplicationStep[] = ["card-selection", "personal-info", "employment-details", "delivery", "review", "confirmation"];
//     const currentIndex = steps.indexOf(applicationStep);
//     if (currentIndex > 0) {
//       setApplicationStep(steps[currentIndex - 1]);
//     } else {
//       navigate("/card-management");
//     }
//   };

//   const resetApplication = () => {
//     setNewCardApplication({
//       type: "",
//       variant: "",
//       firstName: "",
//       lastName: "",
//       email: "",
//       mobile: "",
//       dob: "",
//       pan: "",
//       aadhaar: "",
//       address: "",
//       city: "",
//       state: "",
//       pincode: "",
//       employmentStatus: "",
//       monthlyIncome: "",
//       deliveryAddress: "",
//       deliveryOption: "home",
//       termsAccepted: false,
//     });
//     setApplicationStep("card-selection");
//     setErrors({});
//   };

//   const handleApplicationSubmit = async () => {
//     if (validateStep("review")) {
//       setIsLoading(true);
//       try {
//         await new Promise((resolve) => setTimeout(resolve, 2000));
//         toast({
//           title: "Application submitted successfully",
//           description: `Your ${newCardApplication.variant} ${newCardApplication.type} application is being processed.`,
//           className: "bg-green-50 border-green-200 text-green-800",
//         });
//         setApplicationStep("confirmation");
//       } catch (error) {
//         toast({
//           title: "Application failed",
//           description: "There was an error submitting your application. Please try again.",
//           variant: "destructive",
//         });
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   const startNewApplication = (cardType: string, cardVariant: string) => {
//     setNewCardApplication({
//       ...newCardApplication,
//       type: cardType,
//       variant: cardVariant,
//     });
//     setApplicationStep("personal-info");
//   };

//   const renderApplicationStep = () => {
//     switch (applicationStep) {
//       case "card-selection":
//         return (
//           <div className="space-y-4">
//             <div className="text-center mb-4">
//               <CreditCard className="h-12 w-12 text-primary mx-auto mb-2" />
//               <h3 className="text-xl font-semibold">Select a Card</h3>
//               <p className="text-sm text-muted-foreground">Choose from our range of SBI credit and debit cards</p>
//             </div>
            
//             <Tabs defaultValue="all" className="w-full" onValueChange={(value) => setCardTypeFilter(value as "all" | "credit" | "debit")}>
//               <TabsList className="grid w-full grid-cols-3 mb-4">
//                 <TabsTrigger value="all">All Cards</TabsTrigger>
//                 <TabsTrigger value="credit">Credit Cards</TabsTrigger>
//                 <TabsTrigger value="debit">Debit Cards</TabsTrigger>
//               </TabsList>
//             </Tabs>
            
//             <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
//               {filteredCards.map((application) => (
//                 <Card
//                   key={application.id}
//                   className="cursor-pointer transition-all hover:shadow-md border overflow-hidden"
//                   onClick={() => startNewApplication(application.type, application.variant)}
//                 >
//                   <CardContent className="p-0">
//                     <div className={`${application.color} p-4 text-white`}>
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <h4 className="font-semibold text-lg">{application.title}</h4>
//                           <p className="text-sm opacity-90">{application.description}</p>
//                         </div>
//                         <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
//                           <CreditCard className="h-5 w-5" />
//                         </div>
//                       </div>
//                       {application.popularity && (
//                         <Badge variant="secondary" className="mt-2 bg-white text-gray-800">
//                           {application.popularity === "popular" && "🔥 Popular"}
//                           {application.popularity === "new" && "🆕 New"}
//                           {application.popularity === "recommended" && "⭐ Recommended"}
//                         </Badge>
//                       )}
//                     </div>
//                     <div className="p-4">
//                       <div className="flex items-center justify-between mb-3">
//                         <div>
//                           <p className="text-xs text-muted-foreground">Annual Fee</p>
//                           <p className="font-semibold">{application.fee}</p>
//                         </div>
//                         <div>
//                           <p className="text-xs text-muted-foreground">Rewards</p>
//                           <p className="font-semibold text-sm">{application.rewards}</p>
//                         </div>
//                         <div>
//                           <p className="text-xs text-muted-foreground">Processing</p>
//                           <p className="text-sm">{application.processingTime}</p>
//                         </div>
//                       </div>
//                       <div className="flex items-center justify-between">
//                         <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
//                           {application.type}
//                         </span>
//                         <Button size="sm" variant="outline" className="h-8 text-xs">
//                           View Details
//                         </Button>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </div>
//         );

//       case "personal-info":
//         return (
//           <div className="space-y-4">
//             <div className="text-center mb-4">
//               <User className="h-12 w-12 text-primary mx-auto mb-2" />
//               <h3 className="text-xl font-semibold">Personal Information</h3>
//               <p className="text-sm text-muted-foreground">Please provide your personal details</p>
//             </div>
//             <div className="space-y-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="firstName" className="text-sm font-medium">First Name *</Label>
//                   <Input
//                     id="firstName"
//                     value={newCardApplication.firstName}
//                     onChange={(e) => handleInputChange("firstName", e.target.value)}
//                     className="h-12"
//                   />
//                   {errors.firstName && <p className="text-xs text-red-600">{errors.firstName}</p>}
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="lastName" className="text-sm font-medium">Last Name *</Label>
//                   <Input
//                     id="lastName"
//                     value={newCardApplication.lastName}
//                     onChange={(e) => handleInputChange("lastName", e.target.value)}
//                     className="h-12"
//                   />
//                   {errors.lastName && <p className="text-xs text-red-600">{errors.lastName}</p>}
//                 </div>
//               </div>
              
//               <div className="space-y-2">
//                 <Label htmlFor="email" className="text-sm font-medium flex items-center gap-1">
//                   <Mail className="h-4 w-4" /> Email Address *
//                 </Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   value={newCardApplication.email}
//                   onChange={(e) => handleInputChange("email", e.target.value)}
//                   className="h-12"
//                 />
//                 {errors.email && <p className="text-xs text-red-600">{errors.email}</p>}
//               </div>
              
//               <div className="space-y-2">
//                 <Label htmlFor="mobile" className="text-sm font-medium flex items-center gap-1">
//                   <Phone className="h-4 w-4" /> Mobile Number *
//                 </Label>
//                 <Input
//                   id="mobile"
//                   type="tel"
//                   value={newCardApplication.mobile}
//                   onChange={(e) => handleInputChange("mobile", e.target.value)}
//                   className="h-12"
//                   placeholder="e.g., 9876543210"
//                 />
//                 {errors.mobile && <p className="text-xs text-red-600">{errors.mobile}</p>}
//               </div>
              
//               <div className="space-y-2">
//                 <Label htmlFor="dob" className="text-sm font-medium flex items-center gap-1">
//                   <Calendar className="h-4 w-4" /> Date of Birth *
//                 </Label>
//                 <Input
//                   id="dob"
//                   type="date"
//                   value={newCardApplication.dob}
//                   onChange={(e) => handleInputChange("dob", e.target.value)}
//                   className="h-12"
//                 />
//                 {errors.dob && <p className="text-xs text-red-600">{errors.dob}</p>}
//               </div>
              
//               <div className="space-y-2">
//                 <Label htmlFor="pan" className="text-sm font-medium">PAN Number (Optional)</Label>
//                 <Input
//                   id="pan"
//                   value={newCardApplication.pan}
//                   onChange={(e) => handleInputChange("pan", e.target.value.toUpperCase())}
//                   className="h-12"
//                   placeholder="e.g., ABCDE1234F"
//                 />
//                 {errors.pan && <p className="text-xs text-red-600">{errors.pan}</p>}
//               </div>
              
//               <div className="space-y-2">
//                 <Label htmlFor="aadhaar" className="text-sm font-medium">Aadhaar Number (Optional)</Label>
//                 <Input
//                   id="aadhaar"
//                   value={newCardApplication.aadhaar}
//                   onChange={(e) => handleInputChange("aadhaar", e.target.value)}
//                   className="h-12"
//                   placeholder="e.g., 123456789012"
//                 />
//                 {errors.aadhaar && <p className="text-xs text-red-600">{errors.aadhaar}</p>}
//               </div>
//             </div>
//             <div className="flex justify-between pt-6">
            
//               <Button onClick={goToNextStep} className="h-12 rounded-xl">
//                 Continue <ArrowRight className="h-4 w-4 ml-2" />
//               </Button>
//             </div>
//           </div>
//         );

//       case "employment-details":
//         return (
//           <div className="space-y-4">
//             <div className="text-center mb-4">
//               <Building className="h-12 w-12 text-primary mx-auto mb-2" />
//               <h3 className="text-xl font-semibold">Employment Details</h3>
//               <p className="text-sm text-muted-foreground">Tell us about your employment status</p>
//             </div>
//             <div className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="employmentStatus" className="text-sm font-medium flex items-center gap-1">
//                   <User className="h-4 w-4" /> Employment Status *
//                 </Label>
//                 <Select
//                   value={newCardApplication.employmentStatus}
//                   onValueChange={(value) => handleInputChange("employmentStatus", value)}
//                 >
//                   <SelectTrigger className="h-12">
//                     <SelectValue placeholder="Select employment status" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="salaried">Salaried</SelectItem>
//                     <SelectItem value="self-employed">Self-Employed</SelectItem>
//                     <SelectItem value="business">Business Owner</SelectItem>
//                     <SelectItem value="student">Student</SelectItem>
//                     <SelectItem value="retired">Retired</SelectItem>
//                     <SelectItem value="unemployed">Not Employed</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 {errors.employmentStatus && <p className="text-xs text-red-600">{errors.employmentStatus}</p>}
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="monthlyIncome" className="text-sm font-medium flex items-center gap-1">
//                   <IndianRupee className="h-4 w-4" /> Monthly Income (₹) *
//                 </Label>
//                 <Select
//                   value={newCardApplication.monthlyIncome}
//                   onValueChange={(value) => handleInputChange("monthlyIncome", value)}
//                 >
//                   <SelectTrigger className="h-12">
//                     <SelectValue placeholder="Select income range" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="0-20000">Up to ₹20,000</SelectItem>
//                     <SelectItem value="20000-50000">₹20,000 - ₹50,000</SelectItem>
//                     <SelectItem value="50000-100000">₹50,000 - ₹1,00,000</SelectItem>
//                     <SelectItem value="100000-200000">₹1,00,000 - ₹2,00,000</SelectItem>
//                     <SelectItem value="200000-500000">₹2,00,000 - ₹5,00,000</SelectItem>
//                     <SelectItem value="500000+">Above ₹5,00,000</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 {errors.monthlyIncome && <p className="text-xs text-red-600">{errors.monthlyIncome}</p>}
//               </div>
//             </div>
//             <div className="flex justify-between pt-6">
//               <Button variant="outline" onClick={goToPreviousStep} className="h-12 rounded-xl">
//                 Back
//               </Button>
//               <Button onClick={goToNextStep} className="h-12 rounded-xl">
//                 Continue <ArrowRight className="h-4 w-4 ml-2" />
//               </Button>
//             </div>
//           </div>
//         );

//       case "delivery":
//         return (
//           <div className="space-y-4">
//             <div className="text-center mb-4">
//               <MapPin className="h-12 w-12 text-primary mx-auto mb-2" />
//               <h3 className="text-xl font-semibold">Delivery Options</h3>
//               <p className="text-sm text-muted-foreground">How would you like to receive your card?</p>
//             </div>
//             <div className="space-y-4">
//               <RadioGroup
//                 value={newCardApplication.deliveryOption}
//                 onValueChange={(value) => handleInputChange("deliveryOption", value)}
//                 className="space-y-3"
//               >
//                 <div className="flex items-center space-x-3 rounded-xl border p-4 hover:border-primary transition-colors">
//                   <RadioGroupItem value="home" id="home-delivery" className="h-5 w-5" />
//                   <Label htmlFor="home-delivery" className="flex-1 cursor-pointer">
//                     <div className="flex justify-between items-center">
//                       <span className="font-medium flex items-center gap-2">
//                         <Home className="h-4 w-4" /> Home Delivery
//                       </span>
//                       <span className="text-sm text-primary font-medium">Free</span>
//                     </div>
//                     <p className="text-sm text-muted-foreground mt-1">Delivered to your address in 7-10 working days</p>
//                   </Label>
//                 </div>
//                 <div className="flex items-center space-x-3 rounded-xl border p-4 hover:border-primary transition-colors">
//                   <RadioGroupItem value="branch" id="branch-pickup" className="h-5 w-5" />
//                   <Label htmlFor="branch-pickup" className="flex-1 cursor-pointer">
//                     <div className="flex justify-between items-center">
//                       <span className="font-medium flex items-center gap-2">
//                         <Building2 className="h-4 w-4" /> Branch Pickup
//                       </span>
//                       <span className="text-sm text-primary font-medium">Free</span>
//                     </div>
//                     <p className="text-sm text-muted-foreground mt-1">Collect from your nearest SBI branch in 5-7 working days</p>
//                   </Label>
//                 </div>
//               </RadioGroup>
//               {newCardApplication.deliveryOption === "home" && (
//                 <div className="space-y-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="deliveryAddress" className="text-sm font-medium">Delivery Address *</Label>
//                     <Input
//                       id="deliveryAddress"
//                       placeholder="House/Flat No., Street, Locality"
//                       value={newCardApplication.deliveryAddress}
//                       onChange={(e) => handleInputChange("deliveryAddress", e.target.value)}
//                       className="h-12"
//                     />
//                     {errors.deliveryAddress && <p className="text-xs text-red-600">{errors.deliveryAddress}</p>}
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="city" className="text-sm font-medium">City *</Label>
//                     <Input
//                       id="city"
//                       value={newCardApplication.city}
//                       onChange={(e) => handleInputChange("city", e.target.value)}
//                       className="h-12"
//                     />
//                     {errors.city && <p className="text-xs text-red-600">{errors.city}</p>}
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="state" className="text-sm font-medium">State *</Label>
//                     <Select
//                       value={newCardApplication.state}
//                       onValueChange={(value) => handleInputChange("state", value)}
//                     >
//                       <SelectTrigger className="h-12">
//                         <SelectValue placeholder="Select state" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="Andhra Pradesh">Andhra Pradesh</SelectItem>
//                         <SelectItem value="Telangana">Telangana</SelectItem>
//                         <SelectItem value="Maharashtra">Maharashtra</SelectItem>
//                         <SelectItem value="Karnataka">Karnataka</SelectItem>
//                         <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
//                         <SelectItem value="Delhi">Delhi</SelectItem>
//                         <SelectItem value="West Bengal">West Bengal</SelectItem>
//                         <SelectItem value="Uttar Pradesh">Uttar Pradesh</SelectItem>
//                         {/* Add more Indian states as needed */}
//                       </SelectContent>
//                     </Select>
//                     {errors.state && <p className="text-xs text-red-600">{errors.state}</p>}
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="pincode" className="text-sm font-medium">Pincode *</Label>
//                     <Input
//                       id="pincode"
//                       value={newCardApplication.pincode}
//                       onChange={(e) => handleInputChange("pincode", e.target.value)}
//                       className="h-12"
//                       placeholder="e.g., 400001"
//                     />
//                     {errors.pincode && <p className="text-xs text-red-600">{errors.pincode}</p>}
//                   </div>
//                 </div>
//               )}
//             </div>
//             <div className="flex justify-between pt-6">
//               <Button variant="outline" onClick={goToPreviousStep} className="h-12 rounded-xl">
//                 Back
//               </Button>
//               <Button onClick={goToNextStep} className="h-12 rounded-xl">
//                 Continue <ArrowRight className="h-4 w-4 ml-2" />
//               </Button>
//             </div>
//           </div>
//         );

//       case "review":
//         return (
//           <div className="space-y-4">
//             <div className="text-center mb-4">
//               <CheckCircle className="h-12 w-12 text-primary mx-auto mb-2" />
//               <h3 className="text-xl font-semibold">Review Application</h3>
//               <p className="text-sm text-muted-foreground">Please review your information before submitting</p>
//             </div>
//             <div className="space-y-4">
//               <div className="bg-primary/5 p-4 rounded-xl border border-primary/10">
//                 <h4 className="font-medium mb-2">Card Details</h4>
//                 <div className="flex items-center gap-3">
//                   <div
//                     className={`w-12 h-12 rounded-lg ${
//                       newCardApplication.type === "Credit Card" ? "bg-purple-600" : "bg-blue-600"
//                     } flex items-center justify-center`}
//                   >
//                     <CreditCard className="h-6 w-6 text-white" />
//                   </div>
//                   <div>
//                     <p className="font-semibold">SBI {newCardApplication.variant} {newCardApplication.type}</p>
//                     <p className="text-sm text-muted-foreground">{newCardApplication.type}</p>
//                   </div>
//                 </div>
//               </div>
              
//               <Card>
//                 <CardHeader className="pb-3">
//                   <CardTitle className="text-base flex items-center gap-2">
//                     <User className="h-4 w-4" /> Personal Information
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-3">
//                   <div className="grid grid-cols-2 gap-4 text-sm">
//                     <div>
//                       <p className="text-muted-foreground">Name</p>
//                       <p className="font-medium">
//                         {newCardApplication.firstName} {newCardApplication.lastName}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-muted-foreground">Email</p>
//                       <p className="font-medium">{newCardApplication.email}</p>
//                     </div>
//                     <div>
//                       <p className="text-muted-foreground">Mobile Number</p>
//                       <p className="font-medium">{newCardApplication.mobile}</p>
//                     </div>
//                     <div>
//                       <p className="text-muted-foreground">Date of Birth</p>
//                       <p className="font-medium">{newCardApplication.dob}</p>
//                     </div>
//                     {newCardApplication.pan && (
//                       <div>
//                         <p className="text-muted-foreground">PAN Number</p>
//                         <p className="font-medium">{newCardApplication.pan.replace(/(.{5})(.{4})(.)/, "*****$2*")}</p>
//                       </div>
//                     )}
//                     {newCardApplication.aadhaar && (
//                       <div>
//                         <p className="text-muted-foreground">Aadhaar Number</p>
//                         <p className="font-medium">********{newCardApplication.aadhaar.slice(-4)}</p>
//                       </div>
//                     )}
//                   </div>
//                 </CardContent>
//               </Card>
              
//               <Card>
//                 <CardHeader className="pb-3">
//                   <CardTitle className="text-base flex items-center gap-2">
//                     <Building className="h-4 w-4" /> Employment Details
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="grid grid-cols-2 gap-4 text-sm">
//                     <div>
//                       <p className="text-muted-foreground">Employment Status</p>
//                       <p className="font-medium capitalize">{newCardApplication.employmentStatus}</p>
//                     </div>
//                     <div>
//                       <p className="text-muted-foreground">Monthly Income</p>
//                       <p className="font-medium">{newCardApplication.monthlyIncome}</p>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
              
//               <Card>
//                 <CardHeader className="pb-3">
//                   <CardTitle className="text-base flex items-center gap-2">
//                     <Truck className="h-4 w-4" /> Delivery Method
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-sm">
//                     <p className="text-muted-foreground">Option</p>
//                     <p className="font-medium capitalize">{newCardApplication.deliveryOption} {newCardApplication.deliveryOption === "home" ? "Delivery" : "Pickup"}</p>
//                     {newCardApplication.deliveryOption === "home" && newCardApplication.deliveryAddress && (
//                       <>
//                         <p className="text-muted-foreground mt-2">Address</p>
//                         <p className="font-medium">
//                           {newCardApplication.deliveryAddress}, {newCardApplication.city}, {newCardApplication.state} - {newCardApplication.pincode}
//                         </p>
//                       </>
//                     )}
//                   </div>
//                 </CardContent>
//               </Card>
              
//               <div className="flex items-start space-x-3 pt-2 p-4 bg-muted rounded-xl">
//                 <Checkbox
//                   id="terms"
//                   checked={newCardApplication.termsAccepted}
//                   onCheckedChange={(checked) => handleInputChange("termsAccepted", checked)}
//                   className="h-5 w-5 mt-0.5"
//                 />
//                 <Label htmlFor="terms" className="text-sm leading-tight cursor-pointer">
//                   I agree to the <span className="text-primary underline">terms and conditions</span> of SBI and confirm that all information provided is accurate.
//                 </Label>
//               </div>
//               {errors.termsAccepted && <p className="text-xs text-red-600">{errors.termsAccepted}</p>}
//             </div>
//             <div className="flex justify-between pt-6">
//               <Button variant="outline" onClick={goToPreviousStep} className="h-12 rounded-xl">
//                 Back
//               </Button>
//               <Button
//                 onClick={handleApplicationSubmit}
//                 disabled={!newCardApplication.termsAccepted || isLoading}
//                 className="h-12 rounded-xl"
//               >
//                 {isLoading ? (
//                   <>
//                     <Loader2 className="h-4 w-4 mr-2 animate-spin" />
//                     Submitting...
//                   </>
//                 ) : (
//                   "Submit Application"
//                 )}
//               </Button>
//             </div>
//           </div>
//         );

//       case "confirmation":
//         return (
//           <div className="space-y-6 text-center py-4">
//             <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
//               <CheckCircle className="h-10 w-10 text-green-600" />
//             </div>
//             <div>
//               <h3 className="text-xl font-semibold">Application Submitted!</h3>
//               <p className="text-muted-foreground mt-2">
//                 Your SBI {newCardApplication.variant} {newCardApplication.type} application is being processed.
//               </p>
//             </div>
            
//             <Card className="bg-muted border-0">
//               <CardHeader>
//                 <CardTitle className="text-base flex items-center justify-center gap-2">
//                   <Clock className="h-4 w-4" /> What happens next?
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <ul className="space-y-3 text-sm text-left">
//                   <li className="flex items-start gap-3">
//                     <div className="bg-primary/10 rounded-full p-1 mt-0.5">
//                       <Check className="h-3 w-3 text-primary" />
//                     </div>
//                     <span>You'll receive an SMS and email confirmation within 24 hours</span>
//                   </li>
//                   <li className="flex items-start gap-3">
//                     <div className="bg-primary/10 rounded-full p-1 mt-0.5">
//                       <Check className="h-3 w-3 text-primary" />
//                     </div>
//                     <span>KYC verification will be completed in 2-3 working days</span>
//                   </li>
//                   <li className="flex items-start gap-3">
//                     <div className="bg-primary/10 rounded-full p-1 mt-0.5">
//                       <Check className="h-3 w-3 text-primary" />
//                     </div>
//                     <span>Your card will be dispatched within 7-10 working days</span>
//                   </li>
//                 </ul>
//               </CardContent>
//             </Card>
            
//             <div className="pt-4">
//               <p className="text-sm text-muted-foreground mb-4">
//                 Track your application status in the SBI Card Management portal.
//               </p>
//               <div className="flex gap-3">
//                 <Button 
//                   variant="outline" 
//                   onClick={resetApplication} 
//                   className="flex-1 h-12 rounded-xl"
//                 >
//                   Apply for Another Card
//                 </Button>
//                 <Button 
//                   onClick={() => navigate("/card-management")} 
//                   className="flex-1 h-12 rounded-xl"
//                 >
//                   Done
//                 </Button>
//               </div>
//             </div>
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <BankingLayout>
//       <div className="min-h-screen bg-gray-50">
//         <div className="sticky top-0 z-10 bg-white border-b shadow-sm">
//           <div className="flex items-center gap-4 p-4 max-w-md mx-auto w-full">
//             <Button variant="ghost" size="icon" onClick={() => navigate("/card-management")} className="h-9 w-9 rounded-full">
//               <ArrowLeft className="h-5 w-5" />
//             </Button>
//             <h1 className="text-xl font-semibold">
//               {applicationStep === "confirmation" ? "Application Complete" : "Apply for New SBI Card"}
//             </h1>
//           </div>
//         </div>
//         <div className="p-4 space-y-4 pb-20">
//           {applicationStep !== "confirmation" && (
//             <div className="max-w-md mx-auto w-full">
//               <div className="flex items-center justify-between mb-4">
//                 <span className="text-sm font-medium">Step {["card-selection", "personal-info", "employment-details", "delivery", "review"].indexOf(applicationStep) + 1} of 5</span>
//                 <span className="text-sm text-muted-foreground">{applicationProgress}%</span>
//               </div>
//               <Progress value={applicationProgress} className="mb-6 h-2" />
//             </div>
//           )}
//           <div className="max-w-md mx-auto w-full">{renderApplicationStep()}</div>
//         </div>
//       </div>
//     </BankingLayout>
//   );
// };

// export default ApplyNowFlow;



