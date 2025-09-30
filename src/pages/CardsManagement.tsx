// import { useState, useEffect } from "react";
// import { ArrowLeft, CreditCard, Plus, Eye, EyeOff, Lock, Unlock, FileText, Gift, Phone, AlertCircle, CheckCircle, Loader2, ChevronDown, ChevronUp, MoreHorizontal, Key, BarChart3, Calendar, Coins, Shield, Info } from "lucide-react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { BankingLayout } from "@/components/BankingLayout";
// import { useToast } from "@/hooks/use-toast";
// import { Skeleton } from "@/components/ui/skeleton";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
// import { PinAuth } from "@/components/auth/PinAuth";
// import { Switch } from "@/components/ui/switch";
// import { Progress } from "@/components/ui/progress";
// import { PinChange } from "@/components/auth/PinChange";
// import { BottomNavigation } from "@/components/BottomNavigation";

// type CardType = {
//   id: number;
//   name: string;
//   number: string;
//   type: "Credit Card" | "Debit Card";
//   variant: string;
//   status: "Active" | "Blocked" | "Expired";
//   limit: string;
//   available: string;
//   expiryDate: string;
//   rewardPoints: number;
//   color: string;
//   cvv?: string;
//   pinSet?: boolean;
//   internationalEnabled?: boolean;
//   onlineEnabled?: boolean;
//   contactlessEnabled?: boolean;
//   spendingLimit?: number;
//   currentSpending?: number;
//   cardDesign?: string;
//   issuer?: string;
//   cardNetwork?: "Visa" | "Mastercard" | "RuPay";
//   billingDate?: string;
//   dueDate?: string;
//   minimumDue?: string;
// };

// const CardManagement = () => {
//   const navigate = useNavigate();
//   const { toast } = useToast();
//   const location = useLocation();
//   const [loading, setLoading] = useState(true);
//   const [showCardDetails, setShowCardDetails] = useState<{ [key: string]: boolean }>({});
//   const [expandedCard, setExpandedCard] = useState<number | null>(null);
//   const [selectedCard, setSelectedCard] = useState<CardType | null>(null);
//   const [actionLoading, setActionLoading] = useState(false);
//   const [pinAuthOpen, setPinAuthOpen] = useState(false);
//   const [pinChangeOpen, setPinChangeOpen] = useState(false);
//   const [pinAuthAction, setPinAuthAction] = useState<"block" | "unblock" | null>(null);
//   const [activeTab, setActiveTab] = useState("my-cards");

//   const [cards, setCards] = useState<CardType[]>([]);

//   useEffect(() => {
//     // Simulate API fetch
//     const fetchCards = async () => {
//       try {
//         setLoading(true);
//         const mockCards: CardType[] = [
//           {
//             id: 1,
//             name: "PSB Platinum Rewards",
//             number: "4532 1234 5678 9012",
//             type: "Credit Card",
//             variant: "Platinum",
//             status: "Active",
//             limit: "₹5,00,000",
//             available: "₹4,25,000",
//             expiryDate: "12/28",
//             rewardPoints: 15420,
//             color: "bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800",
//             cvv: "123",
//             pinSet: true,
//             internationalEnabled: true,
//             onlineEnabled: true,
//             contactlessEnabled: true,
//             spendingLimit: 500000,
//             currentSpending: 75000,
//             cardDesign: "premium",
//             issuer: "PSB",
//             cardNetwork: "Visa",
//             billingDate: "15th of each month",
//             dueDate: "5th of each month",
//             minimumDue: "₹2,000"
//           },
//           {
//             id: 2,
//             name: "PSB Gold Debit",
//             number: "5678 9012 3456 7890",
//             type: "Debit Card",
//             variant: "Gold",
//             status: "Active",
//             limit: "₹2,00,000",
//             available: "₹1,80,000",
//             expiryDate: "06/27",
//             rewardPoints: 8750,
//             color: "bg-gradient-to-br from-amber-600 to-yellow-500",
//             cvv: "456",
//             pinSet: false,
//             internationalEnabled: false,
//             onlineEnabled: true,
//             contactlessEnabled: true,
//             spendingLimit: 200000,
//             currentSpending: 20000,
//             cardDesign: "gold",
//             issuer: "PSB",
//             cardNetwork: "Mastercard",
//           },
//           {
//             id: 3,
//             name: "PSB Classic",
//             number: "1234 5678 9012 3456",
//             type: "Debit Card",
//             variant: "Classic",
//             status: "Blocked",
//             limit: "₹50,000",
//             available: "₹45,000",
//             expiryDate: "03/26",
//             rewardPoints: 320,
//             color: "bg-gradient-to-br from-blue-700 to-blue-500",
//             cvv: "789",
//             pinSet: true,
//             internationalEnabled: false,
//             onlineEnabled: false,
//             contactlessEnabled: false,
//             spendingLimit: 50000,
//             currentSpending: 5000,
//             cardDesign: "classic",
//             issuer: "PSB",
//             cardNetwork: "RuPay",
//           },
//         ];
//         setCards(mockCards);
//         setLoading(false);
//       } catch (error) {
//         toast({
//           title: "Error loading cards",
//           description: "Failed to fetch your card details. Please try again.",
//           variant: "destructive",
//         });
//         setLoading(false);
//       }
//     };

//     fetchCards();
//   }, [toast]);

//   const cardServices = [
//     { title: "Block/Unblock Card", icon: <Lock className="h-4 w-4" />, color: "bg-red-50 text-red-600", action: "block" },
//     { title: "Set/Change PIN", icon: <Key className="h-4 w-4" />, color: "bg-blue-50 text-blue-600", action: "pin" },
//     { title: "View Statement", icon: <FileText className="h-4 w-4" />, color: "bg-green-50 text-green-600", action: "statement" },
//     { title: "Rewards & Offers", icon: <Gift className="h-4 w-4" />, color: "bg-purple-50 text-purple-600", action: "rewards" },
//     { title: "Set Limits", icon: <BarChart3 className="h-4 w-4" />, color: "bg-orange-50 text-orange-600", action: "limits" },
//     { title: "Report Lost Card", icon: <Phone className="h-4 w-4" />, color: "bg-red-50 text-red-600", action: "report" },
//   ];

//   const cardApplications = [
//     {
//       id: "premium",
//       title: "PSB Premium Credit Card",
//       description: "Exclusive benefits with premium lifestyle rewards",
//       features: ["5% cashback on dining", "Airport lounge access", "Travel insurance"],
//       fee: "₹2,999",
//       color: "bg-gradient-to-br from-purple-600 to-purple-700",
//       eligibility: "Min. ₹75,000 monthly income",
//       processingTime: "3-5 business days",
//       type: "Credit Card",
//       variant: "Premium",
//     },
//     {
//       id: "business",
//       title: "PSB Business Credit Card",
//       description: "Perfect for business expenses and transactions",
//       features: ["Business expense tracking", "Higher credit limits", "GST benefits"],
//       fee: "₹4,999",
//       color: "bg-gradient-to-br from-green-600 to-green-700",
//       eligibility: "Registered business required",
//       processingTime: "5-7 business days",
//       type: "Credit Card",
//       variant: "Business",
//     },
//     {
//       id: "travel",
//       title: "PSB Travel Credit Card",
//       description: "Best for frequent travelers and international transactions",
//       features: ["Zero forex markup", "Travel rewards", "Emergency assistance"],
//       fee: "₹1,999",
//       color: "bg-gradient-to-br from-blue-600 to-blue-700",
//       eligibility: "Min. ₹50,000 monthly income",
//       processingTime: "3-5 business days",
//       type: "Credit Card",
//       variant: "Travel",
//     },
//     {
//       id: "gold-debit",
//       title: "PSB Gold Debit Card",
//       description: "Premium debit card with exclusive benefits",
//       features: ["1% cashback on all spends", "Zero liability protection", "Complimentary insurance"],
//       fee: "₹499",
//       color: "bg-gradient-to-br from-yellow-600 to-yellow-700",
//       eligibility: "Maintain ₹25,000 balance",
//       processingTime: "2-3 business days",
//       type: "Debit Card",
//       variant: "Gold",
//     },
//     {
//       id: "classic-debit",
//       title: "PSB Classic Debit Card",
//       description: "Basic debit card for everyday transactions",
//       features: ["Wide acceptance", "Secure transactions", "Easy online payments"],
//       fee: "₹199",
//       color: "bg-gradient-to-br from-blue-600 to-blue-700",
//       eligibility: "Zero balance account",
//       processingTime: "2-3 business days",
//       type: "Debit Card",
//       variant: "Classic",
//     },
//   ];

//   const toggleCardDetails = (cardId: number) => {
//     setShowCardDetails((prev) => ({
//       ...prev,
//       [cardId]: !prev[cardId],
//     }));
//   };

//   const toggleCardExpand = (cardId: number) => {
//     setExpandedCard(expandedCard === cardId ? null : cardId);
//   };

//   const handleCardAction = async (action: string, card?: CardType) => {
//     setActionLoading(true);
//     if (card) setSelectedCard(card);

//     try {
//       const actionMessages = {
//         block: {
//           title: "Card blocked successfully",
//           description: "Your card has been temporarily blocked for security.",
//         },
//         unblock: {
//           title: "Card unblocked successfully",
//           description: "Your card is now active for transactions.",
//         },
//         pin: {
//           title: "PIN change initiated",
//           description: "Follow the instructions sent to your registered mobile number.",
//         },
//         statement: {
//           title: "Statement requested",
//           description: "Your card statement will be emailed to you shortly.",
//         },
//         rewards: {
//           title: "Redirecting to rewards",
//           description: "You can now view and redeem your reward points.",
//         },
//         limits: {
//           title: "Transaction limits updated",
//           description: "Your new transaction limits are now active.",
//         },
//         report: {
//           title: "Card reported as lost",
//           description: "A replacement card will be issued within 5-7 business days.",
//         },
//       };

//       if (action === "block" && card) {
//         setPinAuthOpen(true);
//         setPinAuthAction("block");
//       } else if (action === "unblock" && card) {
//         setPinAuthOpen(true);
//         setPinAuthAction("unblock");
//       } else if (action === "pin" && card) {
//         setPinChangeOpen(true);
//       } else if (action === "rewards") {
//         navigate("/offers");
//         return;
//       } else if (action === "statement") {
//         navigate("/statements");
//         return;
//       } else if (action === "limits") {
//         navigate("/card-limits", { state: { card } });
//       } else if (action === "report") {
//         toast({
//           title: actionMessages.report.title,
//           description: actionMessages.report.description,
//         });
//       }
//     } catch (error) {
//       toast({
//         title: "Action failed",
//         description: "There was an error processing your request. Please try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const handlePinAuthSuccess = () => {
//     if (selectedCard && pinAuthAction) {
//       setCards(cards.map((c) => 
//         c.id === selectedCard.id 
//           ? { ...c, status: pinAuthAction === "block" ? "Blocked" : "Active" } 
//           : c
//       ));
//       toast({
//         title: `Card ${pinAuthAction === "block" ? "Blocked" : "Unblocked"} Successfully`,
//         description: `Your card has been ${pinAuthAction === "block" ? "temporarily blocked" : "activated"}.`,
//       });
//     }
//     setPinAuthOpen(false);
//     setPinAuthAction(null);
//     setSelectedCard(null);
//   };

//   const handlePinAuthCancel = () => {
//     setPinAuthOpen(false);
//     setPinAuthAction(null);
//     setSelectedCard(null);
//   };

//   const handlePinChangeSuccess = () => {
//     if (selectedCard) {
//       setCards(cards.map((c) => 
//         c.id === selectedCard.id ? { ...c, pinSet: true } : c
//       ));
//       toast({
//         title: "PIN Updated Successfully",
//         description: "Your card PIN has been successfully updated.",
//       });
//     }
//     setPinChangeOpen(false);
//     setSelectedCard(null);
//   };

//   const handlePinChangeCancel = () => {
//     setPinChangeOpen(false);
//     setSelectedCard(null);
//   };

//   const maskCardNumber = (number: string) => {
//     return number.replace(/(\d{4})\s(\d{4})\s(\d{4})\s(\d{4})/, "**** **** **** $4");
//   };

//   const maskCVV = () => {
//     return "•••";
//   };

//   const handleApplyNow = (card?: any) => {
//     navigate("/apply-new-card", { state: { selectedCard: card || null } });
//   };

//   const getCardNetworkIcon = (network: string) => {
//     switch (network) {
//       case "Visa":
//         return <div className="text-blue-800 font-bold text-xs">Visa</div>;
//       case "Mastercard":
//         return <div className="text-red-600 font-bold text-xs">Mastercard</div>;
//       case "RuPay":
//         return <div className="text-orange-600 font-bold text-xs">RuPay</div>;
//       default:
//         return null;
//     }
//   };

//   const getCardUsagePercentage = (card: CardType) => {
//     if (!card.spendingLimit || !card.currentSpending) return 0;
//     return (card.currentSpending / card.spendingLimit) * 100;
//   };

//   const getCardUsageColor = (percentage: number) => {
//     if (percentage < 50) return "bg-green-500";
//     if (percentage < 80) return "bg-yellow-500";
//     return "bg-red-500";
//   };

//   return (
//     <BankingLayout>
//       <div className="min-h-screen bg-gray-50 pb-24">
//         <div className="sticky top-0 z-10 bg-white border-b shadow-sm">
//           <div className="flex items-center gap-3 p-4">
//             <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")} className="h-9 w-9 rounded-full">
//               <ArrowLeft className="h-5 w-5" />
//             </Button>
//             <h1 className="text-xl font-semibold">My Cards</h1>
//             <div className="ml-auto">
//               <Button 
//                 size="sm" 
//                 className="flex items-center gap-1 h-9 rounded-full bg-gradient-to-r from-[#134e5e] to-[#71b280] text-white" 
//                 onClick={() => navigate("/add-new-card")}
//               >
//                 <Plus className="h-4 w-4" />
//                 Add Card
//               </Button>
//             </div>
//           </div>
//         </div>

//         <div className="p-4 space-y-4 pb-20">
//           <Tabs defaultValue="my-cards" value={activeTab} onValueChange={setActiveTab} className="w-full">
//             <TabsList className="grid w-full grid-cols-3 h-10 bg-muted/50 p-1 rounded-lg">
//               <TabsTrigger value="my-cards" className="text-xs rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">My Cards</TabsTrigger>
//               <TabsTrigger value="services" className="text-xs rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">Services</TabsTrigger>
//               <TabsTrigger value="apply" className="text-xs rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">Apply</TabsTrigger>
//             </TabsList>

//             <TabsContent value="my-cards" className="space-y-4 mt-4">
//               {loading ? (
//                 <div className="space-y-4">
//                   {[1, 2, 3].map((i) => (
//                     <div key={i} className="rounded-xl overflow-hidden shadow-sm">
//                       <Skeleton className="h-40 w-full rounded-xl" />
//                     </div>
//                   ))}
//                 </div>
//               ) : cards.length === 0 ? (
//                 <div className="text-center py-8 space-y-3 bg-white rounded-xl p-4 shadow-sm">
//                   <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
//                     <CreditCard className="h-8 w-8 text-muted-foreground" />
//                   </div>
//                   <h3 className="text-lg font-medium">No cards found</h3>
//                   <p className="text-sm text-muted-foreground">You haven't added any cards yet</p>
//                   <Button 
//                     className="mt-2 rounded-full" 
//                     onClick={() => setActiveTab("apply")}
//                   >
//                     Apply for a new card
//                   </Button>
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                   {cards.map((card) => (
//                     <div key={card.id} className="bg-white rounded-xl overflow-hidden shadow-sm border">
//                       {/* Card Preview */}
//                       <div
//                         className={`${card.color} text-white p-5 relative cursor-pointer`}
//                         onClick={() => toggleCardExpand(card.id)}
//                       >
//                         <div className="absolute top-4 right-4 opacity-80">
//                           {getCardNetworkIcon(card.cardNetwork || "Visa")}
//                         </div>
                        
//                         <div className="flex justify-between items-start mb-6">
//                           <div>
//                             <p className="text-xs opacity-80 mb-1">{card.type}</p>
//                             <h3 className="text-lg font-semibold">{card.name}</h3>
//                           </div>
//                           <Badge
//                             variant={card.status === "Active" ? "default" : "destructive"}
//                             className={`text-xs ${card.status === "Active" ? "bg-white/20 text-white" : "bg-red-500/80"} border-0 h-5`}
//                           >
//                             {card.status === "Active" ? <CheckCircle className="h-3 w-3 mr-1" /> : <AlertCircle className="h-3 w-3 mr-1" />}
//                             {card.status}
//                           </Badge>
//                         </div>
                        
//                         <div className="flex justify-between items-center mb-4">
//                           <p className="text-sm tracking-wider font-mono">
//                             {showCardDetails[card.id] ? card.number : maskCardNumber(card.number)}
//                           </p>
//                           <Button
//                             variant="ghost"
//                             size="sm"
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               toggleCardDetails(card.id);
//                             }}
//                             className="h-7 w-7 p-0 text-white/80 hover:text-white hover:bg-white/10 rounded-full"
//                           >
//                             {showCardDetails[card.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                           </Button>
//                         </div>
                        
//                         <div className="flex justify-between items-center">
//                           <div>
//                             <p className="text-xs opacity-80">Valid Thru</p>
//                             <p className="text-sm">{showCardDetails[card.id] ? card.expiryDate : "••/••"}</p>
//                           </div>
//                           <div>
//                             <p className="text-xs opacity-80">CVV</p>
//                             <p className="text-sm font-mono">{showCardDetails[card.id] ? card.cvv : maskCVV()}</p>
//                           </div>
//                         </div>
                        
//                         <div className="absolute bottom-4 right-4">
//                           {expandedCard === card.id ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
//                         </div>
//                       </div>

//                       {expandedCard === card.id && (
//                         <div className="p-4 space-y-4">
//                           {/* Credit Usage for Credit Cards */}
//                           {card.type === "Credit Card" && card.spendingLimit && (
//                             <div className="space-y-2">
//                               <div className="flex justify-between items-center text-sm">
//                                 <span className="text-muted-foreground">Credit Usage</span>
//                                 <span className="font-medium">{Math.round(getCardUsagePercentage(card))}%</span>
//                               </div>
//                               <Progress value={getCardUsagePercentage(card)} className={`h-2 ${getCardUsageColor(getCardUsagePercentage(card))}`} />
//                               <div className="flex justify-between text-xs text-muted-foreground">
//                                 <span>₹{card.currentSpending?.toLocaleString()}</span>
//                                 <span>₹{card.spendingLimit.toLocaleString()}</span>
//                               </div>
//                             </div>
//                           )}

//                           {/* Billing Information for Credit Cards */}
//                           {card.type === "Credit Card" && (
//                             <div className="grid grid-cols-2 gap-3 text-sm">
//                               <div className="bg-gray-50 p-3 rounded-lg">
//                                 <p className="text-xs text-muted-foreground mb-1">Available Credit</p>
//                                 <p className="font-medium">{card.available}</p>
//                               </div>
//                               <div className="bg-gray-50 p-3 rounded-lg">
//                                 <p className="text-xs text-muted-foreground mb-1">Credit Limit</p>
//                                 <p className="font-medium">{card.limit}</p>
//                               </div>
//                               {card.billingDate && (
//                                 <div className="bg-gray-50 p-3 rounded-lg">
//                                   <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
//                                     <Calendar className="h-3 w-3" /> Billing Date
//                                   </p>
//                                   <p className="font-medium">{card.billingDate}</p>
//                                 </div>
//                               )}
//                               {card.dueDate && (
//                                 <div className="bg-gray-50 p-3 rounded-lg">
//                                   <p className="text-xs text-muted-foreground mb-1">Due Date</p>
//                                   <p className="font-medium">{card.dueDate}</p>
//                                 </div>
//                               )}
//                             </div>
//                           )}

//                           {/* Reward Points */}
//                           {card.rewardPoints > 0 && (
//                             <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-3 rounded-lg border border-amber-100">
//                               <div className="flex items-center justify-between">
//                                 <div>
//                                   <p className="text-xs text-amber-800 mb-1 flex items-center gap-1">
//                                     <Coins className="h-3 w-3" /> Reward Points
//                                   </p>
//                                   <p className="text-sm font-semibold text-amber-900">{card.rewardPoints.toLocaleString()} pts</p>
//                                 </div>
//                                 <Button
//                                   variant="outline"
//                                   size="sm"
//                                   className="h-7 text-xs rounded-full bg-amber-500/10 border-amber-200 text-amber-700 hover:bg-amber-500/20"
//                                   onClick={() => handleCardAction("rewards")}
//                                   disabled={actionLoading}
//                                 >
//                                   {actionLoading && selectedCard?.id === card.id ? (
//                                     <Loader2 className="h-3 w-3 animate-spin" />
//                                   ) : (
//                                     "Redeem"
//                                   )}
//                                 </Button>
//                               </div>
//                             </div>
//                           )}

//                           {/* Quick Actions */}
//                           <div className="flex gap-2 pt-2">
//                             <Button
//                               variant="outline"
//                               size="sm"
//                               className="h-9 text-xs flex-1 rounded-lg"
//                               onClick={() => handleCardAction("statement", card)}
//                               disabled={actionLoading && selectedCard?.id === card.id}
//                             >
//                               {actionLoading && selectedCard?.id === card.id ? (
//                                 <Loader2 className="h-3 w-3 animate-spin" />
//                               ) : (
//                                 "Statement"
//                               )}
//                             </Button>
//                             <Button
//                               variant="outline"
//                               size="sm"
//                               className="h-9 text-xs flex-1 rounded-lg"
//                               onClick={() => handleCardAction(card.status === "Active" ? "block" : "unblock", card)}
//                               disabled={actionLoading && selectedCard?.id === card.id}
//                             >
//                               {actionLoading && selectedCard?.id === card.id ? (
//                                 <Loader2 className="h-3 w-3 animate-spin" />
//                               ) : (
//                                 <>
//                                   {card.status === "Active" ? <Lock className="h-3 w-3 mr-1" /> : <Unlock className="h-3 w-3 mr-1" />}
//                                   {card.status === "Active" ? "Block" : "Unblock"}
//                                 </>
//                               )}
//                             </Button>
//                             <DropdownMenu>
//                               <DropdownMenuTrigger asChild>
//                                 <Button variant="outline" size="sm" className="h-9 w-9 p-0 rounded-lg">
//                                   <MoreHorizontal className="h-4 w-4" />
//                                 </Button>
//                               </DropdownMenuTrigger>
//                               <DropdownMenuContent align="end" className="w-48 rounded-xl">
//                                 <DropdownMenuItem onClick={() => handleCardAction("pin", card)} className="cursor-pointer py-2">
//                                   <Key className="h-4 w-4 mr-2" />
//                                   {card.pinSet ? "Change PIN" : "Set PIN"}
//                                 </DropdownMenuItem>
//                                 <DropdownMenuItem onClick={() => handleCardAction("limits", card)} className="cursor-pointer py-2">
//                                   <BarChart3 className="h-4 w-4 mr-2" />
//                                   Set Limits
//                                 </DropdownMenuItem>
//                                 <DropdownMenuItem className="text-red-600 cursor-pointer py-2" onClick={() => handleCardAction("report", card)}>
//                                   <Phone className="h-4 w-4 mr-2" />
//                                   Report Lost
//                                 </DropdownMenuItem>
//                               </DropdownMenuContent>
//                             </DropdownMenu>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </TabsContent>

//             <TabsContent value="services" className="space-y-4 mt-4">
//               <div>
//                 <h2 className="text-lg font-semibold mb-3">Card Services</h2>
//                 <div className="grid grid-cols-2 gap-3">
//                   {cardServices.map((service, index) => (
//                     <div 
//                       key={index} 
//                       className="bg-white rounded-xl p-4 cursor-pointer hover:shadow-md transition-shadow border"
//                       onClick={() => handleCardAction(service.action)}
//                     >
//                       <div className={`w-12 h-12 rounded-xl ${service.color} flex items-center justify-center mb-3`}>
//                         {service.icon}
//                       </div>
//                       <p className="text-sm font-medium">{service.title}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="bg-white rounded-xl overflow-hidden shadow-sm border">
//                 <div className="p-4 border-b">
//                   <h2 className="text-lg font-semibold flex items-center gap-2">
//                     <Shield className="h-5 w-5 text-blue-600" />
//                     Card Security & Controls
//                   </h2>
//                   <p className="text-sm text-muted-foreground">Manage your card security settings</p>
//                 </div>
//                 <div className="p-4 space-y-4">
//                   <div className="space-y-3">
//                     <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                       <div>
//                         <p className="font-medium">International Transactions</p>
//                         <p className="text-xs text-muted-foreground">Enable/disable international usage</p>
//                       </div>
//                       <Switch />
//                     </div>
//                     <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                       <div>
//                         <p className="font-medium">Online Transactions</p>
//                         <p className="text-xs text-muted-foreground">Control online payment limits</p>
//                       </div>
//                       <Switch defaultChecked />
//                     </div>
//                     <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                       <div>
//                         <p className="font-medium">ATM Withdrawals</p>
//                         <p className="text-xs text-muted-foreground">Set daily withdrawal limits</p>
//                       </div>
//                       <Button variant="outline" size="sm" className="h-8 text-xs rounded-full">Manage</Button>
//                     </div>
//                     <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                       <div>
//                         <p className="font-medium">Contactless Payments</p>
//                         <p className="text-xs text-muted-foreground">Enable/disable tap to pay</p>
//                       </div>
//                       <Switch defaultChecked />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </TabsContent>

//             <TabsContent value="apply" className="space-y-4 mt-4">
//               <div>
//                 <h2 className="text-lg font-semibold mb-3">Apply for New Card</h2>
//                 <div className="space-y-3">
//                   {cardApplications.map((application) => (
//                     <div key={application.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-l-2 border-l-primary">
//                       <div className="p-4">
//                         <div className="flex items-start justify-between mb-3">
//                           <div>
//                             <h3 className="font-semibold">{application.title}</h3>
//                             <p className="text-xs text-muted-foreground">{application.description}</p>
//                           </div>
//                           <div className="text-right">
//                             <p className="text-xs font-medium text-primary">Annual Fee</p>
//                             <p className="text-sm font-semibold">{application.fee}</p>
//                           </div>
//                         </div>
                        
//                         <div className="mb-4">
//                           <h4 className="font-medium text-sm mb-2">Key Features</h4>
//                           <ul className="space-y-1">
//                             {application.features.map((feature, featureIndex) => (
//                               <li key={featureIndex} className="text-xs text-muted-foreground flex items-center gap-2">
//                                 <div className="w-1 h-1 rounded-full bg-green-500"></div>
//                                 {feature}
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
                        
//                         <div className="grid grid-cols-2 gap-2 text-xs mb-4">
//                           <div className="bg-gray-100 p-2 rounded-lg">
//                             <p className="font-medium">Eligibility</p>
//                             <p className="text-xs">{application.eligibility}</p>
//                           </div>
//                           <div className="bg-gray-100 p-2 rounded-lg">
//                             <p className="font-medium">Processing Time</p>
//                             <p className="text-xs">{application.processingTime}</p>
//                           </div>
//                         </div>
                        
//                         <div className="flex gap-2">
//                           <Button size="sm" className="flex-1 h-9 rounded-full" onClick={() => handleApplyNow(application)}>
//                             Apply Now
//                           </Button>
//                           <Button size="sm" variant="outline" className="flex-1 h-9 rounded-full">
//                             Learn More
//                           </Button>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="bg-white rounded-xl overflow-hidden shadow-sm border">
//                 <div className="p-4 border-b">
//                   <h2 className="text-lg font-semibold">Application Status</h2>
//                   <p className="text-sm text-muted-foreground">Track your card applications</p>
//                 </div>
//                 <div className="p-6 text-center">
//                   <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
//                     <CreditCard className="h-8 w-8 text-muted-foreground" />
//                   </div>
//                   <p className="text-sm text-muted-foreground">No pending applications</p>
//                   <p className="text-xs text-muted-foreground mt-1">Your card applications will appear here</p>
//                 </div>
//                 </div>
//             </TabsContent>
//           </Tabs>
//         </div>

//         {pinAuthOpen && selectedCard && pinAuthAction && (
//           <PinAuth
//             title={`${pinAuthAction === "block" ? "Block" : "Unblock"} Card`}
//             description={`Enter your PIN to ${pinAuthAction} your ${selectedCard.name}`}
//             onSuccess={handlePinAuthSuccess}
//             onCancel={handlePinAuthCancel}
//           />
//         )}

//         {pinChangeOpen && selectedCard && (
//           <PinChange
//             title={selectedCard.pinSet ? "Change Card PIN" : "Set Card PIN"}
//             description={selectedCard.pinSet ? "Change your card PIN for enhanced security" : "Set a PIN for your card to enable transactions"}
//             hasExistingPin={selectedCard.pinSet || false}
//             onSuccess={handlePinChangeSuccess}
//             onCancel={handlePinChangeCancel}
//           />
//         )}
//       </div>
//       <BottomNavigation />
//     </BankingLayout>
//   );
// };

// export default CardManagement;


// import { useState, useEffect } from "react";
// import { ArrowLeft, CreditCard, Plus, Eye, EyeOff, Lock, Unlock, FileText, Gift, Phone, AlertCircle, CheckCircle, Loader2, ChevronDown, ChevronUp, MoreHorizontal, Key, BarChart3, Calendar, Coins, Shield, Info } from "lucide-react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { BankingLayout } from "@/components/BankingLayout";
// import { useToast } from "@/hooks/use-toast";
// import { Skeleton } from "@/components/ui/skeleton";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
// import { PinAuth } from "@/components/auth/PinAuth";
// import { Switch } from "@/components/ui/switch";
// import { Progress } from "@/components/ui/progress";
// import { PinChange } from "@/components/auth/PinChange";
// import { BottomNavigation } from "@/components/BottomNavigation";

// type CardType = {
//   id: number;
//   name: string;
//   number: string;
//   type: "Credit Card" | "Debit Card";
//   variant: string;
//   status: "Active" | "Blocked" | "Expired";
//   limit: string;
//   available: string;
//   expiryDate: string;
//   rewardPoints: number;
//   color: string;
//   cvv?: string;
//   pinSet?: boolean;
//   internationalEnabled?: boolean;
//   onlineEnabled?: boolean;
//   contactlessEnabled?: boolean;
//   spendingLimit?: number;
//   currentSpending?: number;
//   cardDesign?: string;
//   issuer?: string;
//   cardNetwork?: "Visa" | "Mastercard" | "RuPay";
//   billingDate?: string;
//   dueDate?: string;
//   minimumDue?: string;
// };

// type PendingApplication = {
//   id: string;
//   title: string;
//   type: string;
//   variant: string;
//   lastStep: string;
//   progress: number;
// };

// const CardManagement = () => {
//   const navigate = useNavigate();
//   const { toast } = useToast();
//   const location = useLocation();
//   const [loading, setLoading] = useState(true);
//   const [showCardDetails, setShowCardDetails] = useState<{ [key: string]: boolean }>({});
//   const [expandedCard, setExpandedCard] = useState<number | null>(null);
//   const [selectedCard, setSelectedCard] = useState<CardType | null>(null);
//   const [actionLoading, setActionLoading] = useState(false);
//   const [pinAuthOpen, setPinAuthOpen] = useState(false);
//   const [pinChangeOpen, setPinChangeOpen] = useState(false);
//   const [pinAuthAction, setPinAuthAction] = useState<"block" | "unblock" | null>(null);
//   const [activeTab, setActiveTab] = useState("my-cards");
//   const [cards, setCards] = useState<CardType[]>([]);
//   const [pendingApplications, setPendingApplications] = useState<PendingApplication[]>([]);

//   useEffect(() => {
//     // Simulate API fetch for cards
//     const fetchCards = async () => {
//       try {
//         setLoading(true);
//         const mockCards: CardType[] = [
//           {
//             id: 1,
//             name: "PSB Platinum Rewards",
//             number: "4532 1234 5678 9012",
//             type: "Credit Card",
//             variant: "Platinum",
//             status: "Active",
//             limit: "₹5,00,000",
//             available: "₹4,25,000",
//             expiryDate: "12/28",
//             rewardPoints: 15420,
//             color: "bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800",
//             cvv: "123",
//             pinSet: true,
//             internationalEnabled: true,
//             onlineEnabled: true,
//             contactlessEnabled: true,
//             spendingLimit: 500000,
//             currentSpending: 75000,
//             cardDesign: "premium",
//             issuer: "PSB",
//             cardNetwork: "Visa",
//             billingDate: "15th of each month",
//             dueDate: "5th of each month",
//             minimumDue: "₹2,000"
//           },
//           {
//             id: 2,
//             name: "PSB Gold Debit",
//             number: "5678 9012 3456 7890",
//             type: "Debit Card",
//             variant: "Gold",
//             status: "Active",
//             limit: "₹2,00,000",
//             available: "₹1,80,000",
//             expiryDate: "06/27",
//             rewardPoints: 8750,
//             color: "bg-gradient-to-br from-amber-600 to-yellow-500",
//             cvv: "456",
//             pinSet: false,
//             internationalEnabled: false,
//             onlineEnabled: true,
//             contactlessEnabled: true,
//             spendingLimit: 200000,
//             currentSpending: 20000,
//             cardDesign: "gold",
//             issuer: "PSB",
//             cardNetwork: "Mastercard",
//           },
//           {
//             id: 3,
//             name: "PSB Classic",
//             number: "1234 5678 9012 3456",
//             type: "Debit Card",
//             variant: "Classic",
//             status: "Blocked",
//             limit: "₹50,000",
//             available: "₹45,000",
//             expiryDate: "03/26",
//             rewardPoints: 320,
//             color: "bg-gradient-to-br from-blue-700 to-blue-500",
//             cvv: "789",
//             pinSet: true,
//             internationalEnabled: false,
//             onlineEnabled: false,
//             contactlessEnabled: false,
//             spendingLimit: 50000,
//             currentSpending: 5000,
//             cardDesign: "classic",
//             issuer: "PSB",
//             cardNetwork: "RuPay",
//           },
//         ];
//         setCards(mockCards);

//         // Simulate fetching pending applications
//         const mockPendingApplications: PendingApplication[] = [
//           {
//             id: "app1",
//             title: "PSB Premium Credit Card",
//             type: "Credit Card",
//             variant: "Premium",
//             lastStep: "personal-info",
//             progress: 40,
//           },
//         ];
//         setPendingApplications(mockPendingApplications);

//         setLoading(false);
//       } catch (error) {
//         toast({
//           title: "Error loading data",
//           description: "Failed to fetch your card or application details. Please try again.",
//           variant: "destructive",
//         });
//         setLoading(false);
//       }
//     };

//     fetchCards();
//   }, [toast]);

//   const cardServices = [
//     { title: "Block/Unblock Card", icon: <Lock className="h-4 w-4" />, color: "bg-red-50 text-red-600", action: "block" },
//     { title: "Set/Change PIN", icon: <Key className="h-4 w-4" />, color: "bg-blue-50 text-blue-600", action: "pin" },
//     { title: "View Statement", icon: <FileText className="h-4 w-4" />, color: "bg-green-50 text-green-600", action: "statement" },
//     { title: "Rewards & Offers", icon: <Gift className="h-4 w-4" />, color: "bg-purple-50 text-purple-600", action: "rewards" },
//     { title: "Set Limits", icon: <BarChart3 className="h-4 w-4" />, color: "bg-orange-50 text-orange-600", action: "limits" },
//     { title: "Report Lost Card", icon: <Phone className="h-4 w-4" />, color: "bg-red-50 text-red-600", action: "report" },
//   ];

//   const cardApplications = [
//     {
//       id: "premium",
//       title: "PSB Premium Credit Card",
//       description: "Exclusive benefits with premium lifestyle rewards",
//       features: ["5% cashback on dining", "Airport lounge access", "Travel insurance"],
//       fee: "₹2,999",
//       color: "bg-gradient-to-br from-purple-600 to-purple-700",
//       eligibility: "Min. ₹75,000 monthly income",
//       processingTime: "3-5 business days",
//       type: "Credit Card",
//       variant: "Premium",
//     },
//     {
//       id: "business",
//       title: "PSB Business Credit Card",
//       description: "Perfect for business expenses and transactions",
//       features: ["Business expense tracking", "Higher credit limits", "GST benefits"],
//       fee: "₹4,999",
//       color: "bg-gradient-to-br from-green-600 to-green-700",
//       eligibility: "Registered business required",
//       processingTime: "5-7 business days",
//       type: "Credit Card",
//       variant: "Business",
//     },
//     {
//       id: "travel",
//       title: "PSB Travel Credit Card",
//       description: "Best for frequent travelers and international transactions",
//       features: ["Zero forex markup", "Travel rewards", "Emergency assistance"],
//       fee: "₹1,999",
//       color: "bg-gradient-to-br from-blue-600 to-blue-700",
//       eligibility: "Min. ₹50,000 monthly income",
//       processingTime: "3-5 business days",
//       type: "Credit Card",
//       variant: "Travel",
//     },
//     {
//       id: "gold-debit",
//       title: "PSB Gold Debit Card",
//       description: "Premium debit card with exclusive benefits",
//       features: ["1% cashback on all spends", "Zero liability protection", "Complimentary insurance"],
//       fee: "₹499",
//       color: "bg-gradient-to-br from-yellow-600 to-yellow-700",
//       eligibility: "Maintain ₹25,000 balance",
//       processingTime: "2-3 business days",
//       type: "Debit Card",
//       variant: "Gold",
//     },
//     {
//       id: "classic-debit",
//       title: "PSB Classic Debit Card",
//       description: "Basic debit card for everyday transactions",
//       features: ["Wide acceptance", "Secure transactions", "Easy online payments"],
//       fee: "₹199",
//       color: "bg-gradient-to-br from-blue-600 to-blue-700",
//       eligibility: "Zero balance account",
//       processingTime: "2-3 business days",
//       type: "Debit Card",
//       variant: "Classic",
//     },
//   ];

//   const toggleCardDetails = (cardId: number) => {
//     setShowCardDetails((prev) => ({
//       ...prev,
//       [cardId]: !prev[cardId],
//     }));
//   };

//   const toggleCardExpand = (cardId: number) => {
//     setExpandedCard(expandedCard === cardId ? null : cardId);
//   };

//   const handleCardAction = async (action: string, card?: CardType) => {
//     setActionLoading(true);
//     if (card) setSelectedCard(card);

//     try {
//       const actionMessages = {
//         block: {
//           title: "Card blocked successfully",
//           description: "Your card has been temporarily blocked for security.",
//         },
//         unblock: {
//           title: "Card unblocked successfully",
//           description: "Your card is now active for transactions.",
//         },
//         pin: {
//           title: "PIN change initiated",
//           description: "Follow the instructions sent to your registered mobile number.",
//         },
//         statement: {
//           title: "Statement requested",
//           description: "Your card statement will be emailed to you shortly.",
//         },
//         rewards: {
//           title: "Redirecting to rewards",
//           description: "You can now view and redeem your reward points.",
//         },
//         limits: {
//           title: "Transaction limits updated",
//           description: "Your new transaction limits are now active.",
//         },
//         report: {
//           title: "Card reported as lost",
//           description: "A replacement card will be issued within 5-7 business days.",
//         },
//       };

//       if (action === "block" && card) {
//         setPinAuthOpen(true);
//         setPinAuthAction("block");
//       } else if (action === "unblock" && card) {
//         setPinAuthOpen(true);
//         setPinAuthAction("unblock");
//       } else if (action === "pin" && card) {
//         setPinChangeOpen(true);
//       } else if (action === "rewards") {
//         navigate("/offers");
//         return;
//       } else if (action === "statement") {
//         navigate("/statements");
//         return;
//       } else if (action === "limits") {
//         navigate("/card-limits", { state: { card } });
//       } else if (action === "report") {
//         toast({
//           title: actionMessages.report.title,
//           description: actionMessages.report.description,
//         });
//       }
//     } catch (error) {
//       toast({
//         title: "Action failed",
//         description: "There was an error processing your request. Please try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const handlePinAuthSuccess = () => {
//     if (selectedCard && pinAuthAction) {
//       setCards(cards.map((c) => 
//         c.id === selectedCard.id 
//           ? { ...c, status: pinAuthAction === "block" ? "Blocked" : "Active" } 
//           : c
//       ));
//       toast({
//         title: `Card ${pinAuthAction === "block" ? "Blocked" : "Unblocked"} Successfully`,
//         description: `Your card has been ${pinAuthAction === "block" ? "temporarily blocked" : "activated"}.`,
//       });
//     }
//     setPinAuthOpen(false);
//     setPinAuthAction(null);
//     setSelectedCard(null);
//   };

//   const handlePinAuthCancel = () => {
//     setPinAuthOpen(false);
//     setPinAuthAction(null);
//     setSelectedCard(null);
//   };

//   const handlePinChangeSuccess = () => {
//     if (selectedCard) {
//       setCards(cards.map((c) => 
//         c.id === selectedCard.id ? { ...c, pinSet: true } : c
//       ));
//       toast({
//         title: "PIN Updated Successfully",
//         description: "Your card PIN has been successfully updated.",
//       });
//     }
//     setPinChangeOpen(false);
//     setSelectedCard(null);
//   };

//   const handlePinChangeCancel = () => {
//     setPinChangeOpen(false);
//     setSelectedCard(null);
//   };

//   const maskCardNumber = (number: string) => {
//     return number.replace(/(\d{4})\s(\d{4})\s(\d{4})\s(\d{4})/, "**** **** **** $4");
//   };

//   const maskCVV = () => {
//     return "•••";
//   };

//   const handleApplyNow = (application?: any) => {
//     navigate("/apply-new-card", { state: { selectedCard: application || null } });
//   };

//   const handleResumeApplication = (application: PendingApplication) => {
//     const selectedCard = cardApplications.find(
//       (app) => app.type === application.type && app.variant === application.variant
//     );
//     navigate("/apply-new-card", { state: { selectedCard, lastStep: application.lastStep } });
//   };

//   const getCardNetworkIcon = (network: string) => {
//     switch (network) {
//       case "Visa":
//         return <div className="text-blue-800 font-bold text-xs">Visa</div>;
//       case "Mastercard":
//         return <div className="text-red-600 font-bold text-xs">Mastercard</div>;
//       case "RuPay":
//         return <div className="text-orange-600 font-bold text-xs">RuPay</div>;
//       default:
//         return null;
//     }
//   };

//   const getCardUsagePercentage = (card: CardType) => {
//     if (!card.spendingLimit || !card.currentSpending) return 0;
//     return (card.currentSpending / card.spendingLimit) * 100;
//   };

//   const getCardUsageColor = (percentage: number) => {
//     if (percentage < 50) return "bg-green-500";
//     if (percentage < 80) return "bg-yellow-500";
//     return "bg-red-500";
//   };

//   return (
//     <BankingLayout>
//       <div className="min-h-screen bg-gray-50 pb-24">
//         <div className="sticky top-0 z-10 bg-white border-b shadow-sm">
//           <div className="flex items-center gap-3 p-4">
//             <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")} className="h-9 w-9 rounded-full">
//               <ArrowLeft className="h-5 w-5" />
//             </Button>
//             <h1 className="text-xl font-semibold">My Cards</h1>
//             <div className="ml-auto">
//               <Button 
//                 size="sm" 
//                 className="flex items-center gap-1 h-9 rounded-full bg-gradient-to-r from-[#134e5e] to-[#71b280] text-white" 
//                 onClick={() => navigate("/add-new-card")}
//               >
//                 <Plus className="h-4 w-4" />
//                 Add Card
//               </Button>
//             </div>
//           </div>
//         </div>

//         <div className="p-4 space-y-4 pb-20">
//           <Tabs defaultValue="my-cards" value={activeTab} onValueChange={setActiveTab} className="w-full">
//             <TabsList className="grid w-full grid-cols-3 h-10 bg-muted/50 p-1 rounded-lg">
//               <TabsTrigger value="my-cards" className="text-xs rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">My Cards</TabsTrigger>
//               <TabsTrigger value="services" className="text-xs rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">Services</TabsTrigger>
//               <TabsTrigger value="apply" className="text-xs rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">Apply</TabsTrigger>
//             </TabsList>

//             <TabsContent value="my-cards" className="space-y-4 mt-4">
//               {loading ? (
//                 <div className="space-y-4">
//                   {[1, 2, 3].map((i) => (
//                     <div key={i} className="rounded-xl overflow-hidden shadow-sm">
//                       <Skeleton className="h-40 w-full rounded-xl" />
//                     </div>
//                   ))}
//                 </div>
//               ) : cards.length === 0 ? (
//                 <div className="text-center py-8 space-y-3 bg-white rounded-xl p-4 shadow-sm">
//                   <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
//                     <CreditCard className="h-8 w-8 text-muted-foreground" />
//                   </div>
//                   <h3 className="text-lg font-medium">No cards found</h3>
//                   <p className="text-sm text-muted-foreground">You haven't added any cards yet</p>
//                   <Button 
//                     className="mt-2 rounded-full" 
//                     onClick={() => setActiveTab("apply")}
//                   >
//                     Apply for a new card
//                   </Button>
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                   {cards.map((card) => (
//                     <div key={card.id} className="bg-white rounded-xl overflow-hidden shadow-sm border">
//                       <div
//                         className={`${card.color} text-white p-5 relative cursor-pointer`}
//                         onClick={() => toggleCardExpand(card.id)}
//                       >
//                         <div className="absolute top-4 right-4 opacity-80">
//                           {getCardNetworkIcon(card.cardNetwork || "Visa")}
//                         </div>
                        
//                         <div className="flex justify-between items-start mb-6">
//                           <div>
//                             <p className="text-xs opacity-80 mb-1">{card.type}</p>
//                             <h3 className="text-lg font-semibold">{card.name}</h3>
//                           </div>
//                           <Badge
//                             variant={card.status === "Active" ? "default" : "destructive"}
//                             className={`text-xs ${card.status === "Active" ? "bg-white/20 text-white" : "bg-red-500/80"} border-0 h-5`}
//                           >
//                             {card.status === "Active" ? <CheckCircle className="h-3 w-3 mr-1" /> : <AlertCircle className="h-3 w-3 mr-1" />}
//                             {card.status}
//                           </Badge>
//                         </div>
                        
//                         <div className="flex justify-between items-center mb-4">
//                           <p className="text-sm tracking-wider font-mono">
//                             {showCardDetails[card.id] ? card.number : maskCardNumber(card.number)}
//                           </p>
//                           <Button
//                             variant="ghost"
//                             size="sm"
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               toggleCardDetails(card.id);
//                             }}
//                             className="h-7 w-7 p-0 text-white/80 hover:text-white hover:bg-white/10 rounded-full"
//                           >
//                             {showCardDetails[card.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                           </Button>
//                         </div>
                        
//                         <div className="flex justify-between items-center">
//                           <div>
//                             <p className="text-xs opacity-80">Valid Thru</p>
//                             <p className="text-sm">{showCardDetails[card.id] ? card.expiryDate : "••/••"}</p>
//                           </div>
//                           <div>
//                             <p className="text-xs opacity-80">CVV</p>
//                             <p className="text-sm font-mono">{showCardDetails[card.id] ? card.cvv : maskCVV()}</p>
//                           </div>
//                         </div>
                        
//                         <div className="absolute bottom-4 right-4">
//                           {expandedCard === card.id ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
//                         </div>
//                       </div>

//                       {expandedCard === card.id && (
//                         <div className="p-4 space-y-4">
//                           {card.type === "Credit Card" && card.spendingLimit && (
//                             <div className="space-y-2">
//                               <div className="flex justify-between items-center text-sm">
//                                 <span className="text-muted-foreground">Credit Usage</span>
//                                 <span className="font-medium">{Math.round(getCardUsagePercentage(card))}%</span>
//                               </div>
//                               <Progress value={getCardUsagePercentage(card)} className={`h-2 ${getCardUsageColor(getCardUsagePercentage(card))}`} />
//                               <div className="flex justify-between text-xs text-muted-foreground">
//                                 <span>₹{card.currentSpending?.toLocaleString()}</span>
//                                 <span>₹{card.spendingLimit.toLocaleString()}</span>
//                               </div>
//                             </div>
//                           )}

//                           {card.type === "Credit Card" && (
//                             <div className="grid grid-cols-2 gap-3 text-sm">
//                               <div className="bg-gray-50 p-3 rounded-lg">
//                                 <p className="text-xs text-muted-foreground mb-1">Available Credit</p>
//                                 <p className="font-medium">{card.available}</p>
//                               </div>
//                               <div className="bg-gray-50 p-3 rounded-lg">
//                                 <p className="text-xs text-muted-foreground mb-1">Credit Limit</p>
//                                 <p className="font-medium">{card.limit}</p>
//                               </div>
//                               {card.billingDate && (
//                                 <div className="bg-gray-50 p-3 rounded-lg">
//                                   <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
//                                     <Calendar className="h-3 w-3" /> Billing Date
//                                   </p>
//                                   <p className="font-medium">{card.billingDate}</p>
//                                 </div>
//                               )}
//                               {card.dueDate && (
//                                 <div className="bg-gray-50 p-3 rounded-lg">
//                                   <p className="text-xs text-muted-foreground mb-1">Due Date</p>
//                                   <p className="font-medium">{card.dueDate}</p>
//                                 </div>
//                               )}
//                             </div>
//                           )}

//                           {card.rewardPoints > 0 && (
//                             <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-3 rounded-lg border border-amber-100">
//                               <div className="flex items-center justify-between">
//                                 <div>
//                                   <p className="text-xs text-amber-800 mb-1 flex items-center gap-1">
//                                     <Coins className="h-3 w-3" /> Reward Points
//                                   </p>
//                                   <p className="text-sm font-semibold text-amber-900">{card.rewardPoints.toLocaleString()} pts</p>
//                                 </div>
//                                 <Button
//                                   variant="outline"
//                                   size="sm"
//                                   className="h-7 text-xs rounded-full bg-amber-500/10 border-amber-200 text-amber-700 hover:bg-amber-500/20"
//                                   onClick={() => handleCardAction("rewards")}
//                                   disabled={actionLoading}
//                                 >
//                                   {actionLoading && selectedCard?.id === card.id ? (
//                                     <Loader2 className="h-3 w-3 animate-spin" />
//                                   ) : (
//                                     "Redeem"
//                                   )}
//                                 </Button>
//                               </div>
//                             </div>
//                           )}

//                           <div className="flex gap-2 pt-2">
//                             <Button
//                               variant="outline"
//                               size="sm"
//                               className="h-9 text-xs flex-1 rounded-lg"
//                               onClick={() => handleCardAction("statement", card)}
//                               disabled={actionLoading && selectedCard?.id === card.id}
//                             >
//                               {actionLoading && selectedCard?.id === card.id ? (
//                                 <Loader2 className="h-3 w-3 animate-spin" />
//                               ) : (
//                                 "Statement"
//                               )}
//                             </Button>
//                             <Button
//                               variant="outline"
//                               size="sm"
//                               className="h-9 text-xs flex-1 rounded-lg"
//                               onClick={() => handleCardAction(card.status === "Active" ? "block" : "unblock", card)}
//                               disabled={actionLoading && selectedCard?.id === card.id}
//                             >
//                               {actionLoading && selectedCard?.id === card.id ? (
//                                 <Loader2 className="h-3 w-3 animate-spin" />
//                               ) : (
//                                 <>
//                                   {card.status === "Active" ? <Lock className="h-3 w-3 mr-1" /> : <Unlock className="h-3 w-3 mr-1" />}
//                                   {card.status === "Active" ? "Block" : "Unblock"}
//                                 </>
//                               )}
//                             </Button>
//                             <DropdownMenu>
//                               <DropdownMenuTrigger asChild>
//                                 <Button variant="outline" size="sm" className="h-9 w-9 p-0 rounded-lg">
//                                   <MoreHorizontal className="h-4 w-4" />
//                                 </Button>
//                               </DropdownMenuTrigger>
//                               <DropdownMenuContent align="end" className="w-48 rounded-xl">
//                                 <DropdownMenuItem onClick={() => handleCardAction("pin", card)} className="cursor-pointer py-2">
//                                   <Key className="h-4 w-4 mr-2" />
//                                   {card.pinSet ? "Change PIN" : "Set PIN"}
//                                 </DropdownMenuItem>
//                                 <DropdownMenuItem onClick={() => handleCardAction("limits", card)} className="cursor-pointer py-2">
//                                   <BarChart3 className="h-4 w-4 mr-2" />
//                                   Set Limits
//                                 </DropdownMenuItem>
//                                 <DropdownMenuItem className="text-red-600 cursor-pointer py-2" onClick={() => handleCardAction("report", card)}>
//                                   <Phone className="h-4 w-4 mr-2" />
//                                   Report Lost
//                                 </DropdownMenuItem>
//                               </DropdownMenuContent>
//                             </DropdownMenu>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </TabsContent>

//             <TabsContent value="services" className="space-y-4 mt-4">
//               <div>
//                 <h2 className="text-lg font-semibold mb-3">Card Services</h2>
//                 <div className="grid grid-cols-2 gap-3">
//                   {cardServices.map((service, index) => (
//                     <div 
//                       key={index} 
//                       className="bg-white rounded-xl p-4 cursor-pointer hover:shadow-md transition-shadow border"
//                       onClick={() => handleCardAction(service.action)}
//                     >
//                       <div className={`w-12 h-12 rounded-xl ${service.color} flex items-center justify-center mb-3`}>
//                         {service.icon}
//                       </div>
//                       <p className="text-sm font-medium">{service.title}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="bg-white rounded-xl overflow-hidden shadow-sm border">
//                 <div className="p-4 border-b">
//                   <h2 className="text-lg font-semibold flex items-center gap-2">
//                     <Shield className="h-5 w-5 text-blue-600" />
//                     Card Security & Controls
//                   </h2>
//                   <p className="text-sm text-muted-foreground">Manage your card security settings</p>
//                 </div>
//                 <div className="p-4 space-y-4">
//                   <div className="space-y-3">
//                     <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                       <div>
//                         <p className="font-medium">International Transactions</p>
//                         <p className="text-xs text-muted-foreground">Enable/disable international usage</p>
//                       </div>
//                       <Switch />
//                     </div>
//                     <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                       <div>
//                         <p className="font-medium">Online Transactions</p>
//                         <p className="text-xs text-muted-foreground">Control online payment limits</p>
//                       </div>
//                       <Switch defaultChecked />
//                     </div>
//                     <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                       <div>
//                         <p className="font-medium">ATM Withdrawals</p>
//                         <p className="text-xs text-muted-foreground">Set daily withdrawal limits</p>
//                       </div>
//                       <Button variant="outline" size="sm" className="h-8 text-xs rounded-full">Manage</Button>
//                     </div>
//                     <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                       <div>
//                         <p className="font-medium">Contactless Payments</p>
//                         <p className="text-xs text-muted-foreground">Enable/disable tap to pay</p>
//                       </div>
//                       <Switch defaultChecked />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </TabsContent>

//             <TabsContent value="apply" className="space-y-4 mt-4">
//               <div>
//                 <h2 className="text-lg font-semibold mb-3">Apply for New Card</h2>
//                 <div className="space-y-3">
//                   {cardApplications.map((application) => (
//                     <div key={application.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-l-2 border-l-primary">
//                       <div className="p-4">
//                         <div className="flex items-start justify-between mb-3">
//                           <div>
//                             <h3 className="font-semibold">{application.title}</h3>
//                             <p className="text-xs text-muted-foreground">{application.description}</p>
//                           </div>
//                           <div className="text-right">
//                             <p className="text-xs font-medium text-primary">Annual Fee</p>
//                             <p className="text-sm font-semibold">{application.fee}</p>
//                           </div>
//                         </div>
                        
//                         <div className="mb-4">
//                           <h4 className="font-medium text-sm mb-2">Key Features</h4>
//                           <ul className="space-y-1">
//                             {application.features.map((feature, featureIndex) => (
//                               <li key={featureIndex} className="text-xs text-muted-foreground flex items-center gap-2">
//                                 <div className="w-1 h-1 rounded-full bg-green-500"></div>
//                                 {feature}
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
                        
//                         <div className="grid grid-cols-2 gap-2 text-xs mb-4">
//                           <div className="bg-gray-100 p-2 rounded-lg">
//                             <p className="font-medium">Eligibility</p>
//                             <p className="text-xs">{application.eligibility}</p>
//                           </div>
//                           <div className="bg-gray-100 p-2 rounded-lg">
//                             <p className="font-medium">Processing Time</p>
//                             <p className="text-xs">{application.processingTime}</p>
//                           </div>
//                         </div>
                        
//                         <div className="flex gap-2">
//                           <Button size="sm" className="flex-1 h-9 rounded-full" onClick={() => handleApplyNow(application)}>
//                             Apply Now
//                           </Button>
//                           <Button size="sm" variant="outline" className="flex-1 h-9 rounded-full">
//                             Learn More
//                           </Button>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="bg-white rounded-xl overflow-hidden shadow-sm border">
//                 <div className="p-4 border-b">
//                   <h2 className="text-lg font-semibold">Application Status</h2>
//                   <p className="text-sm text-muted-foreground">Track your card applications</p>
//                 </div>
//                 <div className="p-6">
//                   {pendingApplications.length > 0 ? (
//                     <div className="space-y-4">
//                       {pendingApplications.map((application) => (
//                         <div key={application.id} className="bg-gray-50 p-4 rounded-lg border border-yellow-100">
//                           <div className="flex items-center justify-between mb-2">
//                             <div>
//                               <h3 className="font-semibold">{application.title}</h3>
//                               <p className="text-sm text-muted-foreground">
//                                 Application in progress ({application.progress}% complete)
//                               </p>
//                             </div>
//                             <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
//                           </div>
//                           <p className="text-sm text-yellow-700 mb-3">
//                             Your application for {application.title} is incomplete. Please complete the remaining steps to proceed.
//                           </p>
//                           <Button
//                             className="w-full h-9 rounded-full bg-gradient-to-r from-[#134e5e] to-[#71b280] text-white"
//                             onClick={() => handleResumeApplication(application)}
//                           >
//                             Resume Application
//                           </Button>
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="text-center">
//                       <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
//                         <CreditCard className="h-8 w-8 text-muted-foreground" />
//                       </div>
//                       <p className="text-sm text-muted-foreground">No pending applications</p>
//                       <p className="text-xs text-muted-foreground mt-1">Your card applications will appear here</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </TabsContent>
//           </Tabs>
//         </div>

//         {pinAuthOpen && selectedCard && pinAuthAction && (
//           <PinAuth
//             title={`${pinAuthAction === "block" ? "Block" : "Unblock"} Card`}
//             description={`Enter your PIN to ${pinAuthAction} your ${selectedCard.name}`}
//             onSuccess={handlePinAuthSuccess}
//             onCancel={handlePinAuthCancel}
//           />
//         )}

//         {pinChangeOpen && selectedCard && (
//           <PinChange
//             title={selectedCard.pinSet ? "Change Card PIN" : "Set Card PIN"}
//             description={selectedCard.pinSet ? "Change your card PIN for enhanced security" : "Set a PIN for your card to enable transactions"}
//             hasExistingPin={selectedCard.pinSet || false}
//             onSuccess={handlePinChangeSuccess}
//             onCancel={handlePinChangeCancel}
//           />
//         )}
//       </div>
//       <BottomNavigation />
//     </BankingLayout>
//   );
// };

// export default CardManagement;
import { useState, useEffect } from "react";
import { ArrowLeft, CreditCard, Plus, Eye, EyeOff, Lock, Unlock, FileText, Gift, Phone, AlertCircle, CheckCircle, Loader2, ChevronDown, ChevronUp, MoreHorizontal, Key, BarChart3, Calendar, Coins, Shield, Trash2 } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BankingLayout } from "@/components/BankingLayout";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { PinAuth } from "@/components/auth/PinAuth";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { PinChange } from "@/components/auth/PinChange";
import { BottomNavigation } from "@/components/BottomNavigation";

type CardType = {
  id: number;
  name: string;
  number: string;
  type: "Credit Card" | "Debit Card";
  variant: string;
  status: "Active" | "Blocked" | "Expired";
  limit: string;
  available: string;
  expiryDate: string;
  rewardPoints: number;
  cvv?: string;
  pinSet?: boolean;
  internationalEnabled?: boolean;
  onlineEnabled?: boolean;
  contactlessEnabled?: boolean;
  spendingLimit?: number;
  currentSpending?: number;
  cardDesign?: string;
  issuer?: string;
  cardNetwork?: "Visa" | "Mastercard" | "RuPay";
  billingDate?: string;
  dueDate?: string;
  minimumDue?: string;
};

type PendingApplication = {
  id: string;
  title: string;
  type: string;
  variant: string;
  lastStep: string;
  progress: number;
};

const CardManagement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [showCardDetails, setShowCardDetails] = useState<{ [key: string]: boolean }>({});
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [pinAuthOpen, setPinAuthOpen] = useState(false);
  const [pinChangeOpen, setPinChangeOpen] = useState(false);
  const [pinAuthAction, setPinAuthAction] = useState<"block" | "unblock" | null>(null);
  const [activeTab, setActiveTab] = useState("my-cards");
  const [cards, setCards] = useState<CardType[]>([]);
  const [pendingApplications, setPendingApplications] = useState<PendingApplication[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const mockCards: CardType[] = [
          {
            id: 1,
            name: "Platinum Rewards",
            number: "4532 1234 5678 9012",
            type: "Credit Card",
            variant: "Platinum",
            status: "Active",
            limit: "₹5,00,000",
            available: "₹4,25,000",
            expiryDate: "12/28",
            rewardPoints: 15420,
            cvv: "123",
            pinSet: true,
            internationalEnabled: true,
            onlineEnabled: true,
            contactlessEnabled: true,
            spendingLimit: 500000,
            currentSpending: 75000,
            cardDesign: "premium",
            issuer: "Bank of Baroda",
            cardNetwork: "Visa",
            billingDate: "15th of each month",
            dueDate: "5th of each month",
            minimumDue: "₹2,000"
          },
          {
            id: 2,
            name: "Gold Debit",
            number: "5678 9012 3456 7890",
            type: "Debit Card",
            variant: "Gold",
            status: "Active",
            limit: "₹2,00,000",
            available: "₹1,80,000",
            expiryDate: "06/27",
            rewardPoints: 8750,
            cvv: "456",
            pinSet: false,
            internationalEnabled: false,
            onlineEnabled: true,
            contactlessEnabled: true,
            spendingLimit: 200000,
            currentSpending: 20000,
            cardDesign: "gold",
            issuer: "Bank Name",
            cardNetwork: "Mastercard",
          },
          {
            id: 3,
            name: "Classic",
            number: "1234 5678 9012 3456",
            type: "Debit Card",
            variant: "Classic",
            status: "Blocked",
            limit: "₹50,000",
            available: "₹45,000",
            expiryDate: "03/26",
            rewardPoints: 320,
            cvv: "789",
            pinSet: true,
            internationalEnabled: false,
            onlineEnabled: false,
            contactlessEnabled: false,
            spendingLimit: 50000,
            currentSpending: 5000,
            cardDesign: "classic",
            issuer: "Bank of Baroda",
            cardNetwork: "RuPay",
          },
        ];
        setCards(mockCards);

        const pending = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key?.startsWith("pending_")) {
            const data = JSON.parse(localStorage.getItem(key) || "{}");
            const variant = key.replace("pending_", "");
            const title = cardApplications.find(app => app.variant === variant)?.title || "Unknown Card";
            const type = cardApplications.find(app => app.variant === variant)?.type || "";
            const progressValues = {
              "personal-info": 40,
              "employment-details": 60,
              "delivery": 80,
              "review": 90,
            };
            pending.push({
              id: key,
              title,
              type,
              variant,
              lastStep: data.step,
              progress: progressValues[data.step as keyof typeof progressValues] || 0,
            });
          }
        }
        setPendingApplications(pending);

        setLoading(false);
      } catch (error) {
        toast({
          title: "Error loading data",
          description: "Failed to fetch your card or application details. Please try again.",
          variant: "destructive",
        });
        setLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  const cardServices = [
    { title: "Block/Unblock Card", icon: <Lock className="h-4 w-4" />, color: "bg-red-50 text-red-600", action: "block" },
    { title: "Set/Change PIN", icon: <Key className="h-4 w-4" />, color: "bg-blue-50 text-blue-600", action: "pin" },
    { title: "View Statement", icon: <FileText className="h-4 w-4" />, color: "bg-green-50 text-green-600", action: "statement" },
    { title: "Rewards & Offers", icon: <Gift className="h-4 w-4" />, color: "bg-purple-50 text-purple-600", action: "rewards" },
    { title: "Set Limits", icon: <BarChart3 className="h-4 w-4" />, color: "bg-orange-50 text-orange-600", action: "limits" },
    { title: "Report Lost Card", icon: <Phone className="h-4 w-4" />, color: "bg-red-50 text-red-600", action: "report" },
  ];

  const cardApplications = [
    {
      id: "premium",
      title: "Premium Credit Card",
      description: "Exclusive benefits with premium lifestyle rewards",
      features: ["5% cashback on dining", "Airport lounge access", "Travel insurance"],
      fee: "₹2,999",
      color: "bg-gradient-to-r from-[#134e5e] to-[#71b280]",
      eligibility: "Min. ₹75,000 monthly income",
      processingTime: "3-5 business days",
      type: "Credit Card",
      variant: "Premium",
      issuer: "Bank of Baroda",
    },
    {
      id: "business",
      title: "Business Credit Card",
      description: "Perfect for business expenses and transactions",
      features: ["Business expense tracking", "Higher credit limits", "GST benefits"],
      fee: "₹4,999",
      color: "bg-gradient-to-r from-[#134e5e] to-[#71b280]",
      eligibility: "Registered business required",
      processingTime: "5-7 business days",
      type: "Credit Card",
      variant: "Business",
      issuer: "Bank Name",
    },
    {
      id: "travel",
      title: "Travel Credit Card",
      description: "Best for frequent travelers and international transactions",
      features: ["Zero forex markup", "Travel rewards", "Emergency assistance"],
      fee: "₹1,999",
      color: "bg-gradient-to-r from-[#134e5e] to-[#71b280]",
      eligibility: "Min. ₹50,000 monthly income",
      processingTime: "3-5 business days",
      type: "Credit Card",
      variant: "Travel",
      issuer: "Bank of Baroda",
    },
    {
      id: "gold-debit",
      title: "Gold Debit Card",
      description: "Premium debit card with exclusive benefits",
      features: ["1% cashback on all spends", "Zero liability protection", "Complimentary insurance"],
      fee: "₹499",
      color: "bg-gradient-to-r from-[#2e6a7a] to-[#88c998]",
      eligibility: "Maintain ₹25,000 balance",
      processingTime: "2-3 business days",
      type: "Debit Card",
      variant: "Gold",
      issuer: "Bank Name",
    },
    {
      id: "classic-debit",
      title: "Classic Debit Card",
      description: "Basic debit card for everyday transactions",
      features: ["Wide acceptance", "Secure transactions", "Easy online payments"],
      fee: "₹199",
      color: "bg-gradient-to-r from-[#2e6a7a] to-[#88c998]",
      eligibility: "Zero balance account",
      processingTime: "2-3 business days",
      type: "Debit Card",
      variant: "Classic",
      issuer: "Bank of Baroda",
    },
  ];

  const toggleCardDetails = (cardId: number) => {
    setShowCardDetails((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  const toggleCardExpand = (cardId: number) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  const handleCardAction = async (action: string, card?: CardType) => {
    setActionLoading(true);
    if (card) setSelectedCard(card);

    try {
      const actionMessages = {
        block: {
          title: "Card blocked successfully",
          description: "Your card has been temporarily blocked for security.",
        },
        unblock: {
          title: "Card unblocked successfully",
          description: "Your card is now active for transactions.",
        },
        pin: {
          title: "PIN change initiated",
          description: "Follow the instructions sent to your registered mobile number.",
        },
        statement: {
          title: "Statement requested",
          description: "Your card statement will be emailed to you shortly.",
        },
        rewards: {
          title: "Redirecting to rewards",
          description: "You can now view and redeem your reward points.",
        },
        limits: {
          title: "Transaction limits updated",
          description: "Your new transaction limits are now active.",
        },
        report: {
          title: "Card reported as lost",
          description: "A replacement card will be issued within 5-7 business days.",
        },
      };

      if (action === "block" && card) {
        setPinAuthOpen(true);
        setPinAuthAction("block");
      } else if (action === "unblock" && card) {
        setPinAuthOpen(true);
        setPinAuthAction("unblock");
      } else if (action === "pin" && card) {
        setPinChangeOpen(true);
      } else if (action === "rewards") {
        navigate("/offers");
        return;
      } else if (action === "statement") {
        navigate("/statements");
        return;
      } else if (action === "limits") {
        navigate("/card-limits", { state: { card } });
      } else if (action === "report") {
        toast({
          title: actionMessages.report.title,
          description: actionMessages.report.description,
        });
      }
    } catch (error) {
      toast({
        title: "Action failed",
        description: "There was an error processing your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handlePinAuthSuccess = () => {
    if (selectedCard && pinAuthAction) {
      setCards(cards.map((c) => 
        c.id === selectedCard.id 
          ? { ...c, status: pinAuthAction === "block" ? "Blocked" : "Active" } 
          : c
      ));
      toast({
        title: `Card ${pinAuthAction === "block" ? "Blocked" : "Unblocked"} Successfully`,
        description: `Your card has been ${pinAuthAction === "block" ? "temporarily blocked" : "activated"}.`,
      });
    }
    setPinAuthOpen(false);
    setPinAuthAction(null);
    setSelectedCard(null);
  };

  const handlePinAuthCancel = () => {
    setPinAuthOpen(false);
    setPinAuthAction(null);
    setSelectedCard(null);
  };

  const handlePinChangeSuccess = () => {
    if (selectedCard) {
      setCards(cards.map((c) => 
        c.id === selectedCard.id ? { ...c, pinSet: true } : c
      ));
      toast({
        title: "PIN Updated Successfully",
        description: "Your card PIN has been successfully updated.",
      });
    }
    setPinChangeOpen(false);
    setSelectedCard(null);
  };

  const handlePinChangeCancel = () => {
    setPinChangeOpen(false);
    setSelectedCard(null);
  };

  const handleDeleteApplication = (applicationId: string) => {
    localStorage.removeItem(applicationId);
    setPendingApplications(pendingApplications.filter(app => app.id !== applicationId));
    toast({
      title: "Application Deleted",
      description: "Your pending application has been successfully removed.",
      className: "bg-green-50 border-green-200 text-green-800",
    });
  };

  const maskCardNumber = (number: string) => {
    return number.replace(/(\d{4})\s(\d{4})\s(\d{4})\s(\d{4})/, "**** **** **** $4");
  };

  const maskCVV = () => {
    return "•••";
  };

  const handleApplyNow = (application?: any) => {
    navigate("/apply-new-card", { state: { selectedCard: application || null } });
  };

  const handleResumeApplication = (application: PendingApplication) => {
    const selectedCard = cardApplications.find(
      (app) => app.type === application.type && app.variant === application.variant
    );
    navigate("/apply-new-card", { state: { selectedCard, lastStep: application.lastStep } });
  };

  const getCardNetworkIcon = (network: string) => {
    switch (network) {
      case "Visa":
        return <div className="text-[#134e5e] font-bold text-xs">Visa</div>;
      case "Mastercard":
        return <div className="text-[#134e5e] font-bold text-xs">Mastercard</div>;
      case "RuPay":
        return <div className="text-[#134e5e] font-bold text-xs">RuPay</div>;
      default:
        return null;
    }
  };

  const getCardUsagePercentage = (card: CardType) => {
    if (!card.spendingLimit || !card.currentSpending) return 0;
    return (card.currentSpending / card.spendingLimit) * 100;
  };

  const getCardUsageColor = (percentage: number) => {
    if (percentage < 50) return "bg-green-500";
    if (percentage < 80) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <BankingLayout>
      <div className="flex flex-col min-h-screen pb-24 bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#134e5e] to-[#71b280] border-b border-[#134e5e]/20 sticky top-0 z-40 w-full shadow-sm">
          <div className="flex items-center gap-3 px-4 sm:px-6 py-3 max-w-screen-xl mx-auto">
            <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")} className="h-9 w-9 rounded-full text-white hover:bg-white/20">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-base sm:text-lg font-semibold text-white">My Cards</h1>
            <div className="ml-auto">
              <Button 
                size="sm" 
                className="flex items-center gap-1 h-9 rounded-lg bg-gradient-to-r from-[#0f3f4b] to-[#5e9b6a] hover:from-[#134e5e] hover:to-[#71b280] text-white font-medium" 
                onClick={() => navigate("/add-new-card")}
              >
                <Plus className="h-4 w-4" />
                Add Card
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 px-4 sm:px-6 py-5 max-w-screen-xl mx-auto w-full">
          <Tabs defaultValue="my-cards" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 h-10 bg-muted/50 p-1 rounded-lg mb-4">
              <TabsTrigger value="my-cards" className="text-xs font-medium rounded-md data-[state=active]:bg-[#22515d] data-[state=active]:text-gray-50 data-[state=active]:shadow-sm">My Cards</TabsTrigger>
              <TabsTrigger value="services" className="text-xs font-medium rounded-md data-[state=active]:bg-[#22515d]  data-[state=active]:text-gray-50  data-[state=active]:shadow-sm">Services</TabsTrigger>
              <TabsTrigger value="apply" className="text-xs font-medium rounded-md data-[state=active]:bg-[#22515d]  data-[state=active]:text-gray-50  data-[state=active]:shadow-sm">Apply</TabsTrigger>
            </TabsList>

            <TabsContent value="my-cards" className="space-y-4">
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-40 w-full rounded-lg" />
                  ))}
                </div>
              ) : cards.length === 0 ? (
                <div className="text-center py-8 space-y-3 bg-white rounded-lg p-5 shadow-sm">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                    <CreditCard className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold">No cards found</h3>
                  <p className="text-sm text-muted-foreground">You haven't added any cards yet</p>
                  <Button 
                    className="h-9 rounded-lg bg-gradient-to-r from-[#134e5e] to-[#71b280] text-white font-medium" 
                    onClick={() => setActiveTab("apply")}
                  >
                    Apply for a new card
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cards.map((card) => (
                    <div key={card.id} className="bg-white rounded-lg overflow-hidden shadow-sm border border-[#134e5e]/20">
                      <div
                        className={`${card.type === "Credit Card" ? "bg-gradient-to-r from-[#22515d] to-[#283f2e]" : "bg-gradient-to-r from-[#22515d] to-[#88c998]"} text-white p-5 relative cursor-pointer`}
                        onClick={() => toggleCardExpand(card.id)}
                      >
                        <div className="absolute top-4 right-4 opacity-80">
                          {getCardNetworkIcon(card.cardNetwork || "Visa")}
                        </div>
                        
                        <div className="flex justify-between items-start mb-5">
                          <div>
                            <p className="text-xs opacity-80 mb-1">{card.type} - {card.issuer}</p>
                            <h3 className="text-lg font-semibold">{card.name}</h3>
                          </div>
                          <Badge
                            variant={card.status === "Active" ? "default" : "destructive"}
                            className={`text-xs ${card.status === "Active" ? "bg-white/20 text-white" : "bg-red-500/80"} border-0 h-5`}
                          >
                            {card.status === "Active" ? <CheckCircle className="h-3 w-3 mr-1" /> : <AlertCircle className="h-3 w-3 mr-1" />}
                            {card.status}
                          </Badge>
                        </div>
                        
                        <div className="flex justify-between items-center mb-3">
                          <p className="text-sm tracking-wider font-mono">
                            {showCardDetails[card.id] ? card.number : maskCardNumber(card.number)}
                          </p>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleCardDetails(card.id);
                            }}
                            className="h-7 w-7 p-0 text-white/80 hover:text-white hover:bg-white/20 rounded-full"
                          >
                            {showCardDetails[card.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-xs opacity-80">Valid Thru</p>
                            <p className="text-sm">{showCardDetails[card.id] ? card.expiryDate : "••/••"}</p>
                          </div>
                          <div>
                            <p className="text-xs opacity-80">CVV</p>
                            <p className="text-sm font-mono">{showCardDetails[card.id] ? card.cvv : maskCVV()}</p>
                          </div>
                        </div>
                        
                        <div className="absolute bottom-4 right-4">
                          {expandedCard === card.id ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                        </div>
                      </div>

                      {expandedCard === card.id && (
                        <div className="p-4 space-y-4">
                          {card.type === "Credit Card" && card.spendingLimit && (
                            <div className="space-y-2">
                              <div className="flex justify-between items-center text-sm">
                                <span className="text-muted-foreground">Credit Usage</span>
                                <span className="font-medium">{Math.round(getCardUsagePercentage(card))}%</span>
                              </div>
                              <Progress value={getCardUsagePercentage(card)} className={`h-2 ${getCardUsageColor(getCardUsagePercentage(card))}`} />
                              <div className="flex justify-between text-xs text-muted-foreground">
                                <span>₹{card.currentSpending?.toLocaleString()}</span>
                                <span>₹{card.spendingLimit.toLocaleString()}</span>
                              </div>
                            </div>
                          )}

                          {card.type === "Credit Card" && (
                            <div className="grid grid-cols-2 gap-3">
                              <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="text-xs text-muted-foreground mb-1">Available Credit</p>
                                <p className="text-sm font-medium">{card.available}</p>
                              </div>
                              <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="text-xs text-muted-foreground mb-1">Credit Limit</p>
                                <p className="text-sm font-medium">{card.limit}</p>
                              </div>
                              {card.billingDate && (
                                <div className="bg-gray-50 p-3 rounded-lg">
                                  <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                                    <Calendar className="h-3 w-3" /> Billing Date
                                  </p>
                                  <p className="text-sm font-medium">{card.billingDate}</p>
                                </div>
                              )}
                              {card.dueDate && (
                                <div className="bg-gray-50 p-3 rounded-lg">
                                  <p className="text-xs text-muted-foreground mb-1">Due Date</p>
                                  <p className="text-sm font-medium">{card.dueDate}</p>
                                </div>
                              )}
                            </div>
                          )}

                          {card.rewardPoints > 0 && (
                            <div className="bg-gradient-to-r from-[#134e5e]/10 to-[#71b280]/10 p-3 rounded-lg border border-[#134e5e]/20">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-xs text-[#134e5e] mb-1 flex items-center gap-1">
                                    <Coins className="h-3 w-3" /> Reward Points
                                  </p>
                                  <p className="text-sm font-semibold text-[#134e5e]">{card.rewardPoints.toLocaleString()} pts</p>
                                </div>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-8 text-xs rounded-lg bg-[#134e5e]/10 border-[#134e5e]/20 text-[#134e5e] hover:bg-[#71b280]/20"
                                  onClick={() => handleCardAction("rewards")}
                                  disabled={actionLoading}
                                >
                                  {actionLoading && selectedCard?.id === card.id ? (
                                    <Loader2 className="h-3 w-3 animate-spin" />
                                  ) : (
                                    "Redeem"
                                  )}
                                </Button>
                              </div>
                            </div>
                          )}

                          <div className="flex gap-2 pt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-9 text-xs flex-1 rounded-lg border-[#134e5e]/20"
                              onClick={() => handleCardAction("statement", card)}
                              disabled={actionLoading && selectedCard?.id === card.id}
                            >
                              {actionLoading && selectedCard?.id === card.id ? (
                                <Loader2 className="h-3 w-3 animate-spin" />
                              ) : (
                                "Statement"
                              )}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-9 text-xs flex-1 rounded-lg border-[#134e5e]/20"
                              onClick={() => handleCardAction(card.status === "Active" ? "block" : "unblock", card)}
                              disabled={actionLoading && selectedCard?.id === card.id}
                            >
                              {actionLoading && selectedCard?.id === card.id ? (
                                <Loader2 className="h-3 w-3 animate-spin" />
                              ) : (
                                <>
                                  {card.status === "Active" ? <Lock className="h-3 w-3 mr-1" /> : <Unlock className="h-3 w-3 mr-1" />}
                                  {card.status === "Active" ? "Block" : "Unblock"}
                                </>
                              )}
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="h-9 w-9 p-0 rounded-lg border-[#134e5e]/20">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-48 rounded-lg">
                                <DropdownMenuItem onClick={() => handleCardAction("pin", card)} className="cursor-pointer py-1.5 text-xs">
                                  <Key className="h-3 w-3 mr-2" />
                                  {card.pinSet ? "Change PIN" : "Set PIN"}
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleCardAction("limits", card)} className="cursor-pointer py-1.5 text-xs">
                                  <BarChart3 className="h-3 w-3 mr-2" />
                                  Set Limits
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600 cursor-pointer py-1.5 text-xs" onClick={() => handleCardAction("report", card)}>
                                  <Phone className="h-3 w-3 mr-2" />
                                  Report Lost
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="services" className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold mb-3">Card Services</h2>
                <div className="grid grid-cols-2 gap-3">
                  {cardServices.map((service, index) => (
                    <div 
                      key={index} 
                      className="bg-white rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow border border-[#134e5e]/20"
                      onClick={() => handleCardAction(service.action)}
                    >
                      <div className={`w-12 h-12 rounded-lg ${service.color} flex items-center justify-center mb-2`}>
                        {service.icon}
                      </div>
                      <p className="text-sm font-medium">{service.title}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-[#134e5e]/20">
                <div className="p-4 border-b border-[#134e5e]/20">
                  <h2 className="text-lg font-semibold flex items-center gap-1.5">
                    <Shield className="h-4 w-4 text-[#134e5e]" />
                    Card Security & Controls
                  </h2>
                  <p className="text-xs text-muted-foreground">Manage your card security settings</p>
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium">International Transactions</p>
                      <p className="text-xs text-muted-foreground">Enable/disable international usage</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium">Online Transactions</p>
                      <p className="text-xs text-muted-foreground">Control online payment limits</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium">ATM Withdrawals</p>
                      <p className="text-xs text-muted-foreground">Set daily withdrawal limits</p>
                    </div>
                    <Button variant="outline" size="sm" className="h-8 text-xs rounded-lg border-[#134e5e]/20">Manage</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium">Contactless Payments</p>
                      <p className="text-xs text-muted-foreground">Enable/disable tap to pay</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="apply" className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold mb-3">Apply for New Card</h2>
                <div className="space-y-3">
                  {cardApplications.map((application) => (
                    <div key={application.id} className="bg-white rounded-lg overflow-hidden shadow-sm border border-[#134e5e]/20">
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-base font-semibold">{application.title}</h3>
                            <p className="text-xs text-muted-foreground">{application.description}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs font-medium text-[#134e5e]">Annual Fee</p>
                            <p className="text-sm font-semibold">{application.fee}</p>
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <h4 className="text-sm font-medium mb-1.5">Key Features</h4>
                          <ul className="space-y-1">
                            {application.features.map((feature, featureIndex) => (
                              <li key={featureIndex} className="text-xs text-muted-foreground flex items-center gap-1.5">
                                <div className="w-1 h-1 rounded-full bg-[#71b280]"></div>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                          <div className="bg-gray-50 p-2.5 rounded-lg">
                            <p className="text-xs font-medium">Eligibility</p>
                            <p className="text-xs">{application.eligibility}</p>
                          </div>
                          <div className="bg-gray-50 p-2.5 rounded-lg">
                            <p className="text-xs font-medium">Processing Time</p>
                            <p className="text-xs">{application.processingTime}</p>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            className="flex-1 h-9 rounded-lg bg-gradient-to-r from-[#134e5e] to-[#71b280] hover:from-[#0f3f4b] hover:to-[#5e9b6a] text-white font-medium" 
                            onClick={() => handleApplyNow(application)}
                          >
                            Apply Now
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex-1 h-9 rounded-lg border-[#134e5e]/20 text-[#134e5e] hover:bg-[#71b280]/10"
                          >
                            Learn More
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-[#134e5e]/20">
                <div className="p-4 border-b border-[#134e5e]/20">
                  <h2 className="text-lg font-semibold">Application Status</h2>
                  <p className="text-xs text-muted-foreground">Track your card applications</p>
                </div>
                <div className="p-5">
                  {pendingApplications.length > 0 ? (
                    <div className="space-y-3">
                      {pendingApplications.map((application) => (
                        <div key={application.id} className="bg-gray-50 p-4 rounded-lg border border-[#134e5e]/10">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h3 className="text-base font-semibold">{application.title}</h3>
                              <p className="text-xs text-muted-foreground">
                                Application in progress ({application.progress}% complete)
                              </p>
                            </div>
                            <Badge className="bg-[#134e5e]/10 text-[#134e5e] text-xs h-5">Pending</Badge>
                          </div>
                          <p className="text-xs text-[#134e5e] mb-3">
                            Your application for {application.title} is incomplete. Please complete the remaining steps to proceed.
                          </p>
                          <div className="flex gap-2">
                            <Button
                              className="flex-1 h-9 rounded-lg bg-gradient-to-r from-[#134e5e] to-[#71b280] hover:from-[#0f3f4b] hover:to-[#5e9b6a] text-white font-medium"
                              onClick={() => handleResumeApplication(application)}
                            >
                              Resume Application
                            </Button>
                            <Button
                              variant="outline"
                              className="flex-1 h-9 rounded-lg text-red-600 border-red-200 hover:bg-red-50"
                              onClick={() => handleDeleteApplication(application.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-1.5" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <CreditCard className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <p className="text-sm text-muted-foreground">No pending applications</p>
                      <p className="text-xs text-muted-foreground mt-1">Your card applications will appear here</p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Fixed Footer for Apply Tab */}
        {activeTab === "apply" && (
          <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-[#134e5e]/20 z-50">
            <div className="px-4 sm:px-6 py-3 max-w-screen-xl mx-auto">
              <Button
                className="w-full h-10 bg-gradient-to-r from-[#134e5e] to-[#71b280] hover:from-[#0f3f4b] hover:to-[#5e9b6a] text-white font-medium text-sm rounded-lg"
                onClick={() => handleApplyNow()}
              >
                Apply for New Card
              </Button>
            </div>
          </div>
        )}

        {pinAuthOpen && selectedCard && pinAuthAction && (
          <PinAuth
            title={`${pinAuthAction === "block" ? "Block" : "Unblock"} Card`}
            description={`Enter your PIN to ${pinAuthAction} your ${selectedCard.name}`}
            onSuccess={handlePinAuthSuccess}
            onCancel={handlePinAuthCancel}
          />
        )}

        {pinChangeOpen && selectedCard && (
          <PinChange
            title={selectedCard.pinSet ? "Change Card PIN" : "Set Card PIN"}
            description={selectedCard.pinSet ? "Change your card PIN for enhanced security" : "Set a PIN for your card to enable transactions"}
            hasExistingPin={selectedCard.pinSet || false}
            onSuccess={handlePinChangeSuccess}
            onCancel={handlePinChangeCancel}
          />
        )}

        <BottomNavigation />
      </div>
    </BankingLayout>
  );
};

export default CardManagement;