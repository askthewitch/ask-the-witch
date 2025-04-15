export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }
  
    const { email, summary } = req.body;
  
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'noreply@askthewitch.com',
          to: email,
          subject: 'Your Ask the Witch Summary',
          html: `<p>${summary}</p>`,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        res.status(200).json({ success: true });
      } else {
        res.status(500).json({ error: data });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }