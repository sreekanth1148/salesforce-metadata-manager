import { useEffect, useState } from "react";

function App() {
  const [rules, setRules] = useState([]);

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");

    if (code) {
      fetch("https://salesforce-metadata-manager-api-sreekanth.onrender.com/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      })
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem(
            "access_token",
            data.access_token
          );

          localStorage.setItem(
            "instance_url",
            data.instance_url
          );

          console.log("TOKEN DATA", data);
        })
        .catch(console.error);
    }
  }, []);

  const loginToSalesforce = () => {
    const clientId =
      "3MVG97L7PWbPq6UyAMgF9gXGDlxYdmm9MPSusbY5rk7Zx2lAlZDy2fSHe_xpziyeMfkEIMM5r263vxc3IdUUw";

    const redirectUri =
  "https://salesforce-metadata-manager.vercel.app/auth/callback";
    const authUrl =
      `https://login.salesforce.com/services/oauth2/authorize` +
      `?response_type=code` +
      `&client_id=${clientId}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}`;

    window.location.href = authUrl;
  };

  const getValidationRules = async () => {
    try {
      const accessToken =
        localStorage.getItem("access_token");

      const instanceUrl =
        localStorage.getItem("instance_url");

      const response = await fetch(
  "https://salesforce-metadata-manager-api-sreekanth.onrender.com/validation-rules",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            instanceurl: instanceUrl,
          },
        }
      );

      const data = await response.json();

      setRules(data.records || []);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleRule = (id) => {
    setRules((prevRules) =>
      prevRules.map((rule) =>
        rule.Id === id
          ? { ...rule, Active: !rule.Active }
          : rule
      )
    );
  };

  const deployRule = async (rule) => {
    try {
      const accessToken =
        localStorage.getItem("access_token");

      const instanceUrl =
        localStorage.getItem("instance_url");

      const response = await fetch(
  "https://salesforce-metadata-manager-api-sreekanth.onrender.com/deploy-rule",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            accessToken,
            instanceUrl,
            ruleName: rule.ValidationName,
            active: rule.Active,
          }),
        }
      );

      const data = await response.json();

      alert(data.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
  <div
    style={{
      minHeight: "100vh",
      background:
        "linear-gradient(to right, #e3f2fd, #f8fbff)",
      padding: "40px",
      fontFamily: "Arial, sans-serif",
    }}
  >
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        backgroundColor: "white",
        padding: "35px",
        borderRadius: "12px",
        boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#0176d3",
          fontSize: "42px",
          fontWeight: "bold",
          marginBottom: "35px",
        }}
      >
        Salesforce Validation Rule Manager
      </h1>

      <div
        style={{
          textAlign: "center",
          marginBottom: "25px",
        }}
      >
        <button
          onClick={loginToSalesforce}
          style={{
            padding: "12px 24px",
            marginRight: "10px",
            backgroundColor: "#0176d3",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Login with Salesforce
        </button>

        <button
          onClick={getValidationRules}
          style={{
            padding: "12px 24px",
            backgroundColor: "#2e844a",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Get Validation Rules
        </button>
      </div>

      <h2
        style={{
          marginBottom: "20px",
          color: "#333",
        }}
      >
        Validation Rules
      </h2>

      {rules.length === 0 ? (
        <p>No rules loaded.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "14px",
                  backgroundColor: "#0176d3",
                  color: "white",
                }}
              >
                Name
              </th>

              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "14px",
                  backgroundColor: "#0176d3",
                  color: "white",
                }}
              >
                Status
              </th>

              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "14px",
                  backgroundColor: "#0176d3",
                  color: "white",
                }}
              >
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {rules.map((rule) => (
              <tr key={rule.Id}>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "14px",
                    textAlign: "center",
                  }}
                >
                  {rule.ValidationName}
                </td>

                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "14px",
                    textAlign: "center",
                  }}
                >
                  {rule.Active
                    ? "✅ Active"
                    : "❌ Inactive"}
                </td>

                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "14px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "10px",
                    }}
                  >
                    <button
                      onClick={() =>
                        toggleRule(rule.Id)
                      }
                      style={{
                        padding: "8px 16px",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontWeight: "bold",
                        backgroundColor: rule.Active
                          ? "#dc3545"
                          : "#28a745",
                        color: "white",
                      }}
                    >
                      {rule.Active
                        ? "Disable"
                        : "Enable"}
                    </button>

                    <button
                      onClick={() =>
                        deployRule(rule)
                      }
                      style={{
                        padding: "8px 16px",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontWeight: "bold",
                        backgroundColor: "#0176d3",
                        color: "white",
                      }}
                    >
                      Deploy
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  </div>
);
}

export default App;