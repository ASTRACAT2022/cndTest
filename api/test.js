export default async function handler(req, res) {
  const targets = [
    { name: "Cloudflare", url: "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js" },
    { name: "jsDelivr", url: "https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js" },
    { name: "Bunny", url: "https://nyc.bunny.net/lib/jquery/3.6.0/jquery.min.js" },
    { name: "Fastly", url: "https://global-ssl.fastly.net/jquery/3.6.0/jquery.min.js" }
  ];

  const results = await Promise.all(targets.map(async ({ name, url }) => {
    const start = Date.now();
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const end = Date.now();
      return {
        name,
        latency: end - start,
        sizeKB: (blob.size / 1024).toFixed(2),
        success: true
      };
    } catch (e) {
      return { name, success: false, error: e.message };
    }
  }));

  res.status(200).json(results);
}