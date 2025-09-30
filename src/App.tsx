
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { ResponsiveLayout } from '@/components/ResponsiveLayout';
import { MobileNavigation } from '@/components/MobileNavigation';
import Index from '@/pages/Index';
import Login from '@/pages/Login';
import SplashScreen from '@/pages/SplashScreen';
import EnhancedPSBDashboard from '@/pages/EnhancedPSBDashboard';
import Profile from '@/pages/Profile';
import ProfileOverview from '@/pages/ProfileOverview';
import Transfer from '@/pages/Transfer';
import TransferConfirmation from '@/pages/TransferConfirmation';
import TransferSuccess from '@/pages/TransferSuccess';
import AddBeneficiary from '@/pages/AddBeneficiary';
import ManageBeneficiary from '@/pages/ManageBeneficiary';
import QuickActions from '@/pages/QuickActions';
import QRPayment from '@/pages/QRPayment';
import UPIHome from '@/pages/UPIHome';
import UPIProfile from '@/pages/UPIProfile';
import AccountsList from '@/pages/AccountsList';
import AccountDetails from '@/pages/AccountDetails';
import AccountSummary from '@/pages/AccountSummary';
import MiniStatement from '@/pages/MiniStatement';
import AccountStatement from '@/pages/AccountStatement';
import Cards from '@/pages/Cards';
import CardsManagement from '@/pages/CardsManagement';
import CreditCardManagement from '@/pages/CreditCardManagement';
import Bills from '@/pages/Bills';
import Recharge from '@/pages/Recharge';
import FinanceManagement from '@/pages/FinanceManagement';
import Investments from '@/pages/Investments';
import MutualFundsFlow from '@/pages/MutualFundsFlow';
import InvestmentDashboard from '@/pages/InvestmentDashboard';
import DepositManagement from '@/pages/DepositManagement';
import DepositDashboard from '@/pages/DepositDashboard';
import FDCreation from '@/pages/FDCreation';
import FDSuccess from '@/pages/FDSuccess';
import Loans from '@/pages/Loans';
import CompleteLoanFlow from '@/pages/CompleteLoanFlow';
import LoanApplication from '@/pages/LoanApplication';
import LoanApplicationForm from '@/pages/LoanApplicationForm';
import LoanCibilConsent from '@/pages/LoanCibilConsent';
import LoanOTPVerification from '@/pages/LoanOTPVerification';
import LoanEligibilityResult from '@/pages/LoanEligibilityResult';
import LoanDocumentUpload from '@/pages/LoanDocumentUpload';
import LoanReviewConsent from '@/pages/LoanReviewConsent';
import LoanApprovalResult from '@/pages/LoanApprovalResult';
import LoanManagement from '@/pages/LoanManagement';
import NotFound from '@/pages/NotFound';
import Settings from '@/pages/Settings';
import SecuritySettings from '@/pages/SecuritySettings';
import NotificationCenter from '@/pages/NotificationCenter';
import Notifications from '@/pages/Notifications';
import SearchPage from '@/pages/SearchPage';
import Support from '@/pages/Support';
import ChatSupport from '@/pages/ChatSupport';
import HelpCenter from '@/pages/HelpCenter';
import BranchLocator from '@/pages/BranchLocator';
import StatementsCenter from '@/pages/StatementsCenter';
import DigitalLocker from '@/pages/DigitalLocker';
import TaxTools from '@/pages/TaxTools';
import ForexServices from '@/pages/ForexServices';
import ChequeServices from '@/pages/ChequeServices';
import OffersRewards from '@/pages/OffersRewards';
import InsuranceServices from '@/pages/InsuranceServices';
import InsuranceDashboard from '@/pages/InsuranceDashboard';
import SelectInsuranceType from '@/pages/SelectInsuranceType';
import InsurancePlans from '@/pages/InsurancePlans';
import InsurancePlanDetails from '@/pages/InsurancePlanDetails';
import InsuranceKYC from '@/pages/InsuranceKYC';
import InsuranceCoverageSelection from '@/pages/InsuranceCoverageSelection';
import InsuranceDocumentUpload from '@/pages/InsuranceDocumentUpload';
import InsuranceReviewPayment from '@/pages/InsuranceReviewPayment';
import InsurancePolicySuccess from '@/pages/InsurancePolicySuccess';
import LoanDashboard from '@/pages/LoanDashboard';
import ScheduledPayments from '@/pages/ScheduledPayments';
import VideoKYC from '@/pages/VideoKYC';
import SpendingAnalytics from '@/pages/SpendingAnalytics';
import ApplyNowFlow from './pages/ApplyNowFlow';
import AddCardFlow from './pages/AddCardFlow';
import CardManagement from '@/pages/CardsManagement';
import Mandates from '@/pages/Mandates';
import MandateCreate from '@/pages/MandateCreate';
import MandateReview from '@/pages/MandateReview';
import MandateSuccess from '@/pages/MandateSuccess';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ResponsiveLayout>
        <Router>
          <MobileNavigation>
            <Routes>
          {/* <Route path="/" element={<Index />} /> */}
          <Route path="/" element={<SplashScreen />} />
         
          <Route path="/splash" element={<SplashScreen />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<EnhancedPSBDashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile-overview" element={<ProfileOverview />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/transfer-confirmation" element={<TransferConfirmation />} />
          <Route path="/transfer-success" element={<TransferSuccess />} />
          <Route path="/add-beneficiary" element={<AddBeneficiary />} />
          <Route path="/manage-beneficiary" element={<ManageBeneficiary />} />
          <Route path="/quick-actions" element={<QuickActions />} />
          <Route path="/qr-payment" element={<QRPayment />} />
          <Route path="/upi-home" element={<UPIHome />} />
          <Route path="/upi-profile" element={<UPIProfile />} />
          <Route path="/accounts" element={<AccountsList />} />
          <Route path="/account-details" element={<AccountDetails />} />
          <Route path="/account-summary" element={<AccountSummary />} />
          <Route path="/mini-statement" element={<MiniStatement />} />
          <Route path="/account-statement" element={<AccountStatement />} />
          <Route path="/cards" element={<Cards />} />
          <Route path="/cards-management" element={<CardsManagement />} />
          <Route path="/apply-new-card" element={<ApplyNowFlow />} />
          <Route path="/add-new-card" element={<AddCardFlow />} />
          <Route path="/credit-card-management" element={<CreditCardManagement />} />
          <Route path="/card-management" element={<CardManagement />} />
          <Route path="/bills" element={<Bills />} />
          <Route path="/recharge" element={<Recharge />} />
          <Route path="/finance-management" element={<FinanceManagement />} />
          <Route path="/investments" element={<Investments />} />
          <Route path="/mutual-funds" element={<MutualFundsFlow />} />
          <Route path="/investment-dashboard" element={<InvestmentDashboard />} />
          <Route path="/deposit-management" element={<DepositManagement />} />
          <Route path="/deposit-dashboard" element={<DepositDashboard />} />
          <Route path="/fd-creation" element={<FDCreation />} />
          <Route path="/fd-success" element={<FDSuccess />} />
          <Route path="/loans" element={<Loans />} />
          <Route path="/complete-loan-flow" element={<CompleteLoanFlow />} />
          <Route path="/loan-dashboard" element={<LoanDashboard />} />
          <Route path="/loan-application" element={<LoanApplication />} />
          <Route path="/loan-application-form" element={<LoanApplicationForm />} />
          <Route path="/loan-cibil-consent" element={<LoanCibilConsent />} />
          <Route path="/loan-otp-verification" element={<LoanOTPVerification />} />
          <Route path="/loan-eligibility-result" element={<LoanEligibilityResult />} />
          <Route path="/loan-document-upload" element={<LoanDocumentUpload />} />
          <Route path="/loan-review-consent" element={<LoanReviewConsent />} />
          <Route path="/loan-approval-result" element={<LoanApprovalResult />} />
          <Route path="/loan-management" element={<LoanManagement />} />
          <Route path="/scheduled-payments" element={<ScheduledPayments />} />
          <Route path="/video-kyc" element={<VideoKYC />} />
          <Route path="/spending-analytics" element={<SpendingAnalytics />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/security-settings" element={<SecuritySettings />} />
          <Route path="/notification-center" element={<NotificationCenter />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/support" element={<Support />} />
          <Route path="/chat-support" element={<ChatSupport />} />
          <Route path="/help-center" element={<HelpCenter />} />
          <Route path="/branch-locator" element={<BranchLocator />} />
          <Route path="/statements-center" element={<StatementsCenter />} />
          <Route path="/digital-locker" element={<DigitalLocker />} />
          <Route path="/tax-tools" element={<TaxTools />} />
          <Route path="/forex-services" element={<ForexServices />} />
          <Route path="/cheque-services" element={<ChequeServices />} />
          <Route path="/offers-rewards" element={<OffersRewards />} />
          <Route path="/insurance-services" element={<InsuranceServices />} />
          <Route path="/insurance-dashboard" element={<InsuranceDashboard />} />
          <Route path="/select-insurance-type" element={<SelectInsuranceType />} />
          <Route path="/insurance-plans" element={<InsurancePlans />} />
          <Route path="/insurance-plan-details" element={<InsurancePlanDetails />} />
          <Route path="/insurance-kyc" element={<InsuranceKYC />} />
          <Route path="/insurance-coverage-selection" element={<InsuranceCoverageSelection />} />
          <Route path="/insurance-document-upload" element={<InsuranceDocumentUpload />} />
          <Route path="/insurance-review-payment" element={<InsuranceReviewPayment />} />
          <Route path="/insurance-policy-success" element={<InsurancePolicySuccess />} />
           <Route path="/mandates" element={<Mandates />} />
          <Route path="/mandate-create" element={<MandateCreate />} />
          <Route path="/mandate-transfer" element={<MandateCreate />} />
          <Route path="/mandate-review" element={<MandateReview />} />
          <Route path="/mandate-success" element={<MandateSuccess />} />
          <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </MobileNavigation>
        </Router>
      </ResponsiveLayout>
    </QueryClientProvider>
  );
}

export default App;
