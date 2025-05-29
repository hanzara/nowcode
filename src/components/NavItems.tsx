import {
  LayoutDashboard,
  Store,
  CreditCard,
  TrendingUp,
  BookOpen,
  Brain,
  Coins,
  Wallet,
  AlertCircle,
  Settings,
} from "lucide-react";
import Dashboard from "@/components/Dashboard";
import LoanMarketplace from "@/components/LoanMarketplace";
import MyLoans from "@/components/MyLoans";
import Portfolio from "@/components/Portfolio";
import LearningHub from "@/components/LearningHub";
import InvestmentInsights from "@/components/InvestmentInsights";
import TokenManagement from "@/components/TokenManagement";
import Staking from "@/components/Staking";
import WalletComponent from "@/components/Wallet";
import Disputes from "@/components/Disputes";
import SettingsComponent from "@/components/Settings";

interface NavItem {
  title: string;
  icon: any;
  component: React.FC;
  description: string;
}

export const navItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    component: Dashboard,
    description: "Overview of your lending portfolio"
  },
  {
    title: "Loan Marketplace",
    icon: Store,
    component: LoanMarketplace,
    description: "Browse and invest in available loans"
  },
  {
    title: "My Loans",
    icon: CreditCard,
    component: MyLoans,
    description: "Manage your active loans and applications"
  },
  {
    title: "Portfolio",
    icon: TrendingUp,
    component: Portfolio,
    description: "Track your investment performance"
  },
  {
    title: "Learning Hub",
    icon: BookOpen,
    component: LearningHub,
    description: "Educational content and earn VDO tokens"
  },
  {
    title: "AI Insights",
    icon: Brain,
    component: InvestmentInsights,
    description: "AI-powered investment recommendations"
  },
  {
    title: "VDO Tokens",
    icon: Coins,
    component: TokenManagement,
    description: "Manage your tokenized earnings and rewards"
  },
  {
    title: "Staking",
    icon: Coins,
    component: Staking,
    description: "Stake your tokens to earn rewards"
  },
  {
    title: "Wallet",
    icon: Wallet,
    component: WalletComponent,
    description: "Manage your digital wallet and funds"
  },
  {
    title: "Disputes",
    icon: AlertCircle,
    component: Disputes,
    description: "Dispute resolution and support"
  },
  {
    title: "Settings",
    icon: Settings,
    component: SettingsComponent,
    description: "Account settings and preferences"
  }
];
