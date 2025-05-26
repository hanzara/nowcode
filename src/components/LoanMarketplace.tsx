
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { useLoans } from '@/hooks/useLoans';

interface LoanMarketplaceProps {
  onSubmitApplication: () => void;
}

const LoanMarketplace: React.FC<LoanMarketplaceProps> = ({ onSubmitApplication }) => {
  const { toast } = useToast();
  const { marketplaceLoans, submitLoanApplication, loading } = useLoans();
  const [formStep, setFormStep] = useState<'form' | 'confirmation'>('form');
  const [loanAmount, setLoanAmount] = useState(5000);
  const [duration, setDuration] = useState(12);
  const [interestRate, setInterestRate] = useState(5.2);
  const [collateral, setCollateral] = useState("");

  const calculateMonthlyPayment = () => {
    const r = interestRate / 100 / 12;
    const n = duration;
    const p = loanAmount;
    const monthlyPayment = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return monthlyPayment.toFixed(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formStep === 'form') {
      setFormStep('confirmation');
    } else {
      try {
        await submitLoanApplication({
          amount: loanAmount,
          interest_rate: interestRate,
          duration_months: duration,
          collateral,
          monthly_payment: parseFloat(calculateMonthlyPayment()),
          total_payment: parseFloat(calculateMonthlyPayment()) * duration
        });

        toast({
          title: "Loan Application Submitted",
          description: `Your application for ${loanAmount} USDC has been submitted for review.`,
        });
        onSubmitApplication();
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to submit loan application. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Loan Marketplace</h1>
      </div>

      {/* Available Loans Section */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Available Loans</CardTitle>
          <CardDescription>Browse loans available in the marketplace</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-4">Loading marketplace loans...</div>
          ) : marketplaceLoans.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No loans available in the marketplace.</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {marketplaceLoans.map((loan) => (
                <div key={loan.id} className="border rounded-lg p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Amount</span>
                      <span className="font-medium">{loan.amount} USDC</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Interest Rate</span>
                      <span className="font-medium">{loan.interest_rate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Duration</span>
                      <span className="font-medium">{loan.duration_months} months</span>
                    </div>
                    {loan.collateral_required && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Collateral</span>
                        <span className="font-medium text-xs">{loan.collateral_required}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>{formStep === 'form' ? 'Apply for a Loan' : 'Confirm Loan Details'}</CardTitle>
              <CardDescription>
                {formStep === 'form' 
                  ? 'Complete the form below to request a loan' 
                  : 'Please review your loan details before submitting'}
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent>
                {formStep === 'form' ? (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Loan Amount (USDC)</label>
                      <div className="flex items-center space-x-4">
                        <Input
                          type="number"
                          value={loanAmount}
                          onChange={(e) => setLoanAmount(Number(e.target.value))}
                          className="flex-1"
                        />
                        <span className="text-sm font-medium">USDC</span>
                      </div>
                      <div className="pt-2">
                        <Slider
                          defaultValue={[5000]}
                          max={10000}
                          min={1000}
                          step={100}
                          onValueChange={(value) => setLoanAmount(value[0])}
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>1,000</span>
                          <span>5,000</span>
                          <span>10,000</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Duration (Months)</label>
                      <div className="flex items-center space-x-4">
                        <Input
                          type="number"
                          value={duration}
                          onChange={(e) => setDuration(Number(e.target.value))}
                          className="flex-1"
                        />
                        <span className="text-sm font-medium">Months</span>
                      </div>
                      <div className="pt-2">
                        <Slider
                          defaultValue={[12]}
                          max={36}
                          min={3}
                          step={3}
                          onValueChange={(value) => setDuration(value[0])}
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>3</span>
                          <span>18</span>
                          <span>36</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Interest Rate (%)</label>
                      <div className="flex items-center space-x-4">
                        <Input
                          type="number"
                          value={interestRate}
                          onChange={(e) => setInterestRate(Number(e.target.value))}
                          className="flex-1"
                          step="0.1"
                        />
                        <span className="text-sm font-medium">%</span>
                      </div>
                      <div className="pt-2">
                        <Slider
                          defaultValue={[5.2]}
                          max={10}
                          min={1}
                          step={0.1}
                          onValueChange={(value) => setInterestRate(value[0])}
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>1.0%</span>
                          <span>5.0%</span>
                          <span>10.0%</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Collateral</label>
                      <Input
                        placeholder="Enter collateral details (e.g., NFT, tokens)"
                        value={collateral}
                        onChange={(e) => setCollateral(e.target.value)}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Enter the asset you'd like to use as collateral for this loan.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="border rounded-lg p-4 bg-gray-50">
                        <h4 className="text-sm text-gray-500 mb-1">Loan Amount</h4>
                        <p className="font-semibold text-lg">{loanAmount} USDC</p>
                      </div>
                      <div className="border rounded-lg p-4 bg-gray-50">
                        <h4 className="text-sm text-gray-500 mb-1">Duration</h4>
                        <p className="font-semibold text-lg">{duration} months</p>
                      </div>
                      <div className="border rounded-lg p-4 bg-gray-50">
                        <h4 className="text-sm text-gray-500 mb-1">Interest Rate</h4>
                        <p className="font-semibold text-lg">{interestRate}%</p>
                      </div>
                      <div className="border rounded-lg p-4 bg-gray-50">
                        <h4 className="text-sm text-gray-500 mb-1">Monthly Payment</h4>
                        <p className="font-semibold text-lg">{calculateMonthlyPayment()} USDC</p>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4 bg-gray-50">
                      <h4 className="text-sm text-gray-500 mb-1">Collateral</h4>
                      <p className="font-medium">{collateral || "Not specified"}</p>
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm">
                        By submitting this application, you agree to the terms of service
                        and acknowledge that your collateral may be liquidated if you fail to
                        repay the loan according to the agreed terms.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-6">
                {formStep === 'confirmation' && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setFormStep('form')}
                  >
                    Back to Edit
                  </Button>
                )}
                <Button 
                  type="submit" 
                  className="ml-auto bg-loan-primary hover:bg-blue-600"
                >
                  {formStep === 'form' ? 'Review Application' : 'Submit Application'}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>

        <div>
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Loan Summary</CardTitle>
              <CardDescription>Estimated costs and payment schedule</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-b pb-4 pt-2">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-500">Loan Amount:</span>
                  <span className="font-medium">{loanAmount} USDC</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-500">Interest Rate:</span>
                  <span className="font-medium">{interestRate}%</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-500">Duration:</span>
                  <span className="font-medium">{duration} months</span>
                </div>
              </div>
              
              <div className="border-b pb-4">
                <div className="flex justify-between mb-2 font-medium">
                  <span className="text-gray-500">Monthly Payment:</span>
                  <span>{calculateMonthlyPayment()} USDC</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-500">Total Interest:</span>
                  <span>{(parseFloat(calculateMonthlyPayment()) * duration - loanAmount).toFixed(2)} USDC</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-500">Total Payment:</span>
                  <span>{(parseFloat(calculateMonthlyPayment()) * duration).toFixed(2)} USDC</span>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Application Timeline:</h4>
                <ol className="space-y-3 text-sm">
                  <li className="flex">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs mr-2">1</div>
                    <p className="text-gray-500">Application submitted</p>
                  </li>
                  <li className="flex">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs mr-2">2</div>
                    <p className="text-gray-500">Lenders review request</p>
                  </li>
                  <li className="flex">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs mr-2">3</div>
                    <p className="text-gray-500">Funding transferred to wallet</p>
                  </li>
                  <li className="flex">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs mr-2">4</div>
                    <p className="text-gray-500">Repayments begin according to schedule</p>
                  </li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoanMarketplace;
