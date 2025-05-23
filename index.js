const { createCA, createCert } = require("mkcert");
const fs = require("fs");
const path = require("path"); // اضافه کردن ماژول path

async function x() {
  const ca = await createCA({
    organization: "Hello CA",
    countryCode: "IR",
    state: "Shiraz",
    locality: "Marvdasht",
    validity: 98,
  });
  const cert = await createCert({
    ca: { key: ca.key, cert: ca.cert },
    domains: ["192.168.19.88", "localhost"],
    validity: 98,
  });

  // استفاده از path.join برای ساخت مسیر صحیح
  fs.writeFileSync(path.join(process.cwd(), "key.pem"), cert.key);
  fs.writeFileSync(path.join(process.cwd(), "cert.pem"), cert.cert);
}

x();
