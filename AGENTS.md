# Project rules

- Keep public PDF lessons in a typed, owner-approved catalog separate from private chats; public downloads must never expose student conversations.
- Use the existing accordion and input controls for the searchable lesson catalog in the navigation menu, avoiding a duplicate library system.
- Keep Lovable AI as the primary chat provider and fall back to the Bionic API (via `BIONIC_API_KEY` and `BIONIC_BASE_URL`, text-only without the image tool) only when Lovable AI returns a credit/limit error, showing the ChatGPT version fallback only if Bionic also fails.