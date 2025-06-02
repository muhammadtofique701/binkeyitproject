// Anywhere in your Vite frontend (e.g., in a React component)
const sendEmail = async () => {
  const res = await fetch('http://localhost:3001/api/send-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      to: 'test@example.com',
      subject: 'Test Email',
      html: '<p>This is a test</p>',
    }),
  });

  const data = await res.json();
  console.log(data);
};
