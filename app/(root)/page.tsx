import RightSidebar from "@/components/RightSidebar";
import HeaderBox from "@/components/ui/HeaderBox";
import TotalBalanceBox from "@/components/ui/TotalBalanceBox";
import React from "react";

const Home = () => {
  const loggedIn = { firstName: "Sam" ,lastName: "JSM",email: 'contact@bank.com'}
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName || "Guest"}
            subtext="Access and manage your banking services with ease."
          />
          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1250.35}
          />
        </header>
        
      </div>
      <RightSidebar
          user={loggedIn}
          transactions={[]}
          banks={[{currentBalance: 1250.35}, {currentBalance: 2500.00}]}
        />
    </section>
  );
};

export default Home;
