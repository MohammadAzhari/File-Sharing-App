import React, { useState } from "react";
import AuthForm from "../components/auth/AuthForm";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");

  const handleTabChange = (tab: "login" | "signup") => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div>
        <h1 className="text-3xl font-bold text-center">File Sharing App</h1>
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <div role="tablist" className="tabs tabs-boxed">
              <a
                className={`tab ${activeTab === "login" ? "tab-active" : ""}`}
                onClick={() => handleTabChange("login")}
              >
                Login
              </a>
              <a
                className={`tab ${activeTab === "signup" ? "tab-active" : ""}`}
                onClick={() => handleTabChange("signup")}
              >
                Signup
              </a>
            </div>

            <div className="py-4">
              <AuthForm action={activeTab} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
