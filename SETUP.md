# Speed Fest – Setup Guide

## 1. Razorpay Integration

1. Sign up / log in at https://dashboard.razorpay.com/
2. Go to **Settings → API Keys** → Generate test key
3. Copy your `key_id` (starts with `rzp_test_` for test mode or `rzp_live_` for production)
4. Open `src/components/BookingForm.jsx` and replace:
   ```js
   const RAZORPAY_KEY = "rzp_test_YourKeyHere";
   ```
   with your actual key.

> **Note:** In production you should also create an order on your backend using Razorpay's
> Orders API and pass the `order_id` to the frontend. For this MVP, the amount is computed
> client-side and passed directly.

---

## 2. EmailJS Integration (Send ticket by email)

1. Sign up free at https://www.emailjs.com/
2. **Add a Service**: Connect your Gmail / Outlook under **Email Services**. Copy the **Service ID**.
3. **Create a Template** under **Email Templates**. Use these template variables:

   | Variable         | Description                        |
   |------------------|------------------------------------|
   | `{{to_name}}`    | Attendee's full name               |
   | `{{to_email}}`   | Attendee's email (set as "To")     |
   | `{{ticket_id}}`  | Unique ticket ID e.g. SPF-2026-001 |
   | `{{ticket_count}}`| Number of tickets purchased       |
   | `{{free_tickets}}`| Bonus free tickets (if any)       |
   | `{{total_amount}}`| Amount paid e.g. ₹249             |
   | `{{payment_id}}` | Razorpay payment ID                |
   | `{{event_date}}` | 28th June 2026                     |
   | `{{event_time}}` | 1:00 PM – 6:00 PM                  |
   | `{{venue}}`      | Kari Motor Speedway, Coimbatore    |

   Sample subject: `🏁 Your Speed Fest Ticket – {{ticket_id}}`

   Sample body:
   ```
   Hi {{to_name}},

   You're all set for OPPO Speed Fest 2026! 🎉

   🎟️ Ticket ID: {{ticket_id}}
   📌 Tickets: {{ticket_count}} (+ {{free_tickets}} free)
   💰 Total Paid: {{total_amount}}
   📅 Date: {{event_date}}
   ⏰ Time: {{event_time}}
   📍 Venue: {{venue}}

   Show this email at the gate. See you on the track!

   — Team Speed Fest
   ```

4. Copy your **Service ID**, **Template ID**, and **Public Key** from EmailJS dashboard.
5. Open `src/components/BookingForm.jsx` and replace:
   ```js
   const EMAILJS_SERVICE_ID  = "service_speedfest";
   const EMAILJS_TEMPLATE_ID = "template_speedfest";
   const EMAILJS_PUBLIC_KEY  = "YOUR_PUBLIC_KEY";
   ```

---

## 3. Run locally

```bash
npm run dev
```

Open http://localhost:5173

## 4. Build for production

```bash
npm run build
```

Output goes to `dist/` — deploy to Vercel, Netlify, or any static host.
