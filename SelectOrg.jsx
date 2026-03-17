import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SelectOrg() {
  const navigate = useNavigate();

  const [token, setToken] = useState("");
  const [orgName, setOrgName] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [loading, setLoading] = useState(true);

  jhvckdsacysdvc
  skhgcvsdchs
  'sadvcsakhcvs

  useEffect(() => {
    const t = localStorage.getItem("jwt");
    if (!t) {
      navigate("/login", { replace: true });
      return;
    }
    setToken(t);

    fetch("http://localhost:8000/me/", {
      headers: { Authorization: `Bearer ${t}` },
    })
      .then((res) => res.json())
      .then((me) => {
        if (me.has_org) navigate("/dashboard", { replace: true });
        else setLoading(false);
      })
      .catch(() => {
        localStorage.removeItem("jwt");
        navigate("/login", { replace: true });
      });
  }, [navigate]);

  const handleCreateOrg = async () => {
    if (!orgName.trim()) return alert("Enter organization name");

    const res = await fetch("http://localhost:8000/orgs/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: orgName.trim() }),
    });

    const data = await res.json();
    if (!res.ok) return alert(data.detail || "Create failed");

    alert("Organization created!\nInvite code: " + data.invite_code);
    navigate("/dashboard", { replace: true });
  };

  const handleJoinOrg = async () => {
    if (!inviteCode.trim()) return alert("Enter invite code");

    const res = await fetch("http://localhost:8000/orgs/join", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ invite_code: inviteCode.trim() }),
    });

    if (!res.ok) return alert(await res.text());
    navigate("/dashboard", { replace: true });
  };

  if (loading) {
    return <div style={styles.page}>Loading...</div>;
  }

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <header style={styles.header}>
        <div style={styles.brand}>
          <span style={styles.brandAccent}>⚡</span>
          Code Intelligence Platform
        </div>
      </header>

      {/* MAIN */}
      <main style={styles.main}>
        <h1 style={styles.title}>
          Choose your <span style={styles.accent}>organization</span>
        </h1>

        <p style={styles.subtitle}>
          Create a new workspace or join an existing one using an invite code.
        </p>

        <div style={styles.grid}>
          {/* CREATE */}
          <div style={styles.card}>
            <h3>Create organization</h3>
            <input
              style={styles.input}
              placeholder="Organization name"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
            />
            <button style={styles.primaryBtn} onClick={handleCreateOrg}>
              Create →
            </button>
          </div>

          {/* JOIN */}
          <div style={styles.card}>
            <h3>Join organization</h3>
            <input
              style={styles.input}
              placeholder="Invite code"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
            />
            <button style={styles.primaryBtn} onClick={handleJoinOrg}>
              Join →
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

/* =========================
   STYLES
========================= */
const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    fontFamily: "system-ui, -apple-system",
    color: "#e5e7eb",
    background:
      "radial-gradient(circle at top, rgba(99,102,241,0.08), transparent 40%), linear-gradient(180deg, #020617 0%, #0f172a 100%)",
  },

  header: {
    height: 64,
    padding: "0 40px",
    display: "flex",
    alignItems: "center",
  },

  brand: {
    fontSize: 18,
    fontWeight: 600,
    color: "#fff",
    display: "flex",
    alignItems: "center",
    gap: 8,
  },

  brandAccent: {
    color: "#a855f7",
  },

  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: 24,
  },

  title: {
    fontSize: 48,
    fontWeight: 800,
    color: "#fff",
    marginBottom: 16,
    lineHeight: 1.1,
  },

  accent: {
    color: "#a855f7",
  },

  subtitle: {
    fontSize: 18,
    color: "#94a3b8",
    maxWidth: 600,
    marginBottom: 36,
  },

  grid: {
    display: "flex",
    gap: 24,
    flexWrap: "wrap",
    justifyContent: "center",
  },

  card: {
    width: 340,
    padding: 20,
    borderRadius: 14,
    background: "#0b1220",
    border: "1px solid #1e293b",
    textAlign: "left",
  },

  input: {
    width: "100%",
    padding: 12,
    borderRadius: 10,
    border: "1px solid #334155",
    background: "#020617",
    color: "#fff",
    marginBottom: 14,
  },

  primaryBtn: {
    width: "100%",
    padding: 12,
    borderRadius: 10,
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
    background: "linear-gradient(135deg, #a855f7, #6366f1)",
    color: "#020617",
  },

  outlineBtn: {
    width: "100%",
    padding: 12,
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: 600,
    background: "transparent",
    border: "1px solid #334155",
    color: "#e5e7eb",
  },
};
