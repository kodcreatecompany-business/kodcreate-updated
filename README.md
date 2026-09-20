# kodcreate

Custom website development site built with Next.js, React, TypeScript and Tailwind CSS.

## Current enquiry form: EmailJS

The contact form sends through EmailJS directly from the browser. It does not require a database or Resend configuration. Public EmailJS identifiers are configured in `lib/emailjs-enquiry.ts`.

In EmailJS, check template `template_gbxjyt4` on service `service_j55wetx`:

- To Email: `kodcreatecompany@gmail.com` (set this fixed recipient in the dashboard).
- Reply To: `{{reply_to}}`.
- Subject: `{{subject}}`.
- Message body: `{{message}}` (includes the visitor name, email, business, reference and project description).
- From Email: use your connected email service's default sender, not the visitor's address.

Also supplied: `name`, `from_name`, `email`, `from_email`, `to_name`, `to_email`, `business_name`, `businessName`, `title`, `description`, `reference`, and `time`.

Template fields must match your EmailJS template. Use ordinary escaped variables for visitor content. The EmailJS public key is intended for browser use; no private key belongs in browser code. If your EmailJS account restricts origins, allow your deployed domain and the localhost preview you use.

A success message is shown only after EmailJS accepts the request. This is not a guarantee of inbox delivery. On failure, form values remain available. Requests are not automatically retried because a timeout can occur after acceptance. No database copy or automatic visitor confirmation email is created by this flow.

The original `/api/enquiries` route and database/Resend modules are retained as legacy code; the form does not call them. Their environment variables and database rate limits do not apply to the EmailJS form.

## Development and deployment

Install dependencies using your package manager, then run `npm run dev`. Build with `npm run build`. Upload the extracted project contents to your GitHub repository and deploy the Next.js project with Vercel. The EmailJS form needs no Vercel email secrets. Optional `NEXT_PUBLIC_SITE_URL` sets the canonical site URL.

## Content

- `lib/site.ts`: company details and public email.
- `components/site-footer.tsx`: company footer and social links.
- `components/enquiry-form.tsx`: form validation, pending, success and error UI.
- `lib/emailjs-enquiry.ts`: EmailJS configuration and template fields.
- `app/globals.css`: site and button styling.

## Delivery verification

Confirm the EmailJS template settings above, submit one clearly labelled test, then check EmailJS history and the destination inbox/spam folder. Local mocked checks and a successful build do not prove real delivery.

## Orange redesign

The main site uses orange, charcoal and off-white. Section 02 contains three decorative concepts: Volt (yellow/black), a silent 10-second 3D website transformation film, and Grove (botanical green). Concept links are illustrations, not live destinations. The film plays only when visible, offers pause/play, and defaults to its poster for reduced-motion preferences.

The supplied Kodcreate wordmark has an orange transparent variant at `public/images/kodcreate-orange.png`. The short logo entrance can be skipped; reduced-motion users and direct section links skip it automatically. The hero's code panels transform into a website as visitors scroll. The form and company social links are retained.

The full-source ZIP includes all site assets, including the WebM film. Build outputs and installed dependencies are intentionally excluded; Vercel installs and builds these from the included project files.
