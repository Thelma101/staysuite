"use client";



import { useState } from "react";

import Link from "next/link";

import { cn } from "@/lib/utils";

import Button from "@/components/ui/Button";

import Input from "@/components/ui/Input";

import Field from "@/components/ui/Field";

import SlidePanel from "@/components/ui/SlidePanel";



function Naira({ children }: { children: React.ReactNode }) {

  return (

    <span>

      <span className="line-through">N</span>

      {children}

    </span>

  );

}



function WalletIcon() {

  return (

    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">

      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />

      <line x1="1" y1="10" x2="23" y2="10" />

    </svg>

  );

}



function TxArrowIcon() {

  return (

    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-red-100">

      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">

        <line x1="7" y1="17" x2="17" y2="7" />

        <polyline points="7 7 17 7 17 17" />

      </svg>

    </div>

  );

}



function MenuIcon() {

  return (

    <span className="block h-[2px] w-5 bg-brand-ink shadow-[0_6px_0_0_#00190f,0_-6px_0_0_#00190f]" />

  );

}



type Transaction = {

  name: string;

  bank: string;

  date: string;

  amount: string;

  reference: string;

  status: string;

};



const STATS = [

  { label: "Total Charges Collected (NGN)", value: "43,850,200", prefix: true, badge: "+23%", badgeColor: "bg-green-100 text-green-700" },

  { label: "Transaction Volume", value: "8,678", prefix: false, badge: null, badgeColor: "" },

  { label: "Total Withdrawal", value: "6,000,000", prefix: true, badge: null, badgeColor: "" },

  { label: "Available Balance", value: "38,000,000", prefix: true, badge: "+12%", badgeColor: "bg-green-100 text-green-700" },

] as const;



const TRANSACTIONS: Transaction[] = [

  { name: "Oluwaseun Adeyemi", bank: "GTBank", date: "Apr 12, 2025", amount: "230,000", reference: "GL-20250412-001", status: "Completed" },

  { name: "Chidinma Okafor", bank: "Zenith Bank", date: "Apr 11, 2025", amount: "185,500", reference: "GL-20250411-002", status: "Completed" },

  { name: "Emeka Nwosu", bank: "Access Bank", date: "Apr 10, 2025", amount: "420,000", reference: "GL-20250410-003", status: "Completed" },

  { name: "Funmilayo Balogun", bank: "First Bank", date: "Apr 09, 2025", amount: "97,800", reference: "GL-20250409-004", status: "Completed" },

];



type WithdrawStep = "account" | "amount" | "success";



function Sidebar({ mobileOpen, onClose }: { mobileOpen: boolean; onClose: () => void }) {

  const content = (

    <nav className="flex h-full flex-col">

      <div className="flex items-center gap-3 px-5 py-6">

        <div className="flex size-10 items-center justify-center rounded-full bg-brand-green">

          <span className="font-montserrat text-[9px] font-bold leading-tight text-white">GL</span>

        </div>

        <span className="font-montserrat text-sm font-bold text-brand-ink">Green Lunar</span>

      </div>

      <div className="mt-4 flex flex-col gap-1 px-3">

        <Link

          href="/greenlunar/financials"

          onClick={onClose}

          className="flex items-center gap-3 rounded-l-[8px] bg-brand-green px-4 py-3 text-white"

        >

          <WalletIcon />

          <span className="text-sm font-semibold">Financial</span>

        </Link>

      </div>

    </nav>

  );



  return (

    <>

      <aside className="hidden h-screen w-[177px] shrink-0 border-r border-border bg-white md:block">{content}</aside>

      <div className={cn("fixed inset-0 z-40 md:hidden", mobileOpen ? "pointer-events-auto" : "pointer-events-none")} aria-hidden={!mobileOpen}>

        <button type="button" aria-label="Close navigation" onClick={onClose} className={cn("absolute inset-0 bg-black/40 transition-opacity", mobileOpen ? "opacity-100" : "opacity-0")} />

        <aside className={cn("absolute left-0 top-0 h-full w-[220px] max-w-[80%] border-r border-border bg-white shadow-card transition-transform", mobileOpen ? "translate-x-0" : "-translate-x-full")}>{content}</aside>

      </div>

    </>

  );

}



function TopBar({ onMenuClick }: { onMenuClick: () => void }) {

  return (

    <header className="flex h-[70px] items-center justify-between border-b border-border bg-white px-4 md:px-7">

      <button type="button" onClick={onMenuClick} className="grid size-10 place-items-center rounded-md hover:bg-surface-subtle md:hidden" aria-label="Open navigation">

        <MenuIcon />

      </button>

      <div className="hidden md:block" />

      <div className="flex items-center gap-3">

        <div className="text-right">

          <p className="text-sm font-semibold text-brand-ink">Olaniyi Odino</p>

          <p className="text-xs text-muted">Owner</p>

        </div>

        <div className="flex size-10 items-center justify-center rounded-full bg-brand-green text-sm font-bold text-white">OO</div>

      </div>

    </header>

  );

}



export default function GreenLunarFinancialsPage() {

  const [navOpen, setNavOpen] = useState(false);

  const [withdrawOpen, setWithdrawOpen] = useState(false);

  const [withdrawStep, setWithdrawStep] = useState<WithdrawStep>("account");

  const [accountNumber, setAccountNumber] = useState("");

  const [amount, setAmount] = useState("");

  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);



  const closeWithdraw = () => {

    setWithdrawOpen(false);

    setWithdrawStep("account");

    setAccountNumber("");

    setAmount("");

  };



  const handleWithdrawContinue = () => {

    if (withdrawStep === "account" && accountNumber.trim()) setWithdrawStep("amount");

    else if (withdrawStep === "amount" && amount.trim()) setWithdrawStep("success");

  };



  return (

    <div className="flex min-h-screen bg-[#f7f9fb]">

      <Sidebar mobileOpen={navOpen} onClose={() => setNavOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">

        <TopBar onMenuClick={() => setNavOpen(true)} />

        <main className="flex-1 px-4 py-6 md:px-7 md:py-8">

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

            {STATS.map((stat) => (

              <div key={stat.label} className="flex flex-col gap-2 rounded-[10px] bg-white p-5 shadow-sm">

                <p className="text-xs font-medium text-muted">{stat.label}</p>

                <div className="flex items-center gap-2">

                  <p className="text-xl font-bold text-brand-ink">{stat.prefix ? <Naira>{stat.value}</Naira> : stat.value}</p>

                  {stat.badge && <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold", stat.badgeColor)}>{stat.badge}</span>}

                </div>

              </div>

            ))}

          </div>



          <div className="mt-6 flex flex-col items-center justify-center rounded-[14px] px-6 py-10" style={{ background: "linear-gradient(145deg, #cd9c33, #b99a38, #188b5c)" }}>

            <p className="text-sm font-medium text-white/80">Total balance</p>

            <p className="mt-2 text-3xl font-bold text-white md:text-4xl"><Naira>38,000,000</Naira></p>

          </div>



          <div className="mt-4 flex items-center justify-between rounded-[10px] bg-white px-6 py-5 shadow-sm">

            <p className="text-sm font-semibold text-brand-ink">Ready to withdraw?</p>

            <Button type="button" size="sm" onClick={() => setWithdrawOpen(true)}>Withdraw</Button>

          </div>



          <div className="mt-8">

            <h2 className="mb-4 text-lg font-bold text-brand-ink">Transactions</h2>

            <div className="flex flex-col gap-3">

              {TRANSACTIONS.map((tx) => (

                <button

                  key={tx.reference}

                  type="button"

                  onClick={() => setSelectedTx(tx)}

                  className="flex w-full items-center gap-4 rounded-[10px] bg-white px-5 py-4 text-left shadow-sm transition hover:shadow-md"

                >

                  <TxArrowIcon />

                  <div className="flex min-w-0 flex-1 flex-col sm:flex-row sm:items-center sm:justify-between">

                    <div className="min-w-0">

                      <p className="truncate text-sm font-semibold text-brand-ink">{tx.name}</p>

                      <p className="text-xs text-muted">{tx.bank} &middot; {tx.date}</p>

                    </div>

                    <p className="mt-1 text-sm font-bold text-red-500 sm:mt-0">-<Naira>{tx.amount}</Naira></p>

                  </div>

                </button>

              ))}

            </div>

          </div>

        </main>

      </div>



      <SlidePanel open={withdrawOpen} onClose={closeWithdraw} title={withdrawStep === "success" ? "Withdrawal Complete" : "Withdraw Money"}>

        {withdrawStep === "account" && (

          <div className="flex flex-col gap-6">

            <Field label="Account number" htmlFor="wd-acct">

              <Input id="wd-acct" type="text" inputMode="numeric" placeholder="Enter name or account number" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} className="border-[#d9d9d9] bg-[#f2f4f6]" />

            </Field>

            <Button type="button" fullWidth className="h-12" disabled={!accountNumber.trim()} onClick={handleWithdrawContinue}>Continue</Button>

          </div>

        )}

        {withdrawStep === "amount" && (

          <div className="flex flex-col gap-6">

            <p className="text-sm text-muted">Withdrawing to account ending <span className="font-semibold text-brand-ink">{accountNumber.slice(-4)}</span></p>

            <Field label="Amount (NGN)" htmlFor="wd-amt">

              <Input id="wd-amt" type="text" inputMode="numeric" placeholder="Enter amount" value={amount} onChange={(e) => setAmount(e.target.value)} className="border-[#d9d9d9] bg-[#f2f4f6]" />

            </Field>

            <Button type="button" fullWidth className="h-12" disabled={!amount.trim()} onClick={handleWithdrawContinue}>Confirm Withdrawal</Button>

          </div>

        )}

        {withdrawStep === "success" && (

          <div className="flex flex-col items-center gap-6 text-center">

            <div className="flex size-16 items-center justify-center rounded-full bg-green-100 text-2xl text-brand-green">✓</div>

            <p className="text-sm text-muted">Your withdrawal of <Naira>{amount}</Naira> has been submitted successfully.</p>

            <Button type="button" fullWidth className="h-12" onClick={closeWithdraw}>Done</Button>

          </div>

        )}

      </SlidePanel>



      <SlidePanel open={!!selectedTx} onClose={() => setSelectedTx(null)} title="Transaction Details">

        {selectedTx && (

          <div className="flex flex-col gap-4 text-sm">

            <div><p className="text-muted">Recipient</p><p className="font-semibold text-brand-ink">{selectedTx.name}</p></div>

            <div><p className="text-muted">Bank</p><p className="font-semibold text-brand-ink">{selectedTx.bank}</p></div>

            <div><p className="text-muted">Date</p><p className="font-semibold text-brand-ink">{selectedTx.date}</p></div>

            <div><p className="text-muted">Reference</p><p className="font-semibold text-brand-ink">{selectedTx.reference}</p></div>

            <div><p className="text-muted">Status</p><p className="font-semibold text-brand-green">{selectedTx.status}</p></div>

            <div><p className="text-muted">Amount</p><p className="text-lg font-bold text-red-500">-<Naira>{selectedTx.amount}</Naira></p></div>

          </div>

        )}

      </SlidePanel>

    </div>

  );

}


