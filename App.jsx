import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ReadmeGenerator from "./pages/ReadmeGenerator";
import ReadmeEditor from "./pages/ReadmeEditor";
import FlowViewer from "./pages/FlowViewer";
import SelectOrg from "./pages/SelectOrg";
import AuthCallback from "./pages/AuthCallback";
import AdminPermissions from "./pages/AdminPermissions";
import FileReview from "./pages/FileReview";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* AUTH */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/callback" element={<AuthCallback />} />

        {/* ORG ONBOARDING */}
        <Route path="/select-org" element={<SelectOrg />} />

        {/* DASHBOARD */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin/permissions" element={<AdminPermissions />} />

        {/* DOC AGENTS */}
        <Route path="/documentation/navigator" element={<Navigator />} />
        <Route path="/review/file" element={<FileReview />} />
        <Route path="/documentation/flow" element={<FlowViewer />} />
        <Route path="/documentation/readme" element={<ReadmeGenerator />} />
        <Route path="/documentation/readme/editor" element={<ReadmeEditor />} />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
