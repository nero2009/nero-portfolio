---
path: /customer-support-ai-case-study-part-3
date: 2026-08-01
title: Customer Support AI Case Study(Part 3) - Structured Outputs
author: Oghenero Adaware
description: This article shows how I made the model return a predictable object that my support application could store and evaluate.
tags: ["AI", "LLM", "Case Study", "Prompt Engineering", "Structured Outputs"]
---

In Part 2, I separated each model execution into its own Run instead of writing the result directly to the Ticket. The next question was: what should a successful Run contain?  
Without a specified format, the model returns natural language. I needed it to return the same fields every time so I could store, query, and eventually evaluate its decisions. Most model providers support this through a schema. OpenAI calls the feature Structured Outputs.

### Natural language output versus Structured Outputs

I first asked the model to classify a ticket using prompt instructions alone, without a structured output format.

Ticket body:
```I tried to withdraw ₦50,000 from my Flex account yesterday but the money has not hit my bank. Transaction ID is TXN-99821. Please help.```

Model Response:

```
Category: Withdrawal Issue  
Short Summary: Customer reports a failed withdrawal of ₦50,000 from their Flex account.  
Sentiment: Frustrated  
Needs Human Review: Yes
Information Sufficiency: Yes
```

The model followed the prompt, but it returned prose. My code could display this response, but it could not reliably store or query individual fields such as category and priority. I needed a fixed response shape.  

With Structured Outputs schema defined, the same ticket produced:
```
{
  "category": "withdrawal",
  "priority": "high",
  "sentiment": "negative",
  "short_summary": "Customer is unable to withdraw ₦50,000 from their Flex account as the money has not been credited to their bank.",
  "needs_human_review": true,
  "is_information_sufficient": true
}
```
<br/>


### Designing the output contract

Given a support ticket, the model generates a summary, assigns a category and priority, identifies the customer’s sentiment, and determines whether human review is required. Those are the fields I store on a successful Run. I store each Run so I can compare the model’s decisions with human labels. Once I know which decisions are reliable, I can use them to route tickets and support other workflows.

Here is the output contract:
- `category`: Limits the model to the ticket categories supported by the application.
- `priority`: Limits the result to low, medium, high, or urgent.
- `sentiment`: Captures whether the customer’s tone is positive, negative, or neutral.
- `short_summary`: Summarizes the ticket in one sentence.
- `needs_human_review`: Flags tickets that a human should review.
- `is_information_sufficient`: Shows whether the ticket contains enough detail to act on or needs clarification.

```
{
  "category": enum(withdrawal, transfer_deposit, account_access, safelock, account_settings, unauthorized_debit, target_savings, app_issue, other),
  "priority": enum(low, medium, high, urgent),
  "sentiment": enum(positive, negative, neutral),
  "short_summary": "string",
  "needs_human_review": "boolean",
  "is_information_sufficient": "boolean"
}
```
<br/>

### Enforcing the contract


I used Zod to validate the response before storing the Run. It catches missing fields and incorrect types before I store the Run. Strict Structured Outputs make these errors unlikely, but I still validate before trusting the response.
See OpenAI’s guidance on [avoiding JSON Schema divergence](https://developers.openai.com/api/docs/guides/structured-outputs#avoid-json-schema-divergence).

```
const runOutputSchema = z.object({
  category: z.enum(VALID_AI_CATEGORIES),
  priority: z.enum(VALID_TICKET_PRIORITIES),
  sentiment: z.enum(VALID_SENTIMENTS),
  short_summary: z.string(),
  needs_human_review: z.boolean(),
  is_information_sufficient: z.boolean(),
});

const response = await openai.chat.completions.create({
  model: "gpt-4o-mini",
  messages: [{ role: "user", content: ticketBody }],
  response_format: zodResponseFormat(runOutputSchema, "run_output"),
});
```
See the [OpenAI Structured Outputs documentation](https://developers.openai.com/api/docs/guides/structured-outputs).


### The model prompt

The schema defines the shape and types of the output, while the prompt defines the rules, constraints, and meaning of each field. See OpenAI’s [Prompt Engineering guide](https://developers.openai.com/api/docs/guides/prompt-engineering).

For ticket triage, the prompt explains how the model should choose each value:

```
You are a support triage assistant for PiggyVest, a Nigerian B2C savings and investment app.
You will be given the text of a single customer support ticket. Classify it.

Guidance:
- category: pick the single best match from: withdrawal, transfer_deposit, account_access, safelock, account_settings, unauthorized_debit, target_savings, app_issue, other. Use "other" only if nothing else fits. (Independent of information sufficiency.)
- short_summary: one concise sentence describing the issue.
- sentiment: the customer's emotional tone.
- needs_human_review: true only if the issue is sensitive, acute distress / safety, involves money loss / fraud / account compromise that a human must review. (Not for mere vagueness.)
- is_information_sufficient: true if the ticket has enough concrete detail to act on; false if it's too vague and a clarifying question is needed

```
For example, I treat fraud-related tickets as requiring human review. The prompt encodes that decision by telling the model when to set needs_human_review to true. The schema requires a boolean; the prompt gives that boolean meaning.


### How it fits into the application

I put the triage model call in the triggerRun service and exposed it through POST /tickets/:id/runs. I can trigger a Run manually, on a schedule, or in response to an event.


#### Successful flow

```
POST /tickets/:id/runs -> triggerRun service -> model call -> validated output -> successful Run stored
```
<br/>

#### Failed flow

The model can refuse a request, the API call can fail, or the response can be incomplete. In each case, I store a failed Run with the available error details.

```
POST /tickets/:id/runs → triggerRun service → model call → refusal, error, or missing output → failed Run stored
```
<br/>

### Structure does not guarantee correctness

Structured Outputs gave my application a predictable response shape, but the model could still choose the wrong values. It could assign the wrong category or request human review when none was needed.  
I therefore needed to compare each Run with a human-reviewed answer. In Part 4, I will show how I created those labels and measured the model’s decisions.

