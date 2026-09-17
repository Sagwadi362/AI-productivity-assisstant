# AI Productivity assisstant

Create a highly professional single-page web application dashboard titled "AI-Powered Workplace Productivity Assistant". 

Design & Layout Requirements:

- Use a premium modern corporate aesthetic with a slate-900 background, crisp white typography, and vibrant deep-indigo/violet interactive buttons.

- Build a fixed sidebar navigation enabling the user to seamlessly click between 4 dedicated workspace modules: Email Generator, Meeting Summarizer, Task Planner, and Research Chatbot.

- Make the interface 100% responsive for desktop, tablet, and mobile dimensions.

Implement these fully interactive, simulated tool features within the modules:

1. Email Generator Tab:

- Inputs: Form text fields for "Recipient Name", "Core Context / Meeting Notes", and a dropdown select field for "Writing Tone" (Professional, Casual, Urgent).

- Action Button: A button labeled "Generate Automated Draft".

- Logic: When clicked, run a dynamic JavaScript simulation that reads the inputs and outputs a highly polished, contextual, and ready-to-copy corporate email draft into a shaded markdown results container block.

2. Meeting Summarizer Tab:

- Inputs: A large text area box labeled "Paste Raw Meeting Transcript Here". Include a placeholder text example showing a messy conversation snippet.

- Action Button: A button labeled "Extract Action Items".

- Logic: When clicked, dynamically parse the input and instantly populate three distinct visual component grids below: "Key Decisions Made", "Action Items Matrix", and "Assigned Deadlines".

3. Task Planner Tab:

- Inputs: A text input field box labeled "Enter High-Level Goal" (e.g., Deploy Q3 Database Analysis).

- Action Button: A button labeled "Generate 5-Day Project Roadmap".

- Logic: When clicked, dynamically render an elegant day-by-day checklist (Day 1 through Day 5) detailing specific sub-tasks equipped with clickable, functional completion checkboxes.

4. Research Chatbot Tab:

- Layout: A clean, scrolling chat window element with a message input bar at the bottom.

- Action: When a user types a workplace research query (e.g., "Explain the difference between SQL and Excel for large data sets") and clicks send, instantly append their bubble and dynamically render a highly detailed, professional prompt-engineered response after a brief simulated loading state.

Mandatory Booklet Disclaimer (Include at the bottom of EVERY tool window):

Include a clear, visible, italicized footnote: "Responsible AI Usage Disclaimer: This productivity dashboard operates on structured prompt-engineered logic frameworks. Please audit all technical and factual outputs independently before deploying in corporate production environments."

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://context-mate-io.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/40dd131d-7433-4075-9b70-35f2f4e99626).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
